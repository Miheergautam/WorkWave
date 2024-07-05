import { ArrowLabel } from "../others/ArrowLabel";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialData = [
  {
    name: "John Doe",
    id: "123",
    status: "",
  },
  {
    name: "Jane Doe",
    id: "124",
    status: "",
  },
  {
    name: "John Smith",
    id: "125",
    status: "",
  },
  {
    name: "Jane Smith",
    id: "126",
    status: "",
  },
];

export function CreateAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [isAttendanceCreated, setIsAttendanceCreated] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    // Here, we set the attendanceData to be the initialData with the selected date
    const updatedData = initialData.map((item) => ({
      ...item,
      date,
    }));
    setAttendanceData(updatedData);
    setIsAttendanceCreated(true); // Set flag to true after creating attendance data
  };

  const handleStatusUpdate = (id, status) => {
    const updatedData = attendanceData.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setAttendanceData(updatedData);
  };

  const handleSave = () => {
    // Placeholder for actual save logic

    // Show toast notification for successful save
    toast.success("Attendance Saved Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    // Navigate back to attendance management page after delay
    setTimeout(() => {
      navigate("/home/attendance");
    }, 2500);
  };

  return (
    <div className="flex flex-col">
      <ToastContainer /> {/* Ensure ToastContainer is rendered */}
      <ArrowLabel label="Create Attendance" location="/home/attendance" />
      <div className="flex items-center justify-center gap-4 m-6">
        <div className="flex items-center gap-4">
          <label className="text-lg">Select the date:</label>
          <input
            type="date"
            className="bg-neutral-700 py-2 px-4 border border-neutral-600 rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleCreate}
          className="bg-purple-500 py-2 px-4 rounded-lg"
        >
          Create
        </button>
      </div>
      {isAttendanceCreated && ( // Render the table only if attendance data is created
        <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
          <h1 className="p-4 text-2xl text-center">Attendance Date: {date}</h1>
          <table className=" text-center m-6">
            <thead className="border border-neutral-600 bg-neutral-800">
              <tr>
                <th className="py-3">Employee Name</th>
                <th>Employee Id</th>
                <th>Date</th>
                <th>Present / Absent</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, index) => (
                <tr
                  key={index}
                  className={`border border-neutral-600 ${
                    index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"
                  }`}
                >
                  <td className="py-3">{item.name}</td>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>
                    <div className="flex justify-center items-center gap-6">
                      <Check
                        className={`w-6 h-6 cursor-pointer ${
                          item.status === "Present"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleStatusUpdate(item.id, "Present")}
                      />
                      <X
                        className={`w-6 h-6 cursor-pointer ${
                          item.status === "Absent"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleStatusUpdate(item.id, "Absent")}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-4 flex justify-center">
            <button
              className="bg-purple-500 py-2 px-6 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
