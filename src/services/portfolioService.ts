import { supabase } from '@lib/supabaseClient';

export interface Portfolio {
  id: number;
  proj_name: string;
  start_date: string;
  end_date: string;
  project_details: { description: string } | null;
  project_skills: { id: number; skill_name: string }[];
  project_images: { id: number; image_url: string }[];
  project_roles: { id: number; role_name: string }[];
}

export const getPortfolioList = async (limit?: number): Promise<Portfolio[]> => {
  let query = supabase
    .from('projects')
    .select(
      `
            id,
            proj_name,
            start_date,
            end_date,
            project_details ( description ),
            project_skills ( id, skill_name ),
            project_images ( id, image_url )
        `
    )
    .order('id', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data as unknown as Portfolio[];
};

export const getPortfolioGallery = async (limit: number = 0): Promise<Portfolio[]> => {
  let query = supabase
    .from('projects')
    .select(
      `
            id,
            proj_name,
            start_date,
            end_date,
            project_images ( id, image_url )
        `
    )
    .order('id', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as unknown as Portfolio[];
};

export const getPortfolioDetail = async (id: string | number): Promise<Portfolio> => {
  const { data, error } = await supabase
    .from('projects')
    .select(
      `
            id,
            proj_name,
            start_date,
            end_date,
            project_details ( description ),
            project_skills ( id, skill_name ),
            project_images ( id, image_url ),
            project_roles ( id, role_name )
        `
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as unknown as Portfolio;
};
