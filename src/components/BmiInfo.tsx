const bmiCategories = [
  { label: 'Underweight', range: 'BMI below 18.5', className: 'under' },
  { label: 'Normal', range: 'BMI 18.5 to 24.9', className: 'normal' },
  { label: 'Overweight', range: 'BMI 25 to 29.9', className: 'over' },
  { label: 'Obese', range: 'BMI 30 and above', className: 'obese' }
]

function BmiInfo() {
  return (
    <>
      <h2>BMI Information</h2>
      <p className='info-desc'>
        BMI is a quick screening tool used to estimate body weight relative to height.
        It helps show whether a person may be underweight, normal weight, overweight,
        or obese.
      </p>

      <div className='info-list'>
        {bmiCategories.map((item) => (
          <div key={item.label} className='info-item'>
            <span className={`badge ${item.className}`}>{item.label}</span>
            <span className='info-range'>{item.range}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default BmiInfo
