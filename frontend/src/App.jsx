import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";

import { EmployeeLayout } from "./pages/EmployeeLayout";
import { NewEmployee } from "./components/EmployeeComponents/NewEmployee";
import { EditEmployee } from "./components/EmployeeComponents/EditEmployee";
import { ManageEmployees } from "./components/EmployeeComponents/ManageEmployees";
import { EmployeeInfo } from "./components/EmployeeComponents/EmployeeInfo";

import { Dashboard } from "./components/DashboardComponents/Dashboard";
import { CandidateLayout } from "./pages/CandidateLayout";
import { NewCandidate } from "./components/CandidatesComponent/NewCandidate";
import { EditCandidate } from "./components/CandidatesComponent/EditCandidate";
import { ManageCandidate } from "./components/CandidatesComponent/ManageCandidate";

import { Profile } from "./pages/Profile";
import { ChangePassword } from "./components/ProfileComponents/ChangePassword";
import { ProfileEdit } from "./components/ProfileComponents/ProfileEdit";
import { ProfileInfo } from "./components/ProfileComponents/ProfileInfo";

import { FinanceLayout } from "./pages/FinanceLayout";
import { ExpenseLayout } from "./components/FinanceComponents/ExpenseComponents/ExpenseLayout";
import { AddExpense } from "./components/FinanceComponents/ExpenseComponents/AddExpense";
import { ManageExpense } from "./components/FinanceComponents/ExpenseComponents/ManageExpense";
import { EditExpense } from "./components/FinanceComponents/ExpenseComponents/EditExpense";

import { AttendanceLayout } from "./pages/AttendanceLayout";
import { CreateAttendance } from "./components/AttendanceComponents/CreateAttendance";
import { EditAttendance } from "./components/AttendanceComponents/EditAttendance";
import { ViewAttendance } from "./components/AttendanceComponents/ViewAttendance";

import { Layout } from "./pages/Layout";
import { RequireAuth } from "./components/RequireAuth";
import { DashboardProvider } from "./contexts/DashboardContext";

function App() {
  console.log("App.jsx");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Landing />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />}>
            <Route
              path="dashboard"
              element={
                <DashboardProvider>
                  <Dashboard />
                </DashboardProvider>
              }
            />
            <Route path="profile" element={<Profile />}>
              <Route path="info" element={<ProfileInfo />} />
              <Route path="edit" element={<ProfileEdit />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
            <Route path="candidates" element={<CandidateLayout />}>
              <Route path="create" element={<NewCandidate />} />
              <Route path="edit" element={<EditCandidate />} />
              <Route path="manage" element={<ManageCandidate />} />
            </Route>
            <Route path="employee" element={<EmployeeLayout />}>
              <Route path="info" element={<EmployeeInfo />} />
              <Route path="create" element={<NewEmployee />} />
              <Route path="edit" element={<EditEmployee />} />
              <Route path="manage" element={<ManageEmployees />} />
            </Route>
            <Route path="finance" element={<FinanceLayout />}>
              <Route path="expense" element={<ExpenseLayout />} />
              <Route path="edit" element={<EditExpense />} />
              <Route path="add" element={<AddExpense />} />
              <Route path="manage" element={<ManageExpense />} />
            </Route>
            <Route path="attendance" element={<AttendanceLayout />}>
              <Route path="create" element={<CreateAttendance />} />
              <Route path="edit" element={<EditAttendance />} />
              <Route path="view" element={<ViewAttendance />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
