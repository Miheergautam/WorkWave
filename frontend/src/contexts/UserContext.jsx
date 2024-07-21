import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode"; // Correct import

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  console.log("UserProvider.jsx");

  // State to store fetched user data
  const [fetchedData, setFetchedData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await api.get(`/user/get/${userId}`);
        const data = response.data.data;
        setFetchedData(data); // Update fetched data
      } catch (error) {
        console.error("UserProvider fetchUserData error:", error);
      }
    };

    // Fetch user data if token exists
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.userId) {
        fetchUserData(decodedToken.userId); // Call fetchUserData with userId
      }
    }
  }, []); // Empty dependency array to run once on mount

  // Log fetchedData
  useEffect(() => {
    console.log("UserProvider useEffect : fetchedData", fetchedData);
  }, [fetchedData]); // Log whenever fetchedData changes

  // Memoized context value
  const value = React.useMemo(
    () => ({ fetchedData, setFetchedData }),
    [fetchedData]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
