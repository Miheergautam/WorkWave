import Img from "../../assets/images/logo.png";

export const people = [
  {
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main St",
    city: "Springfield",
    state: "IL",
    country: "USA",
    phoneNumber: "555-1234",
    email: "john.doe@example.com",
  },
];

export function ProfileInfo() {
  return (
    <>
      <div className="col-span-3 border border-neutral-700 bg-neutral-900 rounded-lg p-4">
        <p className="py-2 px-8 text-xl">Personal Information</p>
        <div className="p-10 flex items-center justify-center gap-10">
          <img
            src={Img}
            alt="Profile Picture"
            className="rounded-full w-1/4 h-1/4"
          />
          <div className="flex flex-col gap-3">
            <button className="text-white rounded-xl py-2 px-4 border border-neutral-600 bg-indigo-500">
              Upload
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 p-10 gap-4">
          <p className="col-span-1 flex flex-col gap-2">
            Firstname
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].firstName}
            </span>
          </p>
          <p className="col-span-1 col-start-3 flex flex-col gap-2">
            Lastname{" "}
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].lastName}
            </span>
          </p>
          <p className="col-span-2 flex flex-col gap-2">
            Street Address{" "}
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].streetAddress}
            </span>
          </p>
          <p className="col-span-1 flex flex-col gap-2">
            City/Town{" "}
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].city}
            </span>
          </p>
          <p className="col-span-1 flex flex-col gap-2">
            State{" "}
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].state}
            </span>
          </p>
          <p className="col-span-1 col-start-3 flex flex-col gap-2">
            country{" "}
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].country}
            </span>
          </p>
        </div>
        <p className="py-2 px-8 text-xl">Contact Information</p>
        <div className="grid grid-cols-3 p-10 gap-4">
          <p className="col-span-1 flex flex-col gap-2">
            Phone Number
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {"+91 "}
              {people[0].phoneNumber}
            </span>
          </p>
          <p className="col-span-1 col-start-3 flex flex-col gap-2">
            Email
            <span className="border border-neutral-600 bg-neutral-800 w-full rounded-lg py-2 px-2">
              {people[0].email}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-neutral-900 col-span-4 border border-neutral-700 rounded-lg">
        <p className="py-2 px-8 text-xl">Other Information</p>
      </div>
    </>
  );
}
