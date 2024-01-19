import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { test001Plugin, Test001Page } from '../src/plugin';

createDevApp()
  .registerPlugin(test001Plugin)
  .addPage({
    element: <Test001Page />,
    title: 'Root Page',
    path: '/test001'
  })
  .render();
