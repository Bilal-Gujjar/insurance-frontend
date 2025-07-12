export interface RecommendationInput {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'Conservative' | 'Balanced' | 'Aggressive';
}

export interface RecommendationResult {
  type: string;
  coverage: number;
  term: number;
  explanation: string;
  monthlyPremium: number;
}
