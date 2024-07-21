import { ArrowLabel } from "../components/others/ArrowLabel";
import { Outlet, useLocation } from "react-router-dom";
import { ButtonPanel } from "../components/others/ButtonPanel";

export function Profile() {
  console.log("Profile.jsx");
  const location = useLocation();

  return (
      <div className="flex flex-col gap-2">
        {location.pathname === "/home/profile/info" && (
          <>
            <ArrowLabel label="Profile" location={"/home"} />

            <ButtonPanel
              number={2}
              labels={["Edit", "Change Password"]}
              locations={["edit", "change-password"]}
            />
          </>
        )}
        <Outlet />
      </div>
  );
}
