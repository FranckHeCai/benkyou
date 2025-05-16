export type Level = 1 | 2 | 3 | 4 | 5
export type Word = {
  word: string
  meaning: string
  furigana: string
  romaji: string
  level: Level
}

export type Kanji = {
  strokes:         number;
  grade:           number | null;
  freq:            number | null;
  jlpt_old:        number | null;
  jlpt_new:        number | null;
  meanings:        string[];
  readings_on:     string[];
  readings_kun:    string[];
  wk_level:        number | null;
  wk_meanings:     string[] | null;
  wk_readings_on:  string[] | null;
  wk_readings_kun: string[] | null;
  wk_radicals:     string[] | null;
}

export type CompleteKanji = { kanji: string } & Kanji

export type PaginationParams = {
  offset: number
  limit: number
}

export type WordsResponse = PaginationParams & {
  total: number
  words: Word[]
}

export type ErrorMsg = {
  message: string
}
