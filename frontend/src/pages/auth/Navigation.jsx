import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Navigation = ({ closeSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col p-4 space-y-4">
      <button
        onClick={closeSidebar}
        className="self-end text-xl text-white hover:text-gray-400"
      >
        X
      </button>
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link onClick={closeSidebar} to="/request" className="hover:underline">
        Request form
      </Link>
      {/* Add more links as needed */}

      <ul
        className={`absolute items-center mt-2  space-y-2  text-white  rounded-md shadow-lg ${
          userInfo?.isAdmin ? "top-96" : "top-80"
        }`}
      >
        {userInfo?.isAdmin ? (
          <>
            <li>
              <Link
                onClick={closeSidebar}
                to="/profile"
                className="hover:underline"
              >
                profile
              </Link>
            </li>
            <li>
              <Link
                onClick={closeSidebar}
                to="/admin/userlist"
                className="hover:underline"
              >
                UsersList
              </Link>
            </li>
            <li>
              <Link
                onClick={closeSidebar}
                to="/admin/requestlist"
                className="hover:underline"
              >
                RequestsList
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                onClick={closeSidebar}
                to="/profile"
                className="hover:underline"
              >
                profile
              </Link>
            </li>
            <li>
              <Link
                onClick={closeSidebar}
                to="/logout"
                className="hover:underline"
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

Navigation.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default Navigation;
