import statsRepository from '../repositories/stats-repository';
import { Stats } from '@prisma/client';

class StatsService {
    async createStats(userId: string): Promise<Stats> {
        const stats: Omit<Stats, 'id'> = {
            userId
        } as Stats;

        return statsRepository.create(stats);
    }

    async getStatsByUserId(userId: string): Promise<Stats | null> {
        return statsRepository.findByUserId(userId);
    }
}

export default new StatsService();
