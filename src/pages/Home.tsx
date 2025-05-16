import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { n1, n2, n3, n4, n5 } from "@data/index"
import type { Word } from "types"

type Level = "N1" | "N2" | "N3" | "N4" | "N5"

const Home = () => {
  const levels:Level[] = ["N1", "N2", "N3", "N4", "N5"]
  const navigate = useNavigate()
  const handleLevel = (level:Level) => {
    navigate(`/kanji/${level}`)
  }

  return (
    <div className="text-slate-800 flex flex-col items-center">
      <h2 className="mt-2 text-slate-700">Your Pathway to Kanji Mastery.</h2>
      <div className="mt-5 grid sm:grid-cols-3 w-full gap-3">
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
            const firstKanji:Word = kanjiList[kanjiIndex]

            return (
              <button className="py-1 px-3 border-2 border-slate-800 rounded" onClick={()=>{handleLevel(level)}} key={level}>

                  <div className="w-40 h-40 text-3xl font-medium rounded-full text-white bg-slate-800" >{firstKanji.word}
                  </div>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home