import { Category } from '@prisma/client';
import { categoryMultipliers } from '../config/category-multipliers';
import { Rewards } from '../types/rewards';

export const calculateRewards = (category: Category, difficulty: number): Rewards => {
    const baseReward = 100;
    const categoryMultiplier = categoryMultipliers[category];

    return {
        strengthReward: baseReward * categoryMultiplier.strength * difficulty,
        intelligenceReward: baseReward * categoryMultiplier.intelligence * difficulty,
        charismaReward: baseReward * categoryMultiplier.charisma * difficulty,
        agilityReward: baseReward * categoryMultiplier.agility * difficulty,
        enduranceReward: baseReward * categoryMultiplier.endurance * difficulty,
        vitalityReward: baseReward * categoryMultiplier.vitality * difficulty
    };
};
