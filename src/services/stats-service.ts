import statsRepository from '../repositories/stats-repository';
import { Stats } from '@prisma/client';
import { BadRequestError } from '../errors/bad-request-error';
import { validateUpdateStatsData } from '../utils/validations/stats/validate-update-stats-data';

class StatsService {
    async createStats(userId: string): Promise<Stats> {
        const stats: Omit<Stats, 'id'> = {
            userId
        } as Stats;

        return statsRepository.create(stats);
    }

    async getStatsByUserId(userId: string): Promise<Stats> {
        const stats = await statsRepository.findByUserId(userId);
        if (!stats) {
            throw new BadRequestError('Stats not found');
        }

        return stats;
    }

    async updateStats(userId: string, statsToUpdate: Partial<Stats>): Promise<Stats> {
        //TODO call this method when user finishes a task
        await validateUpdateStatsData(statsToUpdate);

        const currentStats = await statsRepository.findByUserId(userId);
        if (!currentStats) {
            throw new BadRequestError('Stats not found');
        }

        const stats = {
            ...statsToUpdate
        } as Stats;

        return statsRepository.updateByUserId(userId, stats);
    }
}

export default new StatsService();
