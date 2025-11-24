import { useQuery } from '@tanstack/react-query';
import { statsService } from '@services/statsService';

export function useEventStats(eventId: string | null) {
  return useQuery({
    queryKey: ['stats', 'event', eventId],
    queryFn: () => statsService.getEventStats(eventId!),
    enabled: !!eventId,
    refetchInterval: 5000, // Оновлювати кожні 5 секунд
  });
}

export function useUserStats(address: string | null) {
  return useQuery({
    queryKey: ['stats', 'user', address],
    queryFn: () => statsService.getUserStats(address!),
    enabled: !!address,
  });
}

