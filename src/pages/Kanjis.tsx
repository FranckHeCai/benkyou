import BackButton from "@components/BackButton";
import KanjiCircle from "@components/KanjiCircle";
import DownArrow from "@icons/DownArrow";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectLessons, selectLevel } from "services/selectLesson";
import { shuffleKanjis } from "services/shuffle";
import { useKanjiStore } from "store/store";
import type { CompleteKanji, KanjiLesson } from "types";

const Kanjis = () => {
	const navigate = useNavigate();
	const [lessonRange, setLessonRange] = useState("0-3");
	const { kanji } = useParams();
	const {
		kanjiLessons,
		setKanjiLessons,
		setKanjiLevel,
		kanjiPracticeArray,
		setKanjiPracticeArray,
	} = useKanjiStore((state) => state);
	const handleLesson = (lesson: number) => {
		navigate(`/kanjis/jlpt/${kanji}/lesson/${lesson}`);
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		const kanjiLevel = Number(kanji);
		if (kanjiLevel !== undefined) {
			// setLessons(selectLessons(kanjiLevel))
			setKanjiLevel(selectLevel(kanjiLevel));
			setKanjiLessons(selectLessons(kanjiLevel));
		}
	}, [kanji, setKanjiLessons, setKanjiLevel]);

	useEffect(() => {
		if (!kanjiLessons || !lessonRange) return;
		const [from, to] = lessonRange.split("-").map(Number);
		if (Number.isNaN(from) || Number.isNaN(to)) return;
		const kanjiRange = kanjiLessons.slice(from, to + 1);
		const kanjiArray = kanjiRange.flat();
		setKanjiPracticeArray(kanjiArray);
	}, [lessonRange, kanjiLessons, setKanjiPracticeArray]);

	const handlePractice = () => {
		setKanjiPracticeArray(shuffleKanjis(kanjiPracticeArray));
		navigate(`/kanjis/jlpt/${kanji}/practice`);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="text-slate-800 p-3 sm:p-4">
			<BackButton />
			<h1 className="text-center text-xl font-bold text-slate-800 sm:text-3xl mb-4 sm:mb-10 mt-4 sm:mt-0">
				JLPT {kanji}
			</h1>
			{/* Practice Lessons Select */}
			{kanjiLessons && (
				<div className="sm:pl-6 mb-4 sm:6 flex flex-col sm:flex-row gap-1 sm:items-center sm:gap-3">
					<label
						className="text-sm sm:text-lg font-medium"
						htmlFor="lesson-range"
					>
						Practice Lessons
					</label>
					{/* Dropdown */}
					<div className="relative">
						<select
							name="lesson-range"
							id="lesson-range"
							className=" text-sm sm:text-base custom-scrollbar w-full sm:w-60 appearance-none border-2 border-slate-800 rounded bg-slate-800 text-white px-2 py-1 cursor-pointer"
							onChange={(e) => {
								const [from, to] = e.target.value.split("-");
								setLessonRange(`${from}-${to}`);
							}}
						>
							<option className="disabled:text-slate-400 " value="" disabled>
								Select lesson range
							</option>
							{Array.from({ length: Math.ceil(kanjiLessons.length / 4) }).map(
								(_, index) => {
									const from = index * 4;
									const to = Math.min(
										(index + 1) * 4 - 1,
										kanjiLessons.length - 1,
									);
									return (
										<option key={Date.now()} value={`${from}-${to}`}>
											lesson {from + 1} to lesson {to + 1}
										</option>
									);
								},
							)}
						</select>
						<span className="text-slate-50 absolute right-2 top-1 sm:top-1.5 pointer-events-none">
							<DownArrow />
						</span>
					</div>

					{/* Practice Button */}
					<button
						type="button"
						onClick={handlePractice}
						className="text-sm sm:text-base px-4 py-2 bg-slate-800 text-white rounded cursor-pointer"
					>
						Practice
					</button>
				</div>
			)}
			{/* Lessons Grid */}
			<div className="grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
				{kanjiLessons?.map((lesson: KanjiLesson, index) => {
					return (
						<button
							type="button"
							onClick={() => {
								handleLesson(index);
							}}
							key={`n5 lesson ${index + 1}`}
							className="w-full flex items-center sm:flex-col gap-4 cursor-pointer rounded-xl border-2 border-transparent hover:border-slate-800 hover:shadow-md transition-all duration-300 py-4 px-6"
						>
							<KanjiCircle
								size={"w-20 h-20 sm:w-30 sm:h-30"}
								text={"text-xl sm:text-3xl"}
								color="bg-slate-800"
							>
								{lesson?.[0]?.kanji}
							</KanjiCircle>
							<div>
								<h2 className="text-center text-xl font-medium text-slate-800 mb-1">
									Lesson {index + 1}
								</h2>
								<p className="flex sm:justify-center gap-1 text-slate-800 text-sm">
									{lesson?.map((kanji: CompleteKanji) => {
										return <span key={kanji.kanji}>{kanji.kanji}</span>;
									})}
								</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Kanjis;
