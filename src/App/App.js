/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import Test from '../Test/Test'
import dictionary from '../dictionary.json'

const STORAGE_STEP = 'fuxi-step'

function App() {
  const initialStep = sessionStorage.getItem(STORAGE_STEP) || 0
  const [step, setStep] = React.useState(initialStep)
  const next = () => {
    const nextStep = step + 1
    setStep(nextStep)
    sessionStorage.setItem(STORAGE_STEP, nextStep)
  }
  const restart = () => {
    setStep(0)
    sessionStorage.removeItem(STORAGE_STEP)
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
      {step === 2 && <div css={cssFinished}>Test completed :)</div>}
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
  min-height: 5rem;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  background: indigo;
  border: none;
  outline: none;
  box-shadow: none;
`
const cssFinished = css`
  min-height: 5rem;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 900;
`

export default App
