import { useNavigate } from "react-router-dom"
import KanjiCircle from "./KanjiCircle"

export default function StudyButton({name, char, route,isBasic}: {name:string, char:string, route:string, isBasic?:boolean}) {
  const navigate = useNavigate()
    const handleLevel = () => {
        navigate(route)
      }
    return (
        <button className="rounded flex flex-col justify-center items-center gap-1 sm:gap-3 cursor-pointer rounded-xl border-2 border-transparent hover:border-blue-500 hover:shadow-md transition-all duration-300 py-4 px-6" onClick={()=>{handleLevel()}} >
            <KanjiCircle size={"w-30 h-30 sm:w-35 sm:h-35 md:w-40 md:h-40"} text={"text-4xl sm:text-5xl md:text-6xl"} color={ !isBasic ? "bg-slate-800" : "bg-amber-800"}>
                {char}
            </KanjiCircle>
            <p className={`text-xl sm:text-3xl font-bold ${isBasic ? "text-amber-800" : ""}`}>{name}</p>
        </button>
    )
}