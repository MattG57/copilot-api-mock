import { describe, it, expect, beforeEach } from 'vitest';
import { MockSeatsGenerator } from '../mockSeatsGenerator';
import type { SeatsMockConfig } from '../types';
import seatsExample from '../seatsExample.json';

describe('MockSeatsGenerator', () => {
  let mockConfig: SeatsMockConfig;
  let generator: MockSeatsGenerator;
  const templateData: any = seatsExample;

  beforeEach(() => {
    mockConfig = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      usagePattern: 'moderate',
      heavyUsers: ['nathos', 'arfon', 'kyanny'],
      editors: [
        'copilot-chat-platform',
        'vscode/1.96.2/copilot/1.254.0',
        'GitHubGhostPilot/1.0.0/unknown',
        'vscode/1.96.2/',
        'vscode/1.97.0-insider/copilot-chat/0.24.2024122001'
      ]
    };
    
    generator = new MockSeatsGenerator(mockConfig, templateData);
  });

  it('should generate metrics with correct structure', () => {
    const metrics = generator.generateMetrics();
    expect(metrics).toHaveProperty('seats');
    expect(Array.isArray(metrics.seats)).toBe(true);
  });

  it('should update last_activity_at for each seat', () => {
    const metrics = generator.generateMetrics();
    metrics.seats.forEach((seat: any) => {
      expect(seat).toHaveProperty('last_activity_at');
    });
  });

  it('should handle stateful behavior correctly', () => {
    const firstRun = generator.generateMetrics();
    const generator2 = new MockSeatsGenerator(mockConfig, firstRun);
    const secondRun = generator2.generateMetrics();

    firstRun.seats.forEach((seat: any, index: number) => {
      expect(seat.last_activity_at).not.toBe(secondRun.seats[index].last_activity_at);
    });
  });

  it('should handle stateless behavior correctly', () => {
    const firstRun = generator.generateMetrics();
    const newGenerator = new MockSeatsGenerator(mockConfig, templateData);
    const secondRun = newGenerator.generateMetrics();

    firstRun.seats.forEach((seat: any, index: number) => {
      expect(seat.last_activity_at).toStrictEqual(secondRun.seats[index].last_activity_at);
    });
  });
});
