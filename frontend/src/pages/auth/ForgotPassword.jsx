import { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

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
      console.log(res);

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
    <section className="flex flex-col h-screen items-center justify-center  bg-slate-500">
      <h1 className="text-2xl mb-2 text-white bg-blue-600 px-16 py-2 ">
        Forgot Password
      </h1>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[450px] bg-slate-800 rounded-lg"
        >
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 w-[400px] bg-transparent border border-white text-white rounded-xl mt-8  "
          />

          <button
            type="submit"
            className="text-xl text-white bg-blue-700 w-[300px] mt-8 mb-4 rounded-md py-2 "
          >
            Send reset link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
