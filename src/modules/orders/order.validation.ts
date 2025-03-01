import { z } from "zod";

const createOrderValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
        totalPrice: z.number().min(0, "Total price must be a positive number").optional(),
    })
});

const updateOrderStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(["Pending", "Shipping"], { required_error: "Status is required" }),
    }),
});

export const OrderValidations = {
    createOrderValidationSchema,
    updateOrderStatusValidationSchema
}