import { Campaign, HealthScoreConfig, Metric } from '@/types';

const DEFAULT_CONFIG: HealthScoreConfig = {
  metricWeights: {
    ctr: 0.2,
    conversion_rate: 0.3,
    roas: 0.3,
    impressions: 0.1,
    clicks: 0.1,
  },
  thresholds: {
    excellent: 80,
    good: 60,
    fair: 40,
    poor: 0,
  },
};

// Normalize metric value to 0-100 scale
function normalizeMetric(metricName: string, value: number): number {
  // These are example thresholds - should be configurable per campaign/platform
  const thresholds: { [key: string]: { min: number; max: number } } = {
    ctr: { min: 0, max: 10 }, // 0-10% CTR
    conversion_rate: { min: 0, max: 5 }, // 0-5% conversion rate
    roas: { min: 0, max: 5 }, // 0-5x ROAS
    impressions: { min: 0, max: 100000 },
    clicks: { min: 0, max: 10000 },
  };

  const threshold = thresholds[metricName.toLowerCase()] || { min: 0, max: 100 };
  const normalized = Math.max(0, Math.min(100, 
    ((value - threshold.min) / (threshold.max - threshold.min)) * 100
  ));
  
  return normalized;
}

export function calculateHealthScore(
  metrics: { [key: string]: number },
  config: HealthScoreConfig = DEFAULT_CONFIG
): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const [metricName, weight] of Object.entries(config.metricWeights)) {
    if (metrics[metricName] !== undefined) {
      const normalized = normalizeMetric(metricName, metrics[metricName]);
      totalScore += normalized * weight;
      totalWeight += weight;
    }
  }

  // If no weights match, return 50 as neutral
  if (totalWeight === 0) return 50;

  return Math.round(totalScore / totalWeight);
}

export function getHealthScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
}

