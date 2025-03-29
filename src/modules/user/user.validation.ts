import { z } from "zod";

const registerUserValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: "Name must be a string", required_error: "Name is required" }),

        email: z.string({ invalid_type_error: "Email must be a string", required_error: "Email is required" }).email({ message: "Invalid email address" }),

        password: z.string({ invalid_type_error: "Password must be a string", required_error: "Password is required" }).min(4, { message: "Password must be at least 4 characters long" }),
    })
})

const loginUserValidationSchema = z.object({
    body: registerUserValidationSchema.shape.body.pick({
        email: true,
        password: true
    })
});

const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: "Name must be a string"}).optional(),
        email: z.string({ invalid_type_error: "Email must be a string"}).email({ message: "Invalid email address" }).optional(),
        phone: z.string({ invalid_type_error: "Phone must be a string" }).optional(),
        address: z.string({ invalid_type_error: "Address must be a string"}).optional(),
        city: z.string({ invalid_type_error: "City must be a string" }).optional(),
    })
})

const blockUserValidationSchema = z.object({
    body: z.object({
        isBlocked: z.boolean({ invalid_type_error: "isBlocked must be boolean", required_error: "isBlocked is required" }),
    })
})

export const UserValidations = {
    registerUserValidationSchema,
    loginUserValidationSchema,
    updateUserValidationSchema,
    blockUserValidationSchema
}