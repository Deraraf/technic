import { useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { id, token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      resetPassword({ id, token, password });
      toast.success("Password updated successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error updating password");
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="flex flex-col h-screen items-center justify-center  bg-slate-500">
      <h1 className="text-2xl mb-2 text-white bg-blue-600 px-16 py-2 ">
        Reset your Password
      </h1>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[450px] bg-slate-800 rounded-lg"
        >
          <label htmlFor="password" className="mt-4 text-2xl text-white">
            {" "}
            <strong>New Password</strong>
          </label>
          <input
            type="text"
            placeholder="Enter new Password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 w-[400px] bg-transparent border border-white text-white rounded-xl mt-8  "
          />

          <button
            type="submit"
            className="text-xl text-white bg-blue-700 w-[300px] mt-8 mb-4 rounded-md py-2 "
          >
            Update password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
