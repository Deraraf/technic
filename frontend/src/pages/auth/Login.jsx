import { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      console.log(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      if (res.error) {
        return toast.error(res.error?.data?.message);
      }

      const { data } = res;
      if (data?.success) {
        dispatch(setUserInfo({ ...data }));
        navigate(redirect);
        return toast.success(data.message);
      }
      toast.error("Unexpected issue during login");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col h-screen items-center justify-center bg-slate-500 p-4">
      <h1 className="text-2xl mb-4 text-white bg-blue-600 px-8 py-2 sm:px-16 sm:py-4 rounded-lg">
        Login
      </h1>
      <div className="w-full max-w-md sm:max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full bg-slate-800 rounded-lg p-4"
        >
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mb-4 p-3 w-full bg-transparent border border-white text-white rounded-xl"
          />
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mb-4 p-3 w-full bg-transparent border border-white text-white rounded-xl"
          />

          <p className="mt-4">
            <Link
              to="/forgot-password"
              className="text-pink-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
          <button
            type="submit"
            className="text-xl text-white bg-blue-700 w-full sm:w-[300px] mt-8 mb-4 rounded-md py-2"
          >
            Submit
          </button>

          <div className="mt-4 mb-4">
            <p className="text-white">
              Don&apos;t have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                {isLoading ? "Loading..." : "Register"}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
