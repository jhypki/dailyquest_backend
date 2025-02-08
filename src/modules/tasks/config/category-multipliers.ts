import { Category } from '@prisma/client';
import { RewardsMultipliers } from '../types/rewards-multipliers';

export const categoryMultipliers: Record<Category, RewardsMultipliers> = {
    [Category.personal_development]: {
        strength: 1.5,
        intelligence: 1.5,
        charisma: 1.5,
        agility: 1.5,
        endurance: 1.5,
        vitality: 1.5
    },
    [Category.physical]: {
        strength: 2,
        intelligence: 1,
        charisma: 1,
        agility: 2,
        endurance: 2,
        vitality: 2
    },
    [Category.creative]: {
        strength: 1,
        intelligence: 2,
        charisma: 2,
        agility: 1,
        endurance: 1,
        vitality: 1
    },
    [Category.social]: {
        strength: 1,
        intelligence: 1,
        charisma: 2,
        agility: 1,
        endurance: 1,
        vitality: 1
    },
    [Category.professional]: {
        strength: 1,
        intelligence: 2,
        charisma: 1,
        agility: 1,
        endurance: 1,
        vitality: 1
    },
    [Category.mental]: {
        strength: 1,
        intelligence: 2,
        charisma: 1,
        agility: 1,
        endurance: 1,
        vitality: 1
    }
};
