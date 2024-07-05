import { Search } from "lucide-react";

export function SearchBar({ label, onChange, value }) {
  return (
    <div className="relative">
      <Search
        size="20"
        className="absolute text-neutral-400 top-1/2 -translate-y-1/2 left-3"
      />
      <input
        value={value}
        type="text"
        placeholder={label ? label : "Search..."}
        className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] rounded-sm pl-11 pr-4"
        onChange={onChange}
      />
    </div>
  );
}
