import LandingLayout from "../components/layouts/LandingLayout";
import { Disclosure, Transition } from "@headlessui/react";
// import StepOne from "../components/transactions/sendmoney/StepOne";
// import TextInput from "../components/inputs/TextInput";
// import { useState } from "react";
// import { CgSpinner } from "react-icons/cg";
// import EmailSuccessModal from "../components/success/Email";

// constant
import { imgs, constants, questions } from "../helpers/constants";
import Tabs from "../components/tabs";
import LinkButton from "../components/buttons/LinkButton";
import LinkButton2 from "../components/buttons/LinkButton2";
import AskQuestions from "../components/AskQuestions";

export default function Home() {
  // const [modalStatus, setModalStatus] = useState(false);
  // const handleModalStatus = () => {
  // 	setModalStatus(false);
  // };

  return (
    <LandingLayout>
      <main className="min-h-screen pt-8 bg-white">
        <div className="grid items-center content-center my-8 px-4">
          <div className="max-w-[935px] mx-auto text-center">
            <h1 className="">
              Powering Efficient B2B Remittance & Procurement Globally
            </h1>
            <div className="max-w-[800px] mx-auto mt-5 mb-12">
              <p className="text-lg text-black">
                Cross-border transactions made easy. Send & receive payments,
                find & pay suppliers seamlessly.
              </p>
            </div>
            <div className="flex justify-center">
              <LinkButton title="Create Account" link="/signup" />
              <LinkButton2
                title="Talk to a specialist"
                link="mailto:hello@usesettla.com"
              />
            </div>
          </div>
          <div className="max-w-default mx-auto md:my-24 my-10 max-h-[577px] overflow-hidden">
            <img
              src={imgs.settlaHero}
              className="object-contain"
              width="100%"
              height="100%"
              alt="Settla"
              layout="responsive"
            />
          </div>
        </div>

        <div className="max-w-[990px] mx-auto px-4">
          <div className="mb-8 text-center max-w-[665px] mx-auto">
            <h2 className="mb-2">
              Smart multi-currency payment for your business
            </h2>
            <div className="max-w-[508px] mx-auto">
              <p className="mt-4">
                Accept payments in various currencies, providing a seamless
                experience for your global audience.
              </p>
            </div>
          </div>

          <div className="mb-[100px]">
            <img
              src={imgs.paymentCurrencies}
              className="object-contain max-w-full hidden md:block"
              width="100%"
              height="100%"
              alt="Settla"
              layout="responsive"
            />
            <img
              src={imgs.paymentCurrenciesMobile}
              className="object-contain max-w-full  md:hidden"
              width="100%"
              height="100%"
              alt="Settla"
              layout="responsive"
            />
          </div>
          {/* <div className="flex justify-between flex-wrap py-9">
            {constants.converts?.map((item) => (
              <div
                key={item.id}
                className="h-[151px] w-[151px] rounded-2xl bg-[#E8F6F3] my-5"
              >
                <img
                  src={item.icon}
                  alt="usd"
                  className="md:h-[77px] h-[54px] md:w-[77px] w-[54px] absolute z-10 ml-24 -mt-8"
                />
                <div className="text-[16px] font-medium px-5 pt-24">
                  <small className="leading-none block">Converts</small>
                  <small className="leading-none">NGN to {item.currency}</small>
                </div>
              </div>
            ))}
          </div> */}
          <div className="flex justify-center">
            <LinkButton title="Create Account" link="/signup" />
            <LinkButton2
              title="Talk to a specialist"
              link="mailto:hello@usesettla.com"
            />
          </div>
        </div>

        <section className="max-w-default mx-auto my-28 px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-10">Create an Account in 3 minutes</h2>
            {/* tabs component */}
            <Tabs />
          </div>

          <div className="my-28">
            <div className="mb-8 text-center max-w-[665px] mx-auto">
              <h2 className="mb-2">Convert and Payout effortlessly</h2>
              <div className="max-w-[508px] mx-auto">
                <p className="mt-4">
                  Quickest way pay your international supplier, pay school fees,
                  and keep your business moving forward.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <LinkButton title="Create Account" link="/signup" />
              <LinkButton2
                title="Talk to a specialist"
                link="mailto:hello@usesettla.com"
              />
            </div>
            <div className="mt-20">
              <div className="bg-[#0091FF]/20 md:pt-20 pt-5 px-6 rounded-[10px]">
                <img
                  src={imgs.dashboardPage}
                  className="rounded-tl-[20px] rounded-tr-[20px] object-contain"
                  width="100%"
                  height="100%"
                  alt="Settla Preview"
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid items-center content-center my-16 px-4 md:grid-cols-2">
          <div className="max-w-md col-span-1 mx-auto">
            <h2 className="mb-4">
              Effortlessly Process Payments Across Borders
            </h2>
            <p className="text-lg text-blue-bodyLighter">
              Easily accept payments from diverse global customers hassle-free
              with Settla's streamlined cross-border payment processing
              solutions, simplifying international transactions for your
              business.
            </p>
          </div>

          {/* <div className="col-span-1 md:rounded-tl-[127px] md:rounded-bl-[127px] bg-grey-another py-16">
						<div className="max-w-sm p-4 mx-auto bg-white rounded-2xl">
							<StepOne toggleModal={() => {}} updateStep={() => {}} reset={() => {}} enabled={false} />
						</div>
					</div> */}
          <div className="max-w-md col-span-1 mx-auto py-16">
            <img
              src={imgs.flag}
              width="331px"
              height="100%"
              alt="Preview"
              layout="responsive"
              className="object-contain"
            />
          </div>
        </div>

        <section className="bg-primary/10 py-16">
          <h2 className="mb-12 text-center">Settla in 3 steps</h2>
          <div className="grid content-center px-4 my-8 md:grid-cols-2 max-w-default mx-auto">
            <div className="col-span-1 ">
              <div className="max-w-544 pb-4">
                <img
                  src={imgs.stepByStep}
                  width="100%"
                  height="100%"
                  alt="Preview"
                  layout="responsive"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="max-w-473 ml-auto col-span-1">
              {constants.settlaSteps?.map((item) => (
                <div key={item.id}>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="mb-6">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AskQuestions />

        <div className="flex flex-col items-center w-full my-16">
          <div className="mb-16 text-center">
            <h2 className="mb-2">Questions? Look here.</h2>
            <p className="text-blue-bodyLighter">
              Cant find an answer? email us at{" "}
              <a className="font-semibold" href="mailto:info@settla.io">
                {" "}
                info@settla.io{" "}
              </a>
            </p>
          </div>
          {questions.map((question) => (
            <div
              key={question.question}
              className="w-full max-w-3xl p-2 mx-auto bg-white"
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`w-full p-4 rounded-md font-semibold text-darkGray flex justify-between text-left ${
                        open ? "bg-blue-ocean" : "bg-white"
                      }`}
                    >
                      <span>{question.question}</span>

                      {open ? (
                        <div className="w-5">
                          <img alt="cover" src={imgs.minus} />
                        </div>
                      ) : (
                        <div className="w-5">
                          <img alt="cover" src={imgs.add} />
                        </div>
                      )}
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel
                        className={`p-4 text-xs text-darkGray ${
                          open ? "bg-blue-ocean" : "bg-white"
                        }`}
                      >
                        {question.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </main>
      {/* <EmailSuccessModal status={modalStatus} closeModal={handleModalStatus} /> */}
    </LandingLayout>
  );
}
