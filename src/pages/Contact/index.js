import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { imgs } from '../../helpers/constants';
import AskQuestions from '../../components/AskQuestions';
import TextInput from '../../components/inputs/TextInput';
import Button from '../../components/buttons/PrimaryBtn';
import ErrorBox from '../../components/ErrorBox';
import { parseError } from "../../helpers";
// import { useAuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

const Contact = () => {
  const [formData, setFormData] = useState({
    message: "",
    fullName: "",
    phone: "",
		email: "",
	});

  const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isLoading } = useMutation( {
		onSuccess: ({ data }) => {
			
		},
		onError: (error, variables) => {
			// if (error.message === "Account not verified yet") {
			// 	navigate(`/otp/${variables?.email}`);
			// }
		},
	});

  const handleSubmit = (e) => {
		setErrorMessage("");
		try {
			let empty_fields = Object.keys(formData).map((key) => !!!formData[key] && key.split("_").join(" "));
			empty_fields = empty_fields.filter((field) => !!field);

			if (empty_fields.length > 0) {
				throw Error(`Please fill in the following fields ${empty_fields.join(", ")}`);
			} else {
				mutate(formData);
			}
		} catch (err) {
			setErrorMessage(parseError(err));
		}
	};

  return (
    <div>
      <div className='bg-primary'>
        <div className='bg-bg bg-cover bg-no-repeat w-full h-full'>
          <nav className="nav_links flex items-center justify-between max-w-default mx-auto px-4 py-6 md:px-0">
            <div className="flex space-x-2">
              <Link to="/"><img alt="logo" src={imgs.logoWhite} className="logo" /></Link>
            </div>
            <div className="flex items-center text-[16px] gap-2 text-white">
              <Link to="/features" className="px-2 hover:text-black">Features</Link>
              <Link to="/about" className="px-2 hover:text-black">Company</Link>
              <Link to="#" className="px-2 hover:text-black">Blog</Link>
              <Link to="/case-study" className="px-2 hover:text-black">Case Studies</Link>
              <Link to="/contact" className="px-2 hover:text-black font-bold">Contact Us</Link>
            </div>
            <Link to="/login" className="px-5 py-2 bg-white text-primary border border-white hover:bg-white hover:text-black hover:border-black flex justify-center items-center w-[121px] h-[48px] rounded-8">
              Login
            </Link>
          </nav>
          <nav className="responsive_nav_mobile">
            <div className="container">
              <input id="responsive-menu" type="checkbox" />
              <label htmlFor="responsive-menu"><Link href="/"><img src={imgs.logo} alt="settla logo" className='logo' /></Link> <span id="menu-icon"></span></label>
              <div id="overlay"></div>
              <ul>
                <li><Link to="/features" className="px-2 hover:text-primary">Features</Link></li>
                <li><Link to="/about" className="px-2 hover:text-primary">Company</Link></li>
                <li><Link to="#" className="px-2 hover:text-primary">Blog</Link></li>
                <li><Link to="/case-study" className="px-2 hover:text-primary">Case Studies</Link></li>
                <li><Link to="/contact" className="px-2 hover:text-primary">Contact Us</Link></li>
                <li><Link to="/login" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center w-[121px] h-[48px] mx-auto rounded-8">
                  Login
                </Link></li>
              </ul>
            </div>
          </nav>
          <div className="items-center content-center py-16">
              <div className="max-w-760 mx-auto text-center text-white">
                  <h1 className="">We’re at our best when we hear from you</h1>
                  <div className="max-w-508 mx-auto mt-5">
                      <p className="text-white">
                          Our account specialists are ready to help you start using Settla, making life easier for you and your partners.
                      </p>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <main className="bg-white">
        <section className="py-16">
					<div className="grid content-center px-4 my-8 md:grid-cols-2 max-w-default mx-auto">
						<div className="col-span-1 ">
							<div className="max-w-544 pb-4">
								<img src={imgs.stepByStep} width="100%" height="100%" alt="Preview" layout="responsive" objectFit="contain" />
							</div>
						</div>
						<div className="max-w-473 ml-auto col-span-1 text-black">
              <h1 className='my-5'>Talk to us</h1>
							<div >
								<p className="mb-6">If you need support, you’ve come to the right place. Here you can browse our frequently asked questions or get in touch with a team member. It’s simple.</p>
                <p>Call us on:</p>
                <p className='mb-5'><a className='font-semibold' href='tel:+234(0)801 234 567'>+234(0)801 234 567</a>, Monday to Friday between 8.30am and 7pm (WAT).</p>
                <p>Email us on:</p>
                <p className='mb-5'><a className='font-bold' href='mailto:support@usesettla.com'>support@usesettla.com</a>, we respond very fast.</p>
                <p>Social Media on:</p>
                <div className='flex mt-2'>
                  <Link to='#' className='h-[41px] w-[41px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                    <img src={imgs.instagram} alt='instagram' />
                  </Link>
                  <Link to='#' className='h-[41px] w-[41px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                    <img src={imgs.messenger} alt='messenger' />
                  </Link>
                  <Link to='#' className='h-[41px] w-[41px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                    <img src={imgs.x} alt='twitter' />
                  </Link>
                  <Link to='#' className='h-[41px] w-[41px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                    <img src={imgs.linkedin} alt='linkedin' />
                  </Link>
                  <Link to='#' className='h-[41px] w-[41px] rounded-full flex justify-center items-center bg-primary/10 mr-3'>
                    <img src={imgs.facebook} alt='facebook' />
                  </Link>
                </div>
							</div>
						</div>
					</div>
				</section>
        <section className="bg-primary/10 py-16">
					<div className="grid content-center px-4 my-8 md:grid-cols-2 max-w-default mx-auto">
						<div className="max-w-473 mr-auto col-span-1">
							<div className='mb-4'>
								<h2 className="mb-2">Leave a feedback</h2>
								<p className="mb-6">This is the best way to help us build a better product and services for your business success</p>
							</div>
						</div>
            <div className="col-span-1">
							<div className="max-w-450 ml-auto">
								<form>
                  <ErrorBox errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                  <div className='w-full mb-3'>
                    <TextInput label="Write here" type="text" name="message" value={formData.message} onChange={handleChange} />
                  </div>
                  <div className='w-full mb-3'>
                    <TextInput label="Names" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                  </div>
                  <div className='flex'>
                    <div className='w-full mb-3 mr-2'>
                      <TextInput label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className='w-full mb-3 ml-2'>
                      <TextInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className='w-full mt-3'>
                    <Button loading={isLoading} disabled={isLoading} placeholder="SUBMIT" onClick={handleSubmit} />
                  </div>
                </form>
							</div>
						</div>
					</div>
				</section>
        <div className='max-w-default mx-auto px-4 md:px-0'>
          <AskQuestions />
        </div>
        
      </main>
      <footer className="w-full px-12 bg-white">
          <div className="items-center justify-center border-t py-7 md:px-24 md:flex">
              <p className="text-black text-[14px]">© 2024 Settla | All rights reserved.</p>
          </div>
        </footer>
    </div>
  )
}

export default Contact