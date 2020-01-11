/** @jsx jsx */
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import { Dashboard } from './Dashboard/Dashboard'
import { Test } from './Test/Test'
import { Vocabulary } from './Vocabulary/Vocabulary'

export function App() {
  return (
    <BrowserRouter>
      <div css={cssApp}>
        <header>
          <Link to="/">
            <h1 css={cssHeader}>复习</h1>
          </Link>
        </header>
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
