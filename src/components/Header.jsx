import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="flex justify-between items-center p-2 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">ChatApp</h1>
      <div className="flex items-center">
        {/* Placeholder for settings or additional options */}
        <button className="p-2 w-12 h-12 rounded-full hover:bg-blue-600 flex items-center justify-center" onClick={() => navigate("/user")}>
          <img src="/settings.svg" alt="Settings" className="w-6 h-6" />
        </button>
        <button className="p-2 w-12 h-12 rounded-full hover:bg-blue-600 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-red-300 flex items-center justify-center text-black" onClick={() => logout()}>
            A
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
