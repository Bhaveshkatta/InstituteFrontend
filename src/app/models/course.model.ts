export interface Course {
  id: string | number;
  title: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  features?: string[];
}
