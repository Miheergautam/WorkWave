import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

// Create the context
const DashboardContext = createContext();

// Custom hook to use the CandidateContext
export const useDashboard = () => {
  return useContext(DashboardContext);
};

// Provider component
export const DashboardProvider = ({ children }) => {
  // State to store fetched candidate data
  const [fetchedData, setFetchedData] = useState();
  const [selectedCandidate, setSelectedCandidate] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user/list`);
        if (response && response.data && response.data.data) {
          const data = response.data.data;
          setFetchedData(data); // Update fetched data
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("DashboardProvider fetchData error:", error);
      }
    };

    fetchData();
  }, [isUpdated]); // Empty dependency array to run once on mount

  // Log fetchedData
  useEffect(() => {
    console.log("DashboardProvider useEffect: fetchedData", fetchedData);
  }, [fetchedData]); // Log whenever fetchedData changes

  // Memoized context value
  const value = React.useMemo(
    () => ({
      fetchedData,
      setFetchedData,
      selectedCandidate,
      setSelectedCandidate,
      isUpdated,
      setIsUpdated,
    }),
    [fetchedData, selectedCandidate, isUpdated]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
