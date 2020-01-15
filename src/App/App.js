/** @jsx jsx */
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import { AppHeader } from './AppHeader'
import { Dashboard } from './Dashboard/Dashboard'
import { Test } from './Test/Test'
import { Vocabulary } from './Vocabulary/Vocabulary'

export function App() {
  return (
    <BrowserRouter>
      <div css={cssApp}>
        <AppHeader />
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/vocabulary">
            <Vocabulary />
          </Route>
          <Route>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const cssApp = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 3rem;
`
