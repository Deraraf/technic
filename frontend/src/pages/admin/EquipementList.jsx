import {
  useGetEquipmentQuery,
  useGetRequestsQuery,
} from "../../redux/api/requestApiSlice";
import { useState } from "react";

const EquipmentList = () => {
  const [typeOfRequest, setTypeOfRequest] = useState(
    "electric job  የኤሌክትሪክ ሥራ"
  );
  const {
    data: equipmentData,
    isLoading,
    isError,
  } = useGetEquipmentQuery({ typeOfRequest });

  const { data: requestsData } = useGetRequestsQuery();

  // Match equipment with their respective requests
  const equipmentWithDetails = equipmentData?.map((equipment) => {
    const matchedRequest = requestsData?.find(
      (request) => request._id === equipment._id
    );
    return {
      ...equipment,
      requesterName: matchedRequest?.username || "Unknown",
      dateRequested: matchedRequest?.dateRequested,
      status: matchedRequest?.status,
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-600 px-4 sm:px-8">
      <h1 className="text-white text-2xl font-bold mb-4 text-center">
        Equipment List
      </h1>
      <div className="flex justify-center mt-4">
        <select
          name="job type"
          id="job type"
          value={typeOfRequest}
          placeholder="Enter Type Of Request የሥራው አይነት"
          onChange={(e) => setTypeOfRequest(e.target.value)}
          className="w-full sm:w-[300px] p-2 bg-transparent border border-white text-white rounded-xl"
        >
          <option value="">Select Job Type የሥራው አይነት</option>
          <option className="bg-slate-700" value="electric job  የኤሌክትሪክ ሥራ">
            electric job የኤሌክትሪክ ሥራ
          </option>
          <option className="bg-slate-700" value="sanitary job  የቧንቧ ሥራ">
            sanitary job የቧንቧ ሥራ
          </option>
          <option className="bg-slate-700" value="carpenter job  የአናፂ ስራ">
            carpenter job የአናፂ ስራ
          </option>
          <option className="bg-slate-700" value="Iron worker የብረት ሥራ">
            Iron worker የብረት ሥራ
          </option>
          <option className="bg-slate-700" value="Painter የቀለም ሥራ">
            Painter የቀለም ሥራ
          </option>
          <option className="bg-slate-700" value="Construction work የግንብ ሥራ">
            Construction work የግንብ ሥራ
          </option>
        </select>
      </div>

      {isLoading && <p className="text-center text-white mt-8">Loading...</p>}
      {isError && <p className="text-center text-red-500 mt-8">Error :(</p>}
      {!isLoading && !isError && equipmentWithDetails?.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {equipmentWithDetails.map((item) => (
            <li
              key={item._id}
              className="flex flex-col border p-4 bg-slate-700 text-white rounded-lg"
            >
              <h2 className="font-bold text-lg mb-2">Request ID: {item._id}</h2>
              <p>
                <strong>Requester Name:</strong> {item.requesterName}
              </p>
              <p>
                <strong>Date Requested:</strong>{" "}
                {new Date(item.dateRequested).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              {item.equipment.map((equip) => (
                <div
                  key={equip._id}
                  className="ml-4 border p-2 mt-2 rounded bg-slate-600"
                >
                  <p>
                    <strong>Equipment Name:</strong> {equip.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {equip.quantity}
                  </p>
                  <p>
                    <strong>Status:</strong> {equip.status}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !isError && equipmentWithDetails?.length === 0 && (
        <p className="text-white text-center mt-8">
          No equipment found for this job type.
        </p>
      )}
    </div>
  );
};

export default EquipmentList;
