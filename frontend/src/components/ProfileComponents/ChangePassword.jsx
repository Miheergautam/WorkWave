import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components
import { ArrowLabel } from "../others/ArrowLabel";
import { PasswordInputBox } from "../InfoComponents/PasswordInputBox";

//API utils
import api from "../../utils/api";

export function ChangePassword() {
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmitButton = async () => {
    // Placeholder for validation logic
    try {
      if (
        userPassword.currentPassword === "" ||
        userPassword.newPassword === "" ||
        userPassword.confirmPassword === ""
      ) {
        toast.error("Please fill all the Details!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        return;
      }

      if (userPassword.newPassword !== userPassword.confirmPassword) {
        toast.error("New Password and Confirm Password does not match!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });

        return;
      }

      const response = await api.put("/user/changePassword", {
        currentPassword: userPassword.currentPassword,
        newPassword: userPassword.newPassword,
        confirmPassword: userPassword.confirmPassword,
      });
      if (response) {
        ctoast.success("Password Changed successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/home/profile/info");
        }, 1500);
      } else {
        console.log("Password Change Failed");
      }
    } catch (err) {
      console.log("ChangePassword Saving Data Try block Failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer />
      <ArrowLabel label="Change Password" location={"/home/profile/info"} />
      <div className="col-span-4 bg-neutral-900 border border-neutral-700 rounded-lg">
        <div className="grid grid-cols-3">
          <div className="col-span-1 col-start-2">
            <PasswordInputBox
              label="Current Password"
              placeholder="Enter current Password"
              onChange={(e) =>
                setUserPassword({
                  ...userPassword,
                  currentPassword: e.target.value,
                })
              }
            />
            <PasswordInputBox
              label="New Password"
              placeholder="Enter New Password"
              onChange={(e) =>
                setUserPassword({
                  ...userPassword,
                  newPassword: e.target.value,
                })
              }
            />
            <PasswordInputBox
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              onChange={(e) =>
                setUserPassword({
                  ...userPassword,
                  confirmPassword: e.target.value,
                })
              }
            />
            <div className="flex justify-center items-center my-8">
              <button
                className="bg-purple-500 py-2 px-8 rounded-xl"
                onClick={handleSubmitButton}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
