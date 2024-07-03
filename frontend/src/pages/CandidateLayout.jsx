import { ArrowLabel } from "../components/others/ArrowLabel";
import { BiFilter } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import { SearchBar } from "../components/others/SearchBar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function CandidateLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <ArrowLabel label="Candidate" location={"/home"} />

      <div className="flex justify-end mt-4 mx-4 gap-5">
        <button
          className="bg-purple-600 py-2 px-4 rounded-2xl"
          onClick={() => navigate("create")}
        >
          New Candidate
        </button>
        <button
          className="bg-purple-600 py-2 px-4 rounded-2xl"
          onClick={() => navigate("edit")}
        >
          Edit Candidate
        </button>
        <button
          className="bg-purple-600 py-2 px-4 rounded-2xl"
          onClick={() => navigate("manage")}
        >
          Manage Candidate
        </button>
      </div>

      <div className="flex justify-center items-center gap-4 my-4 border border-neutral-600 rounded-xl bg-neutral-900">
        <SearchBar />
        <BiFilter className="w-6 h-6" />
        <MdSearch className="w-6 h-6" />
      </div>
      <Outlet />
    </div>
  );
}
