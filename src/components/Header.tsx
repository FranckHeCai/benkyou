const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-2">
        <img className="w-10 h-10 sm:w-15 sm:h-15" src="/logo.png" alt="benkyou logo" />
        <h1 className='text-4xl font-bold text-slate-800'>Benkyou</h1>
      </div>
      <h2 className="mt-2 text-slate-700 text-sm sm:text-xl">Your Pathway to Kanji Mastery.</h2>
    </div>
  );
};

export default Header;