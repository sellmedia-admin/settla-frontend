import React from 'react'
import LinkButton3 from './buttons/LinkButton3'
import { imgs } from '../helpers/constants'

const AskQuestions = () => {
  return (
    <section className="px-4 py-16 max-w-default mx-auto">
        <div className="grid content-center items-center my-8 md:grid-cols-2">
            <div className="col-span-1 max-w-473">
                <div className="py-4">
                    <h3 className="mb-2">Onboard with our specialist, ask them anything</h3>
                    <p className="text-lg mb-10">Need help getting started? Our team is here to guide you through Settla's easy sign-up.</p>
                    <LinkButton3 title="Talk to a specialist" link="/contact" />
                </div>
            </div>
            <div className="col-span-1 ">
                <div className="max-w-544 ml-auto">
                    <img src={imgs.smile} width="100%" height="100%" alt="Preview" layout="responsive" objectFit="contain" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default AskQuestions