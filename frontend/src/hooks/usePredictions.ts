import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { predictionService, type CreatePredictionDto } from '@services/predictionService';

export function useUserPredictions(address: string | null) {
  return useQuery({
    queryKey: ['predictions', 'user', address],
    queryFn: () => predictionService.getUserPredictions(address!),
    enabled: !!address,
  });
}

export function useEventPredictions(eventId: string | null) {
  return useQuery({
    queryKey: ['predictions', 'event', eventId],
    queryFn: () => predictionService.getEventPredictions(eventId!),
    enabled: !!eventId,
  });
}

export function useCreatePrediction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePredictionDto) => predictionService.createPrediction(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['predictions', 'user', variables.userAddress] });
      queryClient.invalidateQueries({ queryKey: ['predictions', 'event', variables.eventId] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'event', variables.eventId] });
    },
  });
}

