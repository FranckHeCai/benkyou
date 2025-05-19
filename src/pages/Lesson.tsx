import { useState } from "react"


// Example kanji data (replace with your real data)
const exampleKanji = [
  { kanji: "日", meaning: "sun, day", onyomi: "ニチ, ジツ", kunyomi: "ひ, か" },
  { kanji: "一", meaning: "one", onyomi: "イチ, イツ", kunyomi: "ひと" },
]

const Lesson = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Replace with kanji data for the selected level
  const kanjiList = exampleKanji

  const handlePrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))
  const handleNext = () => setCurrentIndex((i) => Math.min(i + 1, kanjiList.length - 1))

  return (
    <div className="flex flex-col items-center gap-8 mt-8">

      {/* Flashcard */}
      <div className="bg-white rounded shadow p-8 w-80 flex flex-col items-center">
        <div className="text-7xl mb-4">{kanjiList[currentIndex].kanji}</div>
        <div className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">Onyomi:</span> {kanjiList[currentIndex].onyomi}
        </div>
        <div className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">Kunyomi:</span> {kanjiList[currentIndex].kunyomi}
        </div>
        <div className="text-md text-gray-500">{kanjiList[currentIndex].meaning}</div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === kanjiList.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Lesson