import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'


// ====== Img =====
import signIn from "../../img/Signin/logo.png"
import closeIcon from ".././../img/common/cancel-icon.png"
import thankIcon from "../../img/common/thank-you-icon.png"

// ===== Img ====
import Headerlogo from "../../img/Header/Header-logo.png"

// ====== Css =====
import styles from "./login.module.scss";

// ======= Material ui =======
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box, Button, FormControl, FormControlLabel, InputBase, InputLabel, TextField, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Copyright from '../Common/Copyright/Copyright';
import { ToastContainer, toast } from 'react-toastify';

// ===== For API =====

import axiosInstance from "../../apiServices/axiosInstance"
import Encrypt from '../../customHook/customHook/EncryptDecrypt/Encrypt';
import Decrypt from '../../customHook/customHook/EncryptDecrypt/Decrypt';


const Login = () => {

    const Role = useLocation().pathname.split("/").slice(2);

    const url = window.location.origin;
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;

    // useEffect(() => {
    //     localStorage.clear();

    //     if (isLoggedIn) {
    //         navigate("/candidates");
    //     }
    // });

    useEffect(() => {

        if (isLoggedIn) {
            window.addEventListener('popstate', (e) => {
                window.history.go(1);
            });
        }
    });



    const [openThankYou, setOpenThankYou] = useState(false);
    const handleOpenThankYou = () => setOpenThankYou(true);
    const handleCloseThankYou = () => setOpenThankYou(false);

    const [access, setAccess] = useState({
        name: "",
        email: "",
    })

    const [forgetEmail, setForgetEmail] = useState({
        email: "",
    })

    const [error, setError] = useState()

    // ====== Field State ======

    const [fields, setFields] = useState({
        email: "",
        password: "",
        guest: (Role == 'guest' ? true : false),
        employers: (Role == 'emp' ? true : false),
    })

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            padding: '10px 12px',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            // '&:focus': {
            //     boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            //     borderColor: theme.palette.primary.main,
            // },
        },
    }));

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // ==== Modal =====

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // useEffect(() => {
    //     document.title = "Login"
    // }, [])

    // ======= onChange ======

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFields({
            ...fields,
            [name]: value
        })

    }

    const onCheckChange = (e) => {
        const { name, checked } = e.target
        if (name === "guest") {
            if (checked) {
                setFields({
                    ...fields,
                    employers: false,
                    [name]: checked
                })
            } else {
                setFields({
                    ...fields,
                    [name]: checked
                })
            }
        }
        if (name === "employers") {
            if (checked) {
                setFields({
                    ...fields,
                    guest: false,
                    [name]: checked
                })
            } else {
                setFields({
                    ...fields,
                    [name]: checked
                })
            }
        }
    }
    // ====== Login API ========

    const handleSubmit = async () => {
        if (fields.guest) {
            const encryptedData = Encrypt(
                JSON.stringify({
                    email: fields.email,
                    password: fields.password,
                })
            );
            await axiosInstance
                .post("/v1/guest/login", {
                    response: encryptedData,
                })
                .then((res) => {
                    const data = Decrypt(res.data.data)
                    const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                    const finalData = JSON.parse(data)

                    if (res?.data?.success) {
                        toast.success(msg)
                        navigate("/guest-dashboard");
                        localStorage.setItem("token", finalData.access_token)
                    } else {
                        toast.error(msg)
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                })
        } else if (fields.employers) {
            const encryptedData = Encrypt(
                JSON.stringify({
                    email: fields.email,
                    password: fields.password,
                })
            );
            await axiosInstance
                .post("/v1/emp/login", {
                    response: encryptedData,
                })
                .then((res) => {
                    const data = Decrypt(res.data.data)
                    const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                    const finalData = JSON.parse(data)

                    if (res?.data?.success) {
                        toast.success(msg)
                        navigate("/candidates");
                        localStorage.setItem("token", finalData.access_token)
                    } else {
                        toast.error(msg)
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                })
        }
    }



    // ========== Request API =======

    const requestAccess = (e) => {
        const name = e.target.name
        const value = e.target.value

        setAccess({
            ...access,
            [name]: value
        })
    }


    const handleRequestAccess = async () => {

        const encryptedData = Encrypt(
            JSON.stringify({
                email: access.email,
                name: access.name,
            })
        );

        await axiosInstance
            .post("/v1/guest/login/request/post", {
                response: encryptedData,
            })
            .then((res) => {
                const data = Decrypt(res.data.data)
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const finalData = JSON.parse(Decrypt(res.data.data))
                console.log("----> finalData", finalData)

                if (res?.data?.success) {
                    toast.success(msg)
                    handleClose();
                    setFields({
                        ...fields,
                        guest: true,
                        employers: false,
                    })
                    setAccess({
                        name: "",
                        email: "",
                    })
                    // handleOpenThankYou();
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })
    }


    // ====== Forget Password API ======

    const [forget, setforget] = useState(false);
    const forgetOpen = () => setforget(true);
    const forgetClose = () => setforget(false);


    const forgetEmailId = (e) => {
        const name = e.target.name
        const value = e.target.value

        setForgetEmail({
            ...forgetEmail,
            [name]: value
        })
    }

    const sendforgetemail = async (e) => {
        console.log("-------------->>>> URL", url);
        if (fields.guest) {
            const encryptedData = Encrypt(
                JSON.stringify({
                    email: forgetEmail.email,
                    url: e,
                })
            );
            await axiosInstance
                .post("/v1/guest/forget/password", {
                    response: encryptedData,
                })
                .then((res) => {
                    const data = Decrypt(res.data.message)
                    const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                    const finalData = JSON.parse(data)

                    if (res?.data?.success) {
                        // localStorage.setItem("token", finalData.access_token)
                        setError(data)
                        toast.success(msg)
                        forgetClose();
                        // navigate("/authentication/reset-password")

                        setForgetEmail({
                            email: "",
                        })
                    } else {
                        toast.error(msg)
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                })
        }
        else {
            const encryptedData = Encrypt(
                JSON.stringify({
                    email: forgetEmail.email,
                    url: e,
                })
            );
            await axiosInstance
                .post("/v1/emp/forget/password", {
                    response: encryptedData,
                })
                .then((res) => {

                    const data = Decrypt(res.data.data)
                    const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                    const finalData = JSON.parse(data)

                    if (res?.data?.success) {
                        // localStorage.setItem("token", finalData.access_token)
                        toast.success(msg)
                        forgetClose();
                        // navigate("/authentication/reset-password")
                    } else {
                        toast.error(msg)
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                })
        }

    }



    return (
        <>
            <div className={`${styles['login-page']}`}>

                <div className="common-bg login-bg">
                    <div className='container'>
                        <Link to="/" className='header-logo'><img src={Headerlogo} alt="" className='header-logo mt-20' /> </Link>
                        {/* <Link to=""> <h4 className='common-title' onClick={handleOpen}>Request Guest Access</h4> </Link> */}
                        <div className='bg-white mt-30'>
                            <div className='inside-box'>
                                <div className='text-center '>
                                    <img src={signIn} alt="" className='mw-20' />
                                </div>

                                <FormControl variant="standard" className='mt-20'>
                                    <InputLabel shrink htmlFor="user-name">
                                        Email Address:
                                    </InputLabel>
                                    <TextField id="user-name" name='email' value={fields.email} onChange={onChange}></TextField>
                                </FormControl>

                                <FormControl>
                                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControl variant="standard" >
                                            <InputLabel shrink htmlFor="password" className='mt-11'>
                                                Password:
                                            </InputLabel>
                                            <TextField
                                                id="password"
                                                name="password"
                                                value={fields.password}
                                                type="password"
                                                onChange={onChange}
                                                onKeyPress={(event) => {
                                                    var key = event.keyCode || event.which;
                                                    if (key === 13) {
                                                        handleSubmit()
                                                    }
                                                }}
                                            ></TextField>
                                        </FormControl>
                                        <Link to="" variant="solid" className='text-end forgot-pwd my-2' onClick={forgetOpen} > Forgot Password? </Link>

                                        <div className='mt-2 d-flex'>
                                            <FormControlLabel value="guest" name='guest' onChange={onCheckChange} checked={fields.guest} control={<Radio />} label="Guest Login" />
                                            <FormControlLabel value="employers" name='employers' onChange={onCheckChange} checked={fields.employers} control={<Radio />} label="Employers Login" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <Box className="mt-3 text-center bg-transparent shadow-none">
                                    <Button variant="solid" className="common-btn " onClick={handleSubmit}> Login</Button>
                                    {/* <Button variant="solid" className="common-btn ms-2" onClick={forgetOpen} > Forgot password ? </Button> */}
                                </Box>

                                {fields.guest && <Link to="" > <h4 className='common-title mt-4' onClick={handleOpen} >Request Guest Access</h4> </Link>}

                            </div>
                        </div>


                        {/* ======= Guest Request Access Modal ====== */}

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className='text-end' >
                                    <button className='bg-transparent border-0 text-right' onClick={handleClose}> <img src={closeIcon} alt="" /> </button>
                                </div>
                                <FormControl variant="standard" className='mt-10'>
                                    <InputLabel shrink htmlFor="name">
                                        Name:
                                    </InputLabel>
                                    <TextField
                                        id="name"
                                        name="name"
                                        value={access.name}
                                        onChange={requestAccess}
                                        className="model-text-field-box"
                                    ></TextField>
                                </FormControl>

                                <FormControl variant="standard" className='mt-20'>
                                    <InputLabel shrink htmlFor="name">
                                        Email:
                                    </InputLabel>
                                    <TextField
                                        id="name"
                                        type='email'
                                        name="email"
                                        value={access.email}
                                        onChange={requestAccess}
                                        onKeyPress={(event) => {
                                            var key = event.keyCode || event.which;
                                            if (key === 13) {
                                                handleRequestAccess()
                                            }
                                        }}
                                        className="model-text-field-box"
                                    ></TextField>
                                </FormControl>

                                <Box className="mt-50 text-center bg-transparent shadow-none">
                                    <Button variant="solid" className="common-btn" onClick={handleRequestAccess}>Request Guest Access</Button>
                                </Box>
                            </Box>
                        </Modal>


                        <Modal
                            open={forget}
                            onClose={forgetClose}
                        >
                            <Box sx={style}>
                                <div className='text-end' >
                                    <button className='bg-transparent border-0 text-right' onClick={forgetClose}> <img src={closeIcon} alt="" /> </button>
                                </div>
                                <FormControl variant="standard" className='mt-20 '>
                                    <InputLabel shrink htmlFor="email">
                                        Email Address:
                                    </InputLabel>
                                    <TextField
                                        id="email"
                                        type='email'
                                        name="email"
                                        value={forgetEmail.email}
                                        onChange={forgetEmailId}
                                        onKeyPress={(event) => {
                                            var key = event.keyCode || event.which;
                                            if (key === 13) {
                                                sendforgetemail(url)
                                            }
                                        }}
                                        className="model-text-field-box"
                                    ></TextField>

                                </FormControl>

                                {/* <p className='success-message'>{error}</p> */}

                                <div className='text-center mt-20'>
                                    <Button variant="solid" className="common-btn ms-2" onClick={(e) => sendforgetemail(url)} > Send email </Button>
                                </div>
                            </Box>
                        </Modal>

                        <Modal
                            open={openThankYou}
                            onClose={handleCloseThankYou}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <div className='container'>
                                <div className="modal-size">
                                    <Box sx={style}>
                                        <div className='text-end' >
                                            <button className='bg-transparent border-0 text-right' onClick={handleCloseThankYou}> <img src={closeIcon} alt="" /> </button>
                                        </div>
                                        <div className='inside-modal'>
                                            <div className='text-center'>
                                                <img src={thankIcon} alt="" />
                                            </div>
                                            <Typography id="modal-modal-title" className="modal-modal-title mt-30" >
                                                <h1>Thank you for joining</h1>
                                            </Typography>
                                            <Typography className="modal-modal-description mt-17">
                                                <p>Thank you for Request Guest Access to Harrier Candidates..</p>
                                            </Typography>
                                            <Typography className="modal-modal-description mt-17">
                                                <p>You will be contacted if an Guest Access requests to see your anonymised CV. </p>
                                            </Typography>
                                            <Typography className="modal-modal-description mt-17">
                                                <p>In the meantime, if you would like to browse the Harrier Candidates database for salary benchmarking, contact XXX for Candidate Access
                                                </p>
                                            </Typography>
                                            <div className='text-center mt-40'>
                                                <Link to="/"> <button className="commom-blue-button">Ok</button></Link>
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                            </div>
                        </Modal>

                        <div className='footer-bgs footer-fixed mt-40 mb-20'>
                            <Copyright />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login