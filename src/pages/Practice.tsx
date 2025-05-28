import InfoIcon from "@icons/InfoIcon";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useKanjiStore } from "store/store";
import type { CompleteKanji, KanjiLesson, QuestionType } from "types";
const Practice = () => {
  const {kanjiLessons, setCurrentLesson, currentLesson } = useKanjiStore(state => state)
  const {kanji, lesson} = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<null | number>(null)
  const [currentAnswer, setCurrentAnswer] = useState<null | CompleteKanji>(null)
  const [questionType , setQuestionType] = useState<QuestionType>("")
  const [shuffledAnswers, setShuffledAnswers] = useState<CompleteKanji[]>([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const questionTypes:QuestionType[] = ["onyomi", "kunyomi" , "meaning"]

  useEffect(() => {
    setCurrentIndex(0)
    const kanjiLesson = Number(lesson)
    if(kanjiLessons){
      setCurrentLesson(kanjiLessons[kanjiLesson])
    }
  },[lesson, kanjiLessons])

  useEffect(()=>{
    if(currentLesson){
      setShuffledAnswers(shuffleAnswers(currentLesson))
    }else{
      setShuffledAnswers([])
    }
    const questionIndex = Math.floor(Math.random() * 3)
    setQuestionType(questionTypes[questionIndex])
    setCurrentAnswerIndex(null)
    setChecked(false)
    setCurrentAnswer(null)
    setIsCorrect(false)

  },[currentLesson, currentIndex])

  const shuffleAnswers = (array:CompleteKanji[]) =>{
    return [...array].sort(()=> Math.random() - 0.5 )
  }

  const selectKanji = (index:number) => {
    setCurrentAnswerIndex(index)
  }

  const handleCheckAnswer = () => {
    if (!currentLesson || !currentAnswer) return;
    setQuestionType("")
    const currentKanji = currentLesson[currentIndex];
    const selectedKanji = currentAnswer;

    let isCorrect = false;

    switch (questionType) {
      case "onyomi":
        isCorrect = selectedKanji.readings_on.some(reading =>
          currentKanji.readings_on.includes(reading)
        );
        break;
      case "kunyomi":
        isCorrect = selectedKanji.readings_kun.some(reading =>
          currentKanji.readings_kun.includes(reading)
        );
        break;
      case "meaning":
        isCorrect = selectedKanji.meanings.some(meaning =>
          currentKanji.meanings.includes(meaning)
        );
        break;
      default:
        break;
    }
  
    setIsCorrect(isCorrect);
    setChecked(true);
  }

  const handleNextKanji = () => {
    setCurrentIndex((prev):number => {
      if(!currentLesson || prev === currentLesson.length - 1) return prev
      window.scrollTo({ top: 0, behavior: "smooth" })
      return prev + 1
    })
  }

  const handleFinishPractice = () =>{

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
        {shuffledAnswers &&
          shuffledAnswers.map((kanji, index) => {

            return(
              <button key={kanji.kanji} onClick={()=>{
                selectKanji(index)
                setCurrentAnswer(kanji)
                }} className={
                  `${checked && currentAnswerIndex === index
                      ? isCorrect
                        ? "bg-emerald-500 text-white" 
                        : "bg-red-500 text-white"
                      : index === currentAnswerIndex 
                      ? "bg-slate-800 text-white" 
                      : "bg-white"
                    } 
                    p-5  rounded-lg shadow-md`
                  }>
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
          }
        )
        }
      </div>
      <button disabled={currentAnswerIndex === null} onClick={()=>{
        checked && currentLesson
        ? currentIndex === currentLesson?.length - 1
          ? handleFinishPractice()
          : handleNextKanji()
        : handleCheckAnswer()
      }} className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50">
        { checked && currentLesson
            ? currentIndex === currentLesson?.length - 1
              ? "End practice"
              : "Next Kanji"
            : "Confirm"
        }
      </button>
    </div>
  );
};

export default Practice;