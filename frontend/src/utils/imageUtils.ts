const API_URL = 'http://localhost:5001';

export const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('/uploads') ? `${API_URL}${path}` : path;
};
