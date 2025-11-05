import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shuffleKanas } from "services/shuffle";
import { useKanjiStore } from "store/store";
import type { Kana, QuestionType } from "types";
const KanaPractice = () => {
  const {kanaArray } = useKanjiStore(state => state)
  const {kana} = useParams()
  const [kanas, setKanas] = useState<Kana[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<null | number>(null)
  const [currentAnswer, setCurrentAnswer] = useState<null | Kana>(null)
  const [questionType , setQuestionType] = useState<QuestionType>("")
  const [answers, setAnswers] = useState<Kana[]>([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const questionTypes:QuestionType[] = ["character", "romanization"]
  const navigate = useNavigate()

  useEffect(() => {
    console.log(kana)
    setCurrentIndex(0)
    const flattedKanas = kanaArray.flat()
    const shuffledKanas = shuffleKanas(flattedKanas)
    const reducedKanas = shuffledKanas.slice(0,5)
    setKanas(reducedKanas)
  },[kanaArray])

  useEffect(()=>{
    if(kanas.length === 0) return
    const filteredKanjis = kanas.filter((answer) => answer.char_id !== kanas[currentIndex].char_id )
    const reducedKanas = filteredKanjis.slice(0,3)
    const shuffledAnswers = shuffleKanas([kanas[currentIndex], ...reducedKanas])
    setAnswers(shuffledAnswers)
  }, [currentIndex, kanaArray, kanas])

  useEffect(()=>{
    const questionIndex = Math.floor(Math.random() * 2)
    setQuestionType(questionTypes[questionIndex])
    setCurrentAnswerIndex(null)
    setChecked(false)
    setCurrentAnswer(null)
    setIsCorrect(false)
  },[currentIndex])

  const selectKana = (index:number) => {
    setCurrentAnswerIndex(index)
  }

  const handleCheckAnswer = () => {
    if (!currentAnswer) return;
    const currentKana = kanas[currentIndex];
    const selectedKana = currentAnswer;

    const isCorrect = currentKana.char_id === selectedKana.char_id;

    setIsCorrect(isCorrect);
    setChecked(true);
  }

  const handleNextKana = () => {
    setCurrentIndex((prev):number => {
      if(prev === kanas.length - 1) return prev
      window.scrollTo({ top: 0, behavior: "smooth" })
      return prev + 1
    })
  }

  const handleFinishPractice = () =>{
    navigate(`/kana/${kana}`)
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-xl font-bold text-slate-800 sm:text-3xl">{kana} practice</h1>
      { kanas.length > 0 && 
        <div className="relative w-full sm:w-sm min-h-70 sm:h-90 bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center gap-4 ">
        <div className="text-7xl">
          { questionType === "character"
              ? "???"
              : kanas[currentIndex].character
          }
        </div>

        <div className="text-center text-lg text-gray-700 flex flex-col sm:flex-row sm:gap-2 sm:items-center mb-1">
            <h2 className="font-semibold">Romanization:</h2>
            <p className="text-center text-2xl">
              { questionType === "romanization" && !checked
                  ? "????"
                  : kanas[currentIndex].romanization
              }
            </p>
        </div>
      </div>
      }

      <p>Select the correct answer</p>
      <div className="w-full sm:w-fit grid grid-cols-4 gap-2">
        {answers.length > 0 &&
          answers.map((kana, index) => {

            return(
              <button disabled={checked} key={kana.char_id} onClick={()=>{
                selectKana(index)
                setCurrentAnswer(kana)
                }} className={
                  `${checked && currentAnswerIndex === index
                      ? isCorrect
                        ? "bg-emerald-500 text-white" 
                        : "bg-red-500 text-white"
                      : index === currentAnswerIndex 
                      ? "bg-slate-800 text-white" 
                      : "bg-white disabled:opacity-50"
                    } 
                    p-5  rounded-lg shadow-md cursor-pointer`
                  }>
                  <p className="text-3xl ">
                    { questionType === "character"
                        ? kana.character
                        : kana.romanization
                    }
                  </p>
                </button>
            )
          }
        )
        }
      </div>
      <button disabled={currentAnswerIndex === null} onClick={() => {
        if (checked) {
          if (currentIndex === kanas.length - 1) {
            handleFinishPractice();
          } else {
            handleNextKana();
          }
        } else {
          handleCheckAnswer();
        }
      }} className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50 enabled:cursor-pointer">
        { checked
            ? currentIndex === kanas.length - 1
              ? "End practice"
              : "Next Kana"
            : "Confirm"
        }
      </button>
    </div>
  );
};

export default KanaPractice;