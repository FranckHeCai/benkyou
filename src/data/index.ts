import _n1 from './n1.json'
import _n2 from './n2.json'
import _n3 from './n3.json'
import _n4 from './n4.json'
import _n5 from './n5.json'
import kanjis from './kanji.json'
import { type CompleteKanji, type Level } from '../types'

const lessonSize = 4

const filterKanji = (level:Level):CompleteKanji[] =>{
  return all.filter(kanji => kanji.jlpt_new === level)
}

const all = Object.entries(kanjis).map(([kanji, data]) => ({
  kanji, // the character, e.g. "一"
  ...data
})) as CompleteKanji[]

const divideKanjis = (kanjis:CompleteKanji[], size:number) =>{
  return Array.from({ length: Math.ceil(kanjis.length / size) }, (_, i) =>
    kanjis.slice(i * size, i * size + size)
  )
}

export const n1 = filterKanji(1) as CompleteKanji[]
export const n2 = filterKanji(2) as CompleteKanji[]
export const n3 = filterKanji(3) as CompleteKanji[]
export const n4 = filterKanji(4) as CompleteKanji[]
export const n5 = filterKanji(5) as CompleteKanji[]
export const n1Lessons = divideKanjis(n1, lessonSize)
export const n2Lessons = divideKanjis(n2, lessonSize)
export const n3Lessons = divideKanjis(n3, lessonSize)
export const n4Lessons = divideKanjis(n4, lessonSize)
export const n5Lessons = divideKanjis(n5, lessonSize)
