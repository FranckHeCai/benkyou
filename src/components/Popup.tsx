import { useKanjiStore } from "store/store";

const Popup = ({children}:{children:React.ReactNode}) => {
    const { setPopup } = useKanjiStore()
    return (
        <div className=" fixed top-0 z-10 w-full h-screen flex items-center justify-center p-3 bg-slate-800/50">
            <div className="animate-(--fade-in) bg-slate-50 p-3 sm:p-6 w-full max-w-lg rounded-lg">
                {children}
                <button onClick={setPopup} className="mt-4 mx-auto block px-4 py-2 bg-slate-800 text-white rounded cursor-pointer">Close</button>
            </div>
        </div>
    );
};

export default Popup;