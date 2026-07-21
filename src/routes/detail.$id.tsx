import { createFileRoute } from '@tanstack/react-router';

import Detail from '@components/portfolio/Detail';

export const Route = createFileRoute('/detail/$id')({
  component: DetailRoute,
});

function DetailRoute() {
  const { id } = Route.useParams();

  return <Detail id={id} />;
}
