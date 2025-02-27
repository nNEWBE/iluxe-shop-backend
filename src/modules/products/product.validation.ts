import { z } from "zod";

export const ProductValidationSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    brand: z.string().min(1, "Brand is required"),
    price: z.number().min(0, "Price must be a positive number"),
    category: z
        .enum([
            "Writing",
            "Office Supplies",
            "Art Supplies",
            "Educational",
            "Technology",
        ]),
    description: z.string({ required_error: "Description is required" }),
    quantity: z.number().int().min(0, "Quantity must be a positive number"),
    inStock: z.boolean(),
});
