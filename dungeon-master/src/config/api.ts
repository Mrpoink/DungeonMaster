// API Configuration
// Prefer same-origin via Next.js proxy: default '/api'
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const API_ENDPOINTS = {
  DMout: `${API_BASE_URL}/DMout`,
  userin: `${API_BASE_URL}/userin`,
  seed: `${API_BASE_URL}/seed`,
  characterData: `${API_BASE_URL}/character-data`,
  characters: `${API_BASE_URL}/characters`,
  userData: `${API_BASE_URL}/userData`,
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  health: `${API_BASE_URL}/`,
} as const;
