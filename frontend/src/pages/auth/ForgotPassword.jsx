import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      forgotPassword({ email });
      toast.success("Password reset link sent successfully");
    } catch (error) {
      toast.error("Error sending password reset link");
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
