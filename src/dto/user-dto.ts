import { z } from 'zod';

export const CreateUserSchema = z.object({
    username: z.string().min(3, "User name must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    lastName: z.string().nonempty("Last name is required"),
    firstName: z.string().optional(),
    email: z.union([z.literal(''), z.string().email()]).optional(),
});

export const LoginUserSchema = z.object({
    login: z.string().nonempty("Username or email is required"),
    password: z.string().nonempty("Password is required")
});

export const UpdateUserSchema = z.object({
    username: z.string().min(3, "User name must be at least 3 characters long").optional(),
    lastName: z.string().nonempty("Last name is required").optional(),
    firstName: z.string().optional(),
    email: z.union([z.literal(''), z.string().email()]).optional(),
});

export type UserCreateDTO = z.infer<typeof CreateUserSchema>;
export type UserUpdateDTO = z.infer<typeof UpdateUserSchema>;

export interface UserDTO {
    id: string;
    username: string;
    lastName: string;
    firstName: string | null;
    active: boolean;
    email: string | null;
    emailVerified: boolean;
    role: string;
}