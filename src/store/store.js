import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useKanjiStore = create (persist((set) => ({
  currentKanji:null,
  setCurrentKanji: (currentKanji) => set({currentKanji}),
  showKanji: false,
  setShowKanji: ((showKanji) => set({showKanji}))
}),
 {
        name: 'Trivia Party', 
        partialize: (state) => ({ currentKanji: state.currentKanji, showKanji: state.showKanji }),
}
))