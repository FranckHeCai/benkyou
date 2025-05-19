import React, { useState } from "react"
import { n5Lessons } from "@data/index"
import { type CompleteKanji } from "types"

const N5 = () => {

  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      {
        n5Lessons.map((lesson:CompleteKanji[]) => {
          return (
            <div className="p-5 border-slate-700 rounded">
              
            </div>
          )
        })
      }


    </div>
  )
}

export default N5