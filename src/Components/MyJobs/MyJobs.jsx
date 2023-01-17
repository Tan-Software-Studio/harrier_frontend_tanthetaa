import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewHeader from '../Common/NewHeader/NewHeader'

// ====== Img =====
import downloadIcon from ".././../img/create-job/download.png"
import editOption from ".././../img/create-job/edit-option.png"
import downArrow from ".././../img/common/arrow-down.png"

// ====== Import =====
import { FormControl, InputBase, Menu, MenuItem } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ===== css ====
import styles from "../MyJobs/MyJobs.module.scss"
import Copyright from '../Common/Copyright/Copyright'
import { Button } from 'bootstrap'
import axiosInstanceAuth from '../../apiServices/axiosInstanceAuth'
import Encrypt from '../../customHook/customHook/EncryptDecrypt/Encrypt'
import Decrypt from '../../customHook/customHook/EncryptDecrypt/Decrypt'
import { toast } from 'react-toastify'

const MyJobs = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/");
        }
    });

    const [collapse, setCollapse] = useState()
    const [jobId, setJobId] = useState()


    // ===== Collapse ====

    const Collapse = (i) => {
        if (collapse === i) {
            setCollapse()
        } else {
            setCollapse(i)
        }
    }


    // ===== Input =====

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

    useEffect(() => {
        document.title = "All Jobs"
        getJobDetails();
    }, [])

    const [jobDetails, setJobDetails] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (e, id) => {
        setJobId(id);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getJobDetails = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/all/jobs/details", {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const mydata = JSON.parse(Decrypt(res?.data?.data));

                if (res?.data?.success) {
                    setJobDetails(mydata);
                } else {
                    toast.error(msg);
                }

            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }

    const handelEditJob = (job_id) => {
        navigate(`/update-job/${job_id}`);
    }

    const handelStatus = (e) => {
        inActiveJob(e);
    }

    const inActiveJob = async (e) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                job_id: e,
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/jobs/active/inactive", {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success(msg);
                    getJobDetails();
                } else {
                    toast.error(msg);
                }
                handleClose();
            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }

    return (
        <>
            <NewHeader isLoggedIn={isLoggedIn} />

            <div className={`${styles['my-jobs']}`}>
                <div className="container">
                    <h3 className='heading mt-20'>
                        All Jobs
                    </h3>

                    <div className='my-job mh-auto'>
                        <div className="row ">
                            {jobDetails.map((collapsed, i) => (
                                <div className="col-lg-6" key={i}>

                                    <div className={`${collapse === i ? "full" : "small"} my-job-box position-relative`}>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h4 className="job-title">{collapsed.job_title}</h4>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                {collapsed.status == 1 ?
                                                    <div className="job-status-active">
                                                        Active Job
                                                    </div>
                                                    :
                                                    <div className="job-status-inactive">
                                                        Inactive Job
                                                    </div>
                                                }
                                                {/* <button className='border-0 bg-transparent'> <img src={downloadIcon} alt="" /> </button> */}
                                                <button
                                                    className='border-0 bg-transparent ms-3'
                                                    onClick={(e) => handleClick(e, collapsed?.id)}
                                                >
                                                    <img src={editOption} alt="" />
                                                </button>

                                            </div>
                                        </div>

                                        <div className='about-job'>
                                            <h5 className='job-sub-title mt-4'>
                                                Candidate Requirements:
                                            </h5>
                                            <div className='d-flex align-items-baseline mt-2'>
                                                <p className='job-description'>{collapsed?.candidate_requirements}</p>
                                            </div>

                                            <h5 className='job-sub-title mt-4'>
                                                Role Overview
                                            </h5>
                                            <p className='job-description mt-2'>{collapsed.role_overview}</p>

                                            <h5 className='job-sub-title mt-4'>
                                                Additional benefits:
                                            </h5>
                                            <p className='job-description mt-2'>{collapsed?.additional_benefits}</p>

                                            <h5 className='job-sub-title mt-4'>
                                                Work Schedule
                                            </h5>
                                            <p className='job-description mt-2'>{collapsed?.working_schedule.map((d) => (`${d?.emp_working_schedule?.schedule}, `))}</p>
                                        </div>
                                        <div className='d-sm-flex align-items-center justify-content-between from-where-work'>
                                            <div className='work-from d-inline-block'>
                                                {collapsed?.office_location.map((d) => (`${d?.emp_office_locations?.location}, `))}
                                            </div>
                                            <div>
                                                <div className='d-flex align-items-center justify-content-between mt-sm-0 mt-3 no-word-brk'>
                                                    <p className='px-2'>{collapsed.salary_range_start_symbol_list?.currency_code}</p>
                                                    {/* <FormControl variant="standard">
                                                        <BootstrapInput
                                                            id="currentBaseSalary"
                                                            // disabled
                                                            type='number'
                                                            value={collapsed.salary_range_start}
                                                        />
                                                    </FormControl> */}
                                                    <p className='h6 custom-box no-word-brk'>{collapsed.salary_range_start}</p>

                                                    <p className='job-description px-2 no-word-brk'>To</p>
                                                    {/* <FormControl variant="standard">
                                                        <BootstrapInput
                                                            id="currentBaseSalary"
                                                            // disabled
                                                            type='number'
                                                            value={collapsed.salary_range_end}
                                                        />
                                                    </FormControl> */}
                                                    <p className='h6 custom-box no-word-brk'>{collapsed.salary_range_end}</p>

                                                    <button className='border-0 bg-transparent ms-3'> <img src={downArrow} alt="" onClick={() => Collapse(i)} className="icon-rotate" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
            <div className='fixed-footer'>
                <Copyright mb_20="mb-20" />
            </div>

            {/* Job Post Side Menu */}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={(e) => handelEditJob(jobId)}>Edit Job</MenuItem>
                <MenuItem onClick={(e) => handelStatus(jobId)} >Archive Job</MenuItem>
            </Menu>
        </>
    )
}

export default MyJobs