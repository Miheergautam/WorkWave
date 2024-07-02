import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Employee } from "./components/DashboardComponents/Employee";
import { Dashboard } from "./components/DashboardComponents/Dashboard";
import { Profile } from "./pages/Profile";
import { ChangePassword } from "./pages/ChangePassword";
import { ProfileEdit } from "./pages/ProfileEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/layout" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/change-password" element={<ChangePassword />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
          <Route path="employees" element={<Employee />} />
          <Route path="candidates" element={<Dashboard />} />
          <Route path="finance" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
