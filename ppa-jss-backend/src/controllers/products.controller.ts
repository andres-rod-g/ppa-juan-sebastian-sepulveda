import ProductModel from "@/models/product.model"
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

const createProduct = async (req: Request, res: Response) => {
    const {
        name,
        description,
        price,
        imageUrl,
        tags
    } = req.body

    const temp = await ProductModel.create({
        name, 
        description,
        price,
        imageUrl,
        tags,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(() => true).catch(() => false)

    if (!temp) return res.status(400).json({message: "Something wrong when creating product"})
    
    return res.status(200).json({message: "Done"})
}

const getProduct = async (req: Request, res: Response) => {
    const { productId } = req.params

    const temp = await ProductModel.findById(new ObjectId(productId))

    if (!temp) return res.status(404).json({message: "Not found"});

    return res.status(200).json({data: temp})
}

const getAllProducts = async (req: Request, res: Response) => {
    const temp = await ProductModel.find()

    return res.status(200).json({data: temp})
}

const updateProduct = async (req: Request, res: Response) => {
    const {
        name,
        description,
        price,
        imageUrl,
        tags
    } = req.body

    const { productId } = req.params

    try {
        const temp = await ProductModel.findByIdAndUpdate(
            new ObjectId(productId),
            {
                name, 
                description,
                price,
                imageUrl,
                tags,
                updatedAt: new Date()
            },
            {
                lean: true,
                new: true
            }
        )

        if (!temp) return res.status(400).json({message: "Something wrong updating"})

        return res.status(200).json({data: temp})
    } catch (err) {
        return res.status(400).json({message: "Something wrong updating"})
    }
}

const removeProduct = async (req: Request, res: Response) => {
    const { productId } = req.params

    try {
        const temp = await ProductModel.findByIdAndDelete(new ObjectId(productId))

        return res.status(200).json({message: "Done"})
    } catch (err) {
        return res.status(400).json({message: "Something wrong while removing product", productId})
    }
}

export default {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    removeProduct
}