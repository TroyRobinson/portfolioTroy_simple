/**
 * Generate a unique ID with optional prefix
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} A unique ID string
 */
export const generateUniqueId = (prefix = '') => {
  return `${prefix}${Math.random()
    .toString(36)
    .substring(2, 10)}-${Date.now().toString(36)}`
} 