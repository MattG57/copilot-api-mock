import { generateStatefulMetrics } from './runSeatsGenerator';

// To simulate repeated calls for stateful generation
for (let i = 0; i < 3; i++) {
  const repeatedStatefulData = generateStatefulMetrics();
  console.log(`Stateful Data Iteration ${i + 1}:`, JSON.stringify(repeatedStatefulData.seats[0].last_activity_at, null, 2));
}
