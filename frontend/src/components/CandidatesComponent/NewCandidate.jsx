import Img from "../../assets/images/logo.png";
import { InputBox } from "../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";

export function NewCandidate() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home/candidates");
  };

  return (
    <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
      <h1 className="text-center text-3xl py-3">New Candidate</h1>
      <h1 className="text-center text-sm pb-5 border-b border-neutral-600">
        {`( Please Fill The following details )`}
      </h1>
      <div className="grid grid-cols-4">
        <h1 className="col-span-4 mt-8 py-4  text-center font-semibold text-3xl">
          Personal Infomation
        </h1>
        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
          <InputBox label="First Name" placeholder="First Name" />
          <InputBox label="Last Name" placeholder="Last Name" />
        </div>
        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
          <InputBox label="Email" placeholder="Email" />
          <InputBox label="Password" placeholder="Password" />
        </div>

        <div className=" col-span-2 col-start-2">
          <InputBox label="Address" placeholder="Address" />
        </div>

        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
          <InputBox label="City" placeholder="City" />
          <InputBox label="State" placeholder="State" />
        </div>
        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
          <InputBox label="Country" placeholder="Country" />
          <InputBox label="Zip Code" placeholder="Zip Code" />
        </div>
        <div className="col-span-2 col-start-2">
          <InputBox label="Role" placeholder="Role" />
        </div>

        <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
          Profile Picture
        </h1>
        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between items-center ">
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
          Contact Information
        </h1>

        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
          <InputBox label="Phone Number" placeholder="Phone Number" />
          <InputBox label="LinkedIn Url" placeholder="LinkedIn-Url" />
        </div>

        <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
          Other Information
        </h1>

        <div className="col-span-2 col-start-2">
          <InputBox label="Applied Position" placeholder="Applied Position" />
        </div>
        <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
          <InputBox label="Experience" placeholder="0-2 years" />
          <InputBox label="Skills" placeholder="Skills" />
        </div>
        <div className="col-span-2 col-start-2">
          <InputBox label="Resume" type="file" />
        </div>
        <div className="col-span-2 col-start-2">
          <InputBox label="ID-Proof" type="file" />
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
