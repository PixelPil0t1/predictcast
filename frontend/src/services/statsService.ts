import { apiClient } from './apiClient';

export interface EventStats {
  total: number;
  breakdown: {
    option: string;
    count: number;
    percentage: number;
  }[];
}

export interface UserStats {
  totalPredictions: number;
  correctPredictions: number;
  resolvedEvents: number;
  accuracy: number;
}

export const statsService = {
  async getEventStats(eventId: string): Promise<EventStats> {
    return apiClient.get<EventStats>(`/stats/event/${eventId}`);
  },

  async getUserStats(address: string): Promise<UserStats> {
    return apiClient.get<UserStats>(`/stats/user/${address}`);
  },
};

