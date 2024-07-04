const expenses = [
  {
    employeeId: "E123",
    expenseAmount: "$200.00",
    purpose: "Travel",
    dateOfExpense: "2024-06-15",
    approvedBy: "John Doe",
    status: "Approved"
  },
  {
    employeeId: "E456",
    expenseAmount: "$150.00",
    purpose: "Office Supplies",
    dateOfExpense: "2024-06-20",
    approvedBy: "Jane Smith",
    status: "Pending"
  },
  {
    employeeId: "E789",
    expenseAmount: "$300.00",
    purpose: "Client Entertainment",
    dateOfExpense: "2024-06-22",
    approvedBy: "Michael Brown",
    status: "Rejected"
  }
];


export function ExpenseLayout() {
  return (
    <div className="flex flex-col">
      <div className="mt-4 py-2 px-4 bg-neutral-900 border border-neutral-600 rounded-lg">
      <h1 className="py-4">Expenses by Id</h1>
        <table className="w-full  text-md text-center ">
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
            {expenses.map((expense, index) => (
              <tr key={index} className="border border-neutral-600">
                <td className="py-2">{expense.employeeId}</td>
                <td className="py-2">{expense.expenseAmount}</td>
                <td className="py-2">{expense.purpose}</td>
                <td className="py-2">{expense.dateOfExpense}</td>
                <td className="py-2">{expense.approvedBy}</td>
                <td className="py-2">{expense.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
