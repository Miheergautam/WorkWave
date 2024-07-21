import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Img from "../../assets/images/logo.png";
import { InputBox } from "../InfoComponents/InputBox";
import { ArrowLabel } from "../others/ArrowLabel";

import api from "../../utils/api";
import { useEmployee } from "../../contexts/EmployeeContext";

export function EditEmployee() {
  const navigate = useNavigate();
  const { selectedEmployee, setIsUpdated } = useEmployee();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  useEffect(() => {
    if (selectedEmployee && selectedEmployee._id) {
      const fetchEmployee = async (userId) => {
        try {
          const response = await api.get(`/employee/get/${userId}`);
          if (response) {
            setEmployee(response.data.data);
          }
        } catch (err) {
          console.error("Error fetching employee: ", err);
        }
      };

      fetchEmployee(selectedEmployee._id);
    }
  }, [selectedEmployee]);

  const handleSubmit = async (_id) => {
    // Simulate form submission or any async operation
    try {
      const response = await api.put(`/employee/update/${_id}`, {
        ...employee,
        salary: parseInt(employee.salary, 10),

      });
      if (response) {
        setIsUpdated(true);
        toast.success("Employee updated successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/home/employee");
        }, 1500);
      }
    } catch (error) {
      toast.error("Error updating employee!", {
        position: "top-right",
        autoClose: 2000,
      });
      console.log(error);
    }
  };

  const handleImageUpload = () => {
    // Placeholder for image upload logic
    toast.info("Image upload feature coming soon!", {
      position: "bottom-right", // Toast position
      autoClose: 2000, // Close the toast after 2000ms (2 seconds)
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer/>
      <ArrowLabel label="Edit Employee" location={"/home/employee"} />
      <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
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
              onChange={(e) =>
                setEmployee({ ...employee, firstName: e.target.value })
              }
            />
            <InputBox
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              value={employee.lastName}
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
              value={employee.gender}
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            />
            <InputBox
              type={"date"}
              label="Date Of Birth"
              placeholder="Date Of Birth"
              name="dateOfBirth"
              value={employee.dateOfBirth}
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
              value={employee.streetAddress}
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
              value={employee.city}
              onChange={(e) =>
                setEmployee({ ...employee, city: e.target.value })
              }
            />
            <InputBox
              label="State"
              placeholder="State"
              name="state"
              value={employee.state}
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
              value={employee.country}
              onChange={(e) =>
                setEmployee({ ...employee, country: e.target.value })
              }
            />
            <InputBox
              label="Zip Code"
              placeholder="Zip Code"
              name="zipCode"
              value={employee.zipCode}
              onChange={(e) =>
                setEmployee({ ...employee, zipCode: e.target.value })
              }
            />
          </div>
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Contact Information
          </h1>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Email"
              placeholder="Email"
              name="email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              disabled={true}
            />
            <InputBox
              label="Phone Number"
              placeholder="Phone Number"
              name="phone"
              value={employee.phone}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
            />
          </div>
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Profile Picture
          </h1>
          <div className="col-span-2 col-start-2 flex justify-around items-center">
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
              disabled={true}
            />
            <InputBox
              label="Department"
              placeholder="Department"
              name="department"
              value={employee.department}
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
              value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
            <InputBox
              label="Salary"
              placeholder="Salary"
              name="salary"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="Manager"
              placeholder="Manager-Id"
              name="manager"
              value={employee.manager ? employee.manager : ""}
            />
            <InputBox
              label="Projects"
              placeholder="Projects"
              name="projects"
              value={employee.projects.join(", ")}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  projects: e.target.value.split(", "),
                })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-between">
            <InputBox
              label="IsManager"
              placeholder="IsManager"
              name="isManager"
              value={employee.isManager}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  isManager: e.target.value === "true",
                })
              }
            />
          </div>
          <div className="col-span-2 col-start-2 flex justify-center my-5 py-4 gap-5">
            <button
              className="bg-purple-500 py-2 px-4 rounded-xl"
              onClick={() => handleSubmit(selectedEmployee._id)}
            >
              Save
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
