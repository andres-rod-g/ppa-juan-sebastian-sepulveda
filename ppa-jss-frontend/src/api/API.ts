import type { IProduct } from "@/interfaces/models/products.interface";
import { API_URL } from "@/lib/env";
import axios from "axios";

const withCredentials = true;

const userLogin = async (email: string, password: string) => {
    return await axios.post(
        `${API_URL}/auth/login`,
        {
            email,
            password,
        },
        {
            withCredentials,
        }
    );
};

const fastRegisterUser = async (userData: Object) => {
    return await axios.post(
        `${API_URL}/auth/fastRegister`,
        {
            ...userData,
        },
        {
            withCredentials,
        }
    );
};

const checkUserAuthCookies = async () => {
    return await axios.get(`${API_URL}/auth/protected`, {
        withCredentials,
    });
};

const checkIfUserExists = async (userEmail: string) => {
    return await axios.post(
        `${API_URL}/check/users`,
        {
            userEmail,
        },
        {
            withCredentials,
        }
    );
};

const createProduct = async (data: IProduct) => {
    await axios.post(`${API_URL}/products`, data, {
        withCredentials,
    });
};
const updateProduct = async (data: IProduct) => {
    // await axios.(`${API_URL}/`, {
    //   withCredentials
    // })
};
const deleteProduct = async () => {
    // await axios.(`${API_URL}/`, {
    //   withCredentials
    // })
};
const getProduct = async (productId: string) => {
    return await axios.get(`${API_URL}/products/${productId}`, {
        withCredentials,
    });
};
const getProducts = async () => {
    return await axios.get(`${API_URL}/products`, {
        withCredentials,
    });
};

const createComment = async (data: {productId: string, text: string}) => {
    await axios.post(
        `${API_URL}/comments`,
        {
            productId: data.productId,
            text: data.text,
        },
        {
            withCredentials,
        }
    );
};
const updateComment = async () => {
    // await axios.(`${API_URL}/`, {
    //   withCredentials
    // })
};
const deleteComment = async () => {
    // await axios.(`${API_URL}/`, {
    //   withCredentials
    // })
};
const getComment = async () => {
    // await axios.(`${API_URL}/`, {
    //   withCredentials
    // })
};
const getComments = async () => {
    // await axios.(`${API_URL}/`, {
    //   withCredentials
    // })
};

export default {
    userLogin,
    checkIfUserExists,
    fastRegisterUser,
    checkUserAuthCookies,
    createProduct,
    getProducts,
    getProduct,
    createComment,
};
