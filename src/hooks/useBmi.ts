import { useState } from "react";
import { calculateBmi } from "../utils/bmiCalculator";
import type { BmiInput, BmiResult } from "../types/bmi";

export function useBmi() {
  const [result, setResult] = useState(null as BmiResult | null);

  function calculate(input: BmiInput) {
    const bmiResult = calculateBmi(input);
    setResult(bmiResult);
  }

  function reset() {
    setResult(null);
  }

  return {
    result,
    calculate,
    reset,
  };
}