import React from 'react'
import footerLogo from "../../../img/Footer/footer-logo.png"
import { Link } from "react-router-dom"

// ==== Css ====
import "../Footer/Footer.css"

// ===== Img =====
import facebook from "../../../img/Footer/facebook.png"
import twitter from "../../../img/Footer/twitter.png"
import instagram from "../../../img/Footer/instagram.png"

const Footer = () => {
    return (
        <>
            <footer>
                <div className='container'>
                    <div className='mt-140'>
                        <div className='d-lg-flex'>
                            {/* <div className="row">
                                <div className="col-lg-10">
                                    <img src={footerLogo} alt="" />
                                    <p className='font-18 mt-40 footer-content'>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consec tetur.</p>
                                </div>
                            </div> */}
                            <div className="row align-items-center w-100 ">
                                <div className="col-lg-3 col-sm-3 col-6 d-flex mt-lg-0 mt-5">
                                    <div className=''>
                                        <p className='font-20 blue-color text-500 mb-56 '>Company</p>
                                        <ul className='list-unstyled'>
                                            <li className='font-16'><a href="#about">About us</a></li>
                                            <li className='font-16'><Link to="">Our Team</Link></li>
                                            <li className='font-16'><Link to="">Products</Link></li>
                                            <li className='font-16'><a href="#contactUs">Contact</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-3 col-6  d-flex mt-lg-0 mt-5"> <div className=''>
                                    <p className='font-20 blue-color text-500 mb-56 '>Product</p>
                                    <ul className='list-unstyled'>
                                        <li className='font-16'><Link to="">Feature</Link></li>
                                        <li className='font-16'><Link to="">Pricing</Link></li>
                                        <li className='font-16'><Link to="">Credit</Link></li>
                                        <li className='font-16'><Link to="">FAQ</Link></li>
                                    </ul>
                                </div>
                                </div>
                                <div className="col-lg-3 col-sm-3 col-6  d-flex mt-lg-0 mt-5">
                                    <div className=''>
                                        <p className='font-20 blue-color text-500 mb-56 '>Download</p>
                                        <ul className='list-unstyled'>
                                            <li className='font-16'><Link to="">iOS</Link></li>
                                            <li className='font-16'><Link to="">Android</Link></li>
                                            <li className='font-16'><Link to="">Microsoft</Link></li>
                                            <li className='font-16'><Link to="">Desktop</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-3 col-6  d-flex mt-lg-0 mt-5">
                                    <div className=''>

                                        <p className='font-20 blue-color text-500 mb-56 '>Support</p>
                                        <ul className='list-unstyled'>
                                            <li className='font-16'><Link to="">Privacy</Link></li>
                                            <li className='font-16'><Link to="">Help</Link></li>
                                            <li className='font-16'><Link to="">Terms</Link></li>
                                            <li className='font-16'><Link to="">FAQ</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='mt-64 footer-border'></p>
                        <div className='mt-3 mb-20 d-sm-flex justify-content-sm-between justify-content-center align-items-center'>
                            <p className='font-18 '>Copyright ©2022 Harrier Candidates</p>
                            <div className='d-flex  mt-sm-0 mt-3'>
                                <Link to="">
                                    <div className='social-bg'>
                                        <div className='social-icon'>
                                            <img src={facebook} alt="" />
                                        </div>
                                    </div>
                                </Link>
                                <Link to="">
                                    <div className='social-bg mx-2'>
                                        <div className='social-icon'>
                                            <img src={twitter} alt="" />
                                        </div>
                                    </div>
                                </Link>
                                <Link to="">
                                    <div className='social-bg'>
                                        <div className='social-icon'>
                                            <img src={instagram} alt="" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer