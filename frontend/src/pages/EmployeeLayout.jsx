import { Outlet } from "react-router-dom";
import { ArrowLabel } from "../components/others/ArrowLabel";
import { ButtonPanel } from "../components/others/ButtonPanel";
import { SearchPanel } from "../components/others/SearchPanel";
import { useLocation } from "react-router-dom";

export function EmployeeLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <ArrowLabel label="Employee" location={"/home"} />

      {location.pathname !== "/home/employee/create" ? <SearchPanel /> : null}
      <ButtonPanel
        number={2}
        labels={["Create Employee", "Manage Employee"]}
        locations={["create", "manage"]}
      />
      <Outlet />
    </div>
  );
}
