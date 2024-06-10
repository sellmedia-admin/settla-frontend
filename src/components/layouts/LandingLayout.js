import React from "react";
import { Link } from "react-router-dom";
import { imgs } from "../../helpers/constants";

const LandingLayout = ({ children }) => {
  return (
    <div className="font-outfit">
      <div>
        <nav className="nav_links flex items-center justify-between max-w-default mx-auto px-4 py-6 bg-white">
          <div className="flex space-x-2">
            <Link to="/">
              <img alt="logo" src={imgs.logo} className="logo" />
            </Link>
          </div>
          <div className="flex items-center text-[16px] gap-2 ">
            <Link to="/features" className="px-2 hover:text-primary">
              Features
            </Link>
            <Link to="/about" className="px-2 hover:text-primary">
              Company
            </Link>
            <Link to="#" className="px-2 hover:text-primary">
              Blog
            </Link>
            {/* <Link to="/case-study" className="px-2 hover:text-primary">Case Studies</Link> */}
            <Link to="/contact" className="px-2 hover:text-primary">
              Contact Us
            </Link>
          </div>
          <Link
            to="/login"
            className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center w-[121px] h-[48px] rounded-8"
          >
            Login
          </Link>
        </nav>
        <nav className="responsive_nav_mobile">
          <div className="container">
            <input id="responsive-menu" type="checkbox" />
            <label htmlFor="responsive-menu">
              <Link href="/">
                <img src={imgs.logo} alt="settla logo" className="logo" />
              </Link>{" "}
              <span id="menu-icon"></span>
            </label>
            <div id="overlay"></div>
            <ul>
              <li>
                <Link to="/features" className="px-2 hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="px-2 hover:text-primary">
                  Company
                </Link>
              </li>
              <li>
                <Link to="#" className="px-2 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/case-study" className="px-2 hover:text-primary">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="px-2 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center w-[121px] h-[48px] mx-auto rounded-8"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div>{children}</div>
      <footer className="w-full px-12 bg-white">
        <div className="items-center justify-center border-t py-7 md:px-24 md:flex">
          <p className="text-black text-[14px]">
            © 2024 Settla | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
