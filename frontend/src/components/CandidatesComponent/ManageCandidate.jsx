import { ArrowLabel } from "../others/ArrowLabel";
import { SearchBar } from "../others/SearchBar";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCandidate } from "../../contexts/CandidateContext";

export function ManageCandidate() {
  const { fetchedData, setSelectedCandidate } = useCandidate();

  const [searchInput, setSearchInput] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = async () => {
    setIsFetched(true);
    setCandidates(fetchedData);
  };

  const handleEdit = (candidateId) => {
    const candidate = candidates.find((c) => c.candidateId === candidateId);
    if (candidate) {
      setSelectedCandidate(candidate);
      navigate(`/home/candidates/edit`);
    }
  };

  return (
    <div className="flex flex-col">
      <ArrowLabel label="Manage Candidate" location={"/home/candidates"} />
      <div className="flex justify-center items-center gap-4 my-4 border border-neutral-600 rounded-xl bg-neutral-900">
        <SearchBar
          label="Search By Department..."
          onChange={handleSearchInput}
          value={searchInput}
        />
        <MdSearch
          className="w-6 h-6 cursor-pointer"
          onClick={handleSearchClick}
        />
      </div>
      {isFetched && (
        <div className="p-4">
          <table className="w-full text-center bg-neutral-900 border border-neutral-600">
            <thead className="border border-neutral-600 bg-neutral-800">
              <tr>
                <th className="py-3">CandidateId</th>
                <th>Name</th>
                <th>Applied Position</th>
                <th>linkedIn</th>
                <th>status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr
                  key={candidate.candidateId}
                  className="border border-neutral-600"
                >
                  <td className="py-3">{candidate.candidateId}</td>
                  <td>{`${candidate.firstName} ${candidate.lastName}`}</td>
                  <td>{candidate.appliedPosition}</td>
                  <td>{candidate.linkedIn}</td>
                  <td>{candidate.status}</td>
                  <td>
                    <Edit
                      className="w-6 h-6 cursor-pointer text-yellow-500"
                      onClick={() => handleEdit(candidate.candidateId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
