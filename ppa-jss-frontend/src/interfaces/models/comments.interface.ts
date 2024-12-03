import type { IUser } from "./users.interface";

export interface IComment {
    text: string;
    authorUserId: string; // UserId
    productId: string; // ProductId
    createdAt: Date;
    updatedAt: Date;
    user: IUser
}