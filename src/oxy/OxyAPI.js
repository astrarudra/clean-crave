/**
 * API Service for fetching external data.
 */
const OxyAPI = {
  /**
   * Fetches raw text content from a given URL.
   * (Adapting sadhan-sangha's getGit to accept a full URL and return text).
   *
   * @param {string} url - The full URL to fetch text content from.
   * @returns {Promise<string>} A promise resolving to the text content.
   * @throws {Error} Throws an error if the fetch request fails (e.g., network error, non-2xx status).
   */
  getRawText: async (url) => {
    // console.log(`OxyAPI.getRawText fetching: ${url}`); // Optional debug log
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
      }
      const textData = await response.text();
      return textData;
    } catch (error) {
      console.error(`OxyAPI.getRawText Error fetching ${url}:`, error);
      // Re-throw the error to be caught by the caller
      throw error;
    }
  },

  /**
   * Fetches JSON data from a given URL.
   *
   * @param {string} url - The full URL to fetch JSON data from.
   * @returns {Promise<object>} A promise resolving to the parsed JSON data.
   * @throws {Error} Throws an error if the fetch request fails or if the response isn't valid JSON.
   */
  getJson: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(`OxyAPI.getJson Error fetching ${url}:`, error);
      // Re-throw the error to be caught by the caller
      throw error;
    }
  },

  // Keep getGist structure if needed for future use, but implement similarly for JSON
  /*
  getGist: async (gistId, useCache = false) => {
      const gistBase = 'YOUR_GIST_BASE_URL/'; // Define your base URL if needed
      const url = `${gistBase}${gistId}/raw${useCache ? '' : `?timestamp=${Date.now()}`}`;
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status} for Gist ${gistId}`);
          }
          const jsonData = await response.json();
          return jsonData;
      } catch (error) {
          console.error(`OxyAPI.getGist Error fetching Gist ${gistId}:`, error);
          throw error;
      }
  }
  */
};

export default OxyAPI; 