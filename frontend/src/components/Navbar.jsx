import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoReorderThree } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import logo from "../assets/Licxo.jpg";

const useAuth = () => {
  return !!localStorage.getItem("token");
};

const getUsername = () => {
  return localStorage.getItem("username") || ""; // Assume username is stored in localStorage
};

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const username = isAuthenticated ? getUsername() : "";

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="lg:flex items-center justify-between border-b h-14 bg-blue-950 text-white shadow-md hidden">
        <img src={logo} alt="" className="w-32 h-14" />
        <div className="flex items-center pr-4 space-x-4">
          {isAuthenticated ? (
            <Link
              to="/addhotel"
              className="flex items-center px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              <IoMdAddCircleOutline className="mr-1 text-xl" />
              Add Listing
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              <IoMdAddCircleOutline className="mr-1 text-xl" />
              Sign up
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
          {isAuthenticated && (
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg text-white">
              {username[0].toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 w-full h-14 border border-blue-950 bg-blue-950 flex items-center justify-between z-10 lg:hidden">
        <img src={logo} alt="logo" className="h-14 border-b" />
        <div className="flex gap-2 items-center">
          <button className="flex items-center justify-center w-10 h-10 text-4xl text-white">
            {isAuthenticated ? (
              <span className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center text-lg">
                {username[0].toUpperCase()}
              </span>
            ) : (
              <IoPersonCircleSharp />
            )}
          </button>
          <button className="text-white text-5xl">
            <IoReorderThree />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
