import { create } from 'zustand';

// Update the store to handle enhanced filtering with the updated data format
const useAppStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  filters: {
    searchTerm: '',
    mealType: null,
    dietType: null,
    maxTime: null,
    quickOnly: null,
    highProtein: null,
    lowCarb: null,
    lowCalorie: null
  },
  
  // Set all recipes from the API
  setRecipes: (recipes) => {
    set({ 
      recipes,
      filteredRecipes: recipes
    });
  },
  
  // Directly set filtered recipes (for sorting)
  setFilteredRecipes: (filteredRecipes) => {
    set({ filteredRecipes });
  },
  
  // Update one or more filter values
  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters
      }
    }));
  },
  
  // Apply all active filters to the recipe list
  applyFilters: () => {
    const { recipes, filters } = get();
    
    // Filter based on current filter settings
    const filtered = recipes.filter(recipe => {
      // Text search filter - now searches in title, tags, dietType, and mealType
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(searchTermLower);
        const tagsMatch = recipe.tags?.some(tag => tag.toLowerCase().includes(searchTermLower));
        const dietMatch = recipe.dietType?.toLowerCase().includes(searchTermLower);
        const mealMatch = recipe.mealType?.toLowerCase().includes(searchTermLower);
        
        if (!(titleMatch || tagsMatch || dietMatch || mealMatch)) {
          return false;
        }
      }
      
      // Meal type filter
      if (filters.mealType && recipe.mealType !== filters.mealType) {
        return false;
      }
      
      // Diet type filter
      if (filters.dietType && recipe.dietType !== filters.dietType) {
        return false;
      }
      
      // Max cooking time filter (prep + cook)
      if (filters.maxTime) {
        const totalTime = (parseInt(recipe.prepTime) || 0) + (parseInt(recipe.cookTime) || 0);
        if (totalTime > filters.maxTime) {
          return false;
        }
      }
      
      // Quick recipes filter (20 minutes or less)
      if (filters.quickOnly) {
        const totalTime = (parseInt(recipe.prepTime) || 0) + (parseInt(recipe.cookTime) || 0);
        if (totalTime > 20) {
          return false;
        }
      }
      
      // High protein filter (more than 25% of calories from protein)
      if (filters.highProtein) {
        // Calculate protein percentage (4 calories per gram of protein)
        const proteinCalories = (recipe.nutrition?.protein || 0) * 4;
        const totalCalories = recipe.nutrition?.calories || 1; // Avoid division by zero
        const proteinPercentage = (proteinCalories / totalCalories) * 100;
        
        if (proteinPercentage < 25) {
          return false;
        }
      }
      
      // Low carb filter (less than 20% of calories from carbs)
      if (filters.lowCarb) {
        // Calculate carb percentage (4 calories per gram of carbs)
        const carbCalories = (recipe.nutrition?.carbs || 0) * 4;
        const totalCalories = recipe.nutrition?.calories || 1; // Avoid division by zero
        const carbPercentage = (carbCalories / totalCalories) * 100;
        
        if (carbPercentage > 20) {
          return false;
        }
      }
      
      // Low calorie filter (less than 350 calories per serving)
      if (filters.lowCalorie && (recipe.nutrition?.calories || 0) > 350) {
        return false;
      }
      
      return true;
    });
    
    set({ filteredRecipes: filtered });
  },
  
  // Reset all filters
  resetFilters: () => {
    set({
      filters: {
        searchTerm: '',
        mealType: null,
        dietType: null,
        maxTime: null,
        quickOnly: null,
        highProtein: null,
        lowCarb: null,
        lowCalorie: null
      }
    });
    get().applyFilters();
  }
}));

export { useAppStore };
export { Controller } from './controller'; 