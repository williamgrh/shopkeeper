export function calculateGrowthStatistic(
  baseValue: number,
  growthStatistic: number,
  championLevel: number
): number {
  const b = baseValue;
  const g = growthStatistic;
  const n = championLevel;
  return b + g * (n - 1) * (0.7025 + 0.0175 * (n - 1));
}
