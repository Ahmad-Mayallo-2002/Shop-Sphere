type Rating = {
  comment?: string;
  value: number;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  brandName: string;
  ratings: Rating[];
};
