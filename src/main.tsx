import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import NotFound from '@components/common/NotFound';

import './assets/styles/__root.css';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });

// 전역 쿼리 클라이언트 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
    },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
    // </StrictMode>,
  );
}
