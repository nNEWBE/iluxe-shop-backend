import { z } from "zod";

const categoryEnum = z.enum([
    "Writing",
    "Office Supplies",
    "Art Supplies",
    "Educational",
    "Technology",
]);

const createProductValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        brand: z.string({ required_error: "Brand is required" }),
        price: z
            .number({ required_error: "Price is required" })
            .min(0, "Price must be a positive number"),
        category: categoryEnum,
        description: z.string({ required_error: "Description is required" }),
        productImage: z
            .string({ required_error: "Product image is required" })
            .url("Invalid product image URL"),
        author: z
            .string({ required_error: "Author is required" })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
        quantity: z
            .number({ required_error: "Quantity is required" })
            .int()
            .min(0, "Quantity must be a positive number"),
        rating: z
            .number({ required_error: "Rating is required" })
            .min(0, "Rating must be a positive number")
            .max(5, "Rating must be between 0 and 5"),
        inStock: z.boolean(),
    }),
});

const updateProductValidationSchema = z.object({
    body: createProductValidationSchema.shape.body.partial(),
});

export const ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};