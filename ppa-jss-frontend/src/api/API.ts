import type { IProduct } from "@/interfaces/models/products.interface";
import { API_URL } from "@/lib/env";
import axios from "axios";

const withCredentials = true;

const userLogin = async (userData: Object) => {
    return await axios.post(
        `${API_URL}/auth/login`,
        {
            ...userData,
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

const getUserData = async (userId: string) => {
    return await axios.get(`${API_URL}/auth?userId=${userId}`);
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
const updateProduct = async (productId: string, data: IProduct) => {
    return await axios.put(`${API_URL}/products/${productId}`, 
      {
        ...data
      },
      {
        withCredentials,
    });
};
const deleteProduct = async (productId?: string) => {
    await axios.delete(`${API_URL}/products/${productId}`, {
      withCredentials
    })
};
const getProduct = async (productId?: string) => {
    return await axios.get(`${API_URL}/products/${productId}`, {
        withCredentials,
    });
};
const getProducts = async () => {
    return await axios.get(`${API_URL}/products`, {
        withCredentials,
    });
};

const createComment = async (data: { productId: string; text: string }) => {
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
const getComments = async (productId?: string) => {
    // @ts-ignore
    return await axios.get(`${API_URL}/comments?productId=${productId}`, {
        withCredentials,
    });
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
    getComments,
    getUserData,
    updateProduct,
    deleteProduct,
};
