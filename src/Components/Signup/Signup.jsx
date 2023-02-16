import React, { useEffect, useState } from "react";

// ====== Img ======

import signupIcon from ".././../img/Signup/signup-icon.png";
import thankIcon from ".././../img/common/thank-you-icon.png";
import closeIcon from ".././../img/common/close-icon.png";
import uploadIcon from "../../../src/img/common/file-upload.png";
import roundcloseIcon from "../../../src/img/common/cancel-icon.png";
// ===== Img ====
import Headerlogo from "../../img/Header/Header-logo.png";
// ====== Css ======
import styles from "./Signup.module.scss";

// ====== Material ui =====
import {
  Button,
  Checkbox,
  FormControl,
  InputBase,
  InputLabel,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Copyright from "../Common/Copyright/Copyright";

// ===== For API =====

import axiosInstance from "../../apiServices/axiosInstance";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import { toast } from "react-toastify";
import { Label } from "@mui/icons-material";

const Signup = () => {
  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInputData({
      name: "",
      uk_address: "",
      hq_address: "",
      billing_address: "",
      contact_details: "",
      email: "",
      url: "",
    });
    setOpen(false);
  };
  const [terms, setTerms] = useState(true);
  const [tandc, setTandc] = useState(true);

  const [marketing, setMarketing] = useState(true);
  const [marketSignup, setMarketSignup] = useState(true);

  const [inputData, setInputData] = useState({
    name: "",
    uk_address: "",
    hq_address: "",
    billing_address: "",
    contact_details: "",
    email: "",
    url: "",
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: 'red',
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const handleLogoChange = (e) => {
  //     e.preventDefault()
  //     let file = e.target.files[0]
  //     setUploadIcon({ file })
  // }

  const [uploadicon, setUploadIcon] = useState();
  const [preview, setPreview] = useState();

  const handleLogoChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setUploadIcon(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //     document.title = "Sign up"
  // }, [])

  const serviceCheck = () => {
    setTerms(!terms);
  };
  const marketCheck = () => {
    setMarketing(!marketing);
  };

  // =======  API ======

  const handleSubmit = async () => {
    const response = Encrypt(
      JSON.stringify({
        name: inputData.name,
        uk_address: inputData.uk_address,
        hq_address: inputData.hq_address,
        billing_address: inputData.billing_address,
        contact_details: inputData.contact_details,
        email: inputData.email,
        url: inputData.url,
        is_terms_and_conditions: tandc,
        is_marketing_sign_up: marketSignup,
      })
    );

    const formData = new FormData();
    formData.append("response", response);
    formData.append("logo", uploadicon == undefined ? "" : uploadicon);

    await axiosInstance
      .post("/v1/emp/register", formData)
      .then((res) => {
        const data = JSON.parse(Decrypt(res?.data?.data));
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          // toast.success(msg)
          handleOpen();
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const onchangeinput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  return (
    <>
      <div className={`${styles["sign-up"]}`}>
        <div className="signup-bg pb-40">
          <div className="container">
            <Link to="/" className="header-logo">
              <img src={Headerlogo} alt="" className="header-logo mt-20" />{" "}
            </Link>
            <div className="signup-box mt-20">
              <h4 className="common-title">Employer Sign Up</h4>
              <div className="text-center ">
                <img src={signupIcon} alt="" className="sign-up-icon" />
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Full Legal Name<span className="text-red"> * </span>
                    </InputLabel>
                    <TextField
                      name="name"
                      value={inputData.name}
                      onChange={onchangeinput}
                    ></TextField>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      UK Address<span className="text-red"> * </span>
                    </InputLabel>
                    <TextField
                      name="uk_address"
                      value={inputData.uk_address}
                      onChange={onchangeinput}
                    ></TextField>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      HQ Address(if other than UK address)
                    </InputLabel>
                    <TextField
                      name="hq_address"
                      value={inputData.hq_address}
                      onChange={onchangeinput}
                    ></TextField>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Billing Address<span className="text-red"> * </span>
                    </InputLabel>
                    <TextField
                      name="billing_address"
                      value={inputData.billing_address}
                      onChange={onchangeinput}
                    ></TextField>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Point of Contact for Invoices (email address preferred)
                      <span className="text-red"> * </span>
                    </InputLabel>
                    <TextField
                      name="contact_details"
                      value={inputData.contact_details}
                      onChange={onchangeinput}
                    ></TextField>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Super-User Email Address
                      <span className="text-red"> * </span>
                    </InputLabel>
                    <TextField
                      name="email"
                      value={inputData.email}
                      onChange={onchangeinput}
                    ></TextField>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl
                    variant="standard"
                    className="mt-20 position-relative"
                  >
                    <InputLabel shrink htmlFor="">
                      Upload Logo<span className="text-red"> * </span>
                    </InputLabel>
                    <InputLabel
                      shrink
                      htmlFor="file_upload"
                      className="file_upload d-flex justify-content-center"
                    >
                      <img src={uploadIcon} alt="" />{" "}
                      <p className="content">
                        Drag & drop or <span> browse</span>
                      </p>
                    </InputLabel>
                    <TextField
                      name="logo"
                      value=""
                      type="file"
                      className="inputFile"
                      id="file_upload"
                      onChange={handleLogoChange}
                    ></TextField>
                    <div className="d-flex justify-content-between">
                      {uploadicon?.name}
                      {uploadicon?.name && (
                        <button
                          className="bg-transparent border-0 text-right"
                          onClick={() => setUploadIcon({})}
                        >
                          {" "}
                          <img src={roundcloseIcon} alt="" />{" "}
                        </button>
                      )}
                    </div>
                  </FormControl>
                </div>
                <div className="col-lg-6">
                  <FormControl variant="standard" className="mt-20">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      URL <span className="text-red"> * </span>
                    </InputLabel>
                    <TextField
                      name="url"
                      value={inputData.url}
                      onChange={onchangeinput}
                      placeholder="ex. www.harrier.com"
                    ></TextField>
                  </FormControl>
                </div>

                <div className="checkBox d-flex align-items-start mt-3 ">
                  <Checkbox
                    className="ps-0"
                    onChange={serviceCheck}
                    checked={terms ? true : false}
                    onClick={(e) => setTandc(!tandc)}
                  />
                  {/* <p className='content'> By signing-up you agree to
                                        <a target="blank" href='/termsofuse'> our Terms of Use </a>
                                    </p> */}

                  <p className="content">
                    {" "}
                    Our{" "}
                    <a target="_blank" href="/termsofuse">
                      {" "}
                      Terms of Use
                    </a>{" "}
                    govern your access to and use of Harrier Candidates – please
                    read them carefully before you use this service. By using
                    Harrier Candidates, or by clicking this tick box, you accept
                    and agree to be bound and abide by these Terms of Use. If
                    you do not want to agree to these Terms of Use, you must not
                    access or use Harrier Candidates.
                  </p>
                </div>
                <div className="checkBox d-flex align-items-start mt-3 ">
                  <Checkbox
                    className="ps-0"
                    onChange={marketCheck}
                    checked={marketing ? true : false}
                    onClick={(e) => setMarketSignup(!marketSignup)}
                  />
                  {/* <p className='content'> By signing-up you agree to <a target="blank" href='/termsofbusiness'> our Commercial Terms  </a>
                                    </p> */}

                  <p className="content">
                    {" "}
                    Please review our commercial terms. If you are happy to
                    proceed then on Sign Up we will then send our{" "}
                    <a target="blank" href="/termsofbusiness">
                      {" "}
                      Commercial Terms{" "}
                    </a>{" "}
                    to the Point of Contact for Invoices via DocuSign. Once
                    terms are signed, you will be provided with login
                    credentials.
                  </p>
                </div>

                {/* <div className='checkBox d-flex align-items-center'>
                                    <Checkbox className='ps-0' onChange={marketCheck} checked={marketing ? true : false} onClick={(e) => setMarketSignup(!marketSignup)} />
                                    <p className='content'>
                                        <Link to=""> marketing signup</Link></p>
                                </div> */}

                <Box className="mt-50 text-center bg-transparent shadow-none">
                  <Button
                    onClick={handleSubmit}
                    variant="solid"
                    className="common-btn"
                    disabled={terms === true ? "" : true}
                  >
                    Sign Up
                  </Button>
                </Box>

                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="container">
                      <div className="modal-size">
                        <Box sx={style}>
                          <div className="text-end">
                            <button
                              className="bg-transparent border-0 text-right"
                              onClick={handleClose}
                            >
                              {" "}
                              <img src={closeIcon} alt="" />{" "}
                            </button>
                          </div>
                          <div className="inside-modal">
                            <div className="text-center">
                              <img src={thankIcon} alt="" />
                            </div>
                            <Typography
                              id="modal-modal-title"
                              className="modal-modal-title mt-30"
                            >
                              <h1>Thank you for joining</h1>{" "}
                            </Typography>
                            {/* <Typography className="modal-modal-description mt-17"><p>Thank you for signing up to Harrier CandclassNameates.</p></Typography>
                                                        <Typography className="modal-modal-description mt-17"><p>You will be contacted if an
                                                            Employer requests to see your anonymised CV. </p></Typography>
                                                        <Typography className="modal-modal-description mt-17"><p>In the meantime, if you would like to browse the Harrier
                                                            Candidates database for salary benchmarking,
                                                            contact XXX for Candidate Access
                                                        </p></Typography> */}
                            <Typography className="modal-modal-description mt-17">
                              <p>
                                We will send a copy of our Commercial Terms to
                                your Invoicing Contact for signature. Once
                                completed, you will be provided with login
                                credentials
                              </p>
                            </Typography>
                            {/* <Typography className="modal-modal-description mt-17">
                                                            <p>HVR WILL COME BACK TO THIS </p>

                                                            <p className='modal-modal-description text-success  mt-11'>
                                                                Please check your email to
                                                                get password !
                                                            </p>
                                                        </Typography> */}
                            <div className="text-center mt-40">
                              <Link to="/login/emp">
                                {" "}
                                <button className="commom-blue-button">
                                  Ok
                                </button>
                              </Link>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <Copyright />
        </div>
      </div>
    </>
  );
};

export default Signup;
