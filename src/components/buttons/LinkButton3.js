import React from 'react'
import { Link } from 'react-router-dom';

const LinkButton3 = ({title, link}) => {
  return (
    <Link to={link} className="px-5 py-2 text-primary border border-primary flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 bg-white hover:bg-primary hover:text-white hover:border-primary">
        {title}
    </Link>
  )
}

export default LinkButton3