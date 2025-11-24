import { apiClient } from './apiClient';

export interface Event {
  id: string;
  title: string;
  description?: string;
  options: string[];
  creatorAddress: string;
  createdAt: number;
  closesAt: number;
  finalResult?: string;
  isActive: boolean;
  category: string;
}

export interface CreateEventDto {
  title: string;
  description?: string;
  options: string[];
  closesAt: number;
  creatorAddress: string;
  category?: string;
}

export const eventService = {
  async getEvents(): Promise<Event[]> {
    return apiClient.get<Event[]>('/events');
  },

  async getEvent(id: string): Promise<Event> {
    return apiClient.get<Event>(`/events/${id}`);
  },

  async createEvent(data: CreateEventDto, apiKey: string): Promise<Event> {
    apiClient.setApiKey(apiKey);
    const result = await apiClient.post<Event>('/events', data);
    apiClient.setApiKey('');
    return result;
  },

  async resolveEvent(id: string, result: string, apiKey: string): Promise<void> {
    apiClient.setApiKey(apiKey);
    await apiClient.post(`/events/${id}/resolve`, { result });
    apiClient.setApiKey('');
  },
};

