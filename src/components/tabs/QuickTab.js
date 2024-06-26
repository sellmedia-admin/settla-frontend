import React from "react";
import { imgs } from "../../helpers/constants";
import LinkButton from "../buttons/LinkButton";
import LinkButton2 from "../buttons/LinkButton2";

const QuickKYBTab = () => {
  return (
    <div className="grid items-center content-center my-10 md:grid-cols-2">
      <div className="col-span-1">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#0091FF]/10 md:pt-20 pt-5 px-6 rounded-[10px]">
            <img
              src={imgs.fundAccount}
              className="rounded-tl-[20px] rounded-tr-[20px] object-contain"
              width="100%"
              height="100%"
              alt="Preview"
              layout="responsive"
            />
          </div>
        </div>
      </div>
      <div className="max-w-md col-span-1 mx-auto">
        <h3 className="mb-4">Quick KYB for your business in 3 minutes</h3>
        <p className="">
          Our streamlined Know Your Business (KYB) process ensures your business
          is verified swiftly. Upload the necessary documentation, such as your
          business registration and proof of address. Our team will review and
          approve your account promptly, ensuring compliance and security.{" "}
        </p>
        <div className="flex mt-8">
          <LinkButton title="Create Account" link="/signup" />
          <LinkButton2
            title="Talk to a specialist"
            link="mailto:hello@usesettla.com"
          />
        </div>
      </div>
    </div>
  );
};
export default QuickKYBTab;
