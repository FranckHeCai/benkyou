import LeftArrow from "@icons/LeftArrow"
import RightArrow from "@icons/RightArrow"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useKanjiStore } from "store/store"

const Lesson = () => {
  // const [currentLesson, setCurrentLesson] = useState<KanjiLesson>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()
  const { kanji, lesson} = useParams()
  const { kanjiLessons, setCurrentLesson, currentLesson } = useKanjiStore(state => state)

  useEffect(()=>{
    const kanjiLesson = Number(lesson)
    if(kanjiLessons){
      setCurrentLesson(kanjiLessons[kanjiLesson])
    }
  },[lesson, kanjiLessons])

  const handlePrev = () => setCurrentIndex((prev):number => {
    if(prev === 0) return prev
    return prev - 1
  })
  const handleNext = () => setCurrentIndex((prev):number => {
    if(!currentLesson || prev === currentLesson.length - 1) return prev
    return prev + 1
  })

  const handlePrevLesson = () => {
    if(Number(lesson) === 0) return 
    navigate(`/kanjis/jlpt/${kanji}/lesson/${Number(lesson) - 1}`)
  }
  const handleNextLesson = () => {
    if(!kanjiLessons || kanjiLessons?.length - 1 === Number(lesson)) return
    navigate(`/kanjis/jlpt/${kanji}/lesson/${Number(lesson) + 1}`)
  }

  const selectKanji = (index:number) => {
    setCurrentIndex(index)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className=" flex flex-col items-center gap-6">
      <div className="w-full max-w-lg flex justify-between text-slate-800 text-sm sm:text-base font-medium">
        <button
          className="px-4 py-2 bg-gray-200 rounded flex items-center gap-2 disabled:opacity-50"
          onClick={handlePrevLesson}
          disabled={Number(lesson) === 0}
        >
          <LeftArrow />
          Previous lesson
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded flex items-center gap-2"
          onClick={handleNextLesson}
        >
          Next lesson
          <RightArrow />
        </button>
      </div>
      
      { currentLesson &&
        <div className="w-full sm:w-sm min-h-80 sm:h-100 bg-white rounded-lg shadow p-8 flex flex-col justify-center items-center gap-4">
        <div className="text-7xl">{currentLesson[currentIndex].kanji}</div>
        <div className="text-center">
          <div className="text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center mb-1">
            <h2 className="font-semibold">Onyomi:</h2>
            <p className="text-center text-2xl">{currentLesson[currentIndex].wk_readings_on?.map(word => word.replace(/^!/, "")).join(' | ')}</p>
          </div>
          <div className="text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center">
            <h2 className="font-semibold">Kunyomi:</h2>
            <p className="text-center text-2xl flex items-center justify-center">{
              currentLesson[currentIndex].wk_readings_kun?.length === 0 
                ? <p className="text-lg text-gray-500">none</p>
                : currentLesson[currentIndex].wk_readings_kun?.map(word => word.replace(/^!/, "")).join(' | ')
                
            }</p> 
            
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