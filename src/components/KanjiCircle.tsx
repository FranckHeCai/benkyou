import type { KanjiCircleProps } from "types";

const KanjiCircle = ({ children, size, text, color }: KanjiCircleProps) => {
	return (
		<div
			className={`${size} ${text} font-medium rounded-full text-white ${color} flex items-center justify-center`}
		>
			{children}
		</div>
	);
};

export default KanjiCircle;
