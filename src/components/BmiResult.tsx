interface BmiResultProps {
  bmi: number | null
  category: string
}

function BmiResult({ bmi, category }: BmiResultProps) {
  if (bmi === null) {
    return (
      <div className='result-box'>
        <div className='result-label'>Your BMI is</div>
        <div className='result-value'>--</div>
        <div className='result-status'>Waiting for input</div>
      </div>
    )
  }

  return (
    <div className='result-box'>
      <div className='result-label'>Your BMI is</div>
      <div className='result-value'>{bmi}</div>
      <div className='result-status'>{category}</div>
    </div>
  )
}

export default BmiResult