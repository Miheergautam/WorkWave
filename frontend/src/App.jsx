import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import { Employee } from "./components/DashboardComponents/Employee";
import { Dashboard } from "./components/DashboardComponents/Dashboard";
import { Profile } from "./pages/Profile";
import { ChangePassword } from "./components/ProfileComponents/ChangePassword";
import { ProfileEdit } from "./components/ProfileComponents/ProfileEdit";
import { CandidateLayout } from "./pages/CandidateLayout";
import { NewCandidtate } from "./components/CandidatesComponent/NewCandidate";
import { EditCandidate } from "./components/CandidatesComponent/EditCandidate";
import { ManageCandidate } from "./components/CandidatesComponent/ManageCandidate";
import { ProfileInfo } from "./components/ProfileComponents/ProfileInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />}>
            <Route path="info" element={<ProfileInfo />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
          <Route path="candidates" element={<CandidateLayout />}>
            <Route path="create" element={<NewCandidtate />} />
            <Route path="edit" element={<EditCandidate />} />
            <Route path="manage" element={<ManageCandidate />} />
          </Route>
          <Route path="employees" element={<Employee />} />
          <Route path="finance" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
