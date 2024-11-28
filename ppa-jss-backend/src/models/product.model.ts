import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    tags: string[];
    createdAt: Date;
}

class Product {
    @prop({ required: true })
    public name!: String;
    
    @prop({ required: true })
    public description!: String;
    
    @prop({ required: true })
    public price!: number;
    
    @prop({ required: true })
    public imageUrl!: String;
    
    @prop({ type: () => [String] })
    public tags!: String[];
    
    @prop({ required: true })
    public createdAt!: Date;
    
    @prop({ required: true })
    public updatedAt!: Date;
}
  
const ProductModel = getModelForClass(Product);
export default ProductModel;