import { Home, User, ClipboardList, Inbox, Briefcase, Users, DollarSign, Settings, LifeBuoy,  Calendar, Clock } from "lucide-react";


export const UpperDashboardSidebarLinks = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    key: "inbox",
    label: "Inbox",
    path: "inbox",
    icon: <Inbox className="h-5 w-5" />,
  },
  {
    key: "tasks",
    label: "Tasks",
    path: "tasks",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    key: "jobs",
    label: "Jobs",
    path: "jobs",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    key: "candidates",
    label: "Candidates",
    path: "candidates",
    icon: <Users className="h-5 w-5" />,
  },
  {
    key: "employees",
    label: "Employees",
    path: "employee",
    icon: <User className="h-5 w-5" />,
  },
  {
    key: "finance",
    label: "Finance",
    path: "finance",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    key: "attendance",
    label: "Attendance",
    path: "attendance",
    icon: <Calendar className="h-5 w-5" />,
  }
];

export const BottomDashboardSidebarLinks = [
  {
    key: "support",
    label: "Support",
    path: "/support",
    icon: <LifeBuoy className="h-5 w-5" />,
  },
];
