import React, { useEffect, useState } from 'react'
import { calculateBmi } from '../utils/bmiCalculator'
import BmiHistory, { type BmiHistoryEntry } from './BmiHistory'
import BmiInfo from './BmiInfo'
import BmiResult from './BmiResult'

const STORAGE_KEY = 'bmi-calculator-history'

const validateWeightInput = (value: string) => {
  if (value.trim() === '') {
    return 'Please enter a valid weight.'
  }

  const weightValue = Number(value)

  if (!Number.isFinite(weightValue) || weightValue <= 0 || weightValue > 200) {
    return 'Weight must be between 1 kg and 200 kg.'
  }

  return ''
}

const validateHeightInput = (value: string) => {
  if (value.trim() === '') {
    return 'Please enter a valid height.'
  }

  const heightValue = Number(value)

  if (!Number.isFinite(heightValue) || heightValue <= 0 || heightValue > 272) {
    return 'Height must be between 45 cm and 272 cm.'
  }

  return ''
}

function BmiForm() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [weightError, setWeightError] = useState('')
  const [heightError, setHeightError] = useState('')
  const [history, setHistory] = useState<BmiHistoryEntry[]>([])

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY)

      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory) as BmiHistoryEntry[]

        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory)
        }
      }
    } catch (error) {
      console.error('Unable to load saved BMI history:', error)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const resetForm = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
    setCategory('')
    setWeightError('')
    setHeightError('')
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nextWeightError = validateWeightInput(weight)
    const nextHeightError = validateHeightInput(height)

    setWeightError(nextWeightError)
    setHeightError(nextHeightError)

    if (nextWeightError || nextHeightError) {
      return
    }

    const weightValue = Number(weight)
    const heightValue = Number(height)

    const result = calculateBmi({
      weightKg: weightValue,
      heightCm: heightValue
    })

    setBmi(result.value)
    setCategory(result.category)

    const newEntry: BmiHistoryEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      weight: weightValue,
      height: heightValue,
      bmi: result.value,
      category: result.category
    }

    setHistory((previousHistory) => [newEntry, ...previousHistory])
  }

  return (
    <>
      <div className='aurora-bg'>
        <div className='glow glow-1' />
        <div className='glow glow-2' />
        <div className='glow glow-3' />
        <div className='glow glow-4' />
      </div>

      <div className='app-container'>
        <div className='top-row'>
          <div className='glass-card'>
            <h2>BMI Calculator</h2>

            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Weight (kg)</label>
                <input
                  value={weight}
                  onChange={(e) => {
                    const nextValue = e.target.value
                    setWeight(nextValue)
                    setWeightError(validateWeightInput(nextValue))
                  }}
                  type='number'
                  min='1'
                  max='200'
                  step='0.1'
                  placeholder='e.g. 68.5'
                  className='form-input'
                />
                {weightError && <p className='mt-2 text-sm text-red-400'>{weightError}</p>}
              </div>

              <div className='form-group'>
                <label>Height (cm)</label>
                <input
                  value={height}
                  onChange={(e) => {
                    const nextValue = e.target.value
                    setHeight(nextValue)
                    setHeightError(validateHeightInput(nextValue))
                  }}
                  type='number'
                  min='45'
                  max='272'
                  step='1'
                  placeholder='e.g. 170'
                  className='form-input'
                />
                {heightError && <p className='mt-2 text-sm text-red-400'>{heightError}</p>}
              </div>

              <button type='submit' className='btn-primary'>Calculate</button>
              <button type='button' className='btn-secondary' onClick={resetForm}>Reset</button>

              <BmiResult bmi={bmi} category={category} />
            </form>
          </div>

          <div className='glass-card'>
            <BmiInfo />
          </div>
        </div>

        <div className='glass-card'>
          <BmiHistory history={history} onClearHistory={clearHistory} />
        </div>
      </div>
    </>
  )
}

export default BmiForm