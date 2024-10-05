interface BmiResultProps {
  bmi: number | null;
  category: string;
}

function BmiResult({ bmi, category }: BmiResultProps) {
  return (
    <div>
      <h2>Your BMI is {bmi}</h2>
      <h2>You are {category}</h2>
    </div>
  );
}

export default BmiResult;