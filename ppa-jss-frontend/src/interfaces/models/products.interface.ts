export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    tags: string[];
    createdAt: Date;
}