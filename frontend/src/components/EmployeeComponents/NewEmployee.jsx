import Img from "../../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../InfoComponents/InputBox";
import { ArrowLabel } from "../others/ArrowLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NewEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    role: "",
    employeeId: "",
    department: "",
    position: "",
    managerId: "",
    salary: "",
    dateOfJoining: "",
    projects: "",
    isManager: "",
  });

  const handleSubmit = () => {
    // Simulate form submission or any async operation
    toast.success("Employee created successfully!", {
      position: "bottom-right", // Toast position
      autoClose: 2000, // Close the toast after 3000ms (3 seconds)
    });

    setTimeout(() => {
      navigate("/home/employee");
    }, 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
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
              value={employee.firstName}
              onChange={handleInputChange}
            />
            <InputBox
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              value={employee.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Email"
              placeholder="Email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
            />
            <InputBox
              label="Phone Number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2">
            <InputBox
              label="Address"
              placeholder="Address"
              name="address"
              value={employee.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="City"
              placeholder="City"
              name="city"
              value={employee.city}
              onChange={handleInputChange}
            />
            <InputBox
              label="State"
              placeholder="State"
              name="state"
              value={employee.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Country"
              placeholder="Country"
              name="country"
              value={employee.country}
              onChange={handleInputChange}
            />
            <InputBox
              label="Zip Code"
              placeholder="Zip Code"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2">
            <InputBox
              label="Role"
              placeholder="Role"
              name="role"
              value={employee.role}
              onChange={handleInputChange}
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
              value={employee.employeeId}
              onChange={handleInputChange}
            />
            <InputBox
              label="Department"
              placeholder="Department"
              name="department"
              value={employee.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Position"
              placeholder="Position"
              name="position"
              value={employee.position}
              onChange={handleInputChange}
            />
            <InputBox
              label="Manager"
              placeholder="Manager-Id"
              name="managerId"
              value={employee.managerId}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Salary"
              placeholder="Salary"
              name="salary"
              value={employee.salary}
              onChange={handleInputChange}
            />
            <InputBox
              label="Date Of Joining"
              placeholder="Date Of Joining"
              type="date"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Projects"
              placeholder="Projects"
              name="projects"
              value={employee.projects}
              onChange={handleInputChange}
            />
            <InputBox
              label="IsManager"
              placeholder="IsManager"
              name="isManager"
              value={employee.isManager}
              onChange={handleInputChange}
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
