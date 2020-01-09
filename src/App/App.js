/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import Test from '../Test/Test'
import { buttonStyle } from '../Button/Button'
import dictionary from '../dictionary.json'

const STORAGE_STEP = 'fuxi-step'
const STORAGE_CORRECT = 'fuxi-correct'
const STORAGE_INCORRECT = 'fuxi-incorrect'

function App() {
  const initialStep = Number(sessionStorage.getItem(STORAGE_STEP)) || 0
  const correct = Number(sessionStorage.getItem(STORAGE_CORRECT)) || 0
  const incorrect = Number(sessionStorage.getItem(STORAGE_INCORRECT)) || 0

  const [step, setStep] = React.useState(initialStep)
  const next = () => {
    const nextStep = step + 1
    setStep(nextStep)
    sessionStorage.setItem(STORAGE_STEP, nextStep)
  }
  const restart = () => {
    setStep(0)
    sessionStorage.clear()
  }

  return (
    <div css={cssApp}>
      <header>
        <h1 css={cssHeader} onClick={restart}>
          复习
        </h1>
      </header>
      {step === 0 && (
        <button css={cssStartButton} onClick={next}>
          START
        </button>
      )}
      {step === 1 && <Test dictionary={dictionary} onFinish={next} />}
      {step === 2 && (
        <div css={cssFinished}>
          <div>Test completed :)</div>
          <h3>
            {correct} / {correct + incorrect}
          </h3>
        </div>
      )}
    </div>
  )
}

const cssApp = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const cssHeader = css`
  display: flex;
  flex: 0;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: #e8e8e8;
  color: #929292;
  height: 48px;
`
const cssStartButton = css`
  ${buttonStyle};
  background: indigo;
  color: white;
`
const cssFinished = css`
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 900;
`

export default App
