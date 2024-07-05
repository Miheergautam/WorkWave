import { ArrowLabel } from "../others/ArrowLabel";
import { Check, X } from "lucide-react";
import { useState } from "react";

const initialData = [
  {
    name: "John Doe",
    id: "123",
    date: "2021-09-01",
    status: "Present",
  },
  {
    name: "Jane Doe",
    id: "124",
    date: "2021-09-01",
    status: "Absent",
  },
  {
    name: "John Smith",
    id: "125",
    date: "2021-09-01",
    status: "Present",
  },
  {
    name: "Jane Smith",
    id: "126",
    date: "2021-09-01",
    status: "Absent",
  },
];

export function ViewAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState([]);

  const handleViewAttendance = () => {
    // Fetch attendance data for the selected date
    // For simplicity, we're filtering initialData by the selected date
    const filteredData = initialData.filter((item) => item.date === date);
    setAttendanceData(filteredData);
  };

  return (
    <div className="flex flex-col">
      <ArrowLabel label="View Attendance" location={"/home/attendance"} />
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
          onClick={handleViewAttendance}
          className="bg-purple-500 py-2 px-4 rounded-lg"
        >
          View Attendance
        </button>
      </div>

      {attendanceData.length > 0 ? (
        <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
          <h1 className="p-4 text-2xl text-center">Attendance Date: {date}</h1>
          <table className="text-center m-6">
            <thead className="border border-neutral-600 bg-neutral-800">
              <tr>
                <th className="py-3">Employee Name</th>
                <th>Employee Id</th>
                <th>Status</th>
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
                  <td>
                    <div className="flex justify-center items-center gap-6">
                      {item.status === "Present" ? (
                        <Check className="w-6 h-6 text-green-500" />
                      ) : (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-lg">
            No attendance data available for the selected date.
          </p>
        </div>
      )}
    </div>
  );
}
