export function Button({ label, onClick }) {
  return (
    <button
      className=" w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-3xl transition duration-200 "
      onClick={onClick}
    >
      {label}
    </button>
  );
}
