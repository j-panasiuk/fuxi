/** @jsx jsx */
import React from 'react'
import { Link } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import { buttonStyle } from '../Button/Button'
import { useLocalStorage } from '../../Storage/useLocalStorage'

export function Dashboard() {
  const [testHistory] = useLocalStorage('fuxi-testHistory', [])
  const [test] = useLocalStorage('fuxi-test', null)

  return (
    <div>
      <h1>Dashboard</h1>
      {test && (
        <Link to="/test" css={cssContinueButton}>
          Continue
        </Link>
      )}
      {testHistory && testHistory.length > 0 && (
        <React.Fragment>
          <p>Your pathetic results so far:</p>
          <ul>
            {testHistory.map(th => (
              <li key={th.date}>{th.answers.length} questions answered</li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  )
}

const cssContinueButton = css`
  ${buttonStyle};
  background: indigo;
  color: white;
`
