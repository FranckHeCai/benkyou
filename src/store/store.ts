import { type KanjiLesson, type KanjiLessons, type CompleteKanji } from "../types"
import { create } from "zustand";
import { persist } from 'zustand/middleware'

// Define the state and actions types
interface KanjiState {
  currentKanji: CompleteKanji | null;
  setCurrentKanji: (currentKanji: CompleteKanji | null) => void;
  showKanji: boolean;
  setShowKanji: (showKanji: boolean) => void;
  kanjiLessons: KanjiLessons;
  setKanjiLessons: (kanjiLessons: KanjiLessons) => void;
  currentLesson: KanjiLesson;
  setCurrentLesson: (currentLesson: KanjiLesson) => void;
}

export const useKanjiStore = create<KanjiState>()(persist((set) => ({
  currentKanji: null,
  setCurrentKanji: (currentKanji) => set({currentKanji}),
  showKanji: false,
  setShowKanji: (showKanji) => set({showKanji}),
  kanjiLessons: null,
  setKanjiLessons: (kanjiLessons) => set({kanjiLessons}),
  currentLesson: null,
  setCurrentLesson: (currentLesson) => set({currentLesson})
}),
 {
        name: 'Kanji store', 
        partialize: (state) => ({ kanjiLessons: state.kanjiLessons, currentLesson: state.currentLesson }),
}
))