const API_URL = 'https://ecommerce-react-app-y8le.onrender.com';

export const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('/uploads') ? `${API_URL}${path}` : path;
};
