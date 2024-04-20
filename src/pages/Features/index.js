import React from 'react'
import LandingLayout from '../../components/layouts/LandingLayout'
import { imgs, constants } from '../../helpers/constants'
import LinkButton from '../../components/buttons/LinkButton'
import LinkButton2 from '../../components/buttons/LinkButton2'
import AskQuestions from '../../components/AskQuestions'

const Features = () => {
  return (
    <LandingLayout>
        <main className="pt-8 bg-white">
            <div className='max-w-default mx-auto px-4 md:px-0'>
                <div className="grid items-center content-center my-10 md:grid-cols-2 ">
                    <div className="max-w-530 col-span-1">
                        <h2 className="mb-4">Effortless Remittance, B2B Procurement Solutions</h2>
                        <p className="">Instantly convert Naira to over 25 global currencies, enabling seamless cross-border transactions for your business.</p>
                        <div className="flex mt-8">
                            <LinkButton title="Create Account" link="/signup" />
                            <LinkButton2 title="Talk to a specialist" link="/contact" />
                        </div>
                    </div>
                    <div className="hidden col-span-1 bg-no-repeat bg-contain md:block bg-blob">
                        <div className="max-w-462 ml-auto">
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
                </div>

                <div className="grid items-end content-center my-20 md:grid-cols-2">
                    <div className="hidden col-span-1 bg-no-repeat bg-contain md:block bg-blob">
                        <div className="max-w-544 mx-auto">
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
                    <div className="max-w-473 col-span-1 mx-auto mb-8">
                        <h3 className="mb-4">Pay In with from your local IBAN account</h3>
                        <p className="">Seamlessly integrate your transactions with Settla's platform. Experience swift and secure B2B currency conversions</p>
                    </div>
                </div>

                <div className="grid items-end content-center my-20 md:grid-cols-2 ">
                    <div className="max-w-473 col-span-1">
                        <h3 className="mb-4">Convert NGN to foreign currencies</h3>
                        <div className='mb-4'><img src={imgs.flags2} alt='flags' /></div>
                        <p className="">Settla is your trusted partner for B2B businesses within Africa and globally, offering seamless currency conversion solutions. Convert your native currency, Naira (NGN), into over 25 different foreign currencies and cryptocurrencies, facilitating smooth cross-border transactions. Our integrated payment solutions ensure flexibility and convenience, empowering your business to thrive in the global market.</p>
                    </div>
                    <div className="hidden col-span-1 bg-no-repeat bg-contain md:block bg-blob">
                        <div className="max-w-462 ml-auto">
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
                </div>

                <div className="grid items-end content-center my-20 md:grid-cols-2">
                    <div className="hidden col-span-1 bg-no-repeat bg-contain md:block bg-blob">
                        <div className="max-w-544 mx-auto">
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
                    <div className="max-w-473 col-span-1 mx-auto mb-8">
                        <h3 className="mb-4">Pay Out with from your local IBAN account</h3>
                        <p className="">Effortlessly streamline global payouts with Settla's advanced system. Seamlessly convert funds and execute cross-border transactions with ease by leveraging our robust platform. Simplify your experience – register, complete KYB, and unlock the convenience of seamless international transactions</p>
                    </div>
                </div>
            </div>
            <section className="bg-primary text-white">
                <div className='bg-bg bg-cover bg-no-repeat w-full h-full py-16'>
                    <h2 className="mb-12 text-center text-white">Settla in 3 steps</h2>
                    <div className="grid content-center px-4 my-8 md:grid-cols-2 max-w-default mx-auto">
                        <div className="col-span-1 ">
                            <div className="max-w-544 pb-4">
                                <img src={imgs.happy} width="100%" height="100%" alt="Preview" layout="responsive" objectFit="contain" />
                            </div>
                        </div>
                        <div className="max-w-473 ml-auto col-span-1">
                            {constants.settlaSteps?.map(item => (
                            <div key={item.id}>
                                <h3 className="mb-2">{item.title}</h3>
                                <p className="text-white mb-6">{item.subtitle}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <div className='px-4 md:px-0'>
                <AskQuestions />
            </div>
        </main>
    </LandingLayout>
  )
}

export default Features