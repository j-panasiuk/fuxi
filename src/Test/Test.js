/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { QuestionCard, AnswerCard } from '../Card/Card'

const STORAGE_CORRECT = 'fuxi-correct'
const STORAGE_INCORRECT = 'fuxi-incorrect'

function Test({ dictionary, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = React.useState(dictionary.shift())
  const [remainingQuestions, setRemainingQuestions] = React.useState(dictionary)
  const [hasRevealedAnswer, setHasRevealedAnswer] = React.useState(false)
  const hasMoreQuestions = remainingQuestions.length > 0

  const nextQuestion = () => {
    setHasRevealedAnswer(false)
    if (hasMoreQuestions) {
      const next = remainingQuestions.shift()
      setCurrentQuestion(next)
      setRemainingQuestions(remainingQuestions)
    } else {
      onFinish()
    }
  }

  const reveal = () => {
    setHasRevealedAnswer(true)
  }

  const answer = correct => {
    if (correct === true) {
      const correctSoFar = sessionStorage.getItem(STORAGE_CORRECT) || 0
      sessionStorage.setItem(STORAGE_CORRECT, Number(correctSoFar) + 1)
    } else {
      const incorrectSoFar = sessionStorage.getItem(STORAGE_INCORRECT) || 0
      sessionStorage.setItem(STORAGE_INCORRECT, Number(incorrectSoFar) + 1)
    }

    nextQuestion()
  }

  return (
    <div css={cssList}>
      {hasRevealedAnswer ? (
        <AnswerCard entry={currentQuestion} onAnswer={answer} />
      ) : (
        <QuestionCard entry={currentQuestion} onReveal={reveal} />
      )}
    </div>
  )
}

const cssList = css`
  padding: 0.5rem;
`

export default Test
