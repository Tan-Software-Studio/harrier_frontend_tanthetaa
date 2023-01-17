import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Headerlogo from "../../../img/Header/Header-logo.svg"
import styles from "../NewHeader/NewHeader.module.scss"

// ======= Import ======
import logOutIcon from "../../../img/common/logout.png"
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Decrypt from '../../../customHook/customHook/EncryptDecrypt/Decrypt';
import axiosInstanceAuth from '../../../apiServices/axiosInstanceAuth';
import { toast } from 'react-toastify';
import { Box, TextField, Typography } from '@mui/material';

const GuestHeader = ({ isLoggedGuestIn }) => {

    const navigate = useNavigate();

    const [openLogOut, setOpenLogOut] = useState(false);


    const handleOpenLogOut = () => {
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
            })
            .catch((err) => {
                console.log("err --->", err);
            })
    }


    return (

        <>
            <div className={`${styles['new-header']}`}>
                <nav className="navbar  navbar-expand ">
                    <div className="container">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center'>
                                {isLoggedGuestIn === true ?
                                    <Link to="/guest-dashboard"> <img src={Headerlogo} alt="" /></Link>
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

                            <div id="navbarCollapse" className="collapse navbar-collapse justify-content-end ">
                                <button onClick={handleOpenLogOut} className="log-out-btn" >
                                    <img src={logOutIcon} alt="" className='px-2 py-1' />
                                    Logout
                                </button>
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

export default GuestHeader