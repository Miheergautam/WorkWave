import { ArrowLabel } from "../components/others/ArrowLabel";
import { ButtonPanel } from "../components/others/ButtonPanel";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CandidateProvider } from "../contexts/CandidateContext";

export function CandidateLayout() {
  const location = useLocation();
  return (
    <CandidateProvider>
      <div className="flex flex-col">
        {location.pathname === "/home/candidates" ? (
          <>
            <ArrowLabel label="Candidate" location={"/home"} />
            <ButtonPanel
              number={2}
              labels={["New Candidate", "Manage Candidate"]}
              locations={["create", "manage"]}
            />
          </>
        ) : null}
        <Outlet />
      </div>
    </CandidateProvider>
  );
}
