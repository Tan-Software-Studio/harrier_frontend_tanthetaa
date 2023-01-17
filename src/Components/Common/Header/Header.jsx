import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

// ====== Css ====
import "../Header/Header.css"

// ===== Img ====
import Headerlogo from "../../../img/Header/Header-logo.svg"

const Header = () => {

    let location = useLocation();


    const [menu, setMenu] = useState(false)


    const menubar = (e) => {
        setMenu(e.target.checked)
    }
    return (


        <>
            <div id="main-home" className='main-home'>
                <div className='container'>
                    <nav className='d-flex justify-content-between align-items-center'>
                        <input type="checkbox" id="nav-toggle" checked={menu} onChange={menubar} />
                        <Link to="/" className='header-logo'><img src={Headerlogo} alt="" className='header-logo' /> </Link>
                        <ul className="links list-unstyled d-flex align-items-center" onClick={() => setMenu(false)}>
                            <li><a href="/#" className="section-title mt-md-50">Home</a></li>
                            <li><a href="/#about" className={`${location.hash === "#about" && "active"}`}>About Us</a></li>
                            <li><a href="/#employers" className={`${location.hash === "#employers" && "active"}`} >Employers</a></li>
                            <li><a href="/#candidates" className={`${location.hash === "#candidates" && "active"}`}>Candidates</a></li>
                            <li><a href="/#contactUs" className={`${location.hash === "#contactUs" && "active"}`}>Contact Us</a></li>
                            <li>
                                <Link to="/login/emp">
                                    <button className='commom-sky-button'>  Login</button>  </Link></li>

                            <li><Link to="/signup" className='commom-blue-button'>Employer Sign Up</Link></li>
                            <div className="dot"></div>
                        </ul>
                        <label htmlFor="nav-toggle" className="icon-burger">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </label>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header