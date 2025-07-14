export type Product = {
  _id: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  name: string;
  price: number;
  numReviews?: number;
  rating?: number;
  reviews?: Review[];
};

export type Review = {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type UploadProductImageResponse = {
  message: string;
  image: string;
};

export type DeleteProductResponse = {
  message: string;
};
