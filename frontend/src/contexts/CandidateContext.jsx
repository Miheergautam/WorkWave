import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

// Create the context
const CandidateContext = createContext();

// Custom hook to use the CandidateContext
export const useCandidate = () => {
  return useContext(CandidateContext);
};

// Provider component
export const CandidateProvider = ({ children }) => {
  console.log("CandidateProvider.jsx");

  // State to store fetched candidate data
  const [fetchedData, setFetchedData] = useState();
  const [selectedCandidate, setSelectedCandidate] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await api.get(`/candidate/get`);
        if (response && response.data && response.data.data) {
          const data = response.data.data;
          setFetchedData(data); // Update fetched data
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("CandidateProvider fetchCandidateData error:", error);
      }
    };

    fetchCandidateData();
  }, [isUpdated]); // Empty dependency array to run once on mount

  // Log fetchedData
  useEffect(() => {
    console.log("CandidateProvider useEffect: fetchedData", fetchedData);
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
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};
