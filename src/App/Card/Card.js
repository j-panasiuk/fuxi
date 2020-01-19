/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { buttonStyle } from '../Button/Button'

export function Card({ entry, isRevealed, onReveal, onAnswer, onDiscard, stepRenderer }) {
  return (
    <React.Fragment>
      <div css={cssCard}>
        <div css={cssStep}>{stepRenderer}</div>
        <div css={cssExit} onClick={onDiscard}>
          ✗
        </div>
        <div css={cssQuestion}>
          <div css={cssEn}>{entry.en}</div>
        </div>
        <div css={cssAnswer}>
          {isRevealed && (
            <React.Fragment>
              <div css={cssZh}>{entry.zh}</div>
              <div css={cssPinyin}>{entry.pinyin}</div>
            </React.Fragment>
          )}
        </div>
      </div>
      <div css={cssActions}>
        {isRevealed ? (
          <React.Fragment>
            <button css={cssButton} onClick={() => onAnswer(true)}>
              Correct
            </button>
            <button css={cssButton} onClick={() => onAnswer(false)}>
              Incorrect
            </button>
          </React.Fragment>
        ) : (
          <button css={cssButton} onClick={onReveal}>
            Reveal
          </button>
        )}
      </div>
    </React.Fragment>
  )
}

const cssStep = css`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  color: #999;
`
const cssExit = css`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  color: #999;
  font-size: 1.5rem;
  font-weight: 200;
  cursor: default;
  &:hover {
    color: #444;
  }
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
  white-space: pre-line;
  background: #efefef;
`
const cssQuestion = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  width: 100%;
  padding-bottom: 0.75rem;
`
const cssAnswer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 2;
  width: 100%;
  padding-top: 0.75rem;
`
const cssEn = css`
  color: #444;
`
const cssZh = css`
  font-size: 2.25rem;
  font-weight: 500;
  color: #444;
`
const cssPinyin = css`
  color: #999;
  margin-top: 0.25rem;
`
const cssActions = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const cssButton = css`
  ${buttonStyle};
`
