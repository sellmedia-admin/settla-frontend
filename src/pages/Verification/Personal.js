import React, { useEffect, useState } from "react";
import Verification from "../../components/layouts/Verification";
import MiniBtn from "../../components/buttons/MiniBtn";
import { updateUserWhenLoggedIn, uploadKYC } from "../../server";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ErrorMessage, Formik } from "formik";
import { TableRow2 } from "../../components/upload-modal/TableRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadSuccessModal from "../../components/success/Upload";
import TextInput from "../../components/inputs/TextInput";
import * as Yup from "yup";
import { isValidFileType } from "../../helpers/functions";
import SelectInput from "../../components/inputs/SelectInput";

const businessTypes = [
  { key: "", label: "Select business type" },
  { key: "soleProprietor", label: "Sole Proprietorship" },
  { key: "singleMemberLLC", label: "Single Member LLC" },
  { key: "limitedLiabilityCompany", label: "Limited Liability Company" },
  { key: "generalPartnership", label: "General Partnership" },
  { key: "unlistedCorporation", label: "Unlisted Corporation" },
  { key: "publiclyTradedCorporation", label: "Publicly Traded Corporation" },
  { key: "association", label: "Association" },
  { key: "nonProfit", label: "NonProfit" },
  { key: "governmentOrganization", label: "Government Organization" },
  { rekey: "vocableTrust", label: "Vocable Trust" },
  { key: "irrevocableTrust", label: "Irrevocable Trust" },
  { key: "estate", label: "Estate" },
  { key: "limitedPartnership", label: "Limited Partnership" },
  { key: "limited", label: "Limited" },
  { key: "LiabilityPartnership", label: "Liability Partnership" },
];

const idTypes = [
  { key: "", label: "Select means of Identity" },
  { key: "passport", label: "Int'l Passport" },
  { key: "driverLicense", label: "Driver License" },
  { key: "votersCard", label: "Voters Card" },
];

const PersonalVerification = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log(`user data ${JSON.stringify(user.profile)}`);

  useEffect(() => {
    if (
      !(user?.paymentAccountDetails?.length >= 1) &&
      !!user?.docs_kyc?.upload_link
    )
      navigate("/dashboard");
  }, [navigate, user]);

  const [modalStatus, setModalStatus] = useState(false);

  const { mutateAsync: uploadAsync, isLoading } = useMutation(uploadKYC);
  const { mutateAsync: updateAsync, isLoading: updateLoading } = useMutation(
    updateUserWhenLoggedIn
  );

  const initialValues = {
    id: user?.kyc?.id,
    doc: null,
    id_type: "",
    type: "passport",
    bvn: "",
    id_number: "",
    business_id: "",
    business_type: "",
    dof: "",
  };

  const validationSchema = Yup.object().shape({
    doc: Yup.mixed()
      .required("ID Data page required")
      .test("is-valid-type", "Not a valid image type", (value) => {
        if (typeof value === "string" || value instanceof String) {
          return true;
        } else {
          return isValidFileType(value && value.name.toLowerCase());
        }
      }),
    type: Yup.string().required("Please provide the type of your ID"),
    id_type: Yup.string().required("Please provide your ID type"),
    id_number: Yup.string().required(
      "Please provide the number of your ID"
    ),
    bvn: Yup.string().required("Please provide your bvn"),
    business_id: Yup.string()
      .required("Please provide your RC Number")
      .length(9, "Please provide a valid RC Number"),
    business_type: Yup.string().required("Please provide your business type"),
    dof: Yup.string().required("Please provide your date of incorporation"),
  });

  return (
    <Verification>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ business_id, business_type, id_type, dof, ...values }) => {
          await updateAsync({ business_id, business_type, id_type, dof });
          await uploadAsync(values);
          setModalStatus(true);
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          setFieldValue,
          submitForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full space-y-4">
                <div className="space-y-2 text-center">
                  <h4 className="text-[20px]">Account Verification</h4>
                  <p className="text-[18px] mb-4 text-blue-offBlue pb-5">Complete registration process with valid information</p>
                </div>

                <div>
                  <TextInput
                    label="Business Registered Name"
                    type="text"
                    placeholder="RC Number"
                    name="business_id"
                    value={values.business_id}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="business_id"
                    className="text-red-500 text-[0.8rem]"
                    component="div"
                  />
                </div>

                <div>
                  <SelectInput
                    label="Business Type"
                    data={businessTypes}
                    name="business_type"
                    value={values.business_type}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="business_type"
                    className="text-red-500 text-[0.8rem]"
                    component="div"
                  />
                </div>

                <div className="grid gap-4 min-[800px]:grid-cols-2">
                  <div>
                    <TextInput
                      label="Date of Incorporation"
                      type="date"
                      name="dof"
                      value={values.dof}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="dof"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <div>
                  <SelectInput
                    label="Means of Identity"
                    data={idTypes}
                    name="id_type"
                    value={values.id_type}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="id_type"
                    className="text-red-500 text-[0.8rem]"
                    component="div"
                  />
                </div>
                </div>

                <div className="grid gap-4 min-[800px]:grid-cols-2">
                  <div>
                    <TextInput
                      label="ID Number"
                      type="text"
                      name="id_number"
                      value={values.id_number}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="id_number"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>

                  <div>
                    <TextInput
                      label="BVN"
                      type="text"
                      name="bvn"
                      value={values.bvn}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="bvn"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                </div>

                <div>
                  <p className="my-2 text-xs font-medium tracking-wider text-black">
                    Upload ID Data Page
                  </p>
                  {values.doc ? (
                    <div className="pb-5 space-y-4 border-b border-gray-200 divide-y">
                      <TableRow2
                        file={values.doc}
                        removeFile={() => setFieldValue("doc", null)}
                      />
                    </div>
                  ) : (
                    <div className="flex border border-gray-400 border-dashed rounded-lg">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center w-full h-24 p-12 text-sm text-center text-gray-400 cursor-pointer"
                      >
                        Click to browse
                        <br />
                        or drag and drop your file
                      </label>
                    </div>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    onChange={(e) => setFieldValue("doc", e.target.files[0])}
                    className="hidden"
                  />
                  <div className="text-right">
                    <small className="text-[10px] text-[#838383] text-right">JPG, PNG, PDF format<span className="text-[red]">*</span></small>
                  </div>
                  <ErrorMessage
                    name="doc"
                    className="text-red-500 text-[0.8rem]"
                    component="div"
                  />
                </div>

                <div className="flex justify-center w-full pt-5">
                  <MiniBtn
                    loading={isLoading || updateLoading}
                    placeholder="Continue"
                    onClick={submitForm}
                    type="button"
                  />
                </div>
              </div>
            </div>

            <UploadSuccessModal
              status={modalStatus}
              closeModal={async () => {
                await queryClient.invalidateQueries(
                  {
                    queryKey: ["user"],
                    refetchType: "all",
                  },
                  { throwOnError: true }
                );
                navigate("/verification/info");
                setModalStatus(false);
              }}
            />
          </form>
        )}
      </Formik>
    </Verification>
  );
};

export default PersonalVerification;
