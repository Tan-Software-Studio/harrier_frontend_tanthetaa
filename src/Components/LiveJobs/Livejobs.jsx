import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewHeader from '../Common/NewHeader/NewHeader'

// ====== Img =====
import downloadIcon from ".././../img/create-job/download.png"
import editOption from ".././../img/create-job/edit-option.png"
import downArrow from ".././../img/common/arrow-down.png"

// ====== Import =====
import { FormControl, InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ===== css ====
import styles from "../LiveJobs/Livejobs.module.scss"
import Copyright from '../Common/Copyright/Copyright'
import axiosInstanceAuth from '../../apiServices/axiosInstanceAuth'
import Encrypt from '../../customHook/customHook/EncryptDecrypt/Encrypt'
import Decrypt from '../../customHook/customHook/EncryptDecrypt/Decrypt'
import { toast } from 'react-toastify'
import dayjs from 'dayjs';


const Livejobs = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/");
        }
    });

    const [collapse, setCollapse] = useState()

    const [candidatesInterestLiveJobsList, setCandidatesInterestLiveJobsList] = useState([]);

    const livejob = [{
        jobtitle: "UI/UX Designer",
        jobDescription: "We \’ve all overheard conversations, walking down hip streets of the world’s tech capitals, discussions about the great ‘UX’ of a product, or the poor ‘UI’ of a website. Is it a secret language you will never be privy to? Are these people just using slang to look cool?",
        jobFirstSubtitle: "Candidate Requirements:",
        firstCandidateRequirment: "Proven UI experience.",
        secondCandidateRequirment: "Demonstrable UI design skills with a strong portfolio.",
        thirdCandidateRequirment: "Solid experience in creating wireframes, storyboards, user flows, process flows and site maps.",
        fourthCandidateRequirment: "Proficiency in Photoshop, Illustrator, OmniGraffle, or other visual design and wire-framing tools.",
        jobSecondSubtitle: "Additional benefits:",
        additionalBenifitDescription: "Employee benefits packages often include basic insurance coverage like medical, dental and vision insurance, plus other helpful forms of coverage, like life insurance and retirement planning services. ",
        // bulletImg:""
    },
    {
        jobtitle: "UI/UX Designer",
        jobDescription: "We \’ve all overheard conversations, walking down hip streets of the world’s tech capitals, discussions about the great ‘UX’ of a product, or the poor ‘UI’ of a website. Is it a secret language you will never be privy to? Are these people just using slang to look cool?",
        jobFirstSubtitle: "Candidate Requirements:",
        firstCandidateRequirment: "Proven UI experience.",
        secondCandidateRequirment: "Demonstrable UI design skills with a strong portfolio.",
        thirdCandidateRequirment: "Solid experience in creating wireframes, storyboards, user flows, process flows and site maps.",
        fourthCandidateRequirment: "Proficiency in Photoshop, Illustrator, OmniGraffle, or other visual design and wire-framing tools.",
        jobSecondSubtitle: "Additional benefits:",
        additionalBenifitDescription: "Employee benefits packages often include basic insurance coverage like medical, dental and vision insurance, plus other helpful forms of coverage, like life insurance and retirement planning services. ",
        // bulletImg:""
    }
        ,

    {
        jobtitle: "UI/UX Designer",
        jobDescription: "We \’ve all overheard conversations, walking down hip streets of the world’s tech capitals, discussions about the great ‘UX’ of a product, or the poor ‘UI’ of a website. Is it a secret language you will never be privy to? Are these people just using slang to look cool?",
        jobFirstSubtitle: "Candidate Requirements:",
        firstCandidateRequirment: "Proven UI experience.",
        secondCandidateRequirment: "Demonstrable UI design skills with a strong portfolio.",
        thirdCandidateRequirment: "Solid experience in creating wireframes, storyboards, user flows, process flows and site maps.",
        fourthCandidateRequirment: "Proficiency in Photoshop, Illustrator, OmniGraffle, or other visual design and wire-framing tools.",
        jobSecondSubtitle: "Additional benefits:",
        additionalBenifitDescription: "Employee benefits packages often include basic insurance coverage like medical, dental and vision insurance, plus other helpful forms of coverage, like life insurance and retirement planning services. ",
        // bulletImg:""
    }]

    // ===== Collapse ====

    const Collapse = (i) => {
        if (collapse === i) {
            setCollapse()
        } else {
            setCollapse(i)
        }
    }

    const handleNavigate = (uuid) => {
        navigate(`/candidate-list/${uuid}`);
    };


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
        document.title = "Live jobs"
        getCVrequestList();
        getInterestLiveJObsList();
    }, [])


    const getCVrequestList = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/requested/cv/list", {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const mydata = JSON.parse(Decrypt(res?.data?.data));
                const CVrequestList = mydata?.list?.data;
                console.log("---> getCVrequestList", CVrequestList)

                if (res?.data?.success) {
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }

    const getInterestLiveJObsList = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
            })
        );
        await axiosInstanceAuth
            .post("/v1/emp/candidates/interested/live/jobs/list", {
                response: encryptedData,
            })
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const myData = JSON.parse(Decrypt(res?.data?.data));
                console.log("---> InterestLiveJObsList", myData)

                if (res?.data?.success) {
                    setCandidatesInterestLiveJobsList(myData);
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }



    return (
        <>
            <NewHeader isLoggedIn={isLoggedIn} />
            <div className={`${styles['live-jobs']}`}>
                <div className="container">
                    {/* <h3 className='heading mt-30'>
                        Live job
                    </h3> */}

                    <div className='live-job mh-auto'>
                        <div className="row d-flex justify-content-center">



                            {candidatesInterestLiveJobsList.length > 0 && candidatesInterestLiveJobsList.map((d, i) => (
                                <div className="col-lg-8 m-3" key={i}>

                                    <div className="m-2 main-title">
                                        {d?.job_id}. {d?.job_title} - {d?.salary_range_start_symbol} {d?.salary_range_start} - {d?.salary_range_end}
                                    </div>

                                    <div className="mx-4 d-flex flex-column">
                                        <div className='d-flex justify-content-start align-items-center my-1'>
                                            <div className='inner-heading'>
                                                Address
                                            </div>
                                            <div className='inner-details'>
                                                {d?.office_location.map((d) => (`${d}, `))}

                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-start align-items-center my-1'>
                                            <div className='inner-heading'>
                                                Work Schedule
                                            </div>
                                            <div className='inner-details'>
                                                {d?.working_schedule}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="m-3 border-1">
                                        <div className='d-flex justify-content-between table-bg-color px-4 py-2 border-top-radius'>
                                            <div className="sub-title">CV Requests : {d?.cv_requests_count}</div>
                                            <div className="sub-title" >Interview Requests : {d?.interview_requests_count}</div>
                                        </div>
                                        <div className="border-bottom-radius">
                                            <table class="table mb-0">
                                                <thead class="thead-dark">
                                                    <tr className="bg-light">
                                                        <th scope="col" className='inner-title px-4 same-width'>Candidate</th>
                                                        <th scope="col" className='inner-title px-4 same-width'>Date</th>
                                                        <th scope="col" className='inner-title px-4 same-width'>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {d?.job_candidate_list.length > 0 && d?.job_candidate_list.map((List, i) => (
                                                        <tr key={i} className="bg-light">
                                                            <td className='px-4 same-width cursor' onClick={(e) => handleNavigate(List?.c_uuid)}>
                                                                #{List?.c_id}
                                                            </td>
                                                            <td className='px-4 same-width'>
                                                                {List?.created_at}
                                                                {/* {dayjs(List?.created_at).format("DD-MM-YYYY")} */}
                                                            </td>
                                                            <td className='px-4 same-width'>
                                                                {List?.c_job_status == null ? "CV Requested" : List?.c_job_status}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {/* <td>{d?.job_candidate_list?.[0]?.candidate_list?.id}</td>
                                                    <td>{d?.job_candidate_list?.[0]?.created_at}</td>
                                                     <td>{d?.job_candidate_list?.[0]?.c_job_status}</td> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed-footer'>
                <Copyright mb_20="mb-20" />
            </div>
        </>
    )
}

export default Livejobs