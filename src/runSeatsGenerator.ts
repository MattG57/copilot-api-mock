import { MockSeatsGenerator as MockSeatsGenerator } from './mockSeatsGenerator';
import { SeatsMockConfig } from './types';
import seatsExample from './seatsExample.json';
import * as fs from 'fs';
import * as path from 'path';

const mockConfig: SeatsMockConfig = {
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  usagePattern: 'heavy',
  heavyUsers: ['nathos', 'arfon', 'kyanny'],
  editors: [
    'copilot-chat-platform',
    'vscode/1.96.2/copilot/1.254.0',
    'GitHubGhostPilot/1.0.0/unknown',
    'vscode/1.96.2/',
    'vscode/1.97.0-insider/copilot-chat/0.24.2024122001'
  ]
};

// Load template data from seatsExample.json
const templateData: any = seatsExample;

let staticTemplateData: any = null;

export function generateStatelessMetrics() {
  const generator = new MockSeatsGenerator(mockConfig, templateData);
  return generator.generateMetrics();
}

export function generateStatefulMetrics() {
  if (!staticTemplateData) {
    staticTemplateData = templateData;
  }
  const generator = new MockSeatsGenerator(mockConfig, staticTemplateData);
  const generatedData = generator.generateMetrics();
  staticTemplateData = generatedData;
  return generatedData;
}

// // Example usage
// const statelessData = generateStatelessMetrics();
// console.log("Stateless Data:", JSON.stringify(statelessData, null, 2));

// const statefulData = generateStatefulMetrics();
// console.log("Stateful Data:", JSON.stringify(statefulData, null, 2));

// // To simulate repeated calls for stateful generation
// for (let i = 0; i < 5; i++) {
//   const repeatedStatefulData = generateStatefulMetrics();
//   console.log(`Stateful Data Iteration ${i + 1}:`, JSON.stringify(repeatedStatefulData, null, 2));
// }

