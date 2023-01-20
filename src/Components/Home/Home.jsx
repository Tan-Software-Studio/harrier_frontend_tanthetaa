import React, { useEffect, useState } from "react";

// ====== Img ====
import about from "../../img/Home/about.png";
import trueArrow from "../../img/Home/true.png";
import clientOne from "../../img/logos_harrier/atticus.png";
import clientTwo from "../../img/logos_harrier/bryter.png";
import clientThree from "../../img/logos_harrier/delegera.png";
import clientFour from "../../img/logos_harrier/doc2.png";
import clientFive from "../../img/logos_harrier/eperoto.png";
import clientSix from "../../img/logos_harrier/nomio.png";
import clientSeven from "../../img/logos_harrier/rubydatum.png";
import clientEight from "../../img/logos_harrier/syntacog.png";
import clientNine from "../../img/logos_harrier/syntheia.png";
import clientTen from "../../img/logos_harrier/techquity.png";
import clientEleveen from "../../img/logos_harrier/wemble.png";
import quote from "../../img/Home/double-quote.png";
import profilePic from "../../img/Home/profilepic.png";
import candidates from "../../img/Home/candidates.png";
import employers from "../../img/Home/employers.png";
import phone from "../../img/Home/phone.png";
import address from "../../img/Home/address.png";
import email from "../../img/Home/email.png";
import emailGif from "../../img/Home/message.gif";
import callGif from "../../img/Home/call.gif";
import locationGif from "../../img/Home/loaction.gif";
import bannerImg from "../../img/Banner/banner-image.png";
import search from "../../img/Banner/search.png";
import location from "../../img/Banner/location.png";

import closeIcon from "../../img/common/close-icon.png";
import success from "../../img/common/check-circle.gif";
// ===== Slider =====
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../Home/Home.css";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";
import { Link, Navigate, useLocation } from "react-router-dom";

// ===== For API =====

import axiosInstance from "../../apiServices/axiosInstance";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import { toast } from "react-toastify";
import CustomSelect from "../Common/CustomSelect/CustomSelect";
import dayjs from "dayjs";
import axiosInstanceAuth from "../../apiServices/axiosInstanceAuth";
import { Box, Modal, Typography } from "@mui/material";

const Home = () => {
  // ====== Success Modal =====

  const [successopen, setSuccessOpen] = useState(false);
  const successhandleOpen = () => setSuccessOpen(true);
  const successhandleClose = () => {
    setSuccessOpen(false);
    Navigate("/");
  };

  let isEmp = useLocation().pathname;

  useEffect(() => {
    if (isEmp === "/") {
      document.body.classList.remove("bg-salmon");
    }

    localStorage.clear();
  });

  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  }, []);

  const clientSlider = [
    {
      img: clientOne,
    },
    {
      img: clientTwo,
    },
    {
      img: clientThree,
    },
    {
      img: clientFour,
    },
    {
      img: clientFive,
    },
    {
      img: clientSix,
    },
    {
      img: clientSeven,
    },
    {
      img: clientEight,
    },
    {
      img: clientNine,
    },
    {
      img: clientTen,
    },
    {
      img: clientEleveen,
    },
  ];

  const testimonials = [
    {
      quouteImg: quote,
      userName: "Camelia Rose",
      userDesig: "it manager",
      prifileImg: profilePic,
      userReview:
        "We collect reviews from our users so you can get an honest opinion of what an experience with our webebsite are really like. We collect reviews from our users so you can get an honest opinion of what an here lorem experience with.",
    },
    {
      quouteImg: quote,
      userName: "Camelia Rose",
      userDesig: "it manager",
      prifileImg: profilePic,
      userReview:
        "We collect reviews from our users so you can get an honest opinion of what an experience with our webebsite are really like. We collect reviews from our users so you can get an honest opinion of what an here lorem experience with.",
    },
    {
      quouteImg: quote,
      userName: "Camelia Rose",
      userDesig: "it manager",
      prifileImg: profilePic,
      userReview:
        "We collect reviews from our users so you can get an honest opinion of what an experience with our webebsite are really like. We collect reviews from our users so you can get an honest opinion of what an here lorem experience with.",
    },
  ];

  const contact = [
    {
      img: callGif,
      title: "Phone",
      contactOne: "+44 7850 452921 ",
      // contactTwo: "+1 6532-430-309",
      Link1: "tel:+44 7850 452921",
      // Link2: "tel:+16532430309"
    },
    {
      img: emailGif,
      title: "Email",
      contactOne: "sales@harriercandidates.com ",
      contactTwo: " cs@harriercandidates.com",
      Link1: "mailto:sales@harriercandidates.com",
      Link2: "mailto:cs@harriercandidates.com",
    },
    {
      img: locationGif,
      title: "Address",
      contactOne:
        "Framlingham Technology Centre, Station Road, Framlingham, Woodbridge, Suffolk, IP13 9EZ. ",
    },
  ];

  let client = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "linear",
    className: "sample",
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  let review = {
    autoplay: true,
    dots: true,
    // autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    className: "sample",
  };

  const [contactData, setContactData] = useState({
    first_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const ContactData = (e) => {
    const name = e.target.name;
    const value = e.target.value.trimStart();
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  // ======= Contact Details API ========

  const contactFormSubmit = async (e) => {
    e.preventDefault();
    const response = Encrypt(
      JSON.stringify({
        name: contactData.full_name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message,
      })
    );

    await axiosInstance
      .post("v1/contactus", {
        response: response,
      })
      .then((res) => {
        const data = Decrypt(res.data.data);
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res.data.success) {
          successhandleOpen();
          setContactData({
            full_name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log(Error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 850,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Header />

      {/* ==== Banner ===== */}

      <section>
        <div className="home-banner pt-200">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 order-xl-1 order-2 ">
                <h1 className="banner-title">
                  The place where LegalTech Careers are made
                </h1>
                {/* <p className='font-20 gray-color mt-30'>Search your career opportunity through 12,800 jobs</p> */}
                <p className="font-20 gray-color mt-30">
                  Law Firms, LegalTech companies and Legal Operations teams:
                  Find your dream candidate{" "}
                </p>
                <p className="font-20 gray-color mt-17">
                  Candidates: Find out what you’re worth; Be Found by Employers{" "}
                </p>
                <div className="job-search-box mt-17 d-md-flex justify-content-between align-items-center">
                  <div className="row">
                    <div className="col-md-3 mt-md-0 mt-2 px-2 d-flex align-items-center">
                      <img src={search} alt="" className="pe-1" />
                      <input type="search" placeholder="Keyword" />
                    </div>
                    <div className="col-md-5 mt-md-0 mt-2 px-2 d-flex align-items-center">
                      <img src={location} alt="" className="pe-1" />
                      <input type="search" placeholder="Job-seeking Status" />
                    </div>
                    <div className="col-md-3 mt-md-0 mt-2 px-2 d-flex align-items-center ">
                      <img src={location} alt="" className="pe-1" />
                      <input
                        type="search"
                        placeholder="Location"
                        className="border-right0"
                      />
                    </div>
                  </div>
                  <div className="text-md-inherit text-center">
                    <button
                      to="/"
                      className="commom-sky-button whitespace-nowrap "
                    >
                      Find Candidate
                    </button>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-md-start justify-content-center align-items-baseline ">
                  <div className="mt-30 me-md-0 me-sm-2 text-sm-start text-center">
                    <Link to="/corequestions">
                      {" "}
                      <button className="commom-sky-button ">
                        Create your Candidate Profile
                      </button>{" "}
                    </Link>
                  </div>
                  <div className="mt-30 text-sm-start text-center ml-33">
                    {/* <button to="/" className="commom-blue-button">Employer Sign Up</button> */}
                    <Link to="/signup" className="commom-blue-button">
                      Employer Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 order-xl-2 order-1">
                <div className="text-xl-right text-center">
                  <img
                    src={bannerImg}
                    alt=""
                    className="img-fluid banner-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== About us ===== */}

      <section className="aboutUs mt-140" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={about} alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title mt-md-50"> About Us </h2>
              <p className="animated-border"></p>
              {/* <h3 className='section-sub-title mt-64'>Millions of jobs. Find the one that suits you.</h3> */}
              <h3 className="section-sub-title mt-64">
                LegalTech and Legal Operations jobs demystified{" "}
              </h3>
              <p className="font-20 mt-20 text-justify">
                More often than not, the best candidates for NewLaw and
                LegalTech jobs are passive, not actively jobseeking. With our
                platform, employers can search a talent database using over 30
                search criteria tailormade to the industry to find the best
                talent right away. Talent can educate themselves on industry
                norms and trends while maintaining their anonymity.
              </p>
              <p className="font-20 mt-20 text-justify">
                The Harrier Candidates platform was born out of our sister
                service,
                {`  `}
                <a
                  target="blank"
                  href="https://harriersearch.com/"
                  className="light-blue-color text-decoration-underline"
                >
                  Harrier Search
                </a>
                , a more traditional recruitment agency serving law firms,
                LegalTech companies, consultancies and in-house Legal Operations
                teams. We are happy to provide that headhunter service, but
                unlike other recruiters who grow by adding more consultants and
                charging hefty fees, we are in a position to offer the platform
                approach to those employers who know what they’re looking for,
                offering control, speed and considerable savings.
              </p>
              <div className="mt-40">
                {/* <div className='d-flex align-items-center'>
                                    <img src={trueArrow} alt="" />
                                    <p className='font-16 about-section'>Bring to the table win-win survival</p>
                                </div>
                                <div className='d-flex align-items-center mt-2'>
                                    <img src={trueArrow} alt="" />
                                    <p className='font-16 about-section'>Capitalize on low hanging fruit to identify</p>
                                </div>
                                <div className='d-flex align-items-center mt-2'>
                                    <img src={trueArrow} alt="" />
                                    <p className='font-16 about-section'>But I must explain to you how all this</p>
                                </div> */}
                <button to="/" className="commom-blue-button mt-40">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== Our client ===== */}

      <section>
        <div className="container">
          <div className="mt-140">
            <h2 className="section-title text-center">Our Clients</h2>
            <p className="animated-border mx-auto"></p>
            <div className="mt-40">
              <div className="row ">
                <Slider {...client}>
                  {clientSlider.map((d, i) => (
                    <div className=" col-lg-2" key={i}>
                      <div className="card">
                        <div className="client-box">
                          <img src={d.img} alt="" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== Testimonials ===== */}

      {/* <section className='textimonial-bg mt-140'>
                <div className='container'>
                    <h2 className='section-title text-center'>Testimonials</h2>
                    <p className='animated-border mx-auto'></p>

                    <Slider {...review}>
                        {testimonials.map((t, i) => (
                            <div className='' key={i} >
                                <div className="mt-100">
                                    <img src={t.quouteImg} alt="" />
                                    <p className='font-20 text-dark text-500 text-center mt-3'>{t.userName}</p>
                                    <p className='about-user pt-1'>{t.userDesig}</p>
                                    <div className='user-review-profile mx-auto mt-1'>
                                        <img src={t.prifileImg} alt="" className='img-fluid' />
                                    </div>
                                    <p className='font-20 gary-color mx-auto mt-20 text-center user-review'>{t.userReview}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section> */}

      {/* ==== Employers And Candidates  ===== */}

      <section className="employers mt-140" id="employers">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1 order-2">
              <h2 className="section-title mt-md-50">Employers</h2>
              <p className="animated-border"></p>

              <div className="mt-40 mw-90">
                <div className="d-flex align-items-baseline ">
                  <img src={trueArrow} alt="" />
                  <p className="font-16 about-section text-justify">
                    Search our database with over 30 criteria tailored to
                    LegalTech/NewLaw
                  </p>
                </div>
                <div className="d-flex align-items-baseline mt-4 text-justify">
                  <img src={trueArrow} alt="" />
                  <p className="font-16 about-section">
                    Find exactly what you’re looking for on Day 1 of your search
                  </p>
                </div>
                <div className="d-flex align-items-baseline mt-4 text-justify">
                  <img src={trueArrow} alt="" />
                  <p className="font-16 about-section">
                    Profiles are anonymised to help mitigate unconscious bias
                  </p>
                </div>
                <div className="d-flex align-items-baseline mt-4 text-justify">
                  <img src={trueArrow} alt="" />
                  <p className="font-16 about-section">
                    Filter out candidates who aren’t open to approaches right
                    now
                  </p>
                </div>
                <div className="d-flex align-items-baseline mt-4 text-justify">
                  <img src={trueArrow} alt="" />
                  <p className="font-16 about-section">
                    Shortlist top talent if you don’t have a vacancy just yet –
                    receive notifications when a shortlisted candidate changes
                    their jobseeking status (i.e. Active, Passive, Very Passive,
                    Closed)
                  </p>
                </div>
                <div className="d-flex align-items-baseline mt-4 text-justify">
                  <img src={trueArrow} alt="" />
                  <p className="font-16 about-section">
                    A headhunter might charge well over 20% commission – our
                    rate is 11%
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center order-lg-2 order-1">
              <img src={employers} alt="" className="employers-image " />
            </div>
          </div>

          <div className="candidates mt-140" id="candidates">
            <div className="row align-items-center">
              <div className="col-lg-6 text-center">
                <img src={candidates} alt="" className=" candidates-image" />
              </div>
              <div className="col-lg-6">
                <h2 className="section-title mt-md-50">Candidates</h2>
                <p className="animated-border"></p>

                <div className="mt-40  mw-90">
                  <div className="d-flex align-items-center text-justify">
                    <img src={trueArrow} alt="" />
                    <p className="font-16 about-section ">
                      Anonymity is key. No employer will be able to see their
                      own employees in the database
                    </p>
                  </div>
                  <div className="d-flex align-items-baseline mt-4 text-justify">
                    <img src={trueArrow} alt="" />
                    <p className="font-16 about-section">
                      Benchmark yourself against industry peers, find out what
                      you’re worth. Not just salary, but working arrangements et
                      al.
                    </p>
                  </div>
                  <div className="d-flex align-items-baseline mt-4 text-justify">
                    <img src={trueArrow} alt="" />
                    <p className="font-16 about-section">
                      See what skills or experiences you may be missing that
                      could help you secure a promotion.
                    </p>
                  </div>
                  <div className="d-flex align-items-baseline mt-4 text-justify">
                    <img src={trueArrow} alt="" />
                    <p className="font-16 about-section">
                      Don’t waste your precious time searching for roles: be
                      found by employers, but only when you want to be.
                    </p>
                  </div>
                  <div className="d-flex align-items-baseline mt-4 text-justify">
                    <img src={trueArrow} alt="" />
                    <p className="font-16 about-section">
                      Full transparency – employers can only request to see your
                      CV for a specific vacancy, it’s your choice whether or not
                      to share your anonymised CV
                    </p>
                  </div>
                  <div className="d-flex align-items-baseline mt-4 text-justify">
                    <img src={trueArrow} alt="" />
                    <p className="font-16 about-section">
                      You’re not alone, you’ll be guided throughout the process
                      by our CS team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== Contact us  ===== */}

      <section className="mt-140 contactUs" id="contactUs">
        <div className="container">
          <h2 className="section-title text-center">Contact Us</h2>
          <p className="animated-border mx-auto"></p>

          <div className="contact-us mt-100">
            <div className="row">
              {contact.map((con, i) => (
                <div className="col-md-4 col-sm-6 " key={i}>
                  <div className="contact-box text-center">
                    <img src={con.img} alt="" width="100px" />
                    <p className="font-32 font-500">{con.title}</p>
                    <p className="mt-3 font-24">
                      <a href={con.Link1}>{con.contactOne}</a>
                    </p>
                    <p className="pt-1 font-24">
                      <a href={con.Link2}>{con.contactTwo}</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-140">
            <form action="">
              <div className="row">
                <div className="col-sm-6">
                  <label
                    htmlFor=""
                    className="my-20-26 font-20 text-black text-500"
                  >
                    Full name<span className="text-red">* </span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    placeholder="Full name"
                    value={contactData.full_name}
                    onChange={ContactData}
                  />

                  <label
                    htmlFor=""
                    className="my-20-26 font-20 text-black text-500"
                  >
                    Your Phone<span className="text-red">* </span>{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control noscroll"
                    name="phone"
                    placeholder="Your Phone"
                    value={contactData.phone}
                    onChange={ContactData}
                  />
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor=""
                    className="my-20-26 font-20 text-black text-500"
                  >
                    Your Email<span className="text-red">* </span>{" "}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    value={contactData.email}
                    onChange={ContactData}
                  />

                  <label
                    htmlFor=""
                    className="my-20-26 font-20 text-black text-500"
                  >
                    Subject<span className="text-red">* </span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Subject"
                    value={contactData.subject}
                    onChange={ContactData}
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor=""
                    className="my-20-26 font-20 text-black text-500"
                  >
                    Message<span className="text-red">* </span>{" "}
                  </label>
                  <textarea
                    type=""
                    className="form-control"
                    rows={8}
                    name="message"
                    placeholder="Message"
                    value={contactData.message}
                    onChange={ContactData}
                  ></textarea>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="mt-140 commom-blue-button"
                  onClick={contactFormSubmit}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Success Modal ===== */}
      <Modal
        open={successopen}
        onClose={successhandleClose}
        onKeyPress={(event) => {
          var key = event.keyCode || event.which;
          if (key === 13 || 27) {
            successhandleClose();
          }
        }}
      >
        <Box sx={style}>
          <div className="text-end">
            <button
              className="bg-transparent border-0 text-right close-width"
              onClick={successhandleClose}
            >
              {" "}
              <img src={closeIcon} alt="" />{" "}
            </button>
          </div>
          <div className="text-center mt-3">
            <img src={success} alt="" className="success" />
          </div>
          <Typography id="success-modal">
            <h5 className="text-center pt-5">
              Thank you, We will touch shortly.
            </h5>
          </Typography>
          <div className="text-center mt-40">
            <button className="commom-blue-button" onClick={successhandleClose}>
              Ok
            </button>
          </div>
        </Box>
      </Modal>
      {/* ==== Footer ===== */}
      <Footer />
    </>
  );
};

export default Home;
