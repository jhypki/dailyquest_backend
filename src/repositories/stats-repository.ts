import prisma from '../prisma/prisma';
import { PrismaClient } from '@prisma/client';
import { Stats } from '@prisma/client';

class StatsRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async create(stats: Omit<Stats, 'id'>): Promise<Stats> {
        return prisma.stats.create({
            data: stats
        });
    }

    async update(statsId: string, stats: Stats): Promise<Stats> {
        return prisma.stats.update({
            where: { id: statsId },
            data: stats
        });
    }

    async findById(statsId: string): Promise<Stats | null> {
        return this.prisma.stats.findUnique({
            where: { id: statsId }
        });
    }

    findByUserId(userId: string): Promise<Stats | null> {
        return this.prisma.stats.findFirst({
            where: { userId }
        });
    }
}

export default new StatsRepository();
