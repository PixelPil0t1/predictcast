import { apiClient } from './apiClient';

export interface Prediction {
  id?: number;
  eventId: string;
  userAddress: string;
  selectedOption: string;
  predictedAt: number;
  title?: string;
  isActive?: boolean;
  finalResult?: string;
  closesAt?: number;
}

export interface CreatePredictionDto {
  eventId: string;
  userAddress: string;
  selectedOption: string;
}

export const predictionService = {
  async createPrediction(data: CreatePredictionDto): Promise<Prediction> {
    return apiClient.post<Prediction>('/predictions', data);
  },

  async getUserPredictions(address: string): Promise<Prediction[]> {
    return apiClient.get<Prediction[]>(`/predictions/user/${address}`);
  },

  async getEventPredictions(eventId: string): Promise<Prediction[]> {
    return apiClient.get<Prediction[]>(`/predictions/event/${eventId}`);
  },
};

