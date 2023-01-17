import React from 'react'
import { Link } from 'react-router-dom'

// ==== Css ====
import "../Footer/Footer.css"

// ===== Img =====
import facebook from "../../../img/Footer/facebook.png"
import twitter from "../../../img/Footer/twitter.png"
import instagram from "../../../img/Footer/instagram.png"



const Copyright = ({ mb_20 }) => {
    return (
        <>
            <div className={`${mb_20} container mt-17`}>
                <p className="mt-17 footer-border"></p>
                <div className='mt-3 d-sm-flex justify-content-sm-between justify-content-center align-items-center'>
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
        </>
    )
}

export default Copyright