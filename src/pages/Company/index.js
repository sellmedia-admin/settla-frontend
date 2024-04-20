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
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </p>
                </div>
            </div>
            <div className="md:my-20 my-10">
                <img
                    src={imgs.store}
                    className=""
                    width="100%"
                    height="100%"
                    alt="Settla Preview"
                    layout="responsive"
                    objectFit="contain"
                />
                <p className='mt-2'>Watch this video to know more about us.</p>
            </div>
            <div className='mb-8'>
              <h3 className='text-primary mb-4'>Our Story</h3>
              <p className='mb-6'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
              <p className='mb-6'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto bSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto b</p>
            </div>
            <div className='mb-8'>
              <h3 className='text-primary mb-4'>Meet The Team</h3>
              <p>If you need support, you’ve come to the right place. Here you can browse our frequently asked questions or get in touch with a team member. It’s simple.</p>
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
              <p className='mb-6'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
              <p className='mb-6'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto bSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto b</p>
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