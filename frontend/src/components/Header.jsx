import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice";
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
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await logout().unwrap();
        dispatch(clearUserInfo());
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error("Error logging out");
      }
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
      <header className="bg-blue-500 text-white py-1 flex  items-center shadow-md fixed w-full z-50">
        <div className="flex justify-between mx-auto w-full items-center">
          <div className="ml-20">
            <Link to="/" className="text-2xl font-bold">
              <img src={image} alt="logo" width={50} height={50} />
            </Link>
          </div>
          <div className=" flex items-center justify-between">
            <nav className="sm:flex sm:items-center sm:space-x-4 mr-10 hidden">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black p-2 rounded-lg  text-white"
                    : "text-white"
                }
              >
                Home
              </NavLink>
              {!userInfo ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-black p-2 rounded-lg  text-white"
                        : "text-white"
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-black p-2 rounded-lg  text-white"
                        : "text-white"
                    }
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/request"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-black p-2 rounded-lg  text-white"
                        : "text-white"
                    }
                  >
                    Request form
                  </NavLink>

                  <button
                    className="block px-2 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>

            {userInfo ? (
              <button className="rounded-full bg-blue-700 text-white text-center px-4 py-2 mr-10 hover:bg-blue-800">
                <Link to="/profile" className="hover:underline">
                  {/* Render the First spealing Caps */}
                  <p className="text-2xl font-bold">
                    {userInfo?.username?.charAt(0)?.toUpperCase()}
                  </p>
                </Link>
              </button>
            ) : (
              <></>
            )}
            <div className="">
              <button onClick={toggleSidebar} className="text-2xl mr-8">
                <MdOutlineMenu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showSidebar && (
        <>
          {/* Sidebar */}
          <div
            id="sidebar"
            className="fixed top-[58px] left-0 h-[100vh] pl-2 w-[35%] sm:w-[15%] bg-black text-white shadow-lg z-40"
          >
            <Navigation
              closeSidebar={closeSidebar}
              handleLogout={handleLogout}
            />
          </div>

          {/* Overlay */}
          <div
            className="fixed top-[58px] left-0 h-[100vh] w-full bg-black opacity-50 z-30"
            onClick={closeSidebar}
          ></div>
        </>
      )}
    </>
  );
};

export default Header;
