import { SiReact, SiTypescript, SiTailwindcss, SiSupabase, SiVuedotjs, SiSpring, SiJquery } from 'react-icons/si';
import { TbRoute, TbBrandAdobe, TbDatabase } from 'react-icons/tb';
import type { IconType } from 'react-icons';

export const iconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  'tanstack-router': TbRoute,
  'tanstack-query': TbRoute,
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
  vue: SiVuedotjs,
  aem: TbBrandAdobe,
  springboot: SiSpring,
  jpa: TbDatabase,
  mybatis: TbDatabase,
  jquery: SiJquery,
};
