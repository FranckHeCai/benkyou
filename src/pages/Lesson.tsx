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

  const handlePrev = () => setCurrentIndex((prev):number => {
    if(prev === 0) return prev
    return prev - 1
  })
  const handleNext = () => setCurrentIndex((prev):number => {
    if(!currentLesson || prev === currentLesson.length - 1) return prev
    return prev + 1
  })

  const selectKanji = (index:number) => {
    setCurrentIndex(index)
  }

  return (
    <div className=" flex flex-col items-center gap-8">
      { currentLesson &&
        <div className="w-full sm:w-sm h-80 sm:h-100 bg-white rounded-lg shadow p-8 flex flex-col justify-center items-center gap-4">
        <div className="text-7xl">{currentLesson[currentIndex].kanji}</div>
        <div className="text-center">
          <div className="text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center mb-1">
            <h2 className="font-semibold">Onyomi:</h2>
            <p className="text-center text-2xl">{currentLesson[currentIndex].wk_readings_on?.map(word => word.replace(/^!/, "")).join(' | ')}</p>
          </div>
          <div className="text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center">
            <h2 className="font-semibold">Kunyomi:</h2>
            <p className="text-center text-2xl">{currentLesson[currentIndex].wk_readings_kun?.map(word => word.replace(/^!/, "")).join(' | ')}</p> 
            
          </div>
        </div>
        <div className="text-center text-xl text-gray-500">{currentLesson[currentIndex].meanings.join(', ')}</div>
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

      <div className="w-full sm:w-fit">
        <h3 className="text-center font-medium mb-4">Lesson Kanjis</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          { currentLesson &&
            currentLesson.map((kanji, index) =>{
              return(
                <button key={kanji.kanji} onClick={()=>{selectKanji(index)}} className="p-10 bg-white rounded-lg shadow-md">
                  <p className="text-xl sm:text-5xl ">{kanji.kanji}</p>
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Lesson