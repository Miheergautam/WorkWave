import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PasswordInputBox } from "../components/InfoComponents/PasswordInputBox";
import { useState } from "react";
import { Button } from "../components/InfoComponents/Button";

export function ChangePassword() {
  const navigate = useNavigate();

  const [Currentpassword, setCurrentPassword] = useState("");
  const [Newpassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handleSubmitButton = () => {
    // Add your code here
    navigate("/home/profile/info");
  };

  return (
    <div className="col-span-4 bg-neutral-900">
      <div className="grid grid-cols-3">
        <div className="col-span-1 col-start-2">
          <PasswordInputBox
            label="Current Password"
            placeholder="Enter current Password"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <PasswordInputBox
            label="New Password"
            placeholder="Enter New Password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <PasswordInputBox
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <div className="flex justify-center items-center my-8">
            <button
              className="bg-indigo-500 py-2 px-8 rounded-xl"
              onClick={handleSubmitButton}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
