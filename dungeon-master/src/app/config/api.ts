/**
 * API Configuration
 * 
 * Toggle between development (localhost) and production server
 * by changing the isDevelopment flag below.
 */

// SET THIS TO false FOR PRODUCTION, true FOR LOCAL DEVELOPMENT
const isDevelopment = true;

// API Base URLs
const LOCALHOST_URL = 'http://localhost:1068';
const PRODUCTION_URL = 'http://questweave.servequake.com:1068';

// Export the active API base URL
export const API_BASE_URL = isDevelopment ? LOCALHOST_URL : PRODUCTION_URL;

// Helper function for making API calls (optional, for convenience)
export const apiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
