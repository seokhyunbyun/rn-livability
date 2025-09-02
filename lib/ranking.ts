// lib/ranking.ts
import type { Neighborhood } from './types';

export type Weights = { safety: number; transit: number; grocery: number };

function normalize(w: Weights): Weights {
  const sum = w.safety + w.transit + w.grocery;
  if (sum <= 0) return { safety: 1/3, transit: 1/3, grocery: 1/3 };
  return { safety: w.safety / sum, transit: w.transit / sum, grocery: w.grocery / sum };
}

export function score(n: Neighborhood, w: Weights) {
  const wn = normalize(w);
  // 점수는 0~100 범위 가정
  return (
    n.safetyScore * wn.safety +
    n.transitScore * wn.transit +
    n.groceryScore * wn.grocery
  );
}

export function rank(
  items: Neighborhood[],
  w: Weights,
  maxRent?: number
) {
  const filtered = typeof maxRent === 'number' && maxRent > 0
    ? items.filter((n) => n.avgRent <= maxRent)
    : items;

  return filtered
    .map((n) => ({ item: n, score: score(n, w) }))
    .sort((a, b) => b.score - a.score);
}
