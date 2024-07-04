import { BiFilter } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import { SearchBar } from "./SearchBar";

export function SearchPanel() {
  return (
    <div className="flex justify-center items-center gap-4 my-4 border border-neutral-600 rounded-xl bg-neutral-900">
      <SearchBar />
      <BiFilter className="w-6 h-6" />
      <MdSearch className="w-6 h-6" />
    </div>
  );
}
