import { type KanjiLessons, type KanjiLesson, type CompleteKanji } from "types"
import { n5Lessons, n4Lessons, n3Lessons, n2Lessons, n1Lessons } from "@data/index"
export const selectLessons = (level:number):KanjiLessons => {
  return level === 5 
  ? n5Lessons
  : level === 4
    ? n4Lessons
    : level === 3
      ? n3Lessons
      : level === 2
        ? n2Lessons
        : n1Lessons
}

export const selectLesson = (level:number, index:number):KanjiLesson => {
  const lesson = selectLessons(level)
  return lesson?.[index] ?? null;
}