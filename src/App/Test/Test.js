/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Card } from '../Card/Card'
import { buttonStyle } from '../Button/Button'
import { createTest, defaultSettings } from '../../Tests/createTest'
import { useLocalStorage } from '../../Storage/useLocalStorage'
import { colors } from '../../styles/colors'

export function Test() {
  const [testHistory, setTestHistory] = useLocalStorage('fuxi-testHistory', [])
  const [test, setTest] = useLocalStorage('fuxi-test', null)
  const [testSettings, setTestSettings] = useLocalStorage('fuxi-testSettings', defaultSettings)

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
  const discard = () => {
    setTest(null)
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
      <div css={cssContainer}>
        <div css={cssContent}>
          <h3>Settings</h3>
          <p>Test length: {testSettings.steps}</p>
        </div>
        <button css={cssStartButton} onClick={start}>
          START
        </button>
      </div>
    )
  }

  if (test.questions.length > 0) {
    // Test in progress. Display current question.
    const [current, ...remaining] = test.questions
    const currentStep = test.answers.length + 1
    const totalSteps = currentStep + remaining.length
    const stepCounter = `${currentStep} / ${totalSteps}`

    return (
      <div css={cssContainer}>
        <Card
          entry={current}
          isRevealed={test.isRevealingAnswer}
          onAnswer={answer}
          onReveal={reveal}
          onDiscard={discard}
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
    <div css={cssContainer}>
      <div css={cssContent}>
        <h3>Test completed :)</h3>
        <h3>
          {correct} / {correct + incorrect}
        </h3>
      </div>
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
const cssContainer = css`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem);
`
const cssContent = css`
  flex: 1;
  padding: 0.5rem;
`
const cssActions = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const cssButton = css`
  ${buttonStyle};
`
