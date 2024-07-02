import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//COMPONENTS
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

  return (
    <div className="flex justify-center items-center h-screen">
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
          <Button
            label="Sign Up"
            onClick={async () => {
              const response = await axios.post(
                `http://localhost:3000/api/user/signup`,
                {
                  firstName:firstname,
                  lastName:lastname,
                  email:email,
                  password:password,
                }
              );
              localStorage.setItem("userId", response.data.userId);
              localStorage.setItem("token", `Bearer ${response.data.token}`);
              navigate("/signin");
            }}
          />
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
