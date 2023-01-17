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

const WorkScheduleModel = () => {

    const [workingScheduleList, setWorkingScheduleList] = useState([]);
    const [singleWorkingSchedule, setSingleWorkingSchedule] = useState();
    const [workingSchedule, setWorkingSchedule] = useState("");


    useEffect(() => {
        getWorkSchedule();
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
        showSingleWorkSchedule(id);
        handleOpen();
    }

    const handleEdit = (singleWorkingSchedule) => {
        editWorkSchedule(singleWorkingSchedule);
    }

    const handleDelete = (id) => {
        deleteWorkSchedule(id)
    }

    const getWorkSchedule = async () => {
        await axiosInstanceAuth
            .get("/v1/emp/emp_working_schedules/index")
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    setWorkingScheduleList(myData)
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const AddWorkSchedule = async () => {
        const response = Encrypt(
            JSON.stringify({
                schedule: workingSchedule,
            })
        );

        const formData = new FormData()
        formData.append("response", response)

        await axiosInstanceAuth
            .post("/v1/emp/emp_working_schedules/store",
                formData,
            )
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    getWorkSchedule();
                    toast.success(msg)
                    setWorkingSchedule("");
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })

    }

    const showSingleWorkSchedule = async (id) => {

        await axiosInstanceAuth
            .get(`/v1/emp/emp_working_schedules/show/${id}`)
            .then((res) => {
                const singleWorkSchedule = JSON.parse(Decrypt(res?.data?.data));
                setSingleWorkingSchedule(singleWorkSchedule);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editWorkSchedule = async (singleWorkingSchedule) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                id: singleWorkingSchedule?.id,
                schedule: singleWorkingSchedule?.schedule,
            })
        );
        await axiosInstanceAuth
            .post(`/v1/emp/emp_working_schedules/update`, {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                setWorkingSchedule("");

                if (res?.data?.success) {
                    getWorkSchedule();
                    toast.success(msg);
                } else {
                    toast.error(msg);
                }
                handleClose();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteWorkSchedule = async (id) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                id: id,
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/emp_working_schedules/delete", {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    getWorkSchedule();
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
                <div className="options-title">Working Schedule</div>
                <p className="mt-20 footer-border"></p>
                <div className="col-lg-12 d-flex justify-content-between align-items-center mt-20">
                    <FormControl variant="standard">
                        <TextField
                            type="text"
                            name="schedule"
                            value={workingSchedule || ""}
                            onChange={(e) => {
                                setWorkingSchedule(e.target.value);
                            }}
                            onKeyPress={(event) => {
                                var key = event.keyCode || event.which;
                                if (key === 13) {
                                    AddWorkSchedule()
                                }
                            }}
                        />
                    </FormControl>
                    <Button variant="solid" className='add-btn mx-3' onClick={AddWorkSchedule}>Add</Button>
                </div>

                <div className="mt-4">
                    {workingScheduleList.map((d, i) => {
                        return (
                            <div className="col-lg-12 d-flex justify-content-between align-items-baseline m-2">
                                <div key={i} >
                                    {d?.schedule}
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

            <div className="z-index-99 border-0">
                <dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='border-0'
                >
                    <div className='container'>
                        <div className="modal-size">
                            <Box sx={style}>
                                <div className='text-end' >
                                    <button className='bg-transparent border-0 text-right' onClick={handleClose}> <img src={closeIcon} alt="" /> </button>
                                </div>
                                <div className='inside-modal'>
                                    <Typography id="modal-modal-title" className="modal-modal-title mt-30" ><h1>Edit Working Schedule</h1> </Typography>
                                    <div className="my-5 py-2">
                                        <FormControl>
                                            <TextField
                                                type="text"
                                                label="Work Schedule"
                                                variant="outlined"
                                                fullWidth={true}
                                                name="schedule"
                                                value={singleWorkingSchedule?.schedule || ""}
                                                onChange={(e) => {
                                                    setSingleWorkingSchedule({
                                                        ...singleWorkingSchedule,
                                                        [e.target.name]: e.target.value,
                                                    });
                                                }}
                                                onKeyPress={(event) => {
                                                    var key = event.keyCode || event.which;
                                                    if (key === 13) {
                                                        handleEdit(singleWorkingSchedule)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className='text-center mt-40'>
                                        <Button onClick={(e) => handleEdit(singleWorkingSchedule)} variant="solid" className='cancel-btn mx-3'>
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

export default WorkScheduleModel