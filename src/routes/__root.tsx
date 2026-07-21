import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import ScrollToTop from '@components/common/ScrollToTop';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
      {/*<TanStackRouterDevtools />*/}
    </div>
  ),
});
