// interfaces/IListing.ts

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    images: string[];
    category: string;
    userID: {
        _id: string;
        name: string;
        avatar: string;
        email: string;
    };
    status: 'available' | 'sold';
    location: {
        city: string;
        state?: string;
        country: string;
    };
}
