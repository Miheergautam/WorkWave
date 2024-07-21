import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { signin } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

import { Heading } from "../components/InfoComponents/Heading";
import { SubHeading } from "../components/InfoComponents/SubHeading";
import { InputBox } from "../components/InfoComponents/InputBox";
import { Button } from "../components/InfoComponents/Button";
import { BottomHeading } from "../components/InfoComponents/BottomHeading";
import { PasswordInputBox } from "../components/InfoComponents/PasswordInputBox";

export function SignIn() {
  console.log("SignIn.jsx");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const Navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signin({
        email: email,
        password: password,
      });

      if (result.token) {
        login(result.token);
        Navigate("/home");
      } else {
        throw new Error("Signin failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInputBox
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="w-full mt-6">
          <Button type="button" label="Sign In" onClick={handleSignIn} />
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
