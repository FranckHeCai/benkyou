import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { hiragana, katakana } from "@data/index";
import { useKanjiStore } from "store/store";
import BackButton from "@components/BackButton";

const Kana = () => {
  const { kana } = useParams()
  const {kanaArray, setKanaArray} = useKanjiStore(state => state)
  
  useEffect(()=>{
    const kanaType = kana === "Hiragana" ? hiragana : katakana
    setKanaArray(kanaType)
  },[])

  return (
    <div>
      <BackButton route="/" />
      <h1 className="text-center text-xl font-bold text-slate-800 sm:text-3xl mb-4 sm:mb-8 mt-2.5">{kana} Practice</h1>
      <div className="grid grid-cols-5">
        { kanaArray.length > 0 &&
          kanaArray.map(kana => {
            return(
              <div key={kana.char_id} className="bg-slate-300 text-center p-3">
                <h2 className="text-xl">{kana.romanization}</h2>
                <p className="text-3xl">{kana.character}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Kana;