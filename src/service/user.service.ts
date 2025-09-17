import bcrypt from 'bcrypt';
import { UserCreateDTO, UserUpdateDTO } from "../dto/user-dto";
import { createUser, getOneUser as getOneUserFromRepository, updateUser as updateUserInRepository } from '../repository/user-repository';

export async function registerUser(user: UserCreateDTO) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const savedUser = await createUser({
        ...user,
        password: hashedPassword
    });
    return savedUser;
}

/**
 * Login user given its credentials
 * @param login username | email
 * @param password 
 */
export async function loginUser(login: string, password: string) {
    let user = await getOneUserFromRepository(undefined, login);
    if(!user) {
        user = await getOneUserFromRepository(undefined, undefined, login);
    }
    if(!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }
    return user;
}

export async function getOneUser(id?: string, username?: string, email?: string) {
    let user;
    if (id !== undefined) {
        user = await getOneUserFromRepository(id);
    }
    else if(username !== undefined) {
        user = await getOneUserFromRepository(undefined, username);
    }
    else if(email !== undefined) {
        user = await getOneUserFromRepository(undefined, undefined, email);
    }
    else {
        throw new Error("At least one of id, username or email must be provided");
    }
    return user;
}

export async function updateUser(userId: string, userUpdateDTO: UserUpdateDTO) {
    const user = await getOneUserFromRepository(userId);
    if (!user) {
        throw new Error("User not found");
    }
    
    if (userUpdateDTO.email && userUpdateDTO.email !== user.email) {
        const emailExists = await getOneUserFromRepository(undefined, undefined, userUpdateDTO.email);
        if (emailExists && emailExists.id !== userId) {
            throw new Error("A user with this email already exists");
        }
    }
    
    if (userUpdateDTO.username && userUpdateDTO.username !== user.username) {
        const usernameExists = await getOneUserFromRepository(undefined, userUpdateDTO.username, undefined);
        if (usernameExists && usernameExists.id !== userId) {
            throw new Error("A user with this username already exists");
        }
    }
    
    const updatedUser = await updateUserInRepository(userId, userUpdateDTO);
    return updatedUser;
}

