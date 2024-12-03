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
    role: EUserRole;
    email: string;
    phone: string;
    gender: EUserGender;
    city?: ECity;
    recentCompanies?: string[];
    password: string;
    birthday: Date;
}

export const USER_WITH_EMPTY_DATA: IUser = {
    name: "",
    role: EUserRole.SU,
    email: "",
    phone: "",
    gender: EUserGender.MALE,
    password: "",
    birthday: new Date()
}