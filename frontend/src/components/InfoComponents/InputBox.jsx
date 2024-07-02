import React from "react";

export function InputBox({
  label,
  onChange,
  placeholder,
  type,
  value
}) {
  return (
    <div className="mt-3">
      <div className="text-md font-medium text-left py-2">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-neutral-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
      />
    </div>
  );
}
