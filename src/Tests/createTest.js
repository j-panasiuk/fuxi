import sampleSize from 'lodash/sampleSize'
import dictionary from '../dictionary.json'

export const defaultSettings = {
  steps: 12,
}

export function createTest(customSettings = {}) {
  const settings = { ...defaultSettings, ...customSettings }
  return {
    questions: sampleSize(dictionary, settings.steps),
    answers: [],
    isRevealingAnswer: false,
  }
}
