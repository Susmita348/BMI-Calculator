import React, { useState } from 'react'
import { calculateBmi } from '../utils/bmiCalculator'
import BmiResult from './BmiResult'

function BmiForm() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState("")

  const [weightError, setWeightError] = useState("")
  const [heightError, setHeightError] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const weightValue = Number(weight)
    const heightValue = Number(height)

    if (weightValue < 1 || weightValue > 200) {
      setWeightError("Weight must be between 1 kg and 200 kg")
      return
    }

    if (heightValue < 45 || heightValue > 272) {
      setHeightError("Height must be between 45 cm and 272 cm")
      return
    }

    setWeightError("")
    setHeightError("")

    const result = calculateBmi({
      weightKg: weightValue,
      heightCm: heightValue
    })

    setBmi(result.value)
    setCategory(result.category)
  }

  return (
    <>
      <div className='flex h-screen flex-col items-left justify-center bg-[#04041a] px-4 sm:px-36'>

        <div className="w-90 max-w-md rounded-lg bg-white mt-2 p-0 shadow-md">

          <h2 className='font-bold text-center mt-5'>BMI Calculator</h2>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-right bg-white p-10 rounded-md shadow-md'
          >

            <label>Enter your weight in kg:</label>

            <input
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value)

                const value = Number(e.target.value)

                if (value < 1 || value > 200) {
                  setWeightError("Weight must be between 1 kg and 200 kg")
                } else {
                  setWeightError("")
                }
              }}
              type="number"
              min="1"
              max="200"
              step="0.1"
              className='border-1 border-grey rounded-md p-1 m-2'
            />

            {weightError && (
              <p className='text-red-500 text-sm'>
                {weightError}
              </p>
            )}

            <label>Enter your height in cm:</label>

            <input
              value={height}
              onChange={(e) => {
                setHeight(e.target.value)

                const value = Number(e.target.value)

                if (value < 45 || value > 272) {
                  setHeightError("Height must be between 45 cm and 272 cm")
                } else {
                  setHeightError("")
                }
              }}
              type="number"
              min="45"
              max="272"
              step="1"
              className='border-1 border-grey rounded-md p-1 m-2'
            />

            {heightError && (
              <p className='text-red-500 text-sm'>
                {heightError}
              </p>
            )}

            <button
              type='submit'
              className='bg-blue-800 text-white rounded-md p-2 m-2'
            >
              Calculate
            </button>

            <button
              type='button'
              onClick={() => {
                setWeight("")
                setHeight("")
                setBmi(null)
                setCategory("")
                setWeightError("")
                setHeightError("")
              }}
              className='bg-gray-200 text-black rounded-md p-2 m-2'
            >
              Reset
            </button>

            <div className='flex flex-col items-center justify-center mt-4'>
              <BmiResult bmi={bmi} category={category} />
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default BmiForm