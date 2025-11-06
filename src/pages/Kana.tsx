import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { hiraganaFormated, katakanaFormated } from "@data/index";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useKanjiStore } from "store/store";

const Kana = () => {
	const { kana } = useParams();
	const { kanaArray, setKanaArray } = useKanjiStore((state) => state);
	const navigate = useNavigate();
	useEffect(() => {
		const kanaType = kana === "Hiragana" ? hiraganaFormated : katakanaFormated;
		setKanaArray(kanaType);
	}, [kana, setKanaArray]);

	const handlePractice = () => {
		navigate(`/kana/practice/${kana}`);
	};

	return (
		<div className="kana">
			<BackButton />
			<h1 className="text-center text-xl font-bold text-slate-800 sm:text-3xl mb-4 sm:mb-8 mt-2.5">
				{kana}
			</h1>
			<div className="flex justify-center">
				<Button handleFunction={handlePractice}>Practice</Button>
			</div>
			<div className="grid">
				{kanaArray.length > 0 &&
					kanaArray.map((kanaRow) => {
						return (
							<div
								key={`kana-row-${Date.now()}`}
								className={`text-center grid
                  ${
										kanaRow.length > 3
											? "grid-cols-5"
											: kanaRow.length > 1
												? "grid-cols-3"
												: ""
									} sm:grid-cols-5`}
							>
								{kanaRow.map((kana) => {
									return (
										<div key={kana.char_id} className="p-3 border-b-3">
											<h2 className="text-xl sm:text-2xl text-slate-500 mb-1">
												{kana.romanization}
											</h2>
											<p className="text-4xl sm:text-5xl">{kana.character}</p>
										</div>
									);
								})}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Kana;
