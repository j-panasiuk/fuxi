/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from 'react-router-dom'

export function AppHeader() {
  return (
    <header css={cssHeader}>
      <Link to="/">
        <h1 css={cssHeaderTitle}>复习</h1>
      </Link>
    </header>
  )
}

const cssHeader = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background: #282828;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  & > a {
    color: white;
    text-decoration: none;
  }
`
const cssHeaderTitle = css`
  display: flex;
  flex: 0;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-weight: 900;
  color: #ddd;
  font-size: 1.75rem;
`
