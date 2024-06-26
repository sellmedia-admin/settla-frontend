import React from "react";
import { imgs } from "../../helpers/constants";
import LinkButton from "../buttons/LinkButton";
import LinkButton2 from "../buttons/LinkButton2";
const CreateTab = () => {
  return (
    <div className="grid items-center content-center my-10 md:grid-cols-2">
      <div className="col-span-1">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#0091FF]/10 md:pt-20 pt-5 px-6 rounded-[10px]">
            <img
              src={imgs.step1}
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
        <h3 className="mb-4">
          Create your account to get started with your business transactions
        </h3>
        <p className="">
          Start your journey with Settla by creating an account. Simply provide
          your business details, contact information, and set a secure password.
          Within minutes, you'll gain access to our platform, designed to
          streamline your cross-border transactions.{" "}
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
export default CreateTab;
