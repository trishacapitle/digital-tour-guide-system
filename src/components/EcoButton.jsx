import { Link } from "react-router-dom";
import EcoImg from "../assets/eco-big.svg";
import useMode from "../hooks/useMode";

const EcoButton = () => {
  const { setMode } = useMode();

  const handleClick = () => {
    setMode("eco");
  };

  return (
    <div>
      <Link to="/mainlayout">
        <button className="bg-none border-none" onClick={handleClick}>
          <img src={EcoImg} alt="Eco Button" />
        </button>
      </Link>
    </div>
  );
};

export default EcoButton;
