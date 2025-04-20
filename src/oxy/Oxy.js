import api from './OxyAPI';

/**
 * Facade for the Oxy API service.
 * Provides a clean interface to the fetching logic.
 */
const Oxy = {
  // Expose the getRawText method from the API
  getRawText: (url) => api.getRawText(url),

  // Expose the getJson method from the API
  getJson: (url) => api.getJson(url),

  // Expose getGist if/when implemented in OxyAPI.js
  // getGist: (gistId, useCache = false) => api.getGist(gistId, useCache),
};

export default Oxy; 