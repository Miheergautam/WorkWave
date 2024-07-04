import { SearchPanel } from "../../others/SearchPanel";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {ArrowLabel} from "../../others/ArrowLabel";

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

export function ManageExpense() {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("../expense/edit");
    }

  return (
    <div className="flex flex-col">
        <ArrowLabel label=" Manage Expenses" location="../expense" />
        
      <SearchPanel />
      <div className="mt-3">
        <table className="w-full text-center">
          <thead className="border border-neutral-600 bg-neutral-800">
            <tr>
              <th className="py-3">Employee ID</th>
              <th>Expense Amount</th>
              <th>Purpose</th>
              <th>Date Of Expense</th>
              <th>Approved By</th>
              <th>Status</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border border-neutral-600">
                <td className="py-2">{expense.employeeId}</td>
                <td className="py-2">{expense.expenseAmount}</td>
                <td className="py-2">{expense.purpose}</td>
                <td className="py-2">{expense.dateOfExpense}</td>
                <td className="py-2">{expense.approvedBy}</td>
                <td className="py-2">{expense.status}</td>
                <td className="py-2">
                  <Edit
                    className="cursor-pointer inline-block mr-2 text-green-500"
                    onClick={handleEdit}
                  />
                  <Trash className="cursor-pointer inline-block text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
