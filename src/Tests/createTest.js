import sampleSize from 'lodash/sampleSize'
import dictionary from '../dictionary.json'

export function createTest() {
  return {
    questions: sampleSize(dictionary, 10),
    answers: [],
    isRevealingAnswer: false,
  }
}
