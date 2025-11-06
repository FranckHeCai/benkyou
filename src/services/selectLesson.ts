import {
	n1,
	n1Lessons,
	n2,
	n2Lessons,
	n3,
	n3Lessons,
	n4,
	n4Lessons,
	n5,
	n5Lessons,
} from "@data/index";
import type { KanjiLesson, KanjiLessons } from "types";
export const selectLessons = (level: number): KanjiLessons => {
	return level === 5
		? n5Lessons
		: level === 4
			? n4Lessons
			: level === 3
				? n3Lessons
				: level === 2
					? n2Lessons
					: n1Lessons;
};

export const selectLesson = (level: number, index: number): KanjiLesson => {
	const lesson = selectLessons(level);
	return lesson?.[index] ?? null;
};

export const selectLevel = (level: number) => {
	return level === 5
		? n5
		: level === 4
			? n4
			: level === 3
				? n3
				: level === 2
					? n2
					: n1;
};
