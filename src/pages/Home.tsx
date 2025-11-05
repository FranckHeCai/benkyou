import { useNavigate } from "react-router-dom"
import { n1, n2, n3, n4, n5, hiragana, katakana } from "@data/index"
import type { Level, KanaType } from "types"
import KanjiCircle from "@components/KanjiCircle"
import Header from "@components/Header"



const Home = () => {
  const levels:Level[] = [1, 2, 3, 4, 5]
  const navigate = useNavigate()
  const handleLevel = (level:Level) => {
    navigate(`/kanjis/jlpt/${level}`)
  }

  const handleKana = (kana:KanaType) => {
    navigate(`/kana/${kana}`)
  }

  return (
    <div className="text-slate-800 flex flex-col p-3 sm:p-4">
      <Header />
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <div>
          <h2 className="text-base sm:text-lg font-medium text-center mb-2 sm:mb-4">Study Kanjis</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-5 sm:gap-6">
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
                      const firstKanji = kanjiList[kanjiIndex]
                      return (
                        <button className="rounded flex flex-col justify-center items-center gap-1 sm:gap-3 cursor-pointer" onClick={()=>{handleLevel(level)}} key={level}>
                            <KanjiCircle size={"w-30 h-30 sm:w-35 sm:h-35 md:w-40 md:h-40"} text={"text-4xl sm:text-5xl md:text-6xl"} color="bg-slate-800">
                                {firstKanji?.kanji}
                            </KanjiCircle>
                            <p className="text-xl sm:text-3xl font-bold">N{level}</p>
                        </button>
                      )
                    })
                  }
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-base sm:text-lg font-medium text-center mb-2 sm:mb-4">Study the basics</h2>
          <div className="w-full md:w-fit grid grid-cols-2 justify-between md:gap-8 lg:gap-20">
            <button onClick={()=>{handleKana("Hiragana")}} className="flex flex-col items-center cursor-pointer">
              <KanjiCircle text={"text-3xl sm:text-6xl md:text-7xl"} size="w-30 h-30 sm:w-35 sm:h-35 md:w-40 md:h-40" color="bg-amber-800">
                <p>{hiragana[0].character}</p>
              </KanjiCircle>
              <p className="text-xl sm:text-3xl font-bold text-amber-800 mt-3">Hiragana</p>
            </button>
            <button onClick={()=>{handleKana("Katakana")}} className="flex flex-col items-center cursor-pointer">
              <KanjiCircle text={"text-3xl sm:text-6xl md:text-7xl"} size="w-30 h-30 sm:w-35 sm:h-35 md:w-40 md:h-40" color="bg-amber-800">
                <p>{katakana[0].character}</p>
              </KanjiCircle>
              <p className="text-xl sm:text-3xl font-bold text-amber-800 mt-3">Katakana</p>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home