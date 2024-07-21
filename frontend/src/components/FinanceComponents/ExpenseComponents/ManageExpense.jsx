import React, { useState, useEffect } from "react";
import { SearchBar } from "../../others/SearchBar";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLabel } from "../../others/ArrowLabel";
import { MdSearch } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { useExpense } from "../../../contexts/ExpenseContext";
import api from "../../../utils/api"; // Ensure api is imported

// Ensure Modal styles are defined somewhere in your CSS
Modal.setAppElement("#root");

export function ManageExpense() {
  const navigate = useNavigate();
  const { fetchedData, setSelectedExpense, setExpenses } = useExpense();
  const [expenses, setExpensesState] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [employeeData, setEmployeeData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    if (fetchedData) {
      setExpensesState(fetchedData);
      setFilteredExpenses(fetchedData);
    }

    const getEmployee = async () => {
      try {
        const response = await api.get("/employee/list");
        if (response && response.data) {
          const employees = response.data.data;
          setEmployeeData(
            employees.map((employee) => ({
              employeeId: employee.employeeId,
              userId: employee._id,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const getAdmins = async () => {
      try {
        const response = await api.get("/admin/getAll");
        if (response && response.data) {
          const admins = response.data.data;
          setAdminData(
            admins.map((admin) => ({
              userId: admin._id,
              name: `${admin.firstName} ${admin.lastName}`,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    getEmployee();
    getAdmins();
  }, [fetchedData]);

  const handleEdit = () => {
    navigate("/home/finance/edit");
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchInput.trim() === "") {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(
        expenses.filter((expense) =>
          expense.status.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
    setIsFetched(true);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    setFilteredExpenses(updatedExpenses);
    setExpenses(updatedExpenses); // Update the context with the new state
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

  const findEmployeeId = (userId) => {
    const employee = employeeData.find((emp) => emp.userId === userId);
    return employee ? employee.employeeId : "";
  };

  const findById = (userId) => {
    const admin = adminData.find((adm) => adm.userId === userId);
    return admin ? admin.name : "";
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
                  <td className="py-2">{findEmployeeId(expense.userId)}</td>
                  <td>{expense.expenseAmount}</td>
                  <td>{expense.purpose}</td>
                  <td>{expense.dateOfExpense}</td>
                  <td>{findById(expense.approvedBy)}</td>
                  <td className={getStatusColor(expense.status)}>
                    {expense.status}
                  </td>
                  <td>
                    <Edit
                      className="cursor-pointer inline-block mr-2 text-green-500"
                      onClick={() => {
                        setSelectedExpense(expense);
                        handleEdit();
                      }}
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
