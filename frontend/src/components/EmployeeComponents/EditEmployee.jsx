import Img from "../../assets/images/logo.png";
import { InputBox } from "../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom";

export function EditEmployee() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = () => {
    // Add your code here
    navigate("/home/employee");
  };

  return (

    <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
      <h1 className="text-center text-3xl py-3">Edit Employee</h1>
      <h1 className="text-center text-sm pb-5 border-b border-neutral-600">
        {`( Please Fill The following details )`}
      </h1>
      <div className="grid grid-cols-4">
        <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
          Personal Infomation
        </h1>
        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="First Name" placeholder="First Name" />
          <InputBox label="Last Name" placeholder="Last Name" />
        </div>
        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="Email" placeholder="Email" />
          <InputBox label="Phone Number" placeholder="Phone Number" />
        </div>
        <div className="col-span-2 col-start-2">
          <InputBox label="Address" placeholder="Address" />
        </div>
        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="City" placeholder="City" />
          <InputBox label="State" placeholder="State" />
        </div>
        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="Country" placeholder="Country" />
          <InputBox label="Zip Code" placeholder="Zip Code" />
        </div>
        <div className="col-span-2 col-start-2">
          <InputBox label="Role" placeholder="Role" />
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
            <button className="bg-purple-500 py-2 px-4 rounded-xl">
              Upload
            </button>
            <p className="p-2 text-sm">{`(Max upload size: 5Mb)`}</p>
          </div>
        </div>
        <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
          Employment Information
        </h1>

        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="Employee ID" placeholder="Employee ID" />
          <InputBox label="Department" placeholder="Department" />
        </div>
        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="Position" placeholder="Position" />
          <InputBox label="Manager" placeholder="Manager-Id" />
        </div>
        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="Salary" placeholder="Salary" />
          <InputBox
            label="Date Of Joining"
            placeholder="Date Of Joining"
            type="Date"
          />
        </div>

        <div className="col-span-2 col-start-2 flex justify-between">
          <InputBox label="Projects" placeholder="Projects" />
          <InputBox label="IsManager" placeholder="IsManager" />
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
  );
}
