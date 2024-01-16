import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { azureProvider } from '../../../../plugins/catalog-backend-module-azure-resource';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const azure = new azureProvider('production');
  builder.addEntityProvider(azure);

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();

  await env.scheduler.scheduleTask({
    id: 'run_azure_refresh',
    fn: async () => {
      await azure.run();
    },
    frequency: { seconds: 30 },
    timeout: { seconds: 60 },
  });

  return router;
}
