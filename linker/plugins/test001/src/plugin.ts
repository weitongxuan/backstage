import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const test001Plugin = createPlugin({
  id: 'test001',
  routes: {
    root: rootRouteRef,
  },
});

export const Test001Page = test001Plugin.provide(
  createRoutableExtension({
    name: 'Test001Page',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
