import { APP_START_CONFIG } from '@/config/appStart';
import { storage } from '@/shared/utils/storage';

export type HeavyLoadingStrategy = 'eager' | 'lazy';

const STRATEGY_KEY = 'heavyLoadingStrategy';
const DEFAULT_STRATEGY: HeavyLoadingStrategy =
  APP_START_CONFIG.moduleEvaluation.heavy.defaultStrategy;

function isHeavyLoadingStrategy(
  value: string | undefined,
): value is HeavyLoadingStrategy {
  return value === 'eager' || value === 'lazy';
}

export function getHeavyLoadingStrategy(): HeavyLoadingStrategy {
  try {
    const strategy = storage.getString(STRATEGY_KEY);
    return isHeavyLoadingStrategy(strategy) ? strategy : DEFAULT_STRATEGY;
  } catch {
    return DEFAULT_STRATEGY;
  }
}

export function setHeavyLoadingStrategy(strategy: HeavyLoadingStrategy) {
  storage.set(STRATEGY_KEY, strategy);
}

export const INITIAL_HEAVY_LOADING_STRATEGY = getHeavyLoadingStrategy();
