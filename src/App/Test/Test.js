/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { QuestionCard, AnswerCard } from '../Card/Card'
import { buttonStyle } from '../Button/Button'
import { createTest } from '../../Tests/createTest'

let cache = {
  history: [],
  testSettings: {},
  test: null,
}

export function Test() {
  const [test, setTest] = React.useState(cache.test)

  const start = () => {
    setTest(createTest())
  }
  const reveal = () => {
    setTest({
      ...test,
      isRevealingAnswer: true,
    })
  }
  const answer = correct => {
    const [current, ...remaining] = test.questions
    setTest({
      ...test,
      questions: remaining,
      answers: [...test.answers, { ...current, correct }],
      isRevealingAnswer: false,
    })
  }
  const finish = persist => {
    if (persist === true) {
      cache.history.push({
        date: new Date().getTime(),
        answers: test.answers,
      })
    }
    cache.test = null
    setTest(null)
  }

  if (!test) {
    // No test in progress. Create new one.
    return (
      <button css={cssStartButton} onClick={start}>
        START
      </button>
    )
  }

  if (test.questions.length > 0) {
    // Test in progress. Display current question.
    const currentQuestion = test.questions[0]
    return test.isRevealingAnswer ? (
      <AnswerCard entry={currentQuestion} onAnswer={answer} />
    ) : (
      <QuestionCard entry={currentQuestion} onReveal={reveal} />
    )
  }

  // No more questions to ask.
  // Count and display results.
  const correct = test.answers.filter(ans => ans.correct === true).length
  const incorrect = test.answers.filter(ans => ans.correct === false).length
  return (
    <div css={cssFinished}>
      <div>Test completed :)</div>
      <h3>
        {correct} / {correct + incorrect}
      </h3>
      <div css={cssActions}>
        <button css={cssButton} onClick={() => finish(true)}>
          Save
        </button>
        <button css={cssButton} onClick={() => finish(false)}>
          Discard
        </button>
      </div>
    </div>
  )
}

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
  font-size: 1.5rem;
  font-weight: 900;
`
const cssActions = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const cssButton = css`
  ${buttonStyle};
`
