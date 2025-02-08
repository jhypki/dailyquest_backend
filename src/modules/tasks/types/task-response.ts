export interface TaskResponse {
    id: string;
    userId: string;
    description: string;
    title: string;
    category: string;
    status: string;
    negativeTask: boolean;
    createdAt: string;
    dueDate?: string;
    startDate?: string;
    rewards: Rewards;
}

interface Rewards {
    strength: number | null;
    intelligence: number | null;
    vitality: number | null;
    charisma: number | null;
    endurance: number | null;
    agility: number | null;
}
