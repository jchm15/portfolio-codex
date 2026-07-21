import { supabase } from '@lib/supabaseClient';

export interface TechStack {
  id: number;
  name: string;
  icon_key: string;
  color: string;
  sort_order: number;
}

export const getTechStackList = async (params: string): Promise<TechStack[]> => {
  const { data, error } = await supabase
    .from('tech_stack')
    .select(
      `
            id,
            name,
            icon_key,
            color,
            sort_order
        `
    )
    .eq('built_yn', params)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data as unknown as TechStack[];
};
