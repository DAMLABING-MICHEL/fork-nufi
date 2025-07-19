import bcrypt from 'bcrypt';
import { UserCreateDTO, } from "../dto/user-dto";
import { createUser, getOneUser } from '../repository/user-repository';

export async function registerUser(user: UserCreateDTO) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Salt rounds: 10
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
    // first find user by username
    let user = await getOneUser(undefined, login);
    if(!user) {
        // find user by email
        user = await getOneUser(undefined, undefined, login);
    }
    if(!user) {
        throw new Error("Invalid credentials");
    }
    // check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }
    return user;
}