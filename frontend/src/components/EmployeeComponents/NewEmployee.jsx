import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Img from "../../assets/images/logo.png";
import { InputBox } from "../InfoComponents/InputBox";
import { ArrowLabel } from "../others/ArrowLabel";
import { PasswordInputBox } from "../InfoComponents/PasswordInputBox";

import api from "../../utils/api";

export function NewEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    dateOfBirth: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    employeeId: "",
    department: "",
    position: "",
    salary: "",
    manager: null,
    projects: [],
    isManager: false,
  });

  const handleSubmit = async () => {
    // Simulate form submission or any async operation
    try {
      const response = await api.post("/employee/create", {
        ...employee,
        salary: parseInt(employee.salary),
        employeeId: `EMP-${employee.firstName[0]}${
          employee.lastName[0]
        }${Math.floor(Math.random() * 1000)}`,
      });
      if (response) {
        setIsUpdated(true);
        toast.success("Employee created successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/home/employee");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = () => {
    // Placeholder for image upload logic
    toast.info("Image upload feature coming soon!", {
      position: "bottom-right", // Toast position
      autoClose: 2000, // Close the toast after 3000ms (3 seconds)
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <ArrowLabel label="Create Employee" location={"/home/employee"} />
      <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
        <h1 className="text-center text-3xl py-3">Create New Employee</h1>
        <h1 className="text-center text-sm pb-5 border-b border-neutral-600">
          {`( Please Fill The following details )`}
        </h1>
        <div className="grid grid-cols-4">
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Personal Information
          </h1>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="First Name"
              placeholder="First Name"
              name="firstName"
              onChange={(e) =>
                setEmployee({ ...employee, firstName: e.target.value })
              }
            />
            <InputBox
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              onChange={(e) =>
                setEmployee({ ...employee, lastName: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Gender"
              placeholder="Gender"
              name="gender"
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            />

            <InputBox
              type={"date"}
              label="Date Of Birth"
              placeholder="Date Of Birth"
              name="dateOfBirth"
              onChange={(e) =>
                setEmployee({ ...employee, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2">
            <InputBox
              label="Street Address"
              placeholder="Street Address"
              name="streetAddress"
              onChange={(e) =>
                setEmployee({ ...employee, streetAddress: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="City"
              placeholder="City"
              name="city"
              onChange={(e) =>
                setEmployee({ ...employee, city: e.target.value })
              }
            />
            <InputBox
              label="State"
              placeholder="State"
              name="state"
              onChange={(e) =>
                setEmployee({ ...employee, state: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Country"
              placeholder="Country"
              name="country"
              onChange={(e) =>
                setEmployee({ ...employee, country: e.target.value })
              }
            />
            <InputBox
              label="Zip Code"
              placeholder="Zip Code"
              name="zipCode"
              onChange={(e) =>
                setEmployee({ ...employee, zipCode: e.target.value })
              }
            />
          </div>
          {/* <div className="col-span-2 col-start-2">
            <InputBox
              label="Role"
              placeholder="Role"
              name="role"
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
            />
          </div> */}
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Contact Information
          </h1>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
            <PasswordInputBox
              label="Password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <InputBox
              label="Phone Number"
              placeholder="Phone Number"
              name="phone"
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
            />
          </div>

          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Profile Picture
          </h1>
          <div className="col-span-2 col-start-2 flex justify-around items-center ">
            <img
              src={Img}
              alt="Profile Picture"
              className="w-1/3 rounded-full p-4"
            />
            <div className="flex flex-col">
              <button
                className="bg-purple-500 py-2 px-4 rounded-xl"
                onClick={handleImageUpload}
              >
                Upload
              </button>
              <p className="p-2 text-sm">{`(Max upload size: 5Mb)`}</p>
            </div>
          </div>
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Employment Information
          </h1>

          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Employee ID"
              placeholder="Employee ID"
              name="employeeId"
              onChange={(e) =>
                setEmployee({ ...employee, employeeId: e.target.value })
              }
            />
            <InputBox
              label="Department"
              placeholder="Department"
              name="department"
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Position"
              placeholder="Position"
              name="position"
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
            <InputBox
              label="Salary"
              placeholder="Salary"
              name="salary"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Manager"
              placeholder="Manager-Id"
              name="managerId"
              onChange={(e) =>
                setEmployee({ ...employee, manager: e.target.value })
              }
            />
            <InputBox
              label="Projects"
              placeholder="Projects"
              name="projects"
              onChange={(e) =>
                setEmployee({ ...employee, projects: e.target.value })
              }
            />
          </div>

          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="IsManager"
              placeholder="IsManager"
              name="isManager"
              onChange={(e) =>
                setEmployee({ ...employee, isManager: e.target.value })
              }
            />
          </div>

          <div className="col-span-2 col-start-2 flex justify-center my-5 py-4 gap-5">
            <button
              className="bg-purple-500 py-2 px-4 rounded-xl"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button className="bg-purple-500 py-2 px-4 rounded-xl">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
