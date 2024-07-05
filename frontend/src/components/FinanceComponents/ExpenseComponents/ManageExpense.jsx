import React, { useState } from "react";
import { SearchBar } from "../../others/SearchBar";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLabel } from "../../others/ArrowLabel";
import { MdSearch } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

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
  const [searchInput, setSearchInput] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [isFetched, setIsFetched] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = () => {
    navigate("../expense/edit");
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    setFilteredExpenses(
      expenses.filter((expense) =>
        expense.status.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setIsFetched(true);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    const updatedExpenses = [...filteredExpenses];
    const deletedExpense = updatedExpenses.splice(deleteIndex, 1)[0];
    setFilteredExpenses(updatedExpenses);
    setModalIsOpen(false);
    setDeleteIndex(null);

    toast.error(`Expense deleted: ${deletedExpense.employeeId}`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const getStatusColor = (status) => {
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
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Deletion"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Are you sure you want to delete this expense?</h2>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={confirmDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <ArrowLabel label="Manage Expenses" location="../expense" />

      <div className="flex justify-center items-center gap-4 my-4 border border-neutral-600 rounded-xl bg-neutral-900">
        <SearchBar
          label="Search By Status..."
          onChange={handleSearchInput}
          value={searchInput}
        />
        <MdSearch
          className="w-6 h-6 cursor-pointer"
          onClick={handleSearchClick}
        />
      </div>

      {isFetched && (
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
              {filteredExpenses.map((expense, index) => (
                <tr key={index} className="border border-neutral-600">
                  <td className="py-2">{expense.employeeId}</td>
                  <td>{expense.expenseAmount}</td>
                  <td>{expense.purpose}</td>
                  <td>{expense.dateOfExpense}</td>
                  <td>{expense.approvedBy}</td>
                  <td className={getStatusColor(expense.status)}>
                    {expense.status}
                  </td>
                  <td>
                    <Edit
                      className="cursor-pointer inline-block mr-2 text-green-500"
                      onClick={handleEdit}
                    />
                    <Trash
                      className="cursor-pointer inline-block text-red-500"
                      onClick={() => handleDelete(index)}
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
