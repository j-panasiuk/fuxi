/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import Card from '../Card/Card'

function Test({ dictionary, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = React.useState(dictionary.shift())
  const [remainingQuestions, setRemainingQuestions] = React.useState(dictionary)
  const hasMoreQuestions = remainingQuestions.length > 0

  const nextQuestion = () => {
    if (hasMoreQuestions) {
      const next = remainingQuestions.shift()
      setCurrentQuestion(next)
      setRemainingQuestions(remainingQuestions)
    } else {
      onFinish()
    }
  }

  return (
    <div css={cssList}>
      <Card {...currentQuestion} />
      <div css={cssActions}>
        <button css={cssButton} onClick={nextQuestion}>
          Correct
        </button>
        <button css={cssButton} onClick={nextQuestion}>
          Incorrect
        </button>
      </div>
    </div>
  )
}

const cssList = css`
  padding: 0.5rem;
`
const cssActions = css`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
`
const cssButton = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  font-size: 1rem;
  font-weight: 900;
  color: white;
  background: lightgrey;
  border: none;
  outline: none;
  box-shadow: none;
  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`

export default Test
