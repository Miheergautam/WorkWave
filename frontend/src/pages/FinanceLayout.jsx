import { Outlet } from "react-router-dom";
import { ArrowLabel } from "../components/others/ArrowLabel";
import { ButtonPanel } from "../components/others/ButtonPanel";
import { useLocation } from "react-router-dom";

export function FinanceLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      {location.pathname === "/home/finance" && (
        <>
          <ArrowLabel label="Finance" location="/home" />
          <ButtonPanel
            number={1}
            labels={["Expenses"]}
            locations={["expense"]}
          />
        </>
      )}

      {location.pathname === "/home/finance/expense" && (
        <>
          <ArrowLabel label="Expenses" location="/home/finance" />
          <ButtonPanel
            number={2}
            labels={["Add Expense", "Manage Expense"]}
            locations={["expense/add", "expense/manage"]}
          />
        </>
      )}

      <Outlet />
    </div>
  );
}
