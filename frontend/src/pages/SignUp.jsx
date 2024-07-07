import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { register } from "../services/authService";

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
      const result = await register({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });

      if (result) {
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
      } else {
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
    } catch (error) {
      console.error("Error during sign-up:", error);
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
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <InputBox
          label="Lastname"
          placeholder="Enter your Lastname"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <InputBox
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInputBox
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
