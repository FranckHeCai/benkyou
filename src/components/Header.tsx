import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div onClick={()=>{navigate("/")}} className="flex items-center gap-2">
        <img className="w-15 h-15 sm:w-25 sm:h-25" src="/logo.png" alt="benkyou logo" />
        <h1 className='hidden sm:block sm:text-4xl font-bold text-slate-800'>Benkyou</h1>
      </div>
      <h2 className="hidden sm:block mt-4 text-slate-700 text-sm sm:text-xl">Your Pathway to Kanji Mastery.</h2>
    </div>
  );
};

export default Header;