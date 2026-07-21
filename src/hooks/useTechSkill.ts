import { useQuery } from '@tanstack/react-query';
import { getTechStackList } from '@services/iconService';

export const useTechStack = (builtYn: string) => {
  return useQuery({
    queryKey: ['tech-stack'],
    queryFn: () => getTechStackList(builtYn),
    staleTime: 1000 * 60 * 60,
  });
};
