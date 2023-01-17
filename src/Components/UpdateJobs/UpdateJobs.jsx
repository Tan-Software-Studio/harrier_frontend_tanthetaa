import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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


const UpdateJobs = () => {

    const { job_id } = useParams();

    let jobID = job_id;

    const [isjobUpdate, setIsJobUpdate] = useState(true);

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;


    // ===== Input =====
    const [jobPostDetails, setJobPostDetails] = useState()
    const [jobInputDetails, setJobInputDetails] = useState({})

    useEffect(() => {
        setJobInputDetails({
            job_id: jobPostDetails?.id,
            job_title: jobPostDetails?.job_title,
            office_location: jobPostDetails?.office_location,
            role_overview: jobPostDetails?.role_overview,
            candidate_requirements: jobPostDetails?.candidate_requirements,
            working_schedule: jobPostDetails?.working_schedule,
            additional_benefits: jobPostDetails?.additional_benefits,
            salary_range_start: jobPostDetails?.salary_range_start,
            salary_range_end: jobPostDetails?.salary_range_end,
        })
    }, [jobPostDetails]);


    const [currancyOptions, setCurrancyOptions] = useState([]);
    const [salaryRangeSymbol, setSalaryRangeSymbol] = useState([{ id: "", currency_code: "" }]);

    const [officeLocationOptions, setOfficeLocationOptions] = useState([]);
    const [officeLocationSelected, setOfficeLocationSelected] = useState([]);
    const officeLocationSelectedID = officeLocationSelected && officeLocationSelected.map((d, i) => (d.id))

    const [workScheduleOptions, setWorkScheduleOptions] = useState([]);
    const [workScheduleSelected, setWorkScheduleSelected] = useState([]);
    const workScheduleSelectedID = workScheduleSelected && workScheduleSelected.map((d, i) => (d.id))

    const [uploadicon, setUploadIcon] = useState({ name: "" });
    const [uploadLogo, setUploadLogo] = useState();

    const [preview, setPreview] = useState()

    const handleLogoChange = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setUploadIcon(file)
            setUploadLogo(file)
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


    useEffect(() => {
        document.title = "Create job"
        getJobPostDetails(job_id);
        getCurrenciesOptions();
    }, [])

    const getJobPostDetails = async (job_id) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                job_id: job_id,
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/single/job/show", {
                response: encryptedData,
            })
            .then((res) => {
                const mydata = JSON.parse(Decrypt(res?.data?.data));

                if (res?.data?.success) {
                    setJobPostDetails(mydata);
                    getOfficeLocationOptions(mydata);
                    getWorkScheduleOptions(mydata);
                    // getCuntryOptions(mydata);
                    getCurrenciesOptions(mydata);
                    setUploadIcon({
                        uploadicon,
                        name: mydata?.attach_file
                    })
                } else {
                }

            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }

    const UpdateJobPost = async () => {

        const encryptedData = Encrypt(
            JSON.stringify({
                job_id: jobInputDetails?.job_id,
                job_title: jobInputDetails?.job_title,
                // office_location: jobInputDetails?.office_location,
                office_location: officeLocationSelectedID,
                role_overview: jobInputDetails?.role_overview,
                candidate_requirements: jobInputDetails?.candidate_requirements,
                // working_schedule: jobInputDetails?.working_schedule,
                working_schedule: workScheduleSelectedID,
                additional_benefits: jobInputDetails?.additional_benefits,
                salary_range_start_symbol: salaryRangeSymbol?.[0]?.id,
                salary_range_start: +jobInputDetails?.salary_range_start,
                salary_range_end_symbol: salaryRangeSymbol?.[0]?.id,
                salary_range_end: +jobInputDetails?.salary_range_end,
            })
        );
        const formData = new FormData()
        formData.append("response", encryptedData)
        formData.append("attach_file", uploadLogo == undefined ? '' : uploadLogo)

        await axiosInstanceAuth
            .post("/v1/emp/job/post/update", formData)
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success("Updated Successfully");
                    navigate("/my-jobs");
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // const getCuntryOptions = async (mydata) => {
    //     await axiosInstanceAuth
    //         .post("/v1/countries/typelist")
    //         .then((res) => {
    //             const myData = JSON.parse(Decrypt(res?.data?.data));
    //             const CountriesList = myData?.list;
    //             if (res?.data?.success) {
    //                 // setCurrancyOptions(CountriesList);
    //                 let CurrancyRes = [mydata?.salary_range_start_symbol];
    //                 setSalaryRangeSymbol(CountriesList.filter((x) => CurrancyRes.includes(x?.id)));
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("err--->", err);
    //         });
    // };

    const getCurrenciesOptions = async (mydata) => {
        await axiosInstanceAuth
            .get("v1/list/mst_currencies")
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                // const Currencieslist = myData?.list;
                const Currencieslist = myData;

                if (res?.data?.success) {
                    setCurrancyOptions(Currencieslist);
                    let CurrancyRes = [mydata?.salary_range_start_symbol];
                    setSalaryRangeSymbol(Currencieslist.filter((x) => CurrancyRes.includes(x?.id)));
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };


    const getOfficeLocationOptions = async (mydata) => {
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

                    let officeLocationRes = mydata?.office_location;
                    let officeLocationByID = officeLocationRes.map(x => x.office_location_id)
                    setOfficeLocationSelected(OfficeLocationList.filter(x => officeLocationByID.includes(x.id)));

                } else {
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            })
    }

    const getWorkScheduleOptions = async (mydata) => {
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

                    let WorkScheduleLRes = mydata?.working_schedule;
                    let WorkScheduleByID = WorkScheduleLRes.map(x => x.working_schedule_id)
                    setWorkScheduleSelected(WorkScheduleList.filter(x => WorkScheduleByID.includes(x.id)));

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
            <NewHeader isjobUpdate={isjobUpdate} isLoggedIn={isLoggedIn} jobID={jobID} />

            <div className={`${styles['create-job']}`}>
                <div className="container">
                    <div className='row align-items-center'>
                        <div className='col-xxl-5 d-xxl-block d-none'>
                            <img src={jobBg} alt="" className='dropdown-arrow img-fluid' />
                        </div>
                        <div className='col-xxl-7 col-lg-12'>
                            <div className='form-bg px-60'>
                                <div className='bg-blue'>
                                    <h2 className="font-24 text-white text-center">Update job</h2>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="job-title">
                                                    Job title <span className="text-red"> <sup> * </sup></span>
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
                                                    Office Location <span className="text-red"> <sup> * </sup></span>
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
                                        <div className='w-100 mt-30 textArea'>
                                            <Box
                                                component="form"

                                                noValidate
                                                autoComplete="off"
                                            >
                                                <FormControl variant="standard">
                                                    <InputLabel shrink htmlFor="experience">
                                                        What LegalTech tools do you have experience in? <span className="text-red"> <sup> * </sup></span>
                                                    </InputLabel>

                                                </FormControl>

                                                <TextField
                                                    variant="standard"
                                                    focused
                                                    multiline
                                                    rows={1}
                                                    placeholder="Describe about role"
                                                    name="role_overview"
                                                    onChange={onChange}
                                                    value={jobInputDetails.role_overview || ""}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-auto">
                                        <div className='w-100 mt-30 textArea'>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <FormControl variant="standard">
                                                    <InputLabel shrink htmlFor="Requirements">
                                                        Candidate Requirements <span className="text-red"> <sup> * </sup></span>
                                                    </InputLabel>

                                                </FormControl>

                                                <TextField
                                                    variant="standard"
                                                    focused
                                                    multiline
                                                    rows={1}
                                                    placeholder="Describe Candidate requirement"
                                                    name="candidate_requirements"
                                                    onChange={onChange}
                                                    value={jobInputDetails.candidate_requirements || ""}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="office-location">
                                                    Work Schedule  <span className="text-red"> <sup> * </sup></span>
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
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="office-location">
                                                    Base Salary Range <span className="text-red"> <sup> * </sup></span>
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
                                                                value={salaryRangeSymbol?.[0] || {}}
                                                                onChange={(e, value) => {
                                                                    setSalaryRangeSymbol([value]);
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
                                                                placeholder='Enter Amount'
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
                                                                placeholder='Enter Amount'
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

                                    <div className="col-lg-6">
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard">
                                                <InputLabel shrink htmlFor="benefits">
                                                    Additional benefits:
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
                                        <div className='w-100 mt-30'>
                                            <FormControl variant="standard" className=' position-relative'>
                                                <InputLabel shrink htmlFor="">
                                                    Upload File (e.g. Job Specification, Employee benefits) <span className="text-red"> <sup> * </sup> </span>
                                                </InputLabel>
                                                <InputLabel shrink htmlFor="file_upload" className='file_upload d-flex justify-content-center'>
                                                    <img src={uploadIcon} alt="" /> <p className='content'>Drag & drop or <span> browse</span></p>
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

                                    <Box className="mt-50 text-center bg-transparent shadow-none">
                                        <Button variant="solid" className='common-btn' onClick={UpdateJobPost}>Update job</Button>
                                    </Box>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Copyright />
                </div>
            </div>
        </>
    )
}

export default UpdateJobs