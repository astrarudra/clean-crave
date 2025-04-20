import { useAppStore } from './store';
import Oxy from '../oxy'; // Import the Oxy service

// Get the raw set function from the store outside of React components
const { setState } = useAppStore.getState();

/**
 * Simple frontmatter parser that doesn't rely on gray-matter
 * Extracts yaml-style frontmatter from markdown content
 * @param {string} content - Raw markdown content with frontmatter
 * @returns {object} { data, content } - Extracted frontmatter data and content
 */
const parseFrontmatter = (content) => {
  // Default return structure
  const result = {
    data: {},
    content: content
  };
  
  // Check if the content starts with a frontmatter delimiter
  if (!content || !content.startsWith('---')) {
    return result;
  }
  
  // Find the second frontmatter delimiter
  const endDelimiterIndex = content.indexOf('---', 3);
  if (endDelimiterIndex === -1) {
    return result;
  }
  
  // Extract the frontmatter section and the content
  const frontmatterText = content.substring(3, endDelimiterIndex).trim();
  const mainContent = content.substring(endDelimiterIndex + 3).trim();
  
  // Parse the frontmatter YAML-like structure
  const frontmatterData = {};
  const lines = frontmatterText.split('\n');
  
  lines.forEach(line => {
    // Skip empty lines
    if (!line.trim()) return;
    
    // Find the first colon which separates key from value
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // Handle arrays (values wrapped in square brackets)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .substring(1, value.length - 1)
        .split(',')
        .map(item => item.trim());
    }
    // Handle nested objects (e.g., nutrition)
    else if (value.startsWith('{') && value.endsWith('}')) {
      try {
        // Try to parse as JSON
        value = JSON.parse(value);
      } catch (/* eslint-disable-next-line no-unused-vars */
_) {
        // If parsing fails, do a simple key-value parsing instead
        const objStr = value.substring(1, value.length - 1);
        const objParts = objStr.split(',');
        const obj = {};
        
        objParts.forEach(part => {
          const [objKey, objValue] = part.split(':').map(s => s.trim());
          // Try to convert to number if possible
          obj[objKey] = isNaN(objValue) ? objValue : Number(objValue);
        });
        
        value = obj;
      }
    }
    // Try to convert to number if it looks like one
    else if (!isNaN(value) && value !== '') {
      value = Number(value);
    }
    
    frontmatterData[key] = value;
  });
  
  return {
    data: frontmatterData,
    content: mainContent
  };
};

// --- Filtering Logic --- //

/**
 * Applies the current filters (dietary tags, search query) to the full recipe list
 * and updates the `filteredRecipes` state.
 */
const applyFilters = () => {
  const { recipes, filters } = useAppStore.getState();
  let filtered = [...recipes];

  // Filter by dietary tags
  if (filters.dietary.length > 0) {
    filtered = filtered.filter(recipe =>
      filters.dietary.every(tag => recipe.tags?.includes(tag))
    );
  }

  // Filter by search query (simple title search)
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(recipe =>
      recipe.title.toLowerCase().includes(query)
    );
  }

  setState(state => {
    state.filteredRecipes = filtered;
  });
};

// --- Controller Object --- //

// Base URLs for content
const BASE_URL = 'https://astrarudra.github.io/data/';
const INDEX_URL = `${BASE_URL}index.json`;
const RECIPE_CONTENT_BASE_URL = `${BASE_URL}recipe/`;
const EDUCATION_CONTENT_BASE_URL = `${BASE_URL}education/`;

/**
 * Controller object containing actions to modify the application state.
 */
export const Controller = {
  /**
   * Initializes the application by fetching recipe and education metadata from index.json.
   * Sets loading state and handles potential errors.
   * @returns {Promise<void>}
   */
  init: async () => {
    console.log("Controller.init - Starting fetch from index.json");
    setState(state => {
      state.isLoading = true;
      state.error = null;
    });
    
    try {
      // Fetch metadata from index.json
      const data = await Oxy.getJson(INDEX_URL);
      console.log("Controller.init - Received data:", data);
      
      if (!data || (!data.recipes && !data.education)) {
        throw new Error('Invalid data format from index.json');
      }
      
      // Initialize recipes and education arrays with metadata only
      // Content will be loaded lazily when needed
      const recipes = data.recipes || [];
      const education = data.education || [];
      
      // Update the store with the metadata
      setState(state => {
        state.recipes = recipes;
        state.education = education;
        state.filteredRecipes = recipes;
        state.isLoading = false;
      });
      
      console.log("Controller.init - Loaded metadata:", { recipes: recipes.length, education: education.length });
    } catch (error) {
      console.error("Error during Controller.init:", error);
      setState(state => {
        state.error = `Failed to load content: ${error.message}`;
        state.isLoading = false;
      });
    }
  },

  /**
   * Lazy-loads the markdown content for a recipe from its ID.
   * Updates the selectedRecipe in the store with the full content.
   * @param {string} id - The ID of the recipe to load.
   * @returns {Promise<void>}
   */
  loadRecipeContent: async (id) => {
    const { recipes } = useAppStore.getState();
    const recipe = recipes.find(r => r.id === id);
    
    if (!recipe) {
      console.error(`Recipe with ID ${id} not found`);
      return;
    }
    
    // If content is already loaded, just select it
    if (recipe.content) {
      setState(state => {
        state.selectedRecipe = recipe;
      });
      return;
    }
    
    // Set loading state for UI feedback
    setState(state => {
      state.isLoading = true;
      // We still set the recipe with metadata so the UI can show basic info
      state.selectedRecipe = recipe;
    });
    
    try {
      // Fetch the markdown content
      const url = `${RECIPE_CONTENT_BASE_URL}${id}.md`;
      const rawContent = await Oxy.getRawText(url);
      
      // Parse the markdown with our custom frontmatter parser
      const { data: frontmatter, content } = parseFrontmatter(rawContent);
      
      // Update the recipe with its content
      const updatedRecipe = { ...recipe, content, ...frontmatter };
      
      // Update the store - both in the recipes array and as selectedRecipe
      setState(state => {
        const index = state.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
          state.recipes[index] = updatedRecipe;
        }
        state.selectedRecipe = updatedRecipe;
        state.isLoading = false;
      });
      
      console.log(`Loaded content for recipe: ${id}`);
    } catch (error) {
      console.error(`Error loading content for recipe ${id}:`, error);
      setState(state => {
        state.error = `Failed to load recipe content: ${error.message}`;
        state.isLoading = false;
      });
    }
  },

  /**
   * Lazy-loads the markdown content for an education article from its ID.
   * Updates the selectedEducation in the store with the full content.
   * @param {string} id - The ID of the education article to load.
   * @returns {Promise<void>}
   */
  loadEducationContent: async (id) => {
    const { education } = useAppStore.getState();
    const educationItem = education.find(e => e.id === id);
    
    if (!educationItem) {
      console.error(`Education article with ID ${id} not found`);
      return;
    }
    
    // If content is already loaded, just select it
    if (educationItem.content) {
      setState(state => {
        state.selectedEducation = educationItem;
      });
      return;
    }
    
    // Set loading state for UI feedback
    setState(state => {
      state.isLoading = true;
      // We still set the education item with metadata so the UI can show basic info
      state.selectedEducation = educationItem;
    });
    
    try {
      // Fetch the markdown content
      const url = `${EDUCATION_CONTENT_BASE_URL}${id}.md`;
      const rawContent = await Oxy.getRawText(url);
      
      // Parse the markdown with our custom frontmatter parser
      const { data: frontmatter, content } = parseFrontmatter(rawContent);
      
      // Update the education item with its content
      const updatedEducation = { ...educationItem, content, ...frontmatter };
      
      // Update the store - both in the education array and as selectedEducation
      setState(state => {
        const index = state.education.findIndex(e => e.id === id);
        if (index !== -1) {
          state.education[index] = updatedEducation;
        }
        state.selectedEducation = updatedEducation;
        state.isLoading = false;
      });
      
      console.log(`Loaded content for education article: ${id}`);
    } catch (error) {
      console.error(`Error loading content for education article ${id}:`, error);
      setState(state => {
        state.error = `Failed to load education content: ${error.message}`;
        state.isLoading = false;
      });
    }
  },

  /**
   * Sets the dietary filter tags and triggers filter application.
   * @param {Array<string>} tags - The selected dietary tags.
   */
  setDietaryFilter: (tags) => {
    setState(state => {
      state.filters.dietary = tags;
    });
    applyFilters();
  },

  /**
   * Sets the search query filter and triggers filter application.
   * @param {string} query - The search query string.
   */
  setSearchQuery: (query) => {
    setState(state => {
      state.filters.searchQuery = query;
    });
    applyFilters();
  },

  /**
   * Finds a recipe by its ID, sets it as the `selectedRecipe` in the store,
   * and loads its content if not already loaded.
   * @param {string} id - The ID of the recipe to select.
   */
  selectRecipeById: (id) => {
    Controller.loadRecipeContent(id);
  },

  /**
   * Finds an educational article by its ID, sets it as the `selectedEducation` in the store,
   * and loads its content if not already loaded.
   * @param {string} id - The ID of the educational article to select.
   */
  selectEducationById: (id) => {
    Controller.loadEducationContent(id);
  },

  /**
   * Clears all active filters (dietary tags and search query) and triggers filter application.
   */
  clearFilters: () => {
    setState(state => {
        state.filters = {
            dietary: [],
            searchQuery: ''
        };
    });
    applyFilters();
  },
}; 