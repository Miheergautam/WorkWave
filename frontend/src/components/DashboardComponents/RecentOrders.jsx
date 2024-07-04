const candidates = [
  {
    candidateID: "C101",
    name: "Alice Johnson",
    linkedInUrl: "https://www.linkedin.com/in/alicejohnson",
    appliedPosition: "Software Engineer",
    appliedDate: "2024-06-10",
  },
  {
    candidateID: "C102",
    name: "Bob Smith",
    linkedInUrl: "https://www.linkedin.com/in/bobsmith",
    appliedPosition: "Product Manager",
    appliedDate: "2024-06-12",
  },
  {
    candidateID: "C103",
    name: "Carol White",
    linkedInUrl: "https://www.linkedin.com/in/carolwhite",
    appliedPosition: "Data Analyst",
    appliedDate: "2024-06-14",
  },
];

import { Link } from "react-router-dom";
import { getOrderStatus } from "../../lib/utils";

export function RecentOrders() {
  return (
    <div className="bg-neutral-900 px-4 py-3 rounded-sm flex-1 border border-neutral-700">
      <strong className="text-neutral-200 font-medium">
        Recent Candidates Entries
      </strong>
      <div className="mt-3">
        <table className="min-w-full text-center">
          <thead className="bg-neutral-800 border border-neutral-600">
            <tr>
              <th className="py-3">Candidate ID</th>
              <th>Name</th>
              <th>LinkedIn URL</th>
              <th>Applied Position</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="border border-neutral-600">
                <td className="py-3">{candidate.candidateID}</td>
                <td>{candidate.name}</td>
                <td>
                  <a
                    href={candidate.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.linkedInUrl}
                  </a>
                </td>
                <td>{candidate.appliedPosition}</td>
                <td>{candidate.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
