import React from 'react'
import LandingLayout from '../../components/layouts/LandingLayout'
import { imgs, caseStudy } from '../../helpers/constants'

const Case1 = () => {
  return (
    <LandingLayout>
        <main className="pt-8 bg-white max-w-default mx-auto px-4 md:px-0">
            <div className="items-center content-center my-8">
                <div className="max-w-760 mx-auto text-center">
                    <h2 className="">How Settla Streamlines Procurement and Remittance in Africa</h2>
                    <div className="max-w-670 mx-auto mt-5 mb-8">
                        <p className="mb-5">
                            Despite Africa's growing economy, B2B businesses still face significant hurdles in procurement and remittance. Here are three major challenges:
                        </p>
                        <p className='text-[#717171] text-[14px] md:text-[18px]'>March 26, 2024</p>
                    </div>
                </div>
                <div className="md:my-20 my-10 max-h-[577px] overflow-hidden">
                    <img
                        src={imgs.useCaseStudy}
                        className=""
                        width="100%"
                        height="100%"
                        alt="Settla Preview"
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>
                <div className='case_study'>
                    <h5 className='text-[18px] md:text-[22px] font-semibold'>About {caseStudy.aboutTitle}</h5>
                    <p>{caseStudy.aboutText}</p>
                    <div className='mb-7'>
                        <h5 className='text-[14px] md:text-[18px] font-bold'>The Challenges</h5>
                        <p>{caseStudy.challenges}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>1. {caseStudy.challenge1Title}</h6>
                        <p>{caseStudy.challenge1Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>2. {caseStudy.challenge2Title}</h6>
                        <p>{caseStudy.challenge2Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>3. {caseStudy.challenge3Title}</h6>
                        <p>{caseStudy.challenge3Text}</p>
                    </div>
                    <div className='mb-7'>
                        <h5 className='text-[14px] md:text-[18px] font-bold'>The Solution</h5>
                        <p>{caseStudy.solution}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>1. {caseStudy.solution1Title}</h6>
                        <p>{caseStudy.solution1Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>2. {caseStudy.solution2Title}</h6>
                        <p>{caseStudy.solution2Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>3. {caseStudy.solution3Title}</h6>
                        <p>{caseStudy.solution3Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>4. {caseStudy.solution4Title}</h6>
                        <p>{caseStudy.solution4Text}</p>
                    </div>
                    <div className='mb-20'>
                        <h5 className='text-[14px] md:text-[18px] font-bold'>The Results</h5>
                        <p>{caseStudy.result}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>1. {caseStudy.result1Title}</h6>
                        <p>{caseStudy.result1Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>2. {caseStudy.result2Title}</h6>
                        <p>{caseStudy.result2Text}</p>
                        <h6 className='text-[14px] md:text-[18px] font-semibold'>3. {caseStudy.result3Title}</h6>
                        <p>{caseStudy.result3Text}</p>
                    </div>
                </div>
            </div>
        </main>
    </LandingLayout>
  )
}

export default Case1