import KanjiCircle from "@components/KanjiCircle"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { selectLessons } from "services/selectLesson"
import { type KanjiLessons, type CompleteKanji, type KanjiLesson } from "types"

const Kanjis = () => {
  const navigate = useNavigate()
  const [lessons, setLessons] = useState<KanjiLessons>(null)
  const { kanji } = useParams()
  const handleLesson = (lesson:number) =>{
    navigate(`/kanjis/jlpt/${kanji}/lesson/${lesson}`)
    window.scrollTo({top: 0})
  }

  useEffect(()=>{
    const kanjiLevel = Number(kanji)
    if(kanjiLevel!==undefined){
      setLessons(selectLessons(kanjiLevel))
    }
  },[kanji])

  return (
    <div className=" grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
      { lessons &&
        lessons.map((lesson:KanjiLesson, index) => {
          return (
            <button onClick={()=>{handleLesson(index)}} key={`n5 lesson ${index+1}`} className="w-full flex items-center sm:flex-col gap-4">
              <KanjiCircle size={"w-20 h-20 sm:w-30 sm:h-30"} text={"text-xl sm:text-3xl"}>
              {lesson && lesson[0].kanji}
              </KanjiCircle>
              <div>
                <h2 className="text-center text-xl font-medium text-slate-800 mb-1">Lesson {index+1}</h2>
                <p className="flex sm:justify-center gap-1 text-slate-800 text-sm">
                  { lesson &&
                    lesson.map((kanji:CompleteKanji)=>{
                      return(
                        <span key={kanji.kanji}>
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