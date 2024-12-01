import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { MdOutlineMenu } from "react-icons/md";
import Navigation from "../pages/auth/Navigation";
import { useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const togleSidebar = () => {
    setShowSidebar(!showSidebar);
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

  if (logoutLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="bg-blue-500 text-white py-4 shadow-md fixed  w-full">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Technic Department
          </Link>

          <nav className="flex items-center space-x-4">
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
                  Submit Request
                </Link>

                <div className=" flex items-center space-x-4 relative group">
                  <button className="hover:underline">{userInfo.name}</button>
                  <button
                    className="block w-full px-4 py-2 hover:bg-blue-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
                <button onClick={togleSidebar} className="">
                  <MdOutlineMenu />
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {showSidebar && (
        <div className="fixed top-[71px] left-0 h-[100vh] w-[15%] bg-gray-800 text-white shadow-lg z-40">
          <Navigation closeSidebar={() => setShowSidebar(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
