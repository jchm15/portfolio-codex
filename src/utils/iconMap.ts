import { SiReact, SiTypescript, SiTailwindcss, SiSupabase } from 'react-icons/si';
import { TbRoute } from 'react-icons/tb';
import type { IconType } from 'react-icons';

export const iconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  'tanstack-router': TbRoute,
  'tanstack-query': TbRoute,
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
};
