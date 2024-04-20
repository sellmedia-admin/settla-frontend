import React from 'react'
import { Link } from 'react-router-dom';

const LinkButton = ({title, link}) => {
  return (
    <Link to={link} className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 mr-4">
        {title}
    </Link>
  )
}

export default LinkButton;