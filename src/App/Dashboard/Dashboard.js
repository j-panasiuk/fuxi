/** @jsx jsx */
import React from 'react'
import { Link } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import { buttonStyle } from '../Button/Button'
import { useLocalStorage } from '../../Storage/useLocalStorage'
import { colors } from '../../styles/colors'

export function Dashboard() {
  const [testHistory] = useLocalStorage('fuxi-testHistory', [])
  const [test] = useLocalStorage('fuxi-test', null)

  return (
    <div css={cssDashboard}>
      {testHistory && testHistory.length > 0 ? (
        <React.Fragment>
          <h3>Welcome!</h3>
          <p>Your pathetic results so far:</p>
          <ul>
            {testHistory.map(th => (
              <li key={th.date}>{th.answers.length} questions answered</li>
            ))}
          </ul>
          <p>Your average score:</p>
          <h1>{testsAverageResult(testHistory)}%</h1>
        </React.Fragment>
      ) : (
        <p>No finished tests yet.</p>
      )}
      <Link to="/test" css={cssContinueButton}>
        {test ? 'Continue' : 'New Test'}
      </Link>
    </div>
  )
}

const cssDashboard = css`
  padding: 0.5rem;
`
const cssContinueButton = css`
  ${buttonStyle};
  background: ${colors.primary};
  color: ${colors.white};
  text-decoration: none;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
`

function testsAverageResult(testHistory = []) {
  const answers = testHistory.flatMap(t => t.answers)
  const correctAnswers = answers.filter(a => a.correct)
  return (100 * (correctAnswers.length / answers.length)).toFixed(2)
}
