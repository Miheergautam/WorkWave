import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

// Create the context
const ExpenseContext = createContext();

// Custom hook to use the EmployeeContext
export const useExpense = () => {
  return useContext(ExpenseContext);
};

// Provider component
export const ExpenseProvider = ({ children }) => {
  // State to store fetched employee data
  const [fetchedData, setFetchedData] = useState();
  const [selectedExpense, setSelectedExpense] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await api.get(`/expense/list`);
        if (response && response.data && response.data.data) {
          const data = response.data.data;
          console.log("ExpenseProvider fetchExpenseData data:", data);
          setFetchedData(data); // Update fetched data
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("ExpenseProvider fetchExpenseData error:", error);
      }
    };

    fetchExpenseData();
  }, [isUpdated]); // Run the effect when isUpdated changes

  // Log fetchedData
  useEffect(() => {
    console.log("ExpenseProvider useEffect: fetchedData", fetchedData);
  }, [fetchedData]); // Log whenever fetchedData changes

  // Memoized context value
  const value = React.useMemo(
    () => ({
      fetchedData,
      setFetchedData,
      selectedExpense,
      setSelectedExpense,
      isUpdated,
      setIsUpdated,
    }),
    [fetchedData, selectedExpense, isUpdated]
  );

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
