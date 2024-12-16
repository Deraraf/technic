import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import { useGetRecentRequestsQuery } from "../../redux/api/requestApiSlice";

const Navigation = ({ closeSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: recentRequests } = useGetRecentRequestsQuery();

  return (
    <div className="flex flex-col justify-center w-full items-center space-y-4">
      <button
        onClick={closeSidebar}
        className="self-end text-xl text-white rounded-[50%] w-8 mr-2 mt-2 h-8 bg-slate-950 hover:text-gray-400"
      >
        X
      </button>
      <Link
        to="/"
        className="hover:bg-slate-950 bg-slate-900  pr-32 pt-3 pb-3 pl-4 rounded-lg  "
      >
        Home
      </Link>
      <Link
        onClick={closeSidebar}
        to="/request"
        className="hover:bg-slate-950 bg-slate-900  pr-32 pt-3 pb-3 pl-4 rounded-lg  "
      >
        Request form
      </Link>
      {/* Add more links as needed */}

      <div
        className={`absolute items-center space-y-8 text-white w-full ml-8 pb-4  rounded-md shadow-xl ${
          userInfo?.isAdmin ? "top-96" : "top-80"
        }`}
      >
        {userInfo?.isAdmin ? (
          <>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/recent-requests"
                className="hover:underline"
                onClick={closeSidebar}
              >
                <div className="relative flex items-center">
                  <FaBell className="text-2xl" />
                  {recentRequests?.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-green-700 rounded-full text-xs px-1">
                      {recentRequests?.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <div className="mt-8">
              <Link
                onClick={closeSidebar}
                to="/profile"
                className="hover:bg-slate-950 bg-slate-900  pr-32 pt-3 pb-3 pl-4 rounded-lg  "
              >
                profile
              </Link>
            </div>
            <div className="mt-8">
              <Link
                onClick={closeSidebar}
                to="/admin/userlist"
                className="hover:bg-slate-950 bg-slate-900 pr-32 pt-3 pb-3 pl-4 rounded-lg"
              >
                UsersList
              </Link>
            </div>
            <div>
              <Link
                onClick={closeSidebar}
                to="/admin/requestlist"
                className="hover:bg-slate-950 bg-slate-900 pr-32 pt-3 pb-3 pl-4 rounded-lg"
              >
                RequestsList
              </Link>
            </div>
            <div>
              <Link
                onClick={closeSidebar}
                to="/admin/equipmentlist"
                className="hover:bg-slate-950 bg-slate-900 pr-32 pt-3 pb-3 pl-4 rounded-lg"
              >
                Equipement List
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link
                onClick={closeSidebar}
                to="/profile"
                className="hover:bg-slate-950 bg-slate-900 pr-32 pt-3 pb-3 pl-4 rounded-lg"
              >
                profile
              </Link>
            </div>
            <div>
              <Link
                onClick={closeSidebar}
                to="/logout"
                className="hover:bg-slate-950 bg-slate-900 pr-32 pt-3 pb-3 pl-4 rounded-lg"
              >
                Logout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default Navigation;
