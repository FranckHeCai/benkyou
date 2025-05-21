import BackIcon from '@icons/BackIcon';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ route }: { route: string }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(route);
        window.scrollTo({ top: 0 });
    };
    return (
        <button onClick={handleBack} className="absolute top-8 left-11">
            <BackIcon />
        </button>
    );
};

export default BackButton;