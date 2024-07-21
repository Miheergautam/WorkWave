import React, { useEffect, useState } from "react";
import { ArrowLabel } from "../../others/ArrowLabel";
import { InputBox } from "../../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpense } from "../../../contexts/ExpenseContext";
import api from "../../../utils/api";

export function EditExpense() {
  const { selectedExpense, setIsUpdated } = useExpense();
  const [expense, setExpense] = useState({
    userId: "",
    expenseAmount: "",
    purpose: "",
    dateOfExpense: "",
    approvedBy: "",
    status: "",
  });

  const [employeeData, setEmployeeData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    if (selectedExpense) {
      setExpense({
        userId: selectedExpense.userId,
        expenseAmount: selectedExpense.expenseAmount,
        purpose: selectedExpense.purpose,
        dateOfExpense: selectedExpense.dateOfExpense,
        approvedBy: selectedExpense.approvedBy,
        status: selectedExpense.status,
      });
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
          console.log("Admins:", admins);
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
  }, [selectedExpense]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      !expense.userId ||
      !expense.expenseAmount ||
      !expense.purpose ||
      !expense.dateOfExpense ||
      !expense.approvedBy ||
      !expense.status
    ) {
      toast.error("Please fill in all fields.", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    try {
      const response = await api.put(`/expense/update/${selectedExpense._id}`, {
        ...expense,
        expenseAmount: parseInt(expense.expenseAmount, 10),
      });

      if (response) {
        setIsUpdated(true);
        toast.success("Expense updated successfully", {
          position: "bottom-right",
          autoClose: 1500,
        });
        setTimeout(() => navigate("../expense"), 2000);
      } else {
        throw new Error("Error updating expense");
      }
    } catch (err) {
      toast.error("Error updating expense", {
        position: "bottom-right",
        autoClose: 1500,
      });
      setTimeout(() => navigate("../expense"), 2000);
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
      <ArrowLabel label="Edit Expense" location="../expense" />
      <div className="grid grid-cols-3 bg-neutral-900 border border-neutral-600 rounded-lg p-8 m-4 gap-6">
        <div className="col-span-3 flex justify-between">
          <InputBox
            label="Employee ID"
            value={findEmployeeId(expense.userId)}
            disabled
          />
          <InputBox
            label="Expense Amount"
            value={expense.expenseAmount}
            onChange={(e) =>
              setExpense({ ...expense, expenseAmount: e.target.value })
            }
          />
          <InputBox
            label="Purpose"
            value={expense.purpose}
            onChange={(e) =>
              setExpense({ ...expense, purpose: e.target.value })
            }
          />
          <InputBox
            label="Date Of Expense"
            type="date"
            value={expense.dateOfExpense}
            onChange={(e) =>
              setExpense({ ...expense, dateOfExpense: e.target.value })
            }
          />
        </div>
        <div className="col-span-3 flex justify-between items-end">
          <InputBox
            label="Approved By"
            value={findById(expense.approvedBy)}
            disabled
          />
          <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="text-md font-medium py-2">Status</h1>
            <select
              className="w-full px-3 py-2 border border-neutral-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
              value={expense.status}
              onChange={(e) =>
                setExpense({ ...expense, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mt-3">
            <button
              className="px-4 py-2 bg-indigo-500 rounded-lg font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
