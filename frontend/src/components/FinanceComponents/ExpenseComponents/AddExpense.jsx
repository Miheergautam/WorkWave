import React, { useState } from 'react';
import { InputBox } from "../../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";
import { ArrowLabel } from "../../others/ArrowLabel";

export function AddExpense() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfExpense, setDateOfExpense] = useState("");
  const [approvedBy, setApprovedBy] = useState("");

  const handleCreate = () => {
    // Handle form submission logic here
    console.log({
      employeeId,
      expenseAmount,
      purpose,
      description,
      dateOfExpense,
      approvedBy
    });
    navigate("../expense");
  };

  return (
    <>
      <ArrowLabel label="Add Expense" location="../expense" />
      <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg my-4">
        <div className="flex flex-col justify-center items-center py-3">
          <h1 className="text-3xl text-center py-2">Create New Expense</h1>
          <p>{`( Please fill the details )`}</p>
        </div>

        <div className="grid grid-cols-4">
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox label="EmployeeID" placeholder="Employee-Id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
            <InputBox label="Expense Amount" placeholder="Expense Amount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox label="Purpose" placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
            <InputBox label="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox label="Date Of Expense" type="date" value={dateOfExpense} onChange={(e) => setDateOfExpense(e.target.value)} />
            <InputBox label="Approved By" placeholder="Employee/Admin Id" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} />
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
