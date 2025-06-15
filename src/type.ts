export interface User {
  id: string;
  name: string;
  email: string;
  telegramId: bigint;
  chatId: bigint;
  isEnableNoti: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionData {
  activeMessageId: number;
  minValue: number;
  maxValue: number;
  isBounties: boolean;
  isProjects: boolean;
  skills: string[];
  location: string;
  hasSet: boolean;
  isEnableNoti: boolean;
}