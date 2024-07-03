import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ArrowLabel({ label, location }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 border-b border-neutral-600 py-2">
      <ArrowLeft
        className="w-6 h-6 cursor-pointer"
        onClick={() => navigate( location )}
      />
      <h1 className="text-2xl">{label}</h1>
    </div>
  );
}
