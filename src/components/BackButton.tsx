import BackIcon from "@icons/BackIcon";
import { useNavigate } from "react-router-dom";

const BackButton = ({ route }: { route?: string }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		route ? navigate(route) : navigate(-1);
		window.scrollTo({ top: 0 });
	};
	return (
		<button
			onClick={handleBack}
			className="absolute top-4 left-7 sm:left-10 cursor-pointer"
			type="button"
		>
			<BackIcon />
		</button>
	);
};

export default BackButton;
