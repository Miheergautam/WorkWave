import { Users, ClipboardList, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

export function StatsGrid() {
  const { fetchedData } = useDashboard();
  const [noOfEmployees, setNoOfEmployees] = useState(0);
  const [noOfTasks, setNoOfTasks] = useState(0);
  const [noOfCandidates, setNoOfCandidates] = useState(0);

  useEffect(() => {
    if (fetchedData) {
      setNoOfEmployees(fetchedData.filter((e) => e.role === "Employee").length);
    }
  }, [fetchedData]);

  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex justify-center items-center bg-purple-500">
          <Users className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-neutral-300 font-light">
            Total Employees
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-neutral-200 font-semibold">
              {noOfEmployees}
            </strong>
            {fetchedData && (
              <span className="text-sm text-green-500 pl-2">
                +
                {
                  fetchedData.filter(
                    (e) =>
                      new Date(e.createdAt) >
                      Date.now() - 7 * 24 * 60 * 60 * 1000
                  ).length
                }
              </span>
            )}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex justify-center items-center bg-indigo-500">
          <ClipboardList className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-neutral-300 font-light">
            Pending Tasks
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-neutral-200 font-semibold">
              12
            </strong>
            <span className="text-sm text-red-500 pl-2">+2</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex justify-center items-center bg-green-700">
          <UserPlus className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-neutral-300 font-light">
            New Candidates
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-neutral-200 font-semibold">
              129
            </strong>
            <span className="text-sm text-green-500 pl-2">+2</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-neutral-900 rounded-sm p-4 border flex border-neutral-700 flex-1 items-center">
      {children}
    </div>
  );
}
