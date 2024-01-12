import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { z } from 'zod';

export const azcliAction = () => {
  return createTemplateAction({
    id: 'azcli:run',
    schema: {
      input: z.object({
        command: z.array( z.string().describe('The contents of the file'))        
      }),
    },

    async handler(ctx) {
        console.log("azcliAction", ctx.input.command);
        
    },
  });
};