import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import { useGetRecentRequestsQuery } from "../../redux/api/requestApiSlice";

const Navigation = ({ closeSidebar, handleLogout }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: recentRequests } = useGetRecentRequestsQuery();

  return (
    <>
      {userInfo && (
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
            <Link
              to="/"
              className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
              onClick={closeSidebar}
            >
              Home
            </Link>
            <Link
              to="/request"
              className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs "
              onClick={closeSidebar}
            >
              Request Form
            </Link>
          </div>

          {/* Admin/Other Links */}
          <div className="flex flex-col items-center w-full space-y-8">
            {userInfo?.isAdmin ? (
              <>
                <Link
                  to="/admin/recent-requests"
                  className="flex items-center space-x-2 text-sm lg:text-base text-center"
                  onClick={closeSidebar}
                >
                  <FaBell className="text-xl" />
                  {recentRequests?.length > 0 && (
                    <span className="bg-red-600 text-white rounded-full text-xs px-2">
                      {recentRequests?.length}
                    </span>
                  )}
                  <span>Recent Requests</span>
                </Link>
                <Link
                  to="/profile"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  onClick={closeSidebar}
                >
                  Profile
                </Link>
                <Link
                  to="/admin/userlist"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  onClick={closeSidebar}
                >
                  User List
                </Link>
                <Link
                  to="/admin/requestlist"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  onClick={closeSidebar}
                >
                  Request List
                </Link>
                <Link
                  to="/admin/equipmentlist"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  onClick={closeSidebar}
                >
                  Equipment List
                </Link>
                <Link
                  to="/logout"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs sm:hidden"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  onClick={closeSidebar}
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="hover:bg-slate-950 bg-slate-900 px-6 py-3 rounded-lg text-sm lg:text-base text-center w-full max-w-xs"
                  onClick={closeSidebar}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
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
