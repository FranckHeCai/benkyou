import BackIcon from '@icons/BackIcon';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
    const navigate = useNavigate()

    const handleBack = () => {
    navigate(-1)
  }
    return (
        <button onClick={handleBack} className="absolute top-8 left-11">
        <BackIcon />
        </button>
    );
};

export default BackButton;