import { useState } from "react";
import logo from "../../assets/images/image.png";
import { navItems } from "../../constants";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const renderNavItems = () => (
    <ul className="lg:flex justify-center">
      {navItems.map((item, index) => (
        <li className="py-4 lg:py-0 lg:mx-3" key={index}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );

  const renderAuthLinks = () => (
    <div className="flex space-x-5">
      <a
        href="/signin"
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-3 rounded-xl"
      >
        SignIn
      </a>
      <a
        href="/signup"
        className="bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-3 text-white rounded-xl"
      >
        Create an Account
      </a>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700">
      <div className="container px-3 mx-auto relative text-sm ">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center flex-shrink-0 hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="h-14" src={logo} alt="CompanyLogo" />
            <span className="text-2xl tracking-tight">WorkWave</span>
          </div>
          <div className="hidden lg:flex ml-14 space-x-12">
            {renderNavItems()}
          </div>
          <div className="hidden lg:flex justify-end space-x-12 items-center">
            {renderAuthLinks()}
          </div>
          <div className="lg:hidden flex flex-col justify-center">
            <button onClick={toggleMenu}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {isOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-10 mt-3 flex flex-col justify-center items-center lg:hidden">
            {renderNavItems()}
            {renderAuthLinks()}
          </div>
        )}
      </div>
    </nav>
  );
}
