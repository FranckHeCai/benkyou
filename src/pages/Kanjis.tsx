import KanjiCircle from "@components/KanjiCircle"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { selectLesson } from "services/selectLesson"
import { type KanjiLesson, type KanjiLessons, type CompleteKanji } from "types"

const Kanjis = () => {
  const navigate = useNavigate()
  const [lessons, setLessons] = useState<KanjiLessons>(null)
  const { kanji } = useParams()
  const handleLesson = (lesson:number) =>{
    navigate(`/kanjis/jlpt/${kanji}/lesson/${lesson}`)
  }

  useEffect(()=>{
    const kanjiLevel = Number(kanji)
    if(kanjiLevel!==undefined){
      setLessons(selectLesson(kanjiLevel))
    }
  },[kanji])

  return (
    <div className=" grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
      { lessons &&
        lessons.map((lesson:KanjiLesson, index) => {
          return (
            <button onClick={()=>{handleLesson(index)}} key={`n5 lesson ${index+1}`} className="w-full flex items-center sm:flex-col gap-4">
              <KanjiCircle size={"w-20 h-20 sm:w-30 sm:h-30"} text={"text-xl sm:text-3xl"}>
                {lesson[0].kanji}
              </KanjiCircle>
              <div>
                <h2 className="text-center font-medium text-slate-800 mb-2">Lesson {index+1}</h2>
                <p className="flex gap-1 text-slate-800 text-sm">
                  {
                    lesson.map((kanji:CompleteKanji)=>{
                      return(
                        <span>
                          {kanji.kanji}
                        </span>
                      )
                    })
                  }
                </p>
              </div>
            </button>
          )
        })
      }


    </div>
  )
}

export default Kanjis