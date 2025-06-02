import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { hiragana, katakana, hiraganaFormated, katakanaFormated } from "@data/index";
import { useKanjiStore } from "store/store";
import BackButton from "@components/BackButton";

const Kana = () => {
  const { kana } = useParams()
  const {kanaArray, setKanaArray} = useKanjiStore(state => state)
  
  useEffect(()=>{
    const kanaType = kana === "Hiragana" ? hiraganaFormated : katakanaFormated
    setKanaArray(kanaType)
  },[])

  return (
    <div className="kana">
      <BackButton route="/" />
      <h1 className="text-center text-xl font-bold text-slate-800 sm:text-3xl mb-4 sm:mb-8 mt-2.5">{kana}</h1>
      <div className="grid">
        { kanaArray.length > 0 &&
          kanaArray.map((kanaRow, index) => {
            return(
              <div key={index} 
              className={
                `text-center grid
                  ${kanaRow.length > 3
                    ? 'grid-cols-5'
                    : kanaRow.length > 1
                      ? 'grid-cols-3'
                      : ''

                  } sm:grid-cols-5`
                }>
                {
                  kanaRow.map(kana => {
                    return(
                      <div key={kana.char_id} className="p-3 border-b-3" >
                        <h2 className="text-xl sm:text-2xl text-slate-500 mb-1">{kana.romanization}</h2>
                        <p className="text-4xl sm:text-5xl">{kana.character}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Kana;