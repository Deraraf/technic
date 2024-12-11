import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import { useGetProfileUserQuery } from "../redux/api/userApiSlice";
import { clearUserInfo } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { MdOutlineMenu } from "react-icons/md";
import Navigation from "../pages/auth/Navigation";
import image from "../assets/ecsu image.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const { data } = useGetProfileUserQuery();

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUserInfo());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        closeSidebar();
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  if (logoutLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="bg-blue-500 text-white py-2 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src={image} alt="logo" className="w-12 h-12" />
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {!userInfo ? (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/request" className="hover:underline">
                  Request form
                </Link>
                <p className="p-4 border-b-2 border-blue-800 text-slate-950 text-2xl">
                  {data?.username}
                </p>
                <div className="relative group">
                  <button className="hover:underline">{userInfo.name}</button>
                  <button
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>

          <button
            onClick={toggleSidebar}
            className="md:hidden text-3xl text-white focus:outline-none"
          >
            <MdOutlineMenu />
          </button>
        </div>
      </header>

      {showSidebar && (
        <>
          {/* Sidebar */}
          <div
            id="sidebar"
            className="fixed top-[58px] left-0 h-[calc(100vh-58px)] w-2/3 sm:w-1/3 bg-gray-800 text-white shadow-lg z-40"
          >
            <Navigation closeSidebar={closeSidebar} />
          </div>

          {/* Overlay */}
          <div
            className="fixed top-[58px] left-0 h-[calc(100vh-58px)] w-full bg-black opacity-50 z-30"
            onClick={closeSidebar}
          ></div>
        </>
      )}
    </>
  );
};

export default Header;
