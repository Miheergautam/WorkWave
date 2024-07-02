import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Heading } from "../components/InfoComponents/Heading";
import { SubHeading } from "../components/InfoComponents/SubHeading";
import { InputBox } from "../components/InfoComponents/InputBox";
import { SelectInputBox } from "../components/InfoComponents/SelectInputBox";
import { Button } from "../components/InfoComponents/Button";
import { BottomHeading } from "../components/InfoComponents/BottomHeading";
import { PasswordInputBox } from "../components/InfoComponents/PasswordInputBox";

export function SignIn() {
  const [selectedOption, setSelectedOption] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
        <SelectInputBox
          options={["Admin", "User"]}
          value={selectedOption}
          onChange={handleRoleChange}
          label="Role"
        />
        <div className="w-full mt-6">
          <Button
            type="submit"
            label="Sign In"
            onClick={async () => {
              let response = null;
              if (selectedOption === "Admin") {
                response = await axios.post(
                  "http://localhost:3000/api/admin/signin",
                  {
                    email: email,
                    password: password,
                  }
                );
              } else if (selectedOption === "User") {
                response = await axios.post(
                  "http://localhost:3000/api/user/signin",
                  {
                    email: email,
                    password: password,
                  }
                );
              }
              if (response && response.data) {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("role", selectedOption);
                localStorage.setItem("token", `Bearer ${response.data.token}`);
                navigate("/dashboard");
              }
            }}
          />
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
