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
import { ForbiddenError } from '../utils/errors/forbidden-error';
import { UpdateUserRequest } from '../types/update-user-request';
import { validateUpdateUserData } from '../utils/validations/validate-update-user-data';
import { mapUserResponse } from '../mappers/map-user-response';
import { UserResponseData } from '../types/user-response-data';
import statsService from './stats-service';

class UsersService {
    async getUsers(): Promise<UserResponseData[] | null> {
        const users = await usersRepository.getUsers();

        return users ? users.map(mapUserResponse) : null;
    }

    async getUserById(userId: string): Promise<UserResponseData | null> {
        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new BadRequestError('User not found');
        }

        return mapUserResponse(user);
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
            createdAt: new Date()
        });

        await statsService.createStats(newUser.id);

        const token = generateToken(newUser);

        const userData: UserResponseData = mapUserResponse(newUser);

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

        const userData: UserResponseData = mapUserResponse(user);

        return { token, user: userData };
    }

    async updateUser(
        idFromToken: string | undefined,
        userId: string,
        dataToUpdate: UpdateUserRequest
    ): Promise<UserResponseData> {
        const userToUpdate = await usersRepository.findById(userId);

        if (!userToUpdate) {
            throw new BadRequestError('User not found');
        }

        if (idFromToken !== userId) {
            throw new ForbiddenError('You are not authorized to update this user');
        }

        await validateUpdateUserData(dataToUpdate);

        if (dataToUpdate.email) {
            const existingUserByEmail = await usersRepository.findByEmail(dataToUpdate.email);

            if (existingUserByEmail && existingUserByEmail.id !== userId) {
                throw new ConflictError('User with that email already exists', [
                    { field: 'email', message: 'Email is already in use' }
                ]);
            }
        }

        if (dataToUpdate.username) {
            const existingUserByUsername = await usersRepository.findByUsername(dataToUpdate.username);

            if (existingUserByUsername && existingUserByUsername.id !== userId) {
                throw new ConflictError('User with that username already exists', [
                    { field: 'username', message: 'Username is already in use' }
                ]);
            }
        }

        if (dataToUpdate.password) {
            userToUpdate.passwordHash = await hashPassword(dataToUpdate.password);
        }

        delete dataToUpdate.password;

        const updatedUserData: User = { ...userToUpdate, ...dataToUpdate };

        const updatedUser = await usersRepository.update(userId, updatedUserData);

        return mapUserResponse(updatedUser);
    }

    async deleteUser(userId: string | undefined, idToDelete: string): Promise<User> {
        if (!usersRepository.findById(idToDelete)) {
            throw new BadRequestError('User not found');
        }

        //TODO move this to a middleware
        if (userId !== idToDelete) {
            throw new ForbiddenError('You are not authorized to delete this user');
        }
        return await usersRepository.delete(userId);
    }
}

export default new UsersService();
