import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, type Event, type CreateEventDto } from '@services/eventService';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => eventService.getEvents(),
    refetchInterval: 10000, // Оновлювати кожні 10 секунд
  });
}

export function useEvent(id: string | null) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getEvent(id!),
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data, apiKey }: { data: CreateEventDto; apiKey: string }) =>
      eventService.createEvent(data, apiKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

