/**
 * API Configuration
 *
 * Use NEXT_PUBLIC_API_BASE_URL if provided; otherwise default to '/api'
 * which is proxied by Next.js to the backend via rewrites.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// Helper for making API calls
export const apiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
