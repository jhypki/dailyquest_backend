import { User } from "./user";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: string;
  rewardExp: number;
  rewardGold: number;
  user: User;
  userId: string;
}
