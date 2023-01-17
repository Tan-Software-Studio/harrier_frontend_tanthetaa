import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Headerlogo from "../../../img/Header/Header-logo.svg"
import styles from "../NewHeader/NewHeader.module.scss"
import MenuItem from '@mui/material/MenuItem';
import dropdownArrow from "../../../img/common/dropdown-icon.png"
import profileIcon from "../../../img/common/profile-pic.png"

import Menu from '@mui/material/Menu';
import { FaBell } from 'react-icons/fa';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// ======= Import ======
import Button from '@mui/material/Button';
import axiosInstanceAuth from '../../../apiServices/axiosInstanceAuth';
import { toast } from 'react-toastify';
import Decrypt from '../../../customHook/customHook/EncryptDecrypt/Decrypt';
import { Modal } from 'bootstrap';
import { Badge, Box, Typography } from '@mui/material';
import { background } from '@chakra-ui/react';

const NewHeader = ({ isjobUpdate, isLoggedIn, jobID }) => {

    useEffect(() => {
        getLogedInDetails()
        getEmpNotifications()
    }, [])

    const [notificationsCount, setNotificationsCount] = useState("")

    const [notifications, setNotifications] = useState([
        // { id: 1, title: "#1 updated" },
        // { id: 2, title: "#2 updated" },
    ]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [bellPop, setBellPop] = React.useState(null);
    const openPop = Boolean(bellPop);
    const ITEM_HEIGHT = 48;

    const [openLogOut, setOpenLogOut] = useState(false);

    const navigate = useNavigate();

    let location = useLocation();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenPop = (event) => {
        getEmpNotifications();
        setBellPop(event.currentTarget);
    };

    const handleClosePop = () => {
        setBellPop(null);
    };

    const profileUpdate = () => {
        handleClose();
        navigate(`/update-employer-profile`);
    };

    const handleOpenLogOut = () => {
        handleClose();
        setOpenLogOut(true);
    };

    const handleCloseLogOut = () => {
        setOpenLogOut(false);
    };

    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
    ]

    const [details, setDetails] = useState({});

    const getLogedInDetails = async () => {

        await axiosInstanceAuth
            .post("/v1/emp/details")
            .then((res) => {
                const data = JSON.parse(Decrypt(res.data.data));
                setDetails(data);
            })
            .catch((err) => {
                console.log("err --->", err);
            })

    }

    const LogOut = async () => {

        await axiosInstanceAuth
            .post("/v1/logout")
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success(msg);
                    localStorage.clear();
                    navigate("/");
                } else {
                    toast.error(msg);
                }
                handleClose();
            })
            .catch((err) => {
                console.log("err --->", err);
            })
    }

    const getEmpNotifications = async () => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .post("/v1/emp/unread/notifications")
                .then((res) => {
                    const data = JSON.parse(Decrypt(res?.data?.data));
                    setNotificationsCount(data?.count)
                    setNotifications(data?.notifications)
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };

    const readNotification = async (notification_id) => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .post(`v1/emp/delete/notification/${notification_id}`)
                .then((res) => {

                    if (res?.data?.success) {
                        getEmpNotifications();
                    } else {
                        // toast.error("error")
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };


    return (

        <>
            <div className={`${styles['new-header']}`}>
                <nav className="navbar  navbar-expand ">
                    <div className="container">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center'>
                                {isLoggedIn === true ?
                                    <Link to="/candidates"> <img src={Headerlogo} alt="" /></Link>
                                    :
                                    <Link to="/"> <img src={Headerlogo} alt="" /></Link>
                                }

                                {/* <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={top100Films.map((option) => option.title)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}

                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                            placeholder="Search"
                                        />
                                    )}
                                /> */}
                            </div>

                            <div id="navbarCollapse" className="collapse navbar-collapse justify-content-end">
                                <ul className="navbar-nav ml-auto align-items-center">
                                    {isjobUpdate == true ?
                                        <li className="nav-item">
                                            <Link to={`/update-job/${jobID}`} className={`${location.pathname === "/update-job" && "active"} nav-link ms-0`}>
                                                Update Job
                                            </Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <Link to="/create-job" className={`${location.pathname === "/create-job" && "active"} nav-link ms-0`}>
                                                Create Job
                                            </Link>
                                        </li>
                                    }

                                    <li className="nav-item">
                                        <Link to="/candidates" className={`${location.pathname === "/candidates" && "active"} nav-link`}>
                                            List of Candidates
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/live-jobs" className={`${location.pathname === "/live-jobs" && "active"} nav-link`}>
                                            Live Jobs
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/my-jobs" className={`${location.pathname === "/my-jobs" && "active"} nav-link`}>
                                            My Jobs
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/short-list" className={`${location.pathname === "/short-list" && "active"} nav-link`}>
                                            Shortlist
                                            <Badge badgeContent={notificationsCount} color="primary">
                                                <FaBell
                                                    onClick={handleOpenPop}
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    className='bell-icon'
                                                />
                                            </Badge>
                                        </Link>
                                    </li>

                                    <Menu
                                        id="basic-menu"
                                        bellPop={bellPop}
                                        open={openPop}
                                        onClose={handleClosePop}
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        PaperProps={{
                                            sx: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                                position: 'absolute',
                                                top: '105px !important',
                                                right: '140px  !important',
                                                left: 'auto  !important',
                                                bottom: 'auto  !important',
                                            },
                                        }}
                                        className="notification-btn"
                                    >
                                        {notifications.length > 0
                                            ?
                                            notifications.map((d, index) => (
                                                <MenuItem key={index} onClick={(e) => { readNotification(d?.id) }} >#{d?.data?.c_id} {d?.data?.message}</MenuItem>
                                            ))
                                            :
                                            <MenuItem>No Notifications Yet</MenuItem>
                                        }
                                    </Menu>

                                    <button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        className="drop-down-btn"
                                    >
                                        <div className='profile-login' >
                                            <div className='d-flex align-items-center'>
                                                <div className='profile-icon'>
                                                    <img src={details?.logo_path} alt="" className='me-2 profile-pic' />
                                                </div>
                                                <img src={dropdownArrow} alt="" className='dropdown-arrow ' />
                                            </div>
                                        </div>
                                    </button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={profileUpdate}>My Profile </MenuItem>
                                        <MenuItem onClick={handleOpenLogOut}>Logout</MenuItem>
                                    </Menu>
                                </ul>
                            </div>
                        </div>

                        <p className='border-bottom p-2'></p>
                    </div>
                </nav>
            </div>

            <dialog
                open={openLogOut}
                onClose={handleCloseLogOut}
                className="z-index-99 border-0"
            >
                <div className='container'>
                    <div className="modal-size">
                        <Box sx={style}>
                            <div className='inside-modal'>
                                <Typography id="modal-modal-title" className="modal-modal-title mt-30" ><h1>Are You Sure ?</h1> </Typography>
                                <Typography className="modal-modal-description mt-17">
                                    <p>
                                        You Want to Logout !
                                    </p>
                                </Typography>
                                <div className='text-center mt-40'>
                                    <button className="pop-up-submit-btn mx-2" onClick={LogOut}>Yes</button>
                                    <button className="pop-up-submit-btn mx-2" onClick={handleCloseLogOut}>No</button>
                                </div>

                            </div>
                        </Box>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default NewHeader