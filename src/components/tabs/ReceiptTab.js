import React from "react";
import {imgs} from "../../helpers/constants";
import LinkButton from "../buttons/LinkButton";
import LinkButton2 from "../buttons/LinkButton2";

const ReceiptTab = () => {
  return (
    <div className="grid items-center content-center my-10 md:grid-cols-2">
        <div className="hidden col-span-1 bg-no-repeat bg-contain md:block bg-blob">
            <div className="max-w-xl mx-auto">
                <img
                    src={imgs.transactionHistory}
                    className=""
                    width="100%"
                    height="100%"
                    alt="Preview"
                    layout="responsive"
                    objectFit="contain"
                />
            </div>
        </div>
        <div className="max-w-md col-span-1 mx-auto">
            <h3 className="mb-4">Receipt for your business in 3 minutes</h3>
            <p className="">
                Quickest way pay your international supplier, pay school fees, and keep your business moving.  Quickest way pay your international supplier, pay school fees, and keep your business moving
            </p>
            <div className="flex mt-8">
                <LinkButton title="Create Account" link="/signup" />
				<LinkButton2 title="Talk to a specialist" link="/contact" />
            </div>
        </div>
    </div>
  );
};
export default ReceiptTab;