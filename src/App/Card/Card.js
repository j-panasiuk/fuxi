/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { buttonStyle } from '../Button/Button'

export function QuestionCard({ entry, onReveal, stepRenderer }) {
  return (
    <React.Fragment>
      <div css={cssCard}>
        <div css={cssStep}>{stepRenderer}</div>
        <div css={cssEn}>{entry.en}</div>
      </div>
      <div css={cssActions}>
        <button css={cssButton} onClick={onReveal}>
          Reveal
        </button>
      </div>
    </React.Fragment>
  )
}

export function AnswerCard({ entry, onAnswer, stepRenderer }) {
  return (
    <React.Fragment>
      <div css={cssCard}>
        <div css={cssStep}>{stepRenderer}</div>
        <div css={cssEn}>{entry.en}</div>
        <div css={cssZh}>{entry.zh}</div>
        <div css={cssPinyin}>{entry.pinyin}</div>
      </div>
      <div css={cssActions}>
        <button css={cssButton} onClick={() => onAnswer(true)}>
          Correct
        </button>
        <button css={cssButton} onClick={() => onAnswer(false)}>
          Incorrect
        </button>
      </div>
    </React.Fragment>
  )
}

const cssStep = css`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  color: #a6a6a6;
`
const cssCard = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  min-height: 8rem;
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
  margin-top: 1rem;
`
const cssPinyin = css`
  text-align: center;
  color: #a6a6a6;
`
const cssActions = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const cssButton = css`
  ${buttonStyle};
`
