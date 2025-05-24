import Popup from "@components/Popup"
import InfoIcon from "@icons/InfoIcon"
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
  const { kanjiLessons, setCurrentLesson, currentLesson, popup, setPopup } = useKanjiStore(state => state)

  useEffect(()=>{
    setCurrentIndex(0)
    const kanjiLesson = Number(lesson)
    if(kanjiLessons){
      setCurrentLesson(kanjiLessons[kanjiLesson])
    }
  },[lesson, kanjiLessons])

  const handlePrev = () => setCurrentIndex((prev):number => {
    if(prev === 0) return prev
    window.scrollTo({ top: 0, behavior: "smooth" })
    return prev - 1
  })
  const handleNext = () => setCurrentIndex((prev):number => {
    if(!currentLesson || prev === currentLesson.length - 1) return prev
    window.scrollTo({ top: 0, behavior: "smooth" })
    return prev + 1
  })

  const handlePrevLesson = () => {
    if(Number(lesson) === 0) return 
    navigate(`/kanjis/jlpt/${kanji}/lesson/${Number(lesson) - 1}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const handleNextLesson = () => {
    if(!kanjiLessons || kanjiLessons?.length - 1 === Number(lesson)) return
    navigate(`/kanjis/jlpt/${kanji}/lesson/${Number(lesson) + 1}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const selectKanji = (index:number) => {
    setCurrentIndex(index)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className=" flex flex-col items-center gap-6">
      <div className="w-full max-w-xl flex justify-between items-center text-slate-800 text-sm sm:text-base font-medium">
        <button
          className=" text-xs sm:text-base py-2 bg-gray-200 rounded flex items-center gap-1 sm:gap-2 disabled:opacity-50"
          onClick={handlePrevLesson}
          disabled={Number(lesson) === 0}
        >
          <LeftArrow />
          <p className="hidden sm:block">Previous lesson</p>
        </button>
        <h2 className="font-bold">Lesson {lesson ? Number(lesson) + 1 : ""}</h2>
        <button
          className="text-xs sm:text-base py-2 bg-gray-200 rounded gap-1 sm:gap-2 flex items-center gap-2"
          onClick={handleNextLesson}
        >
          <div className="hidden sm:block">Next lesson</div>
          <RightArrow />
        </button>
      </div>
      
      { currentLesson &&
        <div className="relative w-full sm:w-sm min-h-80 sm:h-100 bg-white rounded-lg shadow p-8 flex flex-col justify-center items-center gap-4 ">
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
        <button onClick={setPopup} className="absolute top-5 right-5"> <InfoIcon /> </button>
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
                <button key={kanji.kanji} onClick={()=>{selectKanji(index)}} className={`${index === currentIndex ? "border-2 border-slate-800" : ""} p-10 bg-white rounded-lg shadow-md`}>
                  <p className="text-xl sm:text-5xl ">{kanji.kanji}</p>
                </button>
              )
            })
          }
        </div>
      </div>

      {popup &&
        <Popup>
          <div className="text-slate-800 flex flex-col gap-2 sm:gap-4">
            <div>
              <h2 className="text-center font-bold text-lg sm:text-xl">What is Onyomi?</h2>
              <p className="text-sm sm:text-base">
                Used mainly in multi‐kanji compounds (熟語), e.g. 学校 (がっこう, gakkō “school”), where both 学 (ガク gaku) and 校 (コウ kō) use on’yomi.
              </p>
            </div>
            <div>
              <h2 className="text-center font-bold text-lg sm:text-xl">What is Kunyomi?</h2>
              <p className="text-sm sm:text-base">
                Used when the kanji stands alone or with okurigana (hiragana suffixes), e.g. 食べる (たべる, taberu “to eat”), where 食 is read as た (ta) + べる (beru).
              </p>
            </div>
          </div>
        </Popup>
      }
    </div>
  )
}

export default Lesson