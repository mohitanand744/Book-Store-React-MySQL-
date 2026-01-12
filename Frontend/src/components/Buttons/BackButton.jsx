import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ label = "Back", to = -1, className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className={`mx-auto mb-8 ${className}`}>
      <button
        onClick={() => navigate(to)}
        className="
  group inline-flex items-center gap-2
  rounded-full
  bg-gradient-to-r from-[#5C4C49] to-[#D3BD9D]
  px-5 py-2.5 text-sm font-semibold text-white
  shadow-md transition-all duration-200
  hover:shadow-lg hover:brightness-110
  active:scale-95
"
      >
        <FaArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default BackButton;
