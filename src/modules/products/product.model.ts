import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product.interface';

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: String,
            enum: [
                'Writing',
                'Office Supplies',
                'Art Supplies',
                'Educational',
                'Technology',
            ],
            required: true,
        },
        description: { type: String, required: true },
        productImage: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
