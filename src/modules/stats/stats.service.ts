import statsRepository from './stats.repository';
import { Stats } from '@prisma/client';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { validateUpdateStatsData } from './validators/validate-update-stats-data';

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

        const {
            strength = 0,
            intelligence = 0,
            dexterity = 0,
            vitality = 0,
            charisma = 0,
            endurance = 0
        } = statsToUpdate;

        const stats = {
            id: currentStats.id,
            strength: currentStats.strength + strength,
            dexterity: currentStats.dexterity + dexterity,
            intelligence: currentStats.intelligence + intelligence,
            vitality: currentStats.vitality + vitality,
            charisma: currentStats.charisma + charisma,
            endurance: currentStats.endurance + endurance,
            lastUpdated: new Date(),
            userId: userId
        };

        return statsRepository.updateByUserId(userId, stats);
    }
}

export default new StatsService();
