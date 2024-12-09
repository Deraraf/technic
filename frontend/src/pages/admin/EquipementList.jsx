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
    <div className="flex h-screen flex-col bg-slate-600">
      <h1 className="text-white text-2xl font-bold mb-4">Equipment List</h1>
      <select
        name="job type"
        id="job type"
        value={typeOfRequest}
        placeholder="Enter Type Of Request  የሥራው አይነት"
        onChange={(e) => setTypeOfRequest(e.target.value)}
        className="ml-[800px] w-[300px] max-xl:mb-4 max-xl:p-4 mb-4 p-2 mt-20 bg-transparent border border-white text-white rounded-xl"
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error :(</p>}
      {!isLoading && !isError && equipmentWithDetails?.length > 0 && (
        <ul className="gap-4 p-4 flex">
          {equipmentWithDetails.map((item) => (
            <li
              key={item._id}
              className="flex flex-col w-[400px] border p-4 my-4 bg-slate-700 text-white rounded"
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
                  className="ml-4 border p-2 my-2 rounded bg-slate-600"
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
        <p className="text-white">No equipment found for this job type.</p>
      )}
    </div>
  );
};

export default EquipmentList;
