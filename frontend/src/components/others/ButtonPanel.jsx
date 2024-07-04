import { useNavigate } from "react-router-dom";

export function ButtonPanel({ number, labels, locations }) {
  const navigate = useNavigate();
  return (
    <>
      {number === 1 && (
        <div className="flex justify-end my-3 mx-4 gap-5">
          <button
            className="bg-purple-600 py-2 px-4 rounded-2xl"
            onClick={() => navigate(locations[0])}
          >
            {labels[0]}
          </button>
        </div>
      )}

      {number === 2 && (
        <div className="flex justify-end my-3 mx-4 gap-5">
          <button
            className="bg-purple-600 py-2 px-4 rounded-2xl"
            onClick={() => navigate(locations[0])}
          >
            {labels[0]}
          </button>
          <button
            className="bg-purple-600 py-2 px-4 rounded-2xl"
            onClick={() => navigate(locations[1])}
          >
            {labels[1]}
          </button>
        </div>
      )}

      {number === 3 && (
        <div className="flex justify-end my-3 mx-4 gap-5">
          <button
            className="bg-purple-600 py-2 px-4 rounded-2xl"
            onClick={() => navigate(locations[0])}
          >
            {labels[0]}
          </button>
          <button
            className="bg-purple-600 py-2 px-4 rounded-2xl"
            onClick={() => navigate(locations[1])}
          >
            {labels[1]}
          </button>
          <button
            className="bg-purple-600 py-2 px-4 rounded-2xl"
            onClick={() => navigate(locations[2])}
          >
            {labels[2]}
          </button>
        </div>
      )}
    </>
  );
}
