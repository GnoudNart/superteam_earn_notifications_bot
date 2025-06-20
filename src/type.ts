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



export interface NotificationData {
  id: string;
  rewardAmount: number | null;
  deadline: string;
  type: string;
  title: string;
  token: string;
  winnersAnnouncedAt: string | null;
  slug: string;
  isWinnersAnnounced: boolean;
  isFeatured: boolean;
  compensationType: string;
  minRewardAsk: number | null;
  maxRewardAsk: number | null;
  status: string;
  skills: string[];
  region: string;
  publishedAt: string;
  sponsorName: string;
}