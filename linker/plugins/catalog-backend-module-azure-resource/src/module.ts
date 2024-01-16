import { Entity } from '@backstage/catalog-model';
import {
  EntityProvider,
  EntityProviderConnection,
} from '@backstage/plugin-catalog-node';
import {
  ANNOTATION_LOCATION,
  ANNOTATION_ORIGIN_LOCATION,
} from '@backstage/catalog-model';

const { execSync } = require('child_process');

/**
 * Provides entities from fictional frobs service.
 */
export class azureProvider implements EntityProvider {
  private readonly env: string;
  private connection?: EntityProviderConnection;

  /** [1] */
  constructor(env: string) {
    this.env = env;
  }

  /** [2] */
  getProviderName(): string {
    return `azure-resource`;
  }

  /** [3] */
  async connect(connection: EntityProviderConnection): Promise<void> {
    this.connection = connection;
  }

  /** [4] */
  async run(): Promise<void> {
    if (!this.connection) {
      throw new Error('Not initialized');
    }

    // Run shell command
    const output = await execSync(
      'az resource list --subscription=38326ad4-514a-48cc-9d3a-3925ac8469a2 --resource-type=Microsoft.ContainerService/managedClusters',
    );
    const result = JSON.parse(output);

    const entities: Entity[] = result.map((item: any) => {
      return {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'Resource',
        metadata: {
          name: item.name,
          annotations: {
            [ANNOTATION_LOCATION]: `id:${item.id}`,
            [ANNOTATION_ORIGIN_LOCATION]: `id:${item.id}`,
          },
          links: [
            {
              title: 'Azure Portal',
              url: `https://portal.azure.com/#@linkervision.com/resource${item.id}`,
            },
          ],
        },
        spec: {
          type: 'k8s',
          owner: 'guests',
          config: item,
        },
      };
    });

    /** [6] */
    await this.connection.applyMutation({
      type: 'full',
      entities: entities.map(entity => ({
        entity,
      })),
    });
  }
}
