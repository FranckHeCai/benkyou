import _n1 from './n1.json'
import _n2 from './n2.json'
import _n3 from './n3.json'
import _n4 from './n4.json'
import _n5 from './n5.json'
import kanjis from './kanji.json'
import { type CompleteKanji, type Kanji, type Level } from '../types'

const filterKanji = (level:Level):Kanji[] =>{
  return all.filter(kanji => kanji.jlpt_new === level)
}

const all = Object.entries(kanjis).map(([kanji, data]) => ({
  kanji, // the character, e.g. "一"
  ...data
})) as CompleteKanji[]

export const n1 = filterKanji(1) as CompleteKanji[]
export const n2 = filterKanji(2) as CompleteKanji[]
export const n3 = filterKanji(3) as CompleteKanji[]
export const n4 = filterKanji(4) as CompleteKanji[]
export const n5 = filterKanji(5) as CompleteKanji[]
