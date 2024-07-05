import { Outlet } from "react-router-dom";
import { ArrowLabel } from "../components/others/ArrowLabel";
import { ButtonPanel } from "../components/others/ButtonPanel";
import { useLocation } from "react-router-dom";
export function AttendanceLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      {location.pathname === "/home/attendance" && (
        <>
          <ArrowLabel label="Attendance" location={"/home"} />
          <ButtonPanel
            number={3}
            labels={["Create", "Edit", "view"]}
            locations={["create", "edit", "view"]}
          />
        </>
      )}

      <Outlet />
    </div>
  );
}
