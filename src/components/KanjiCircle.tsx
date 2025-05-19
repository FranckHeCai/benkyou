import { type KanjiCircleProps } from "types";

const KanjiCircle = ({children, size, text}:KanjiCircleProps) => {
  return (
    <div className={`${size} ${text} font-medium rounded-full text-white bg-slate-800 flex items-center justify-center`} >{children}
    </div>
  );
};

export default KanjiCircle;