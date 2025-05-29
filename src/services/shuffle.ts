import type { CompleteKanji } from "types"
export const shuffleKanjis = (array:CompleteKanji[]) =>{
    const finalArray = [...array].sort(()=> Math.random() - 0.5 )
    return finalArray
  }

export const shuffleAnswers = (array:CompleteKanji[]) =>{
  const newArray = Array.from({length: 4}, ()=>{
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  })
  const finalArray = [...array, ...newArray].sort(()=> Math.random() - 0.5 )
  return finalArray
}