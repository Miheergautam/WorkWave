import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

// Create the context
const EmployeeContext = createContext();

// Custom hook to use the EmployeeContext
export const useEmployee = () => {
  return useContext(EmployeeContext);
};

// Provider component
export const EmployeeProvider = ({ children }) => {
  console.log("EmployeeProvider.jsx");

  // State to store fetched employee data
  const [fetchedData, setFetchedData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await api.get(`/employee/list`);
        if (response && response.data && response.data.data) {
          const data = response.data.data;
          setFetchedData(data); // Update fetched data
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("EmployeeProvider fetchEmployeeData error:", error);
      }
    };

    fetchEmployeeData();
  }, [isUpdated]); // Run the effect when isUpdated changes

  // Log fetchedData
  useEffect(() => {
    console.log("EmployeeProvider useEffect: fetchedData", fetchedData);
  }, [fetchedData]); // Log whenever fetchedData changes

  // Memoized context value
  const value = React.useMemo(
    () => ({
      fetchedData,
      setFetchedData,
      selectedEmployee,
      setSelectedEmployee,
      isUpdated,
      setIsUpdated,
    }),
    [fetchedData, selectedEmployee, isUpdated]
  );

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};