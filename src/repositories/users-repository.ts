import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/prisma";
import { User } from "@prisma/client";

export class UsersRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async getUsers(): Promise<User[] | null> {
        return this.prisma.user.findMany();
    }

    async findById(userId: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }

    async create(user: User): Promise<User> {
        return prisma.user.create({
            data: user,
        });
    }

    async update(userId: string, user: User): Promise<User> {
        return prisma.user.update({
            where: { id: userId },
            data: user,
        });
    }

    async delete(userId: string): Promise<User> {
        return prisma.user.delete({
            where: { id: userId },
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { username },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }
}
