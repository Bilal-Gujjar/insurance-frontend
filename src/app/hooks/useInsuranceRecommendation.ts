import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RecommendationResult, RecommendationInput } from '../utils/calculateRecommendation';
import { getRecommendation } from '../services/recommendationService';

export function useInsuranceRecommendation() {
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [showHighEarnerInput, setShowHighEarnerInput] = useState(false);

  const validationSchema = Yup.object({
    age: Yup.number()
      .min(18, 'Must be at least 18 years old')
      .max(80, 'Maximum age is 80')
      .required('Age is required'),
    income: Yup.number()
      .min(20000, 'Minimum income is $20,000')
      .required('Income is required'),
    dependents: Yup.number()
      .min(0, 'Cannot be negative')
      .max(10, 'Maximum 10 dependents')
      .required('Dependents is required'),
    riskTolerance: Yup.mixed<'Conservative' | 'Balanced' | 'Aggressive'>()
      .oneOf(['Conservative', 'Balanced', 'Aggressive'], 'Invalid risk tolerance')
      .required('Risk tolerance is required'),
  });

  const formik = useFormik<RecommendationInput>({
    initialValues: {
      age: 30,
      income: 75000,
      dependents: 1,
      riskTolerance: 'Conservative',
    },
    validationSchema,
    onSubmit: async (values: RecommendationInput) => {
      try {
        const recommendation = await getRecommendation(values);
        console.log("API Response:", recommendation);
        setRecommendation(recommendation);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });

  const handleIncomeChange = (value: number) => {
    formik.setFieldValue('income', value);
    setShowHighEarnerInput(value >= 500000);
  };

  return {
    formik,
    recommendation,
    setRecommendation,
    showHighEarnerInput,
    setShowHighEarnerInput,
    handleIncomeChange,
  };
}
