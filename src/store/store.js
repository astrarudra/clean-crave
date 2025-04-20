import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { immer } from 'zustand/middleware/immer';

/**
 * Zustand store hook for application state.
 *
 * Uses `createWithEqualityFn` for selector optimization with `shallow` comparison,
 * and `immer` middleware for easier immutable state updates.
 *
 * @property {Array<object>} recipes - Array of all recipe objects, including parsed frontmatter and content.
 * @property {Array<object>} education - Array of all educational content objects.
 * @property {Array<object>} filteredRecipes - Array of recipes after applying current filters.
 * @property {object|null} selectedRecipe - The currently selected recipe object for detail view.
 * @property {object|null} selectedEducation - The currently selected education object for detail view.
 * @property {boolean} isLoading - Global loading state, true during initial data fetch.
 * @property {string|null} error - Global error message if data loading fails.
 * @property {object} filters - Current filter state.
 * @property {Array<string>} filters.dietary - Array of selected dietary tags.
 * @property {string} filters.searchQuery - Current search query string.
 * @property {Function} setState - Basic setter function provided by immer middleware.
 */
export const useAppStore = createWithEqualityFn(immer((set) => ({
  recipes: [], // Array to hold all recipe data { id, title, image, tags, nutrition, content, ... }
  education: [], // Array to hold all educational content { id, title, category, content, ... }
  filteredRecipes: [], // Recipes after applying filters
  selectedRecipe: null, // Currently viewed recipe details
  selectedEducation: null, // Currently viewed education details
  isLoading: true, // Loading state for initial data fetch
  error: null, // Error state
  filters: {
    dietary: [], // e.g., ['vegan', 'keto']
    searchQuery: '',
  },

  // Basic setter function for state updates.
  setState: (fn) => set(fn),

  // More complex logic is handled in the controller.
})), shallow);

// --- Usage Notes ---
// Select state slices directly in components:
// const recipes = useAppStore((state) => state.recipes);
// const isLoading = useAppStore((state) => state.isLoading);

// For selecting multiple state slices efficiently (recommended with shallow compare):
// const [recipes, filters] = useAppStore((state) => [
//   state.recipes,
//   state.filters,
// ]);