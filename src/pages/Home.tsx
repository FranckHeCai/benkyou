import { useNavigate } from "react-router-dom"
import { n1, n2, n3, n4, n5 } from "@data/index"
import type { CompleteKanji, Level } from "types"
import KanjiCircle from "@components/KanjiCircle"



const Home = () => {
  const levels:Level[] = [1, 2, 3, 4, 5]
  const navigate = useNavigate()
  const handleLevel = (level:Level) => {
    navigate(`/kanjis/jlpt/${level}`)
  }

  return (
    <div className="text-slate-800 flex flex-col items-center">
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 w-full gap-5 sm:gap-8">
        {
          levels.map(level => {
            const kanjiList = level === 1
              ? n1
              : level === 2
                ? n2
                : level === 3
                  ? n3
                  : level === 4
                    ? n4
                    : n5
            const kanjiIndex = Math.floor(Math.random() * kanjiList.length+1)
            const firstKanji:CompleteKanji = kanjiList[kanjiIndex]

            return (
              <button className="rounded flex flex-col justify-center items-center gap-1 sm:gap-3" onClick={()=>{handleLevel(level)}} key={level}>

                  {/* <div className=" w-30 h-30 sm:w-50 sm:h-50 text-4xl sm:text-7xl font-medium rounded-full text-white bg-slate-800 flex items-center justify-center" >{firstKanji.kanji}
                  </div> */}
                  <KanjiCircle size={"w-30 h-30 sm:w-45 sm:h-45"} text={"text-4xl sm:text-6xl"}>
                      {firstKanji.kanji}
                  </KanjiCircle>
                  <p className="text-xl sm:text-3xl font-bold">N{level}</p>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home