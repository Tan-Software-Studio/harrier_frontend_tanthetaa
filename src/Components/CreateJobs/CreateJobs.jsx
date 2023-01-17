import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewHeader from '../Common/NewHeader/NewHeader'

// ===== css ====
import styles from "../CreateJobs/CreateJobs.module.scss"

// ======== Img ======
import jobBg from "../../img/create-job/create-job-bg.png"

// ======== Import ======
import Button from '@mui/material/Button';
import { FormControl, InputLabel, InputBase, Autocomplete } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import uploadIcon from "../../../src/img/common/file-upload.png"
import closeIcon from ".././../img/common/cancel-icon.png"
import Copyright from '../Common/Copyright/Copyright';
import Select, { components } from "react-select";

import axiosInstanceAuth from '../../apiServices/axiosInstanceAuth';
import Encrypt from '../../customHook/customHook/EncryptDecrypt/Encrypt';
import Decrypt from '../../customHook/customHook/EncryptDecrypt/Decrypt';
import { toast } from 'react-toastify';


const CreateJobs = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/");
        }
    });

    // ===== Input =====

    const [jobInputDetails, setJobInputDetails] = useState({
        job_title: "",
        office_location: "",
        role_overview: "",
        candidate_requirements: "",
        working_schedule: "",
        additional_benefits: "",
        salary_range_start: "",
        salary_range_end: "",
    })

    const [currancyOptions, setCurrancyOptions] = useState([]);
    const [salaryRangeSymbol, setSalaryRangeSymbol] = useState({ id: "", currency_code: "" });

    const [officeLocationOptions, setOfficeLocationOptions] = useState([]);
    const [officeLocationSelected, setOfficeLocationSelected] = useState([]);
    const officeLocationSelectedID = officeLocationSelected && officeLocationSelected.map((d, i) => (d.id))

    const [workScheduleOptions, setWorkScheduleOptions] = useState([]);
    const [workScheduleSelected, setWorkScheduleSelected] = useState([]);
    const workScheduleSelectedID = workScheduleSelected && workScheduleSelected.map((d, i) => (d.id))

    const [uploadicon, setUploadIcon] = useState();
    const [preview, setPreview] = useState()

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

    const onChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;

        setJobInputDetails({
            ...jobInputDetails,
            [name]: value,
        });
    }

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

    // const handleLogoChange = (e) => {

    //     e.preventDefault()
    //     let file = e.target.files[0]
    //     setUploadIcon({ file })
    // }


    useEffect(() => {
        document.title = "Create job"
        getCurrenciesOptions();
        getOfficeLocationOptions();
        getWorkScheduleOptions();
    }, [])


    // const CustomInput = (props) => {
    //     const { maxLength } = props.selectProps;
    //     const inputProps = { ...props, maxLength };

    //     return <components.Input {...inputProps} />;
    // };

    // const options = [
    //     { label: "Option 1", value: 1 },
    //     { label: "Option 2", value: 2 },
    //     { label: "Option 3", value: 3 }
    // ];

    const createJobPost = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
                job_title: jobInputDetails?.job_title,
                // office_location: jobInputDetails?.office_location,
                office_location: officeLocationSelectedID,
                role_overview: jobInputDetails?.role_overview,
                candidate_requirements: jobInputDetails?.candidate_requirements,
                // working_schedule: jobInputDetails?.working_schedule,
                working_schedule: workScheduleSelectedID,
                additional_benefits: jobInputDetails?.additional_benefits,
                salary_range_start_symbol: salaryRangeSymbol?.id,
                salary_range_start: +jobInputDetails?.salary_range_start,
                salary_range_end_symbol: salaryRangeSymbol?.id,
                salary_range_end: +jobInputDetails?.salary_range_end,
            })
        );
        const formData = new FormData()
        formData.append("response", encryptedData)
        formData.append("attach_file", uploadicon == undefined ? '' : uploadicon)

        await axiosInstanceAuth
            .post("/v1/emp/job/post", formData)
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success(msg);
                    navigate("/my-jobs");
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getCurrenciesOptions = async (mydata) => {
        await axiosInstanceAuth
            .get("v1/list/mst_currencies")
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                // const Currencieslist = myData?.list;
                const Currencieslist = myData;

                if (res?.data?.success) {
                    setCurrancyOptions(Currencieslist);
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };

    const getOfficeLocationOptions = async () => {
        const response = Encrypt(
            JSON.stringify({
            })
        );

        const formData = new FormData()
        formData.append("response", response)

        await axiosInstanceAuth
            .get("/v1/emp/emp_office_locations/index",
                formData,
            )
            .then((res) => {
                const OfficeLocationList = JSON.parse(Decrypt(res?.data?.data));
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    setOfficeLocationOptions(OfficeLocationList);
                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })
    }

    const getWorkScheduleOptions = async () => {
        const response = Encrypt(
            JSON.stringify({
            })
        );

        const formData = new FormData()
        formData.append("response", response)

        await axiosInstanceAuth
            .get("/v1/emp/emp_working_schedules/index",
                formData,
            )
            .then((res) => {
                const WorkScheduleList = JSON.parse(Decrypt(res?.data?.data));
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    setWorkScheduleOptions(WorkScheduleList);
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

            <div className={`${styles['create-job']}`}>
                <div className="container">
                    <div className='row align-items-center'>
                        <div className='col-xxl-5 d-xxl-block d-none'>
                            <img src={jobBg} alt="" className='dropdown-arrow img-fluid' />
                        </div>
                        <div className='col-xxl-7 col-lg-12'>
                            <div className='form-bg px-60'>
                                <div className='bg-blue'>
                                    <h2 className="font-24 text-white text-center">Create job</h2>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="job-title">
                                                    Job title<span className="text-red"> * </span>
                                                </InputLabel>
                                                <TextField
                                                    id="job-title"
                                                    placeholder='Enter your Job title'
                                                    name="job_title"
                                                    onChange={onChange}
                                                    value={jobInputDetails.job_title || ""}
                                                    className="box-border"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="office-location">
                                                    Office Location<span className="text-red"> * </span>
                                                </InputLabel>
                                                {/* <TextField
                                                    id="office-location"
                                                    variant="standard"
                                                    placeholder='Enter Office location'
                                                    name="office_location"
                                                    onChange={onChange}
                                                    value={jobInputDetails.office_location || ""}
                                                    className="box-border"
                                                /> */}

                                                <Autocomplete
                                                    multiple={true}
                                                    options={officeLocationOptions}
                                                    getOptionLabel={
                                                        (option) => (option.location || "")
                                                    }
                                                    value={officeLocationSelected || []}
                                                    onChange={(e, value) => {
                                                        setOfficeLocationSelected(value);
                                                    }}
                                                    renderInput={
                                                        params => (
                                                            <TextField {...params} variant="outlined" />
                                                        )
                                                    }
                                                    className="box-border"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 ">
                                        <div className='w-100 mt-20 textArea'>
                                            <Box
                                                component="form"

                                                noValidate
                                                autoComplete="off"
                                            >
                                                <FormControl variant="standard">
                                                    <InputLabel shrink htmlFor="experience">
                                                        What are the duties required in this role?<span className="text-red"> * </span>
                                                    </InputLabel>

                                                </FormControl>

                                                <TextField
                                                    variant="standard"
                                                    focused
                                                    multiline
                                                    rows={1}
                                                    placeholder="Please describe the role "
                                                    name="role_overview"
                                                    onChange={onChange}
                                                    value={jobInputDetails.role_overview || ""}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-auto">
                                        <div className='w-100 mt-20 textArea'>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <FormControl variant="standard">
                                                    <InputLabel shrink htmlFor="Requirements">
                                                        Candidate Requirements<span className="text-red"> * </span>
                                                    </InputLabel>

                                                </FormControl>

                                                <TextField
                                                    variant="standard"
                                                    focused
                                                    multiline
                                                    rows={1}
                                                    placeholder=" Please describe your Candidate Requirements "
                                                    name="candidate_requirements"
                                                    onChange={onChange}
                                                    value={jobInputDetails.candidate_requirements || ""}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='w-100 mt-20'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="office-location">
                                                    Work Schedule<span className="text-red"> * </span>
                                                </InputLabel>
                                                {/* <TextField
                                                    id="office-location"
                                                    placeholder='Select work schedule'
                                                    name="working_schedule"
                                                    onChange={onChange}
                                                    value={jobInputDetails.working_schedule || ""}
                                                    className="box-border"
                                                /> */}
                                                <Autocomplete
                                                    multiple={true}
                                                    options={workScheduleOptions}
                                                    getOptionLabel={
                                                        (option) => (option.schedule || "")
                                                    }
                                                    value={workScheduleSelected || []}
                                                    onChange={(e, value) => {
                                                        setWorkScheduleSelected(value);
                                                    }}
                                                    renderInput={
                                                        params => (
                                                            <TextField {...params} variant="outlined" />
                                                        )
                                                    }
                                                    className="box-border"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='w-100 mt-20'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="office-location">
                                                    Base Salary Range<span className="text-red"> * </span>
                                                </InputLabel>

                                                <div className="row align-items-center">
                                                    <div className="mw-30">
                                                        <FormControl variant="standard">
                                                            <Autocomplete
                                                                className="currency-box-border"
                                                                options={currancyOptions}
                                                                getOptionLabel={
                                                                    (option) => (option.currency_code || "")
                                                                }
                                                                clearIcon
                                                                value={salaryRangeSymbol || {}}
                                                                onChange={(e, value) => {
                                                                    setSalaryRangeSymbol(value);
                                                                }}
                                                                renderInput={
                                                                    params => (
                                                                        <TextField {...params} variant="outlined" />
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                    </div>

                                                    <div className="mw-30">
                                                        <FormControl variant="standard">

                                                            {/* <Select
                                                                options={options}
                                                                components={{ Input: CustomInput }}
                                                                maxLength="4"
                                                            /> */}
                                                            <TextField
                                                                id="salary_range_start"
                                                                placeholder='Amount'
                                                                type="number"
                                                                name="salary_range_start"
                                                                onChange={onChange}
                                                                value={jobInputDetails.salary_range_start || ""}
                                                                className="box-border"
                                                            />
                                                        </FormControl>
                                                    </div>

                                                    <div className="mw-6 px-0 text-center">
                                                        To
                                                    </div>

                                                    <div className="mw-30">
                                                        <FormControl variant="standard">

                                                            {/* <Select
                                                                options={options}
                                                                components={{ Input: CustomInput }}
                                                                maxLength="4"
                                                            /> */}
                                                            <TextField
                                                                id="salary_range_end"
                                                                placeholder='Amount'
                                                                type="number"
                                                                name="salary_range_end"
                                                                onChange={onChange}
                                                                value={jobInputDetails.salary_range_end || ""}
                                                                className="box-border"
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mt-auto">
                                        <div className='w-100 mt-20'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="benefits">
                                                    Additional benefits:<span className="text-red"> * </span>
                                                </InputLabel>
                                                <TextField
                                                    id="benefits"
                                                    placeholder='Specify Additional benefits'
                                                    name="additional_benefits"
                                                    onChange={onChange}
                                                    value={jobInputDetails.additional_benefits || ""}
                                                    className="box-border"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className='w-100 mt-20'>
                                            <FormControl variant="standard" className=' position-relative'>
                                                <InputLabel shrink htmlFor="" className="">
                                                    Upload File (e.g. Job Specification, Employee benefits)<span className="text-red"> * </span>
                                                </InputLabel>
                                                <InputLabel shrink htmlFor="file_upload" className='file_upload'>
                                                    <div className='d-flex justify-content-center '>
                                                        <img src={uploadIcon} alt="" className='mt-21' />
                                                        <p className='content mt-21'>Drag & drop or <span> browse</span></p>
                                                    </div>
                                                </InputLabel>
                                                <BootstrapInput
                                                    type="file"
                                                    name="attach_file"
                                                    className="inputFile"
                                                    id="file_upload"
                                                    onChange={handleLogoChange}
                                                />
                                                <div className='d-flex justify-content-between'>
                                                    {uploadicon?.name}
                                                    {uploadicon?.name &&
                                                        <button
                                                            className='bg-transparent border-0 text-right'
                                                            onClick={() => setUploadIcon({})} >
                                                            <img src={closeIcon} alt="" />
                                                        </button>
                                                    }
                                                </div>

                                            </FormControl>
                                        </div>
                                    </div>

                                    <Box className="mt-30 text-center bg-transparent shadow-none">
                                        <Button variant="solid" className='common-btn' onClick={createJobPost}>Create job</Button>
                                    </Box>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Copyright mb_20="mb-20"/>
                </div>
            </div>
        </>
    )
}

export default CreateJobs