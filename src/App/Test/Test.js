/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Card } from '../Card/Card'
import { buttonStyle } from '../Button/Button'
import { createTest } from '../../Tests/createTest'
import { useLocalStorage } from '../../Storage/useLocalStorage'
import { colors } from '../../styles/colors'

export function Test() {
  const [testHistory, setTestHistory] = useLocalStorage('fuxi-testHistory', [])
  const [test, setTest] = useLocalStorage('fuxi-test', null)
  const [testSettings, setTestSettings] = useLocalStorage('fuxi-testSettings', {})

  const start = () => {
    setTest(createTest(testSettings))
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
      setTestHistory([
        ...testHistory,
        {
          date: new Date().getTime(),
          answers: test.answers,
        },
      ])
    }
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
    const [current, ...remaining] = test.questions
    const currentStep = test.answers.length + 1
    const totalSteps = currentStep + remaining.length
    const stepCounter = `${currentStep} / ${totalSteps}`

    return (
      <div css={cssContent}>
        <Card
          entry={current}
          isRevealed={test.isRevealingAnswer}
          onAnswer={answer}
          onReveal={reveal}
          stepRenderer={stepCounter}
        />
      </div>
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
  background: ${colors.primary};
  color: ${colors.white};
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
`
const cssContent = css`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem);
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
