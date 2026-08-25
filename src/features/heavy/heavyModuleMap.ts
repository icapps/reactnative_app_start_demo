import { type ComponentType, lazy } from 'react';

import type { HeavyLoadingStrategy } from './heavyLoadingStrategy';

const heavyModuleMap: Record<HeavyLoadingStrategy, () => ComponentType> = {
  eager: () => require('./HeavyModule').HeavyModule,
  lazy: () =>
    lazy(() =>
      import('./HeavyModule').then(({ HeavyModule }) => ({
        default: HeavyModule,
      })),
    ),
};

export function getHeavyModule(strategy: HeavyLoadingStrategy) {
  return heavyModuleMap[strategy]();
}
