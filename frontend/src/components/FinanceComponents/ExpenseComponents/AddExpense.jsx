import React, { useEffect, useState } from "react";
import { InputBox } from "../../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";
import { ArrowLabel } from "../../others/ArrowLabel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../utils/api";

export function AddExpense() {
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState({
    expenseId: "",
    userId: "",
    expenseAmount: "",
    purpose: "",
    description: "",
    dateOfExpense: "",
    approvedBy: "",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleCreate = async () => {
    console.log("Expense Data:", expenseData);
    // Handle form submission logic here
    try {
      const response = await api.post("/expense/add", {
        ...expenseData,
        expenseAmount: parseInt(expenseData.expenseAmount),
        expenseId: `EXP-${Date.now()}`,
      });
      if (response) {
        toast.success("Expense Created Successfully!", {
          position: "bottom-right",
          autoClose: 1500,
        });
        setTimeout(() => navigate("../expense"), 2000);
      }
    } catch (err) {
      toast.error("Error Creating Expense!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer /> {/* Ensure ToastContainer is rendered */}
      <ArrowLabel label="Add Expense" location="../expense" />
      <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg my-4">
        <div className="flex flex-col justify-center items-center py-3">
          <h1 className="text-3xl text-center py-2">Create New Expense</h1>
          <p>{`( Please fill the details )`}</p>
        </div>

        <div className="grid grid-cols-4">
          <div className="col-span-2 col-start-2 flex justify-between">
            {/* <InputBox
              label="Employee ID"
              placeholder="Employee-Id"
              value={expenseData.employeeId}
              onChange={(e) =>
                setExpenseData({ ...expenseData, employeeId: e.target.value })
              }
            /> */}
            <div className="flex flex-col justify-center items-left">
              <label htmlFor="employeeSelect" className="py-2 mt-3">
                EmployeeId
              </label>
              <select
                onChange={(e) =>
                  setExpenseData({ ...expenseData, userId: e.target.value })
                }
                className="border border-neutral-500 rounded-lg px-2 py-2"
              >
                <option value="">Select an employee</option>
                {employeeData.map((employee) => (
                  <option key={employee.userId} value={employee.userId}>
                    {employee.employeeId}
                  </option>
                ))}
              </select>
            </div>
            <InputBox
              label="Expense Amount"
              placeholder="Expense Amount"
              value={expenseData.expenseAmount}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  expenseAmount: e.target.value,
                })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Purpose"
              placeholder="Purpose"
              value={expenseData.purpose}
              onChange={(e) =>
                setExpenseData({ ...expenseData, purpose: e.target.value })
              }
            />
            <InputBox
              label="Description"
              placeholder="Description"
              value={expenseData.description}
              onChange={(e) =>
                setExpenseData({ ...expenseData, description: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Date Of Expense"
              type="date"
              value={expenseData.dateOfExpense}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  dateOfExpense: e.target.value,
                })
              }
            />
            <div className="flex flex-col justify-center items-left">
              <label htmlFor="employeeSelect" className="py-2 mt-3">
                Approved By
              </label>
              <select
                onChange={(e) =>
                  setExpenseData({ ...expenseData, approvedBy: e.target.value })
                }
                className="border border-neutral-500 rounded-lg px-2 py-2"
              >
                <option value="">Employee/Admin Id</option>
                {adminData.map((employee) => (
                  <option key={employee.userId} value={employee.userId}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-2 col-start-2 flex justify-center my-4">
            <button
              className="bg-purple-500 py-2 px-4 my-4 rounded-xl"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
