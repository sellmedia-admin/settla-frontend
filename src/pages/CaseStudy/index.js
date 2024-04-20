import React from 'react'
import LandingLayout from '../../components/layouts/LandingLayout'
import { constants } from '../../helpers/constants'
import { Link } from 'react-router-dom'

const CaseStudy = () => {
  return (
    <LandingLayout>
        <main className="pt-8 bg-white max-w-default mx-auto px-4 md:px-0">
            <div className="items-center content-center my-8">
                <div className="max-w-760 mx-auto text-center">
                    <h1 className="">Here are some of our case studies for Settla</h1>
                    <div className="max-w-508 mx-auto mt-5 mb-8">
                        <p className="">
                            Cross-border transactions made easy. Send & receive payments, find & pay suppliers seamlessly.
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid items-center content-center lg:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-20">
                {constants.caseStudies?.map(item => (
                <Link to={item.link} key={item.id} className='col-span-1 lg:max-w-249 md:max-w-249 mx-2 my-5 hover:text-primary case'>
                    <div className='rounded-[5px] lg:w-[249px] h-[278px] object-cover overflow-hidden bg-primary mb-3'>
                        <img src={item.image} alt='case study' className='object-cover w-full rounded-[5px]' />
                    </div>
                    <div className='hover:text-primary case-texts'>
                        <p className='text-[#717171] text-[14px]'>{item.date}</p>
                        <p>{item.title}</p>
                    </div>
                </Link>
                ))}
            </div>
        </main>
    </LandingLayout>
  )
}

export default CaseStudy