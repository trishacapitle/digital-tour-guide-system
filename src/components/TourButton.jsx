import { Link } from "react-router-dom";
import TourImg from "../assets/tour-big.svg";
import useMode from "../hooks/useMode";

const TourButton = () => {
  const { setMode } = useMode();

  const handleClick = () => {
    setMode("tour");
  };

  return (
    <div>
      <Link to="/mainlayout">
        <button className="bg-none border-none" onClick={handleClick}>
          <img src={TourImg} alt="Tour Button" />
        </button>
      </Link>
    </div>
  );
};

export default TourButton;
