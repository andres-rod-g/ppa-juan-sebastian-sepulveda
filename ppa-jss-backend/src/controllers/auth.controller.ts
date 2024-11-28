import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authService from "../services/authService";
import { validationResult } from "express-validator";
import UserModel, { EUserRole } from "@/models/user.model";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "@/utils/env";
import utils from "@/utils/utils";

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: false, sameSite: false });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        sameSite: false,
    });

    return res.json({ message: "Logged in successfully" });
};

const register = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;

    try {
        // Comprobar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: EUserRole.USER,
        });

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const registerAndLogin = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;


    try {
        // Comprobar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: EUserRole.USER,
        });

        const token = jwt.sign(
            {
                userId: newUser._id,
                role: newUser.role,
            },
            JWT_SECRET,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
            {
                userId: newUser._id,
                role: newUser.role,
            },
            JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: false, sameSite: false });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
            sameSite: false,
        });

        res.status(201).json({
            message: "Usuario registrado y loggeado con éxito",
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export default {
    login,
    register,
    registerAndLogin,
};