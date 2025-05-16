import type { Word } from "types";

const PopupKanji = (kanji:Word) => {
  return (
    <div className="bg-white rounded shadow p-8 w-80 flex flex-col items-center">
        <h2 className="text-7xl mb-4">{kanji.word}</h2>
        <div className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">Onyomi:</span> {kanji.meaning}
        </div>
        <div className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">Kunyomi:</span> {kanji.furigana}
        </div>
        <p className="text-md text-gray-500">{kanji.romaji}</p>
      </div>
  );
};

export default PopupKanji;