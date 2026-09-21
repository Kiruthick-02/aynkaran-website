// src/services/catalogApi.js
export const API_URL =
  import.meta.env.VITE_API_DEPLOYED_URL ||
  import.meta.env.VITE_API_URL ||
  'https://aynkaran-backend.onrender.com';
const DESKTOP_API_URL =
  import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
  import.meta.env.VITE_DESKTOP_API_URL ||
  import.meta.env.VITE_API_URL ||
  'https://aynkaran-backend.onrender.com';

export async function fetchCatalog() {
  const res = await fetch(`${API_URL}/api/public/catalog`);
  if (!res.ok) throw new Error('Failed to load catalog');
  return res.json();
}