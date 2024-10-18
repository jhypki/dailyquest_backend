import { Task } from "./task";
import { Event } from "./event";
import { Stats } from "./stats";
import { Achievement } from "./achievement";

export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  tasks?: Task[];
  events?: Event[];
  stats?: Stats;
  achievements?: Achievement[];
  notifications?: Notification[];
  statsId: string;
}
