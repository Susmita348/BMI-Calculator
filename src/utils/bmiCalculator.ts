import type { BmiCategory, BmiInput, BmiResult } from "../types/bmi";

export function calculateBmi({ weightKg, heightCm }: BmiInput): BmiResult {
  const heightM = heightCm / 100;

const BMI = Math.round(weightKg / (heightM * heightM));

  let category: BmiCategory;

  if (BMI < 18.5) {
    category = "Underweight";
  } else if (BMI < 25) {
    category = "Normal weight";
  } else if (BMI < 30) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  return {
    value: BMI,
    category,
  };
}