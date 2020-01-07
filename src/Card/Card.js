/** @jsx jsx */
import { css, jsx } from '@emotion/core'

function Card({ en, pinyin, zh }) {
  return (
    <div css={cssCard}>
      <div css={cssEn}>{en}</div>
      <div css={cssZh}>{zh}</div>
      <div css={cssPinyin}>{pinyin}</div>
    </div>
  )
}

const cssCard = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.5rem;
  background: #efefef;
  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`
const cssEn = css`
  text-align: center;
`
const cssZh = css`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
`
const cssPinyin = css`
  text-align: center;
  color: #a6a6a6;
`

export default Card
