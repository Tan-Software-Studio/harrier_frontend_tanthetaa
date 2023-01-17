import React, { useEffect, useState } from 'react'


// ====== Material ui =====
import { Button, FormControl, TextField, Typography } from '@mui/material'


// ====== Img ======

import editIcon from "../../img/Update-Employer/edit-icon.png";
import deleteIcon from "../../img/Update-Employer/delete-icon.png";
import closeIcon from ".././../img/common/cancel-icon.png"


// ===== For API =====

import Encrypt from '../../customHook/customHook/EncryptDecrypt/Encrypt';
import Decrypt from '../../customHook/customHook/EncryptDecrypt/Decrypt';
import axiosInstanceAuth from '../../apiServices/axiosInstanceAuth'
import { toast } from 'react-toastify'
import { Box } from '@mui/system';

const OfficeLocationModel = () => {

    const [offficeLocationList, setOffficeLocationList] = useState([]);
    const [singleOffficeLocation, setSingleOffficeLocation] = useState();
    const [offficeLocation, setOffficeLocation] = useState("");


    useEffect(() => {
        getOfficeLocations();
    }, [])


    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleView = (id) => {
        showSingleOfficeLocation(id);
        handleOpen();
    }

    const handleEdit = (singleOffficeLocation) => {
        editOfficeLocation(singleOffficeLocation);
    }

    const handleDelete = (id) => {
        deleteOfficeLocations(id)
    }

    const getOfficeLocations = async () => {
        await axiosInstanceAuth
            .get("/v1/emp/emp_office_locations/index")
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    setOffficeLocationList(myData)
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const AddOfficeLocation = async () => {
        const response = Encrypt(
            JSON.stringify({
                location: offficeLocation,
            })
        );

        const formData = new FormData()
        formData.append("response", response)

        await axiosInstanceAuth
            .post("/v1/emp/emp_office_locations/store",
                formData,
            )
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success(msg)
                    setOffficeLocation("");
                    getOfficeLocations();
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })

    }

    const showSingleOfficeLocation = async (id) => {

        await axiosInstanceAuth
            .get(`/v1/emp/emp_office_locations/show/${id}`)
            .then((res) => {
                const singleLocation = JSON.parse(Decrypt(res?.data?.data));
                setSingleOffficeLocation(singleLocation);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editOfficeLocation = async (singleOffficeLocation) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                id: singleOffficeLocation?.id,
                location: singleOffficeLocation?.location,

            })
        );
        await axiosInstanceAuth
            .post(`/v1/emp/emp_office_locations/update`, {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                setOffficeLocation("");

                if (res?.data?.success) {
                    toast.success(msg);
                    getOfficeLocations();
                } else {
                    toast.error(msg);
                }
                handleClose();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteOfficeLocations = async (id) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                id: id,
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/emp_office_locations/delete", {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    getOfficeLocations();
                    toast.success(msg)
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="options-container mt-5">
                <div className="options-title">Office Location</div>
                <p className="mt-20 footer-border"></p>
                <div className="col-lg-12 d-flex justify-content-between align-items-center mt-20">
                    <FormControl variant="standard">
                        <TextField
                            type="text"
                            name="location"
                            value={offficeLocation || ""}
                            onChange={(e) => {
                                setOffficeLocation(e.target.value);
                            }}
                            onKeyPress={(event) => {
                                var key = event.keyCode || event.which;
                                if (key === 13) {
                                    AddOfficeLocation()
                                }
                            }}
                        />
                    </FormControl>
                    <Button variant="solid" className='add-btn mx-3' onClick={AddOfficeLocation}>Add</Button>
                </div>

                <div className="mt-4">
                    {offficeLocationList.map((d, i) => {
                        return (
                            <div className="col-lg-12 d-flex justify-content-between align-items-baseline m-2">
                                <div key={i} >
                                    {d?.location}
                                </div>
                                <div className="d-flex justify-content-center align-items-baseline">
                                    <Button onClick={(e) => handleView(d?.id)} >
                                        <img src={editIcon} alt="edit-icon" />
                                    </Button>
                                    <Button onClick={(e) => handleDelete(d?.id)}>
                                        <img src={deleteIcon} alt="delete-icon" />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>


            {/* ======= Update Pop Up ======== */}

            <div className="z-index-99">
                <dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='border-0'
                >
                    <div>
                        <div className="modal-size">
                            <Box sx={style}>
                                <div className='text-end' >
                                    <button className='bg-transparent border-0 text-right' onClick={handleClose}> <img src={closeIcon} alt="" /> </button>
                                </div>
                                <div className='inside-modal'>
                                    <Typography id="modal-modal-title" className="modal-modal-title mt-30" ><h1>Edit Office Location</h1> </Typography>
                                    <div className="my-5 py-2">
                                        <FormControl>
                                            <TextField
                                                type="text"
                                                label="Office Location"
                                                variant="outlined"
                                                fullWidth={true}
                                                name="location"
                                                value={singleOffficeLocation?.location || ""}
                                                onChange={(e) => {
                                                    setSingleOffficeLocation({
                                                        ...singleOffficeLocation,
                                                        [e.target.name]: e.target.value,
                                                    });
                                                }}
                                                onKeyPress={(event) => {
                                                    var key = event.keyCode || event.which;
                                                    if (key === 13) {
                                                        handleEdit(singleOffficeLocation)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className='text-center mt-40'>
                                        <Button onClick={(e) => handleEdit(singleOffficeLocation)} variant="solid" className='cancel-btn mx-3'>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </div>
                </dialog>
            </div>
        </>

    )
}

export default OfficeLocationModel