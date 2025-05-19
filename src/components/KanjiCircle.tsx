import { type KanjiCircleProps } from "types";

const KanjiCircle = ({children, size}:KanjiCircleProps) => {
  return (
    <div className={` w-${size} h-${size} sm:w-50 sm:h-50 text-4xl sm:text-7xl font-medium rounded-full text-white bg-slate-800 flex items-center justify-center`} >{children}
    </div>
  );
};

export default KanjiCircle;