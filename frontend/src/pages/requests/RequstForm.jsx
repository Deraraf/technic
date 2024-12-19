import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addRecentRequest } from "../../redux/features/request/recentRequestsSlice";

import { useCreateRequestMutation } from "../../redux/api/requestApiSlice";

const RequstForm = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      contact,
      department,
      place,
      otherPlace,
      blockNumber,
      biroNumber,
      typeOfRequest,
      description,
    } = formData;

    if (
      !username ||
      !contact ||
      !department ||
      (!place && !otherPlace) ||
      !blockNumber ||
      !biroNumber ||
      !typeOfRequest ||
      !description
    ) {
      return toast.error("Please fill all the inputs.");
    }

    try {
      const finalPlace = otherPlace || place;
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

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="flex flex-col min-h-screen items-center justify-center bg-slate-800 p-4">
      <h1 className="text-2xl mb-6 text-white bg-blue-600 px-6 py-2 mt-14">
        Request Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-4xl bg-slate-900 rounded-lg p-6 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 w-full">
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            <input
              id="username"
              type="text"
              value={formData.username}
              placeholder="Requester Full Name    የጠያቂው ሙሉ ስም"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            />
            <input
              id="phone"
              type="text"
              value={formData.contact}
              placeholder="Phone Number ስልክ ቁጥር"
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            />
            <input
              id="department"
              type="text"
              value={formData.department}
              placeholder="Department Name የዲፓርትምንት ስም"
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            />
            <select
              name="place"
              id="place"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            >
              <option value="">Select Place የዲፓርትምንት አድራሻ</option>
              <option className="bg-slate-700" value="main campus">
                Main Campus ዋናው ግቢይ
              </option>
              <option className="bg-slate-700" value="middle campus">
                Middle Campus መካከለኛ ግቢይ
              </option>
              <option className="bg-slate-700" value="abay campus">
                Abay Campus አባይ ግቢይ
              </option>
              <option className="bg-slate-700" value="diplomacy building">
                Diplomacy Building ዲፕሎማሲ ግቢይ
              </option>
            </select>
            <div className="relative">
              <input
                id="otherPlace"
                type="text"
                value={formData.otherPlace}
                placeholder="A different place የተለየ ቦታ"
                onChange={(e) =>
                  setFormData({ ...formData, otherPlace: e.target.value })
                }
                className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
              />
              <p className="text-red-500 text-sm absolute top-full mt-1">
                Optional !
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            <input
              id="blockNumber"
              type="text"
              value={formData.blockNumber}
              placeholder="Block Number"
              onChange={(e) =>
                setFormData({ ...formData, blockNumber: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            />
            <input
              id="biroNumber"
              type="text"
              value={formData.biroNumber}
              placeholder="Biro Number"
              onChange={(e) =>
                setFormData({ ...formData, biroNumber: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            />
            <select
              name="typeOfRequest"
              id="typeOfRequest"
              value={formData.typeOfRequest}
              onChange={(e) =>
                setFormData({ ...formData, typeOfRequest: e.target.value })
              }
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg"
            >
              <option className="bg-slate-500" value="">
                Type of Work የሥራው አይነት
              </option>
              <option className="bg-slate-500" value="electric job  የኤሌክትሪክ ሥራ">
                Electrical work የኤሌክትሪክ ሥራ
              </option>
              <option
                className="bg-slate-500"
                value="    Plumbing work የቧንቧ ሥራ"
              >
                {" "}
                Plumbing work የቧንቧ ሥራ{" "}
              </option>
              <option
                className="bg-slate-500"
                value=" Carpenter's work የአናፂ ሥራ"
              >
                {" "}
                Carpenter&apos;s work የአናፂ ሥራ
              </option>
              <option className="bg-slate-500" value="Iron worker የብረት ሥራ">
                {" "}
                Iron worker የብረት ሥራ
              </option>
              <option className="bg-slate-500" value="Paint job የቀለም ሥራ">
                Paint job የቀለም ሥራ
              </option>
              <option
                className="bg-slate-500"
                value=" Construction work የግንብ ሥራ"
              >
                {" "}
                Construction work የግንብ ሥራ
              </option>
            </select>
            <textarea
              id="description"
              value={formData.description}
              placeholder="Description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full h-36 p-3 bg-transparent border border-white text-white rounded-lg"
            />
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

export default RequstForm;
