

export type IOrder = {
    _id: string;
    user: string; // reference to the user who placed the order
    product: {
        productId: {
            _id: string;
            title: string;
        };
        quantity: number;
        price: number; // price per unit of the product
        totalPrice: number; // total price for this product (quantity * price)
    };
    amount: number; // total price of the order (sum of all products' totalPrice)
    shippingAddress: string;
    paymentStatus: string; // e.g., 'Pending', 'Completed', 'Failed'
    orderStatus: string; // e.g., 'Processing', 'Shipped', 'Delivered', 'Cancelled'
    orderDate: Date; // the date when the order was placed
    transaction: {
        id: string,
        code: number,
        message: string,
        status: string,
        method: string,
        bank_status: string,
        date_time: string,
    },
    estimatedDeliveryDate?: Date;
};

export interface ITransaction {
    length: number;
    _id: string;
    buyerID: {
        _id: string;
        name: string;
        email: string;
        avatar: string;
    };
    sellerID: {
        _id: string;
        name: string;
        email: string;
        avatar: string;
    };
    itemID: {
        _id: string;
        title: string;
        description: string;
        price: number;
        images: string[];
    };
    orderID: {
        transaction: {
            id: string;
            bank_status: string;
        };
    };
    status: 'pending' | 'completed';
    createdAt: string;
}