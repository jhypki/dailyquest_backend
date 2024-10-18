import { User } from "./user";

export interface Stats {
  id: string;
  strength: number;
  intelligence: number;
  charisma: number;
  dexterity: number;
  endurance: number;
  vitality: number;
  experiencePoints: number;
  gold: number;
  lastUpdated: Date;
  User?: User[];
}
