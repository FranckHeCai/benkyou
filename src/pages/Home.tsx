import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { n1, n2, n3, n4, n5 } from "@data/index"
import type { CompleteKanji } from "types"

type Level = "N1" | "N2" | "N3" | "N4" | "N5"



const Home = () => {
  const levels:Level[] = ["N1", "N2", "N3", "N4", "N5"]
  const navigate = useNavigate()
  const handleLevel = (level:Level) => {
    navigate(`/kanji/${level}`)
  }

  return (
    <div className="text-slate-800 flex flex-col items-center">
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 w-full gap-5 sm:gap-8">
        {
          levels.map(level => {
            const kanjiList = level === "N1"
              ? n1
              : level === "N2"
                ? n2
                : level === "N3"
                  ? n3
                  : level === "N4"
                    ? n4
                    : n5
            const kanjiIndex = Math.floor(Math.random() * kanjiList.length+1)
            const firstKanji:CompleteKanji = kanjiList[kanjiIndex]

            return (
              <button className="rounded flex flex-col justify-center items-center gap-1 sm:gap-3" onClick={()=>{handleLevel(level)}} key={level}>

                  <div className=" w-30 h-30 sm:w-50 sm:h-50 text-4xl sm:text-7xl font-medium rounded-full text-white bg-slate-800 flex items-center justify-center" >{firstKanji.kanji}
                  </div>
                  <p className="text-xl sm:text-3xl font-bold">{level}</p>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home