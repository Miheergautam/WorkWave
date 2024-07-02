import { Link } from "react-router-dom";

export function BottomHeading({ label, buttonText, linkTo }) {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <div >{label}</div>
      <Link className="text-p-500 hover:text-purple-400" to={linkTo}>{buttonText}</Link>
    </div>
  );
}
