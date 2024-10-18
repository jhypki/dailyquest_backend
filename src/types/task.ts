import { User } from "./user";
import { Category } from "../enums";
import { TaskStatus } from "../enums";

export interface Task {
  id: string;
  user: User;
  userId: string;
  description: string;
  title: string;
  category: Category;
  negativeTask: boolean;
  experiencePoints: number;
  goldReward: number;
  startDate: Date;
  dueDate: Date;
  createdAt: Date;
  status: TaskStatus;
  strengthReward?: number;
  intelligenceReward?: number;
  vitalityReward?: number;
  charismaReward?: number;
  enduranceReward?: number;
  dexterityReward?: number;
}
