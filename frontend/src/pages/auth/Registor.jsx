import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { setUserInfo } from "../../redux/features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Registor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { search } = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      console.log(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        name,
        email,
        password,
      }).unwrap();

      if (!res.success) return;
      dispatch(setUserInfo({ ...res }));
      console.log(res);
      navigate(redirect);
      toast.success("registered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col h-screen items-center justify-center overflow-hidden bg-slate-500">
      <h1 className="text-2xl mb-2 text-white bg-blue-600 px-16 py-2 ">
        Registor
      </h1>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[450px] bg-slate-800 rounded-lg"
        >
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 w-[400px] mt-8 bg-transparent border border-white text-white rounded-xl  "
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 w-[400px] bg-transparent border border-white text-white rounded-xl  "
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-[400px] bg-transparent border border-white text-white rounded-xl "
          />
          <button
            type="submit"
            className="text-xl text-white bg-blue-700 w-[300px] mt-8 mb-4 rounded-md py-2 "
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <div className="mt-4 mb-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registor;
