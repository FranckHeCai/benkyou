import InfoIcon from "@icons/InfoIcon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useKanjiStore } from "store/store";
import type { QuestionType } from "types";
const Practice = () => {
  const {kanjiLessons, setCurrentLesson, currentLesson } = useKanjiStore(state => state)
  const {kanji, lesson} = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<null | number>(null)
  const [questionType , setQuestionType] = useState<QuestionType>("")
  const questionTypes:QuestionType[] = ["onyomi", "kunyomi" , "meaning"]

  useEffect(() => {
    const questionIndex = Math.floor(Math.random() * 3)
    setQuestionType(questionTypes[questionIndex])
    setCurrentIndex(0)
    const kanjiLesson = Number(lesson)
    if(kanjiLessons){
      setCurrentLesson(kanjiLessons[kanjiLesson])
    }
  },[lesson, kanjiLessons])

  useEffect(() => {
    console.log(questionType)
  },[questionType])

  const selectKanji = (index:number) => {
    setCurrentAnswerIndex(index)
  }

  const handleCheckAnswer = () =>{

  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold text-slate-800 sm:text-3xl">Kanji Practice</h1>
      <h2 className="text-lg sm:text-2xl font-medium text-slate-600">JLPT {kanji}</h2>
      { currentLesson && 
        <div className="relative w-full sm:w-sm min-h-70 sm:h-90 bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center gap-4 ">
        <div className="text-7xl">{currentLesson[currentIndex].kanji}</div>
        <div className="text-center">
          <div className="text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center mb-1">
            <h2 className="font-semibold">Onyomi:</h2>
            <p className="text-center text-2xl">
              { questionType === "onyomi"
                  ? "????"
                  : currentLesson[currentIndex].wk_readings_on?.map(word => word.replace(/^!/, "")).join(' | ')
              }
            </p>
          </div>
          <div className="text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center">
            <h2 className="font-semibold">Kunyomi:</h2>
            <p className="text-center text-2xl flex items-center justify-center">{
              questionType === "kunyomi"
              ? "????"
              : currentLesson[currentIndex].wk_readings_kun?.length === 0 
                  ? <p className="text-lg text-gray-500">none</p>
                  : currentLesson[currentIndex].wk_readings_kun?.map(word => word.replace(/^!/, "")).join(' | ')
              
                
            }</p> 
            
          </div>
        </div>
        <div className="text-center text-xl text-gray-500">
          { questionType === "meaning"
            ? "????"
            : currentLesson[currentIndex].meanings.join(', ')
          
          }</div>
      </div>
      }

      <p>Select the correct answer</p>
      <div className="w-full sm:w-fit grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {currentLesson &&
          currentLesson.map((kanji, index) => {

            return(
              <button key={kanji.kanji} onClick={()=>{selectKanji(index)}} className={`${index === currentAnswerIndex ? " bg-slate-800 text-white" : "bg-white"} p-5  rounded-lg shadow-md`}>
                  <p className="text-base sm:text-lg ">
                    { questionType === "kunyomi"
                        ? kanji.readings_kun.length === 0
                          ? "none"
                          :  kanji.readings_kun.map(word => word.replace(/^!/, "")).join(' | ')
                        : questionType === "onyomi"
                          ? kanji.readings_on.map(word => word.replace(/^!/, "")).join(' | ')
                          : kanji.meanings
                    }
                  </p>
                </button>
            )
          })
        }
      </div>
      <button disabled={currentAnswerIndex === null} onClick={handleCheckAnswer} className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50">
        Confirm
      </button>
    </div>
  );
};

export default Practice;