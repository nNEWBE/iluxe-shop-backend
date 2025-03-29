import { z } from "zod";

export const createOrderValidationSchema = z.object({
    body: z.object({
        user: z.string().min(1, "User ID is required"),
        products: z
            .array(
                z.object({
                    product: z.string().min(1, "Product ID is required"),
                    quantity: z.number().int().positive("Quantity must be a positive integer"),
                })
            )
            .min(1, "At least one product is required"),
        totalPrice: z.number().positive("Total price must be a positive number"),
        status: z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"]).default("Pending"),
        transaction: z
            .object({
                id: z.string().optional(),
                transactionStatus: z.string().optional(),
                bank_status: z.string().optional(),
                sp_code: z.string().optional(),
                sp_message: z.string().optional(),
                method: z.string().optional(),
                date_time: z.string().optional(),
            })
            .optional(),
    })
})

const updateOrderStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"], {
            required_error: "Status is required",
            invalid_type_error: "Invalid status value",
        }),
    }),
});

export const OrderValidations = {
    createOrderValidationSchema,
    updateOrderStatusValidationSchema
}