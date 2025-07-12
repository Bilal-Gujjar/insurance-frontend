export interface RecommendationInput {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'Conservative' | 'Balanced' | 'Aggressive';
}

export interface RecommendationResult {
  planType: string;
  coverageAmount: number;
  termYears: number;
  details: string;
  monthlyPremium: number;
}
