import React from "react";
import { Link } from 'react-router-dom';
import {imgs} from "../../helpers/constants";

const QuickKYBTab = () => {
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
            <h3 className="mb-4">Quick KYB for your business in 3 minutes</h3>
            <p className="text-black">
                Quickest way pay your international supplier, pay school fees, and keep your business moving.  Quickest way pay your international supplier, pay school fees, and keep your business moving
            </p>
            <div className="flex mt-8">
                <Link to="/signup" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 mr-2">
                    Create Account
                </Link>
                <Link to="/login" className="px-5 py-2 text-black border border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 bg-white hover:bg-primary hover:text-white hover:border-primary ml-2">
                    Talk to a specialist
                </Link>
            </div>
        </div>
    </div>
  );
};
export default QuickKYBTab;