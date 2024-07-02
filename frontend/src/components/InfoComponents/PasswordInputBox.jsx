import React, { useState } from "react";

export function PasswordInputBox({ label, placeholder, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const handleMouseLeave = () => {
    setShowPassword(false);
  };

  return (
    <div className="mt-3">
      <div className="text-md font-medium text-left py-2">{label}</div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-neutral-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
        />
        <button
          type="button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-y-0 right-0 px-3 py-2 text-sm"
        >
          Show
        </button>
      </div>
    </div>
  );
}
