import { type KanjiLesson, type KanjiLessons, type CompleteKanji, type KanjiLevel, type KanjiPracticeArray } from "../types"
import { create } from "zustand";
import { persist } from 'zustand/middleware'

// Define the state and actions types
interface KanjiState {
  currentKanji: CompleteKanji | null;
  setCurrentKanji: (currentKanji: CompleteKanji | null) => void;
  showKanji: boolean;
  setShowKanji: (showKanji: boolean) => void;
  kanjiPracticeArray: KanjiPracticeArray;
  setKanjiPracticeArray: (kanjiPracticeArray: KanjiPracticeArray) => void;
  kanjiLevel: KanjiLevel;
  setKanjiLevel: (kanjiLevel: KanjiLevel) => void;
  kanjiLessons: KanjiLessons;
  setKanjiLessons: (kanjiLessons: KanjiLessons) => void;
  currentLesson: KanjiLesson;
  setCurrentLesson: (currentLesson: KanjiLesson) => void;
  popup: boolean;
  setPopup: ()=>void;
}

export const useKanjiStore = create<KanjiState>()(persist((set) => ({
  currentKanji: null,
  setCurrentKanji: (currentKanji) => set({currentKanji}),
  showKanji: false,
  setShowKanji: (showKanji) => set({showKanji}),
  kanjiPracticeArray: [],
  setKanjiPracticeArray: (kanjiPracticeArray) => set({kanjiPracticeArray}),
  kanjiLevel: [],
  setKanjiLevel: (kanjiLevel) => set({kanjiLevel}),
  kanjiLessons: null,
  setKanjiLessons: (kanjiLessons) => set({kanjiLessons}),
  currentLesson: null,
  setCurrentLesson: (currentLesson) => set({currentLesson}),
  popup: false,
  setPopup: () => set((state) => ({ popup: !state.popup }))
}),
 {
        name: 'Kanji store', 
        partialize: (state) => ({ 
          kanjiLessons: state.kanjiLessons, 
          currentLesson: state.currentLesson,
          kanjiPracticeArray: state.kanjiPracticeArray
        }),
}
))