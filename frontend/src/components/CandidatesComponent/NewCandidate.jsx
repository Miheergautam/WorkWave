import Img from "../../assets/images/logo.png";
import { InputBox } from "../InfoComponents/InputBox";
import { useNavigate } from "react-router-dom";
import { ArrowLabel } from "../others/ArrowLabel";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useCandidate} from "../../contexts/CandidateContext";

import api from "../../utils/api"; // Ensure this is correctly imported

export function NewCandidate() {
  const { setIsUpdated } = useCandidate();
  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState({
    candidateId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    linkedIn: "",
    resume: "",
    skills: "",
    experience: "",
    appliedPosition: "",
    status: "applied",
    idProof: "",
    notes: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await api.post("/candidate/create", {
        ...candidateData,
        candidateId: `CAND-${candidateData.firstName[0]}${
          candidateData.lastName[0]
        }${Math.floor(Math.random() * 1000)}`,
        experience: parseInt(candidateData.experience),
        skills: [candidateData.skills],
      });
      if (response) {
        setIsUpdated(true);
        toast.success("Candidate created successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/home/candidates");
        }, 1500);
      } else {
        toast.error("Failed to create candidate", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error("Error creating candidate", {
        position: "top-right",
        autoClose: 2000,
      });
      console.error("New candidate creation try block Failed: ", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <ToastContainer />
      <ArrowLabel label="Candidate" location={"/home/candidates"} />
      <div className="flex flex-col bg-neutral-900 border border-neutral-600 rounded-lg">
        <h1 className="text-center text-3xl py-3">New Candidate</h1>
        <h1 className="text-center text-sm pb-5 border-b border-neutral-600">
          {`( Please Fill The following details )`}
        </h1>
        <div className="grid grid-cols-4">
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Personal Information
          </h1>
          <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
            <InputBox
              type="text"
              label="First Name"
              placeholder="First Name"
              onChange={(e) =>
                setCandidateData({
                  ...candidateData,
                  firstName: e.target.value,
                })
              }
            />
            <InputBox
              type="text"
              label="Last Name"
              placeholder="Last Name"
              onChange={(e) =>
                setCandidateData({ ...candidateData, lastName: e.target.value })
              }
            />
          </div>
          <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
            <InputBox
              type="email"
              label="Email"
              placeholder="Email"
              onChange={(e) =>
                setCandidateData({ ...candidateData, email: e.target.value })
              }
            />
            <InputBox
              type="text"
              label="Gender"
              placeholder="Gender"
              onChange={(e) =>
                setCandidateData({ ...candidateData, gender: e.target.value })
              }
            />
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
            <InputBox
              label="Phone Number"
              placeholder="Phone Number"
              onChange={(e) =>
                setCandidateData({ ...candidateData, mobile: e.target.value })
              }
            />
            <InputBox
              label="LinkedIn Url"
              placeholder="LinkedIn-Url"
              onChange={(e) =>
                setCandidateData({ ...candidateData, linkedIn: e.target.value })
              }
            />
          </div>
          <h1 className="col-span-4 mt-8 py-4 text-center font-semibold text-3xl">
            Other Information
          </h1>
          <div className="col-span-2 col-start-2">
            <InputBox
              type="text"
              label="Applied Position"
              placeholder="Applied Position"
              onChange={(e) =>
                setCandidateData({
                  ...candidateData,
                  appliedPosition: e.target.value,
                })
              }
            />
          </div>
          <div className="col-span-4 flex justify-around lg:col-span-2 lg:col-start-2 lg:justify-between">
            <InputBox
              type="number"
              label="Experience"
              placeholder="0-2 years"
              onChange={(e) =>
                setCandidateData({
                  ...candidateData,
                  experience: e.target.value,
                })
              }
            />
            <InputBox
              type="text"
              label="Skills"
              placeholder="Skills"
              onChange={(e) =>
                setCandidateData({ ...candidateData, skills: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 col-start-2">
            <InputBox label="Resume" type="file" name="resume" />
          </div>
          <div className="col-span-2 col-start-2">
            <InputBox label="ID-Proof" type="file" name="idProof" />
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
