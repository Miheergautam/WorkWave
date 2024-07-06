import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import { Heading } from "../components/InfoComponents/Heading";
import { SubHeading } from "../components/InfoComponents/SubHeading";
import { InputBox } from "../components/InfoComponents/InputBox";
import { Button } from "../components/InfoComponents/Button";
import { BottomHeading } from "../components/InfoComponents/BottomHeading";
import { PasswordInputBox } from "../components/InfoComponents/PasswordInputBox";

export function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/register`,
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
        }
      );

      if (response.data) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        toast.success("Signed up successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => navigate("/signin"), 1500); // Navigate after the toast notification
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error(
        "Failed to sign up. Please check your details and try again.",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="flex flex-col justify-center text-center w-80 border border-neutral-500 rounded-xl p-5">
        <Heading label="Sign Up" />
        <SubHeading label="Please sign up to continue" />
        <InputBox
          label="Firstname"
          placeholder="Enter your Firstname"
          type="text"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <InputBox
          label="Lastname"
          placeholder="Enter your Lastname"
          type="text"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <InputBox
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <PasswordInputBox
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="mt-6">
          <Button label="Sign Up" onClick={handleSignUp} />
        </div>
        <BottomHeading
          label="Already have an account?"
          buttonText="Sign In"
          linkTo="/signin"
        />
      </div>
    </div>
  );
}
