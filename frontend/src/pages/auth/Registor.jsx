import { useState } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Registor = () => {
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const res = await register({
        username,
        lastName,
        email,
        password,
      });

      if (res.error) {
        return toast.error(res.error?.data?.message);
      }

      toast.success("Registered successfully. Please verify your email.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    if (!eval(field)) {
      setErrors((prev) => ({ ...prev, [field]: `${field} is required` }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
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
          {errors.username && (
            <p className="text-red-500 ">{errors.username}</p>
          )}
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("username")}
            className="mb-2 p-2 w-[400px] mt-4 bg-transparent border border-white text-white rounded-xl  "
            autoComplete="username"
          />
          {errors.lastName && (
            <p className="text-red-500 mt-4">{errors.lastName}</p>
          )}
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            placeholder="last name"
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => handleBlur("lastName")}
            className="mb-4 p-2 w-[400px] bg-transparent border border-white text-white rounded-xl "
            autoComplete="family-name"
          />

          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className="mb-4 p-2 w-[400px] bg-transparent border border-white text-white rounded-xl  "
            autoComplete="email"
          />

          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            className="p-2 w-[400px] bg-transparent border border-white text-white rounded-xl "
            autoComplete="new-password"
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
