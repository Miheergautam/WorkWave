import { Search, Bell, BarChart } from "lucide-react";
import {
  Popover,
  Transition,
  Menu,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import logo from "../../assets/images/logo.png";

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-neutral-900 h-16 px-4 border-b border-neutral-600">
      <div className="relative">
        <Search
          size="20"
          className="absolute text-neutral-400 top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] rounded-sm pl-11 pr-4"
        />
      </div>

      <div className="flex items-center space-x-5 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`p-2 rounded-sm inline-flex items-center ${
                  open ? "text-white bg-neutral-600" : "text-neutral-400"
                } hover:text-opacity-100 focus:outline-none active:bg-neutral-600`}
              >
                <BarChart className="w-5 h-5" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-neutral-700 rounded-sm shadow-nd ring-1 ring-neutral-500 ring-opacity-5 px-2 py-2.5">
                    <strong className="font-medium">Messages</strong>
                    <div className="mt-2 py-1 text-sm">THIS IS A PANEL</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`p-2 rounded-sm inline-flex items-center ${
                  open ? "text-white bg-neutral-600" : "text-neutral-400"
                } hover:text-opacity-100 focus:outline-none active:bg-neutral-600`}
              >
                <Bell size={20} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-neutral-700 rounded-sm shadow-nd ring-1 ring-neutral-500 ring-opacity-5 px-2 py-2.5">
                    <strong className="font-medium">Notification</strong>
                    <div className="mt-2 py-1 text-sm">
                      THIS IS NOTIFICATION PANEL
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-neutral-400 ml-2 inline-flex rounded-full ">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-neutral-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${logo})`,
                }}
              >
                <span className="sr-only">Your name</span>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-sm p-1 ring-1 ring-neutral-500 ring-opacity-5 bg-neutral-700 focus:outline-none">
                <MenuItem>
                  {(active) => (
                    <div
                      className={`focus:bg-neutral-100 cursor-pointer rounded-sm px-4 py-2 ${
                        active ? "bg-neutral-600" : ""
                      }`}
                      onClick={() => {
                        navigate("profile/info");
                      }}
                    >
                      Your Profile
                    </div>
                  )}
                </MenuItem>
                <MenuItem>
                  {(active) => (
                    <div
                      className={`focus:bg-neutral-100 cursor-pointer rounded-sm px-4 py-2 ${
                        active ? "bg-neutral-600" : ""
                      }`}
                      onClick={() => {
                        navigate("settings");
                      }}
                    >
                      Settings
                    </div>
                  )}
                </MenuItem>
                <MenuItem>
                  {(active) => (
                    <div
                      className={`focus:bg-neutral-100 cursor-pointer rounded-sm px-4 py-2 ${
                        active ? "bg-neutral-600" : ""
                      }`}
                      onClick={() => {
                        navigate("/signin");
                      }}
                    >
                      Sign Out
                    </div>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
