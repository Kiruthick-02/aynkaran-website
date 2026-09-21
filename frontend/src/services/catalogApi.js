// src/services/catalogApi.js
export const API_URL =
  import.meta.env.VITE_API_DEPLOYED_URL ||
  import.meta.env.VITE_API_URL ||
  'https://aynkaran-website.onrender.com';

export const DESKTOP_API_URL =
  import.meta.env.VITE_DESKTOP_DEPLOYED_API_URL ||
  import.meta.env.VITE_DESKTOP_API_URL ||
  API_URL;

export function resolveMediaUrl(path) {
  if (!path) return null;
  const s = String(path).trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s) || s.startsWith('blob:') || s.startsWith('data:')) {
    return s;
  }
  const normalized = s.startsWith('/') ? s : `/${s}`;
  return `${API_URL.replace(/\/$/, '')}${normalized}`;
}

export async function fetchCatalog() {
  const apis = [API_URL, DESKTOP_API_URL, 'https://aynkaran-website.onrender.com', 'https://aynkaran-backend.onrender.com'];
  for (const base of apis) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/api/public/catalog`);
      if (res.ok) return res.json();
    } catch (_) {}
  }
  throw new Error('Failed to load catalog from available servers');
}