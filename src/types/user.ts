export interface IUser {
  _id: string;
  avatar: string | undefined;
  name: string;
  accessToken: string;
  email: string;
  role: string;
  status: string;
  iat?: number;
  exp?: number;
}
export interface IWishlist {
  _id: string;
  images: string[];
  title: string;
  price: number;
}

export interface IMessage {
  senderID: string | undefined;
  receiverID: string;
  message: string;
}
