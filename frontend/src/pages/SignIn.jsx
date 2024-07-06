import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Heading } from "../components/InfoComponents/Heading";
import { SubHeading } from "../components/InfoComponents/SubHeading";
import { InputBox } from "../components/InfoComponents/InputBox";
import { SelectInputBox } from "../components/InfoComponents/SelectInputBox";
import { Button } from "../components/InfoComponents/Button";
import { BottomHeading } from "../components/InfoComponents/BottomHeading";
import { PasswordInputBox } from "../components/InfoComponents/PasswordInputBox";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signin",
        {
          email: email,
          password: password,
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        toast.success("Signed in successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => navigate("/home"), 1500); // Navigate after the toast notification
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in. Please check your credentials.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="flex flex-col justify-center text-center w-80 border border-neutral-500 rounded-xl p-6">
        <Heading label="Sign In" />
        <SubHeading label="Please sign in to continue" />
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
        <div className="w-full mt-6">
          <Button type="submit" label="Sign In" onClick={handleSignIn} />
        </div>
        <BottomHeading
          label="Don't have an account?"
          buttonText="Sign Up"
          linkTo="/signup"
        />
      </div>
    </div>
  );
}
