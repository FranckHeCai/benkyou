import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { selectLesson } from "services/selectLesson"
import type { KanjiLesson } from "types"

const Lesson = () => {
  const [currentLesson, setCurrentLesson] = useState<KanjiLesson>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { kanji, lesson} = useParams()

  useEffect(()=>{
    const kanjiLevel = Number(kanji)
    const kanjiLesson = Number(lesson)
    setCurrentLesson(selectLesson(kanjiLevel, kanjiLesson))
  },[])

  const handlePrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))
  const handleNext = () => setCurrentIndex((i) => {
    if(!currentLesson) return i
    return Math.min(i + 1, currentLesson.length - 1)
  })

  return (
    <div className="flex flex-col items-center gap-8 mt-8">


      { currentLesson &&
        <div className="bg-white rounded shadow p-8 w-80 flex flex-col items-center">
        <div className="text-7xl mb-4">{currentLesson[currentIndex].kanji}</div>
        <div className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">Onyomi:</span> {currentLesson[currentIndex].readings_on}
        </div>
        <div className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">Kunyomi:</span> {currentLesson[currentIndex].readings_kun}
        </div>
        <div className="text-md text-gray-500">{currentLesson[currentIndex].meanings}</div>
      </div>
      }

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
          disabled={!currentLesson || currentIndex === currentLesson.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Lesson