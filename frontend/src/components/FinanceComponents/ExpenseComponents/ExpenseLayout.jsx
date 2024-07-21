import { useState } from "react";
import { SearchBar } from "../../others/SearchBar";
import { MdSearch } from "react-icons/md";

const expenses = [
  {
    employeeId: "E123",
    expenseAmount: "$200.00",
    purpose: "Travel",
    dateOfExpense: "2024-06-15",
    approvedBy: "John Doe",
    status: "Approved",
  },
  {
    employeeId: "E456",
    expenseAmount: "$150.00",
    purpose: "Office Supplies",
    dateOfExpense: "2024-06-20",
    approvedBy: "Jane Smith",
    status: "Pending",
  },
  {
    employeeId: "E789",
    expenseAmount: "$300.00",
    purpose: "Client Entertainment",
    dateOfExpense: "2024-06-22",
    approvedBy: "Michael Brown",
    status: "Rejected",
  },
];

export function ExpenseLayout() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [isFetched, setIsFetched] = useState(false);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    setFilteredExpenses(
      expenses.filter((expense) =>
        expense.employeeId.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setIsFetched(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col">
      {/* <div className="mt-4 py-2 px-4 bg-neutral-900 border border-neutral-600 rounded-lg">
        <div className="flex justify-center items-center gap-4 my-4 border border-neutral-600 rounded-xl bg-neutral-900">
          <SearchBar
            label={"Search By Employee Id..."}
            onChange={handleSearchInput}
            value={searchInput}
          />
          <MdSearch
            className="w-6 h-6 cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>
        {isFetched && (
          <table className="w-full text-md text-center">
            <thead>
              <tr className="border border-neutral-600 bg-neutral-800">
                <th className="py-3">Employee ID</th>
                <th>Expense Amount</th>
                <th>Purpose</th>
                <th>Date Of Expense</th>
                <th>Approved By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={index} className="border border-neutral-600">
                  <td className="py-3">{expense.employeeId}</td>
                  <td>{expense.expenseAmount}</td>
                  <td>{expense.purpose}</td>
                  <td>{expense.dateOfExpense}</td>
                  <td>{expense.approvedBy}</td>
                  <td className={`py-2 ${getStatusClass(expense.status)}`}>
                    {expense.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </div>
  );
}
