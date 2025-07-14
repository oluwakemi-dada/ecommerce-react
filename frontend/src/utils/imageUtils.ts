const API_URL = import.meta.env.VITE_API_URL;

export const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('/uploads') ? `${API_URL}${path}` : path;
};
