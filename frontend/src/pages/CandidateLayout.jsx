import { ArrowLabel } from "../components/others/ArrowLabel";
import { SearchPanel } from "../components/others/SearchPanel";
import { ButtonPanel } from "../components/others/ButtonPanel";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function CandidateLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <ArrowLabel label="Candidate" location={"/home/candidates"} />
      {location.pathname !== "/home/candidates/create" ? (
        <>
          <SearchPanel />
          <ButtonPanel
            number={2}
            labels={["New Candidate", "Manage Candidate"]}
            locations={["create", "manage"]}
          />
        </>
      ) : null}

      <Outlet />
    </div>
  );
}
