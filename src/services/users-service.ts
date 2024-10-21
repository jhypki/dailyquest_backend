import usersRepository from "../repositories/users-repository";
import { User } from "@prisma/client";
import { BadRequestError } from "../utils/errors/BadRequestError";
import * as Yup from "yup";

class UsersService {
    private schema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        passwordHash: Yup.string().required("Password is required"),
    });

    async getUsers(): Promise<User[] | null> {
        return await usersRepository.getUsers();
    }

    async getUserById(userId: string): Promise<User | null> {
        return await usersRepository.findById(userId);
    }

    async createUser(user: User): Promise<User> {
        try {
            await this.schema.validate(user, { abortEarly: false });
        } catch (validationError) {
            if (validationError instanceof Yup.ValidationError) {
                const errors = validationError.inner.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                throw new BadRequestError("Invalid user data", errors);
            }
        }

        //TODO: Hash the password before saving it to the database

        return await usersRepository.create({
            ...user,
            createdAt: new Date(),
            //TODO: new stats row should be created here and statsId should be set to the id of the new row
            statsId: "1",
        });
    }

    async updateUser(userId: string, user: User): Promise<User> {
        return await usersRepository.update(userId, user);
    }

    async deleteUser(userId: string): Promise<User> {
        return await usersRepository.delete(userId);
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return await usersRepository.findByUsername(username);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await usersRepository.findByEmail(email);
    }
}

export default new UsersService();
