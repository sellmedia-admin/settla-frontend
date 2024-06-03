import React from 'react'
import LandingLayout from '../../components/layouts/LandingLayout'
import { imgs, constants } from '../../helpers/constants'
import { Link } from 'react-router-dom'

const AboutCompany = () => {
  return (
    <LandingLayout>
      <main className="pt-8 bg-white max-w-default mx-auto px-4 md:px-0">
        <div className="items-center content-center my-8">
            <div className="max-w-760 mx-auto text-center">
                <h2 className="">About Settla</h2>
                <div className="max-w-508 mx-auto mt-5 mb-8">
                    <p className="mb-5">
                        Discover the story behind Settla, the pioneering force reshaping financial transactions worldwide.
                    </p>
                </div>
            </div>
            <div className="md:my-20 my-10">
              <iframe width="100%" height="577px" src="https://www.youtube.com/embed/n8lvuclUrBs?si=yQoHAsnGr2ah3W8J&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                {/* <img
                    src={imgs.store}
                    className=""
                    width="100%"
                    height="100%"
                    alt="Settla Preview"
                    layout="responsive"
                    objectFit="contain"
                /> */}
                <p className='mt-2'>Watch this video to know more about us.</p>
            </div>
            <div className='mb-8'>
              <h3 className='text-primary mb-4'>Our Story</h3>
              <p className='mb-6'>At Settla, we're dedicated to transforming the way businesses and individuals manage their financial transactions across borders. With our innovative payment platform, spanning 25 countries in Africa, USA, UK, and Canada, we provide a seamless experience for sending and receiving money.</p>
              <p className='mb-6'> Leveraging the latest technology, we prioritize security, offering low-interest rates and ensuring compliance with policies and regulations. Our user-friendly onboarding process makes getting started easy, while our instant transactions ensure swift access to funds. Experience the convenience, security, and affordability of Settla, where your financial needs are our priority.</p>
            </div>
            <div className='mb-8'>
              <h3 className='text-primary mb-4'>Meet The Team</h3>
              <p>If you find yourself in need of assistance, know that we're here to lend a hand. Whether perusing our FAQs or reaching out to a team member, accessing support is made easy with us.</p>
            </div>
            <div className="grid items-center content-center lg:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-20">
                {constants.team?.map(item => (
                <div key={item.id} className='col-span-1 lg:max-w-249 md:max-w-249 mx-2 my-5 hover:text-primary case'>
                    <div className='rounded-[5px] lg:w-[249px] h-[278px] object-cover overflow-hidden bg-primary mb-3'>
                        <img src={item.image} alt='case study' className='object-cover w-full rounded-[5px]' />
                    </div>
                    <div className='hover:text-primary case-texts'>
                        <p className='text-[20px] font-medium text-black'>{item.name}</p>
                        <p className='text-[#8A8A8A] text-[16px]'>{item.jd}</p>
                        <div className='flex mt-2'>
                          <Link to={item.link1} className='h-[35px] w-[35px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                            <img src={item.icon1} alt='x' />
                          </Link>
                          <Link to={item.link2} className='h-[35px] w-[35px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                            <img src={item.icon2} alt='linkedin' />
                          </Link>
                          <Link to={item.link3} className='h-[35px] w-[35px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                            <img src={item.icon3} alt='facebook' />
                          </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>

            <div className='mb-8'>
              <h3 className='text-primary mb-4'>How we are making a difference</h3>
              <p className='mb-6'>At Settla, we're more than just a financial payment platform – we're agents of change. By bridging borders and connecting businesses and individuals across 25 countries in Africa, USA, UK, and Canada, we're fostering economic empowerment and growth. Our commitment to leveraging new technology ensures secure, low-interest transactions, making financial management accessible to all. Through our user-friendly platform, we're simplifying the complex process of international transactions, empowering our users to navigate the global economy with ease.</p>
              <p className='mb-6'>With a dedication to absolute compliance with policies and regulations, we're building trust and confidence in every transaction. Settla isn't just about sending and receiving money – it's about breaking barriers, forging connections, and making a lasting impact on the lives of our users and their communities. Join us on our journey to redefine financial empowerment and make a difference in the world, one transaction at a time.</p>
            </div>
            <div className="md:my-20 my-10">
                <img
                    src={imgs.team}
                    className=""
                    width="100%"
                    height="100%"
                    alt="Settla Preview"
                    layout="responsive"
                    objectFit="contain"
                />
            </div>
        </div>
      </main>
    </LandingLayout>
  )
}

export default AboutCompany