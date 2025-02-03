import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import { useGetRecentRequestsQuery } from "../../redux/api/requestApiSlice";

const Navigation = ({ closeSidebar, handleLogout }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: recentRequests } = useGetRecentRequestsQuery();

  return (
    <>
      {userInfo ? (
        <div className="flex flex-col items-center w-full px-4 py-4 space-y-6">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="self-end text-xl text-white rounded-full w-8 h-8 bg-slate-950 hover:text-gray-400"
          >
            X
          </button>

          {/* Links */}
          <div className="flex flex-col items-center w-full space-y-6 mb-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/request"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
              }
            >
              Request Form
            </NavLink>
          </div>

          {/* Admin/Other Links */}
          <div className="flex flex-col items-center w-full space-y-8">
            {userInfo?.isAdmin ? (
              <>
                <NavLink
                  to="/admin/recent-requests"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 flex gap-2 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg flex gap-2 text-sm lg:text-base text-center w-full max-w-xs"
                  }
                >
                  <FaBell className="text-xl" />
                  {recentRequests?.length > 0 && (
                    <span className="bg-red-600 text-white rounded-full text-xs px-2">
                      {recentRequests?.length}
                    </span>
                  )}
                  <span>Recent Requests</span>
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/admin/userlist"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  }
                >
                  User List
                </NavLink>
                <NavLink
                  to="/admin/requestlist"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  }
                >
                  Request List
                </NavLink>
                <NavLink
                  to="/admin/equipmentlist"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  }
                >
                  Equipment List
                </NavLink>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs sm:hidden"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs sm:hidden"
                  }
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                      : "text-white px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  }
                  onClick={closeSidebar}
                >
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center mt-10 ">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-500 py-2 rounded-lg pr-8 pl-8 sm:pr-20 sm:pl-20 text-white"
                : "border pr-8 pl-8 sm:pr-20 sm:pl-20 py-2 rounded-lg text-white"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-500 py-2 rounded-lg pr-5 pl-5 sm:pr-20 sm:pl-20 text-white"
                : "border pr-5 pl-5 sm:pr-20 sm:pl-20 py-2 rounded-lg text-white"
            }
          >
            Register
          </NavLink>
        </div>
      )}
    </>
  );
};

Navigation.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navigation;
