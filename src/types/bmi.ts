export interface BmiInput {
  weightKg: number
  heightCm: number
}

export type BmiCategory =
  | 'Underweight'
  | 'Normal weight'
  | 'Overweight'
  | 'Obesity'

export interface BmiResult {
  value: number
  category: BmiCategory
}
