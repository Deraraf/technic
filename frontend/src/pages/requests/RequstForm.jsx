import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addRecentRequest } from "../../redux/features/request/recentRequestsSlice";
import { useCreateRequestMutation } from "../../redux/api/requestApiSlice";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    contact: "",
    department: "",
    place: "",
    otherPlace: "",
    blockNumber: "",
    biroNumber: "",
    typeOfRequest: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name} is required`;
    } else if (name === "description" && value.length < 10) {
      error = "Description must be at least 10 characters";
    } else if (name === "description" && value.length > 200) {
      error = "Description must not exceed 200 characters";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validate = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "otherPlace" && key !== "place" && !value) {
        newErrors[key] = `${key} is required`;
      }
      if (key === "description") {
        if (!value) {
          newErrors[key] = `${key} is required`;
        } else if (value.length < 10) {
          newErrors[key] = "Description must be at least 10 characters";
        } else if (value.length > 200) {
          newErrors[key] = "Description must not exceed 200 characters";
        }
      }
    });

    if (!formData.place && !formData.otherPlace) {
      newErrors.place = "Please select a place or enter another location";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill all required fields");
      // Scroll to the first invalid field
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    try {
      const finalPlace = formData.otherPlace || formData.place;
      const requestPayload = { ...formData, place: finalPlace };
      const res = await createRequest(requestPayload);

      dispatch(addRecentRequest(res.data));
      if (res.error) {
        return toast.error(res.error?.data?.message);
      }

      navigate("/");
      toast.success("Request created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (id === "place" && value !== "") {
        delete newErrors.place;
      } else if (id === "otherPlace" && value !== "") {
        delete newErrors.place;
      }

      if (newErrors[id]) {
        delete newErrors[id];
      }

      return newErrors;
    });
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (id !== "otherPlace" || id !== "place") {
      validateField(id, value);
    }
  };

  return (
    <section className="flex flex-col min-h-screen items-center justify-center bg-slate-800 p-4 md:p-8">
      <h1 className="text-2xl mb-6 text-white bg-blue-600 px-8 py-4 mt-14 text-center sm:text-left">
        Request Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-4xl bg-slate-950 rounded-lg p-4 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 w-full">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <input
              id="username"
              type="text"
              value={formData.username}
              placeholder="Requester Full Name"
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.username ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}

            <input
              id="contact"
              type="text"
              value={formData.contact}
              placeholder="Phone Number"
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.contact ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            />
            {errors.contact && <p className="text-red-500">{errors.contact}</p>}

            <input
              id="department"
              type="text"
              value={formData.department}
              placeholder="Department Name"
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.department ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            />
            {errors.department && (
              <p className="text-red-500">{errors.department}</p>
            )}

            <select
              id="place"
              value={formData.place}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.place ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            >
              <option value="">Select Place</option>
              <option value="main campus" className="bg-slate-500 ">
                Main Campus
              </option>
              <option value="middle campus" className="bg-slate-500 ">
                Middle Campus
              </option>
              <option value="abay campus" className="bg-slate-500 ">
                Abay Campus
              </option>
              <option value="diplomacy building" className="bg-slate-500 ">
                Diplomacy Building
              </option>
            </select>
            {errors.place && <p className="text-red-500">{errors.place}</p>}

            <input
              id="otherPlace"
              type="text"
              value={formData.otherPlace}
              placeholder="A different place"
              onChange={handleInputChange}
              className="w-full p-2 md:p-3 bg-transparent border border-white text-white rounded-lg "
            />
          </div>
          {/* Right Column */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <input
              id="blockNumber"
              type="text"
              value={formData.blockNumber}
              placeholder="Block Number"
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.blockNumber ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            />
            {errors.blockNumber && (
              <p className="text-red-500">{errors.blockNumber}</p>
            )}

            <input
              id="biroNumber"
              type="text"
              value={formData.biroNumber}
              placeholder="Biro Number"
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.biroNumber ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            />
            {errors.biroNumber && (
              <p className="text-red-500">{errors.biroNumber}</p>
            )}

            <select
              id="typeOfRequest"
              value={formData.typeOfRequest}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full p-2 md:p-3 bg-transparent border ${
                errors.typeOfRequest ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            >
              <option className="bg-slate-500" value="">
                Type of Work
              </option>
              <option className="bg-slate-500" value="electric job  የኤሌክትሪክ ሥራ">
                Electrical work
              </option>
              <option
                className="bg-slate-500"
                value="    Plumbing work የቧንቧ ሥራ"
              >
                {" "}
                Plumbing work
              </option>
              <option
                className="bg-slate-500"
                value=" Carpenter's work የአናፂ ሥራ"
              >
                {" "}
                Carpenter&poas;s work
              </option>
              <option className="bg-slate-500" value="Iron worker የብረት ሥራ">
                {" "}
                Iron worker
              </option>
              <option className="bg-slate-500" value="Paint job የቀለም ሥራ">
                Paint job
              </option>
              <option
                className="bg-slate-500"
                value=" Construction work የግንብ ሥራ"
              >
                {" "}
                Construction work
              </option>
            </select>
            {errors.typeOfRequest && (
              <p className="text-red-500">{errors.typeOfRequest}</p>
            )}

            <textarea
              id="description"
              value={formData.description}
              placeholder="Description"
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full h-32 p-2 md:p-3 bg-transparent border ${
                errors.description ? "border-red-500" : "border-white"
              } text-white rounded-lg`}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full max-w-sm mt-6 py-3 text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default RequestForm;
