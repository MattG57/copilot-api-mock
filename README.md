# Copilot API Mock Generator

A sophisticated mock data generator for Copilot usage metrics, designed to create realistic, trend-based data for testing and development purposes.

## Features

- Generate mock Copilot usage metrics with configurable trends
- Support for multiple data patterns:
  - Growing trends
  - Stable trends with configurable volatility
  - Fixed values
  - Declining trends
- Configurable update frequencies (daily, weekly, monthly)
- Maintains data consistency across related metrics
- Supports custom models and training dates
- Configurable ranges for all numeric values

## Installation

```bash
# Create a new directory and initialize
mkdir copilot-api-mock
cd copilot-api-mock

# Initialize npm project
npm init -y

# Install dependencies
npm install --save-dev typescript ts-node date-fns @types/node vitest
```

## Project Structure

```
copilot-api-mock/
├── src/
│   ├── types.ts           # TypeScript interfaces and types
│   ├── mockGenerator.ts   # Main mock generator implementation
│   ├── runMock.ts         # Script to run the mock generator
│   ├── runExampleMock.ts  # Example configuration for the mock generator
│   └── run.ts             # Example runner script
├── tsconfig.json
└── package.json
```

## Usage

### Basic Example

```typescript
import { SophisticatedMockGenerator } from './mockGenerator';
import type { MockConfig } from './types';

const config: MockConfig = {
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  updateFrequency: 'daily',
  metrics: {
    total_active_users: {
      baseValue: 24,
      range: { min: 20, max: 28 },
      trend: 'grow',
      growthRate: 0.02
    },
    // ... other metrics
  },
  models: [
    { name: 'default', is_custom_model: false, custom_model_training_date: null }
  ],
  languages: ['python', 'ruby'],
  editors: ['vscode'],
  repositories: ['demo/repo1']
};

const mockGenerator = new SophisticatedMockGenerator(config);
const metrics = mockGenerator.generateMetrics();
console.log(JSON.stringify(metrics, null, 2));
```

### Running the Mock Generator

You can run the mock generator and output the results to a JSON file using the following command:

```bash
npx ts-node src/runMock.ts > output.json
```

### Configuring Trends

The generator supports four types of trends:

1. `grow` - Values increase over time
```typescript
{
  trend: 'grow',
  growthRate: 0.02, // 2% growth per period
  range: { min: 20, max: 28 } // Upper bound enforced
}
```

2. `stable` - Values fluctuate within a range
```typescript
{
  trend: 'stable',
  volatility: 0.15, // 15% maximum variation
  range: { min: 17, max: 23 }
}
```

3. `fixed` - Values remain constant
```typescript
{
  trend: 'fixed',
  baseValue: 100,
  range: { min: 100, max: 100 }
}
```

4. `decline` - Values decrease over time
```typescript
{
  trend: 'decline',
  growthRate: 0.05, // 5% decline per period
  range: { min: 10, max: 20 } // Lower bound enforced
}
```

### Running the Project

```bash
# Run the example generator
npm run start

# Build the project
npm run build
```

### Vitest Integration

To run tests using Vitest, you can use the following command:

```bash
npx vitest
```

## Output Data Structure

The generator produces data in the following structure:

```typescript
{
  date: "2024-01-01",
  total_active_users: number,
  total_engaged_users: number,
  copilot_ide_code_completions: {
    total_engaged_users: number,
    languages: Array<{
      name: string,
      total_engaged_users: number
    }>,
    editors: Array<{
      name: string,
      total_engaged_users: number,
      models: Array<{
        name: string,
        is_custom_model: boolean,
        custom_model_training_date: string | null,
        languages: Array<{
          name: string,
          total_engaged_users: number,
          total_code_suggestions: number,
          total_code_acceptances: number,
          total_code_lines_suggested: number,
          total_code_lines_accepted: number
        }>
      }>
    }>
  },
  copilot_ide_chat: {
    // ... chat metrics
  },
  copilot_dotcom_chat: {
    // ... GitHub.com chat metrics
  },
  copilot_dotcom_pull_requests: {
    // ... pull request metrics
  }
}
```

## Development

To add new metrics or modify existing ones:

1. Update the types in `types.ts`
2. Add corresponding logic in `mockGenerator.ts`
3. Update the configuration in your runner script

### `runMock.ts`

This script runs the mock generator for a month with a default configuration and outputs the generated metrics.

### `runExampleMock.ts`

This script provides an example configuration for the mock generator, which can be used to generate an example metrics payload response for one day and compare it to an example.json.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
