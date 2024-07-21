import Img from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components Used
import { ArrowLabel } from "../others/ArrowLabel";
import { InputBox } from "../InfoComponents/InputBox";

//Utils
import api from "../../utils/api";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../contexts/UserContext";

export function ProfileEdit() {
  console.log("ProfileEdit.jsx");
  const navigate = useNavigate();

  const { setFetchedData } = useUser();
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await api.get(`/user/get/${userId}`);
        const data = response.data.data;
        setUserData({
          _id: data._id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          streetAddress: data.streetAddress || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
        });
      } catch (error) {
        console.error("ProfileEditData Try Block Fecthing Failed: ", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.userId) {
        fetchUserData(decodedToken.userId);
      }
    }
  }, []);

  const handleUploadImage = () => {
    // Placeholder for image upload logic
  };

  const handleSaveChanges = async () => {
    try {
      const response = await api.put(`/user/update`, {
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        streetAddress: userData.streetAddress || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
      });
      if (response) {
        setFetchedData(userData);
        toast.success("Profile Updated successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/home/profile/info");
        }, 1500);
      } else {
      }
    } catch (error) {
      console.error("ProfileEdit Saving Data Try Block Failed: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <ArrowLabel label="Edit Profile" location={"/home/profile/info"} />
      <div className="col-span-4 border border-neutral-700 bg-neutral-900 rounded-lg p-4">
        <span className="py-2 px-8 text-xl">Personal Information</span>
        <div className="p-10 flex items-center justify-center gap-10">
          <img
            src={Img}
            alt="Profile Picture"
            className="rounded-full w-1/4 h-1/4"
          />
          <div className="flex flex-col gap-3">
            <button
              className="text-white rounded-xl py-2 px-4 border border-neutral-600 bg-indigo-500"
              onClick={handleUploadImage}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 p-10 gap-4">
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"Firstname"}
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 col-start-3 flex flex-col gap-2">
            <InputBox
              label={"Lastname"}
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <InputBox
              label={"Street Address"}
              value={userData.streetAddress}
              onChange={(e) =>
                setUserData({ ...userData, streetAddress: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"City"}
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"State"}
              value={userData.state}
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 col-start-3 flex flex-col gap-2">
            <InputBox
              label={"Country"}
              value={userData.country}
              onChange={(e) =>
                setUserData({ ...userData, country: e.target.value })
              }
            />
          </div>
        </div>
        <span className="py-2 px-8 text-xl">Contact Information</span>
        <div className="grid grid-cols-3 p-10 gap-4">
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"Phone Number"}
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </div>
          <p className="col-span-1 col-start-3 flex flex-col gap-2 mt-6">
            Email
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {userData.email}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-neutral-900 col-span-4 border border-neutral-700 rounded-lg">
        <p className="py-2 px-8 text-xl">Other Information</p>

        <div className="flex justify-center my-4">
          <button
            className="py-2 px-6 bg-purple-500 rounded-lg"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
