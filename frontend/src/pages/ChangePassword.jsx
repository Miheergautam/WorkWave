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
    navigate("/layout/profile");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate("/layout/profile")}
        />
        <strong className="text-xl font-semibold">ChangePassword</strong>
      </div>
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg  p-4 grid grid-cols-4 place-items-center">
        <div className="col-span-2 col-start-2 w-80 ">
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
          <div className="my-8 mx-10">
            <Button label="Submit" onClick={handleSubmitButton} />
          </div>
        </div>
      </div>
    </div>
  );
}
