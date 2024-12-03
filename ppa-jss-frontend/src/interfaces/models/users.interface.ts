export enum EUserRole {
    SU = "SU",
    ADMIN = "ADMIN",
    USER = "USER",
}

export enum EUserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

export enum ECity {
    CUCUTA = "CUCUTA"
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export const USER_WITH_EMPTY_DATA: IUser = {
    name: "",
    email: "",
    password: "",
}