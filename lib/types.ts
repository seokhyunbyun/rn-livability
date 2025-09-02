export type Neighborhood = {
    id: string;
    name: string;
    avgRent: number;        // 2BR 월세 대략치 (USD)
    safetyScore: number;    // 0~100
    transitScore: number;   // 0~100
    groceryScore: number;   // 0~100
  };