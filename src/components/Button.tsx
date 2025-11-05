interface ButtonProps {
  handleFunction: () => void
  children: string
}
const Button = ({handleFunction, children}:ButtonProps) => {
  return (
    <button onClick={handleFunction} className="text-sm sm:text-base px-4 py-2 bg-slate-800 text-white rounded cursor-pointer">
            {children}
    </button>
  );
};

export default Button;