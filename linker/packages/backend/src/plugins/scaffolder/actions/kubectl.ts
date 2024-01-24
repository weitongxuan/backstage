import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { z } from 'zod';
import { execSync } from 'child_process';

export const kubectlAction = () => {
  return createTemplateAction({
    id: 'kubectl:create:ns',
    schema: {
      input: z.object({
        k8sName: z.string().describe('Kubernetes name'),
        name: z.string().describe('Namespace name'),
      }),
    },

    async handler(ctx) {
      await execSync(
        `az aks get-credentials --resource-group rg-devops-dev-001 --name ${ctx.input.k8sName} -f current.yaml`,
      );

      await execSync(
        `kubectl --kubeconfig current.yaml create ns ${ctx.input.name}`,
      );
    },
  });
};
