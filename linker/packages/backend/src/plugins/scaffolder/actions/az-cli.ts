import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { z } from 'zod';
import { execSync } from 'child_process';
import { setTimeout } from 'timers/promises';

export const azcliAction = () => {
  return createTemplateAction({
    id: 'cli:run',
    schema: {
      input: z.object({
        command: z.string().describe('The contents of the file'),
        cwd: z.string().optional().default(''),
      }),
    },

    async handler(ctx) {
      const stdout = await execSync(ctx.input.command, {
        cwd: ctx.workspacePath + '/' + (ctx.input.cwd || ''),
      });

      console.log('cli', ctx.input.command);
      console.log('stdout', stdout.toString('utf8'));
      ctx.output('stdout', stdout.toString('utf8'));
    },
  });
};
