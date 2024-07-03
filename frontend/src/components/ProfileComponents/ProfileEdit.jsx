import Img from "../../assets/images/logo.png";
import { useState } from "react";

import { InputBox } from "../InfoComponents/InputBox";

export function ProfileEdit() {
  const [user, setUser] = useState({
    ImgUrl: Img,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    streetAddress: "1234 Main St",
    city: "City",
    state: "State",
    country: "Country",
    email: "John.io@example.com",
  });

  const handleUploadImage = () => {
    // Create a new input element
  };

  return (
    <>
      <div className="col-span-3 border border-neutral-700 bg-neutral-900 rounded-lg p-4">
        <span className="py-2 px-8 text-xl">Personal Information</span>
        <div className="p-10 flex items-center justify-center gap-10">
          <img
            src={user.ImgUrl}
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
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </div>
          <div className="col-span-1 col-start-3 flex flex-col gap-2">
            <InputBox
              label={"Lastname"}
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <InputBox
              label={"Street Address"}
              value={user.streetAddress}
              onChange={(e) =>
                setUser({ ...user, streetAddress: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"City"}
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"State"}
              value={user.state}
              onChange={(e) => setUser({ ...user, state: e.target.value })}
            />
          </div>
          <div className="col-span-1 col-start-3 flex flex-col gap-2">
            <InputBox
              label={"Country"}
              value={user.country}
              onChange={(e) => setUser({ ...user, country: e.target.value })}
            />
          </div>
        </div>
        <span className="py-2 px-8 text-xl">Contact Information</span>
        <div className="grid grid-cols-3 p-10 gap-4">
          <div className="col-span-1 flex flex-col gap-2">
            <InputBox
              label={"Phone Number"}
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 col-start-3 flex flex-col gap-2">
            <InputBox
              label={"Email"}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 col-span-4 border border-neutral-700 rounded-lg">
        <p className="py-2 px-8 text-xl">Other Information</p>
      </div>
    </>
  );
}
