import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Extract kanji param from path if on a lesson page
	return (
		<div className="flex justify-center p-3">
			<button
				type="button"
				onClick={() => {
					navigate(`/`);
				}}
				className="flex items-center text-left gap-2 cursor-pointer"
			>
				<img
					className="w-15 h-15 sm:w-25 sm:h-25"
					src="/logo.png"
					alt="benkyou logo"
				/>
				<div>
					<h1 className="hidden sm:block sm:text-4xl font-bold text-slate-800 mb-1">
						Benkyou
					</h1>
					<h2 className="hidden sm:block text-slate-500 text-sm sm:text-lg">
						Your Pathway to Kanji Mastery.
					</h2>
				</div>
			</button>
			{location.pathname !== "/" && <BackButton />}
		</div>
	);
};

export default Header;
