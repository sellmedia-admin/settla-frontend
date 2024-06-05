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
                <div className="grid gap-4 items-center content-center my-10 md:grid-cols-2 ">
                    <div className="max-w-530 col-span-1">
                        <h2 className="mb-4">Effortless Remittance, B2B Procurement Solutions</h2>
                        <p className="">Effortlessly convert your Nigerian Naira into a diverse array of over 25 global currencies instantly, empowering your business to conduct smooth and efficient cross-border transactions with ease and confidence.</p>
                        <div className="flex mt-8">
                            <LinkButton title="Create Account" link="/signup" />
                            <LinkButton2 title="Talk to a specialist" link="mailto:hello@usesettla.com" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="max-w-462 ml-auto">
                            <img
                                src={imgs.features}
                                className='object-contain'
                                width="100%"
                                height="100%"
                                alt="Preview"
                                layout="responsive"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 items-end content-center my-20 md:grid-cols-2">
                    <div className="col-span-1">
                        <div className="max-w-544 mx-auto">
                            <div className="bg-[#0091FF]/20 md:pt-20 pt-5 px-6 rounded-[10px]">
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
                    <div className="max-w-473 col-span-1 mx-auto mb-8">
                        <h3 className="mb-4">Initiate payments using your domestic IBAN account.</h3>
                        <p className="">Effortlessly sync your transactions with the Settla platform for swift and secure B2B currency conversions.</p>
                    </div>
                </div>

                <div className="grid gap-4 items-end content-center my-20 md:grid-cols-2 ">
                    <div className="max-w-473 col-span-1">
                        <h3 className="mb-4">Convert NGN to foreign currencies</h3>
                        <div className='mb-4'><img src={imgs.flags2} alt='flags' /></div>
                        <p className="">Settla serves as your reliable ally for B2B enterprises across Africa and worldwide, providing effortless currency conversion solutions. Convert your local currency, Naira (NGN), into over 25 foreign currencies and cryptocurrencies, enabling seamless cross-border transactions. Our comprehensive payment solutions guarantee adaptability and ease, empowering your business to excel in the global marketplace.</p>
                    </div>
                    <div className="col-span-1">
                        <div className="max-w-544 ml-auto">
                            <div className="bg-[#0091FF]/20 md:pt-20 pt-5 px-6 rounded-[10px]">
                            <img
                                src={imgs.conversionSettla}
                                className="rounded-tl-[20px] rounded-tr-[20px] object-contain"
                                width="100%"
                                height="100%"
                                alt="Preview"
                                layout="responsive"
                            />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 items-end content-center my-20 md:grid-cols-2">
                    <div className="col-span-1">
                        <div className="max-w-544 mx-auto">
                            <div className="bg-[#0091FF]/20 md:pt-20 pt-5 px-6 rounded-[10px]">
                            <img
                                src={imgs.conversionSettla}
                                className="rounded-tl-[20px] rounded-tr-[20px] object-contain"
                                width="100%"
                                height="100%"
                                alt="Preview"
                                layout="responsive"
                            />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-473 col-span-1 mx-auto mb-8">
                        <h3 className="mb-4">Make payouts directly from your local IBAN account</h3>
                        <p className="">Effortlessly optimize global payouts using Settla's cutting-edge system. Seamlessly convert funds and conduct cross-border transactions effortlessly through our resilient platform. Simplify your journey – register, fulfill KYB requirements, and access the convenience of seamless international transactions.</p>
                    </div>
                </div>
            </div>
            <section className="bg-primary text-white">
                <div className='bg-bg bg-cover bg-no-repeat w-full h-full py-16'>
                    <h2 className="mb-12 text-center text-white">Settla in 3 steps</h2>
                    <div className="grid gap-4 content-center px-4 my-8 md:grid-cols-2 max-w-default mx-auto">
                        <div className="col-span-1 ">
                            <div className="max-w-544 pb-4">
                                <img src={imgs.stepByStep} width="100%" height="100%" alt="Preview" layout="responsive" className='object-contain' />
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