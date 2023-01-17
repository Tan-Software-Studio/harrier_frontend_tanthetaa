import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ====== Img ======
import UpdateLogoIcon from "../../img/Update-Employer/edit-image.png"
import thankIcon from ".././../img/common/thank-you-icon.png"
import closeIcon from ".././../img/common/cancel-icon.png"
import uploadIcon from "../../../src/img/common/file-upload.png"
// ===== Img ====
import Headerlogo from "../../img/Header/Header-logo.png"
// ====== Css ======
import styles from "./UpdateEmployer.module.scss";

// ====== Material ui =====
import { Button, FormControl, InputBase, InputLabel, TextField } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import Copyright from '../Common/Copyright/Copyright'

// ===== For API =====

import axiosInstance from "../../apiServices/axiosInstance"
import Encrypt from '../../customHook/customHook/EncryptDecrypt/Encrypt';
import Decrypt from '../../customHook/customHook/EncryptDecrypt/Decrypt';
import { toast } from 'react-toastify'
import NewHeader from '../Common/NewHeader/NewHeader'
import axiosInstanceAuth from '../../apiServices/axiosInstanceAuth'
import OfficeLocationModel from './officeLocationModel'
import WorkScheduleModel from './workScheduleModel'

const UpdateEmployer = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== (null || undefined);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [fetchEmpData, setFetchEmpData] = useState();
    const [inputData, setInputData] = useState({});

    const [credential, setCredential] = useState({
        password: "",
    });

    const [offficeLocation, setOffficeLocation] = useState("");
    const [workingSchedule, setWorkingSchedule] = useState("");

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
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgcolor: 'red',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [uploadicon, setUploadIcon] = useState();
    const [preview, setPreview] = useState()

    useEffect(() => {
        getEmploterProfileDetails();
    }, [])

    useEffect(() => {
        setInputData({
            name: fetchEmpData?.name,
            uk_address: fetchEmpData?.uk_address,
            hq_address: fetchEmpData?.hq_address,
            billing_address: fetchEmpData?.billing_address,
            contact_details: fetchEmpData?.contact_details,
            email: fetchEmpData?.email,
            url: fetchEmpData?.url,
            logo_path: fetchEmpData?.logo_path,
        });
    }, [fetchEmpData]);


    const handleLogoChange = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setUploadIcon(file)
            setPreview(reader.result)
        };
        reader.readAsDataURL(file)
    }

    const handlecancel = () => {
        navigate("/candidates")
    }

    const onchangePassword = (e) => {
        const { name, value } = e.target;
        setCredential({
            ...credential,
            [name]: value
        })
    }


    // =======  API ======
    const getEmploterProfileDetails = async () => {
        const response = Encrypt(
            JSON.stringify({
            })
        );

        const formData = new FormData()
        formData.append("response", response)

        await axiosInstanceAuth
            .post("/v1/emp/details",
                formData,
            )
            .then((res) => {
                const data = JSON.parse(Decrypt(res?.data?.data));
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    setFetchEmpData(data);
                } else {
                    // toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })

    }

    const handleUpdateEmployer = async () => {
        const response = Encrypt(
            JSON.stringify({
                name: inputData.name,
                uk_address: inputData.uk_address,
                hq_address: inputData.hq_address,
                billing_address: inputData.billing_address,
                contact_details: inputData.contact_details,
                email: inputData.email,
                url: inputData.url,
            })
        );

        const formData = new FormData()
        formData.append("response", response)
        formData.append("logo", uploadicon == undefined ? '' : uploadicon)


        await axiosInstanceAuth
            .post("/v1/emp/profile/update", formData)
            .then((res) => {
                const data = JSON.parse(Decrypt(res?.data?.data));
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    getEmploterProfileDetails();
                    toast.success(msg)
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })

    }

    const onchangeinput = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const handelUpdatePassword = async () => {
        const response = Encrypt(
            JSON.stringify({
                email: fetchEmpData?.email,
                token: fetchEmpData?.uuid,
                password: credential?.password,
                password_confirmation: credential?.password,
            })
        );

        const formData = new FormData()
        formData.append("response", response)

        await axiosInstanceAuth
            .post("/v1/emp/change/password/update",
                formData,
            )
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success(msg)
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })

    }

    return (
        <>
            <NewHeader isLoggedIn={isLoggedIn} />

            <div className={`${styles['update-employer-profile']}`}>
                <div className='update-employer-bg pb-40'>
                    <div className='container'>
                        <div className='update-employer-box mt-20'>
                            <h4 className="common-title">Edit Profile</h4>
                            <div className='text-center'>
                                <img src={inputData?.logo_path} alt="" className='update-employer-profile-icon' />

                                <img src={UpdateLogoIcon} alt="" className="logo-update-icon" />
                                <TextField name="logo" value="" type="file" id="file_upload" onChange={handleLogoChange} variant="filled" className="logo-text-field-input" />
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <FormControl variant="standard" className='mt-20'>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Full Legal Name<span className="text-red"> * </span>
                                        </InputLabel>
                                        <TextField name="name" value={inputData?.name} onChange={onchangeinput}></TextField>
                                    </FormControl>
                                </div>
                                <div className="col-lg-6">
                                    <FormControl variant="standard" className='mt-20'>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            UK Address<span className="text-red"> * </span>
                                        </InputLabel>
                                        <TextField name="uk_address" value={inputData.uk_address} onChange={onchangeinput} ></TextField>
                                    </FormControl>
                                </div>
                                <div className="col-lg-6">
                                    <FormControl variant="standard" className='mt-20'>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            HQ Address (if other than UK address)
                                        </InputLabel>
                                        <TextField name="hq_address" value={inputData.hq_address} onChange={onchangeinput} ></TextField>

                                    </FormControl>
                                </div>
                                <div className="col-lg-6">
                                    <FormControl variant="standard" className='mt-20'>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Billing Address<span className="text-red"> * </span>
                                        </InputLabel>
                                        <TextField name="billing_address" value={inputData.billing_address} onChange={onchangeinput} ></TextField>
                                    </FormControl>
                                </div>
                                <div className="col-lg-6">
                                    <FormControl variant="standard" className='mt-20'>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Point of Contact for Invoices (email address preferred)<span className="text-red"> * </span>
                                        </InputLabel>
                                        <TextField name="contact_details" value={inputData.contact_details} onChange={onchangeinput}></TextField>
                                    </FormControl>
                                </div>
                                <div className="col-lg-6">
                                    <FormControl variant="standard" className='mt-20'>
                                        <InputLabel shrink htmlFor="bootstrap-input">
                                            Super-User Email Address<span className="text-red"> * </span>
                                        </InputLabel>
                                        <TextField name="email" value={inputData.email} onChange={onchangeinput}></TextField>
                                    </FormControl>
                                </div>

                                <Box className="d-flex justify-content-end mt-50 text-center bg-transparent shadow-none ">
                                    <Button onClick={handlecancel} variant="solid" className='cancel-btn mx-3'>Back</Button>
                                    <Button onClick={handleUpdateEmployer} variant="solid" className='common-btn'>Save Changes</Button>
                                </Box>



                                <div className="security-container mt-5">
                                    <div className="security-title">Security</div>
                                    <p className="mt-20 footer-border"></p>
                                    <div className="col-lg-12">
                                        <FormControl variant="standard" className='mt-20'>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <InputLabel shrink htmlFor="bootstrap-input align-items-center">
                                                    Password
                                                </InputLabel>
                                                <div className="change-password-btn" onClick={handelUpdatePassword}> <span> Update Password </span></div>
                                            </div>
                                            <div className='d-flex'>
                                                <TextField
                                                    type="password"
                                                    name="password"
                                                    value={credential?.password}
                                                    onChange={onchangePassword}
                                                />
                                                {/* <button className='update-pwd-btn d-inline-block' onClick={handelUpdatePassword}>Update Password</button> */}
                                            </div>
                                            {/* <div className="change-password-btn mt-11" onClick={handelUpdatePassword}> <span> Update Password </span></div> */}
                                        </FormControl>
                                    </div>
                                </div>

                                {/* Office Location Model  */}

                                <OfficeLocationModel />

                                {/* Work Schedule Model  */}

                                <WorkScheduleModel />


                                {/* <div>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >

                                        <div className='container'>
                                            <div className="modal-size">
                                                <Box sx={style}>
                                                    <div className='text-end' >
                                                        <button className='bg-transparent border-0 text-right' onClick={handleClose}> <img src={closeIcon} alt="" /> </button>
                                                    </div>
                                                    <div className='inside-modal'>
                                                        <div className='text-center'>
                                                            <img src={thankIcon} alt="" />
                                                        </div>
                                                        <Typography id="modal-modal-title" className="modal-modal-title mt-30" ><h1>Thank you for joining</h1> </Typography>
                                                        <Typography className="modal-modal-description mt-17"><p>Thank you for signing up to Harrier CandclassNameates.</p></Typography>
                                                        <Typography className="modal-modal-description mt-17"><p>You will be contacted if an
                                                            Employer requests to see your anonymised CV. </p></Typography>
                                                        <Typography className="modal-modal-description mt-17"><p>In the meantime, if you would like to browse the Harrier
                                                            Candidates database for salary benchmarking,
                                                            contact XXX for Candidate Access
                                                        </p></Typography>
                                                        <div className='text-center mt-40'>
                                                            <Link to="/"> <button className="commom-blue-button">Ok</button></Link>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </div>
                                        </div>
                                    </Modal>
                                </div> */}

                            </div>
                        </div>
                    </div>
                    <Copyright />
                </div>
            </div>
        </>
    )
}

export default UpdateEmployer