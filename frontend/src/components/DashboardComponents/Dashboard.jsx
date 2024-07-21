import { StatsGrid } from "./StatsGrid";
import { TransactionChart } from "./TransactionChart";
import { BuyerProfileChart } from "./BuyerProfileChart";
import { RecentOrders } from "./RecentOrders";

import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

export function Dashboard() {

  return (
    <div className="flex flex-col gap-4">
      <StatsGrid />
      <div className="flex gap-4 w-full">
        <TransactionChart />
        <BuyerProfileChart />
      </div>
      <div className="flex gap-4 w-full">
        <RecentOrders />
      </div>
    </div>
  );
}
