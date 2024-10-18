import { User } from "./";

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  rewardGold: number;
  rewardExp: number;
  User?: User;
  userId?: string;
}
