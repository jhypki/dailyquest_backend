import usersRepository from '../repositories/users-repository';
import { AuthenticateResponse } from './../types/authenticate-response';
import { User } from '@prisma/client';
import { BadRequestError } from '../utils/errors/bad-request-error';
import { ConflictError } from '../utils/errors/conflict-error';
import { hashPassword } from '../utils/authentication-utils/hash-password';
import { generateToken } from '../utils/authentication-utils/jwt-utils';
import { verifyPassword } from '../utils/authentication-utils/verify-password';
import { validateLoginData } from '../utils/validations/validate-login-data';
import { validateRegisterData } from '../utils/validations/validate-register-data';

class UsersService {
    async getUsers(): Promise<User[] | null> {
        return await usersRepository.getUsers();
    }

    async getUserById(userId: string): Promise<User | null> {
        return await usersRepository.findById(userId);
    }

    async register(username: string, email: string, password: string): Promise<AuthenticateResponse> {
        await validateRegisterData(username, email, password);

        const existingUserByEmail = await usersRepository.findByEmail(email);

        if (existingUserByEmail) {
            throw new ConflictError('User with that email already exists', [
                { field: 'email', message: 'Email is already in use' }
            ]);
        }

        const existingUserByUsername = await usersRepository.findByUsername(username);

        if (existingUserByUsername) {
            throw new ConflictError('User with that username already exists', [
                { field: 'username', message: 'Username is already in use' }
            ]);
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await usersRepository.create({
            username,
            email,
            firstName: null,
            lastName: null,
            picture: null,
            passwordHash: hashedPassword,
            createdAt: new Date(),
            // TODO: new stats row should be created here and statsId should be set to the id of the new row
            statsId: '1'
        });

        const token = generateToken(newUser);

        const userData = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };

        return { token, user: userData };
    }

    async login(
        username: string | undefined,
        email: string | undefined,
        password: string
    ): Promise<AuthenticateResponse> {
        await validateLoginData(username, email, password);

        const user = email
            ? await usersRepository.findByEmail(email)
            : await usersRepository.findByUsername(username as string);

        if (!user) {
            throw new BadRequestError('Invalid email or password');
        }

        const isPasswordValid = await verifyPassword(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new BadRequestError('Invalid email or password');
        }

        const token = generateToken(user);

        const userData = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        return { token, user: userData };
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
