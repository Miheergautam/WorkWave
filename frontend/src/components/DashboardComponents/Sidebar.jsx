import logoImg from "../../assets/images/logo.png";
import {
  UpperDashboardSidebarLinks,
  BottomDashboardSidebarLinks,
} from "../../constants/SidebarNav";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SidebarLinks({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={`flex items-center space-x-2 font-light  px-3 py-4 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm ${
        pathname === item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400"
      }`}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3">
      <div className="flex items-center space-x-2 border-b border-neutral-700 px-1 py-3">
        <img src={logoImg} alt="CompanyLogo" className="w-10 h-10" />
        <span className="text-lg font-semibold text-neutral-100">WorkWave</span>
      </div>
      <div className="flex flex-col flex-1 py-8 space-y-0.5 ">
        {UpperDashboardSidebarLinks.map((item) => (
          <SidebarLinks key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col space-y-0.5 pt-2 border-t border-neutral-700">
        {BottomDashboardSidebarLinks.map((item) => (
          <SidebarLinks key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
