import KanjiCircle from "@components/KanjiCircle"
import { n5Lessons } from "@data/index"
import { type CompleteKanji } from "types"

const N5 = () => {

  return (
    <div className=" grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
      {
        n5Lessons.map((lesson:CompleteKanji[], index) => {
          return (
            <div key={`n5 lesson ${index+1}`} className="w-full justify-between flex items-center sm:flex-col gap-2">
              <KanjiCircle size={"w-20 h-20 sm:w-30 sm:h-30"} text={"text-xl sm:text-3xl"}>
                {lesson[0].kanji}
              </KanjiCircle>
              <h2 className="text-center font-medium text-slate-800">Lesson {index+1}</h2>
            </div>
          )
        })
      }


    </div>
  )
}

export default N5