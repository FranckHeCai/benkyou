const Header = () => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <img className="w-10 h-10 sm:w-15 sm:h-15" src="/logo.png" alt="benkyou logo" />
      <h1 className='text-3xl text-slate-800'>Benkyou</h1>
    </div>
  );
};

export default Header;