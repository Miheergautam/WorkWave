export function SelectInputBox({ options, value, onChange, label }) {
  return (
    <div className="mt-6">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-neutral-500 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-white"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
