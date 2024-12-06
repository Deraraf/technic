import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateRequestMutation } from "../../redux/api/requestApiSlice";

const RequstForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    contact: "",
    department: "",
    place: "",
    otherPlace: "", // New field
    blockNumber: "",
    biroNumber: "",
    typeOfRequest: "",
    description: "",
  });
  const navigate = useNavigate();

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
      (!place && !otherPlace) || // At least one place must be provided
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
      console.log(res);
      if (res.error) {
        return toast.error(res.error?.data?.message);
      }
      console.log(formData);
      navigate("/");
      toast.success("Request created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="flex flex-col h-screen absolute left-0 right-0 mt-7  items-center justify-center overflow-hidden bg-slate-800">
      <h1 className="text-2xl mb-2 text-white bg-blue-600 px-16 py-2">
        Request Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center  justify-center w-[90%] max-w-4xl  rounded-lg p-8"
      >
        <div className="grid grid-cols-2  gap-x-16 gap-y-4 w-full">
          {/* Left Column */}
          <div className="flex flex-col">
            <input
              id="username"
              type="text"
              value={formData.username}
              placeholder=" Requester Full Name    የጠያቂው ሙሉ ስም"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2  bg-transparent border border-white text-white rounded-xl"
            />
            <input
              id="phone"
              type="contact"
              value={formData.contact}
              placeholder="phone number  ስልክ ቁጥር "
              onChange={(e) =>
                setFormData({ ...formData, contact: Number(e.target.value) })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            />
            <input
              id="department"
              type="text"
              value={formData.department}
              placeholder="Enter Department Name የጠያቂው የዲፓርትምንት ስም"
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            />

            <select
              name="place"
              id="place"
              type="text"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            >
              <option value="">Select Place የዲፓርትመንት አድራሻ</option>
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

            <input
              id="otherPlace"
              type="text"
              value={formData.otherPlace}
              placeholder="Enter Other Place የተለየ ቦታ"
              onChange={(e) =>
                setFormData({ ...formData, otherPlace: e.target.value })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            />
            <input
              id="blockNumber"
              type="number"
              value={formData.blockNumber}
              placeholder="Enter Block Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  blockNumber: Number(e.target.value),
                })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col mr-4">
            <input
              id="biro"
              type="number"
              value={formData.biroNumber}
              placeholder="Enter Biro Number"
              onChange={(e) =>
                setFormData({ ...formData, biroNumber: Number(e.target.value) })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            />
            <select
              name="job type"
              id="job type"
              value={formData.typeOfRequest}
              placeholder="Enter Type Of Request  የሥራው አይነት"
              onChange={(e) =>
                setFormData({ ...formData, typeOfRequest: e.target.value })
              }
              className="max-xl:mb-4 max-xl:p-4 mb-4 p-2 bg-transparent border border-white text-white rounded-xl"
            >
              <option value="">Select Job Type የሥራው አይነት</option>
              <option className="bg-slate-700" value="electric job  የኤሌክትሪክ ሥራ">
                electric job የኤሌክትሪክ ሥራ
              </option>
              <option className="bg-slate-700" value="sanitary job  የቧንቧ 	ሥራ">
                sanitary job የቧንቧ ሥራ
              </option>
              <option className="bg-slate-700" value="carpenter job  የአናፂ ስራ">
                carpenter job የአናፂ ስራ
              </option>
              Iron worker የብረት ሥራ
            </select>
            <textarea
              id="description "
              type="text"
              value={formData.description}
              placeholder="Enter Description ስለ ሥራው ዝርዝር መግለጫ "
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="h-[300px] p-2 bg-transparent border border-white text-white rounded-xl"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-xl text-white bg-blue-700 w-[300px] mt-8 rounded-md py-2"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default RequstForm;
