export interface IUser {
  id: string;
  avatar: string | undefined;
  name: string;
  accessToken: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
export interface IWishlist {
  _id: string;
  images: string[];
  title: string;
  price: number;
}
