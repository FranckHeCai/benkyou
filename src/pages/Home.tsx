import { n1, n2, n3, n4, n5, hiragana, katakana } from "@data/index"
import type { Level } from "types"
import Header from "@components/Header"
import StudyButton from "@components/StudyButton"
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const [searchParams] = useSearchParams();
  const levels:Level[] = [1, 2, 3, 4, 5]

  return (
    <div className="text-slate-800 flex flex-col p-3 sm:p-4">
      <Header />
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <div>
          <h2 className="text-base sm:text-lg font-medium text-center mb-2 sm:mb-4">Study Kanjis</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-5 sm:gap-6" key={searchParams.get('t') || 'default'}>
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
                        <StudyButton name={`N${level}`} char={firstKanji.kanji} route={`/kanjis/jlpt/n${level}`} key={`study n${level}`} />
                      )
                    })
                  }
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-base sm:text-lg font-medium text-center mb-2 sm:mb-4">Study the basics</h2>
          <div className="w-full md:w-fit grid grid-cols-2 gap-5 sm:gap-6 place-items-center">
            <StudyButton name={"Hiragana"} char={hiragana[0].character} route={`/kana/Hiragana`} isBasic />
            <StudyButton name={"Katakana"} char={katakana[0].character} route={`/kana/Katakana`} isBasic />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home