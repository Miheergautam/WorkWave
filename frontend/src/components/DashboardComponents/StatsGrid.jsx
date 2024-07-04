import { Users, ClipboardList, UserPlus } from "lucide-react";

export function StatsGrid() {
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
              57
            </strong>
            <span className="text-sm text-green-500 pl-2">+14</span>
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
