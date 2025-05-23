import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "./BackButton";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract kanji param from path if on a lesson page
  let backRoute = "/";
  const lessonMatch = location.pathname.match(/\/kanjis\/jlpt\/(\w+)\/lesson/);
  if (lessonMatch) {
    backRoute = `/kanjis/jlpt/${lessonMatch[1]}`;
  }

  return (
    <div className="flex flex-col justify-center items-center text-center p-5">
      <div onClick={()=>{navigate("/")}} className="flex items-center gap-2">
        <img className="w-15 h-15 sm:w-25 sm:h-25" src="/logo.png" alt="benkyou logo" />
        <h1 className='hidden sm:block sm:text-4xl font-bold text-slate-800'>Benkyou</h1>
      </div>
      <h2 className="hidden sm:block mt-4 text-slate-700 text-sm sm:text-lg">Your Pathway to Kanji Mastery.</h2>
      {location.pathname !== "/" && <BackButton route={backRoute} />}
    </div>
  );
};

export default Header;