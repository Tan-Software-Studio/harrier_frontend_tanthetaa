import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// ====== Css =====
import styles from "./SingleCandidate.module.scss";
import GuestHeader from '../../Common/GuestHeader/GuestHeader';
import backButton from '../../../img/common/back.png';
import Encrypt from '../../../customHook/customHook/EncryptDecrypt/Encrypt';
import axiosInstanceAuth from '../../../apiServices/axiosInstanceAuth';
import Decrypt from '../../../customHook/customHook/EncryptDecrypt/Decrypt';
import { toast } from 'react-toastify';
import Copyright from '../../Common/Copyright/Copyright';

const SingleCandidate = () => {

    const { uuid } = useParams();

    const navigate = useNavigate()
    const isLoggedGuestIn = localStorage.getItem("token") !== null;

    useEffect(() => {
        if (!isLoggedGuestIn) {
            navigate("/");
        }
    });

    const [candidate, setCandidate] = useState({});

    useEffect(() => {
        getSingleCandidatedetails()
    }, [])


    const getSingleCandidatedetails = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
                uuid: uuid,
            })
        );
        await axiosInstanceAuth
            .post("/v1/guest/single/candidates/list", {
                response: encryptedData,
            })
            .then((res) => {
                const data = Decrypt(res?.data?.data);
                const mydata = JSON.parse(data);

                if (res?.data?.success) {
                    setCandidate(mydata);
                } else {
                    toast.error("error")
                }
            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }


    return (
        <>
            <GuestHeader isLoggedGuestIn={isLoggedGuestIn} />

            <div className={`${styles['candidate-details']}`}>
                <div className='common-bg'>
                    <div className="container pb-5">
                        <button className='bg-transparent border-0 back-button d-flex align-items-center' onClick={() => navigate("/guest-dashboard")}> <img src={backButton} alt="" /> <span> Back </span> </button>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="candidate-bg">
                                    <h3 className="question-title px-30">Core Questions</h3>
                                    <p className="border-btm"></p>

                                    {/* ====== Core Questions ====== */}
                                    <div className='px-30 mt-30'>
                                        <div className="row align-items-center   ">
                                            <div className="col-lg-4">
                                                <p className='questions'>Job Title</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.job_title}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Employer Type</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.employer_type}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Time in Current Role</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.time_in_current_role_diff}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Time in Industry</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.time_in_industry_diff}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Line Management</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.line_management}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Desired Employer Type</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='answers'>
                                                    <div className="answer-bg"> {String(candidate?.desired_employer_type)} </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Country</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.current_country}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Region</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.current_region}</p>
                                            </div>
                                        </div>
                                        {/* <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Desired Country</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='answers'>
                                                    <div className="answer-bg">{candidate?.desired_country}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Desired Region</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='answers'>
                                                    <div className="answer-bg">{candidate?.desired_region}</div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Current Salary</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.current_salary_symbol} {candidate?.current_salary}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Current Bonus / Commission</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.current_bonus_or_commission_symbol} {candidate?.current_bonus_or_commission}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Desired Salary</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.desired_salary_symbol} {candidate?.desired_salary}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Desired Bonus / Commission</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.desired_bonus_or_commission_symbol} {candidate?.desired_bonus_or_commission}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Notice Period</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='answers'>
                                                    <div className="answer-bg-active">
                                                        {(candidate.notice_period == 0) || (candidate.notice_period == 1) ? `${candidate.notice_period} Week` : candidate.notice_period == null ? "" : `${candidate.notice_period} Weeks`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Freelance (Current)</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.freelance_current == 1 ? "Yes" : "No"}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Freelance (Future)</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.freelance_future == 1 ? "Yes" : "No"}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Freelance rate (daily rate)</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.freelance_daily_rate}</p>
                                            </div>
                                        </div> */}
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Working Arrangements</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <p className='answers'>{candidate?.working_arrangements}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-30 align-items-center">
                                            <div className="col-lg-4">
                                                <p className='questions'>Desired Working Arrangements</p>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='answers'>
                                                    <div className="answer-bg">{String(candidate?.desired_working_arrangements)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8">
                                <div className="candidate-bg">
                                    <h3 className="question-title px-30">Role Specific</h3>
                                    <p className="border-btm"></p>

                                    {/* ===== Legal ==== */}
                                    <div className="bg-sky mt-30">
                                        <h3 className="font-20 px-30">Legal</h3>
                                    </div>

                                    <div className="row px-30 justify-content-between">
                                        <div className="col-lg-5">
                                            <div className="row mt-30 align-items-center">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Law Degree</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.law_degree == 1 ? "Yes" : "No"}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Jurisdiction</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.jurisdiction}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Area of Law</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.area_of_law}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Qualified Lawyer</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.qualified_lawyer == 1 ? "Yes" : "No"}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>PQE</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.pqe_diff}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Legal Experience</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.legal_experience == 1 ? "Yes" : "No"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ====== Commercial ===== */}

                                    <div className="bg-sky mt-30">
                                        <h3 className="font-20 px-30">Commercial</h3>
                                    </div>

                                    <div className="row px-30 justify-content-between">
                                        <div className="col-lg-5">
                                            <div className="row mt-30 align-items-center">
                                                <div className="col-lg-5">
                                                    <p className='questions'>LegalTech vendor / consultancy</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>{candidate?.legaltech_vendor_or_consultancy == 1 ? "Yes" : "No"}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Deal Size</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>
                                                        {candidate?.deal_size_symbol} {candidate?.deal_size}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Sales quota</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>
                                                        {candidate?.sales_quota_symbol} {candidate?.sales_quota}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Customer Type</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className='answers'>
                                                        <div className="answer-bg">{String(candidate?.customer_type)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    {/* ====== Tech/Other Qualifications ===== */}

                                    <div className="bg-sky mt-30">
                                        <h3 className="font-20 px-30">Tech/Other Qualifications</h3>
                                    </div>

                                    <div className="row px-30 justify-content-between">
                                        <div className="col-lg-5">
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Legal Tech Tools</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className='answers'>
                                                        <div className="answer-bg">{String(candidate?.legal_tech_tools)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Qualifications</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className='answers'>
                                                        <div className="answer-bg"> {String(candidate?.qualification)} </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Profile</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p className='answers'>
                                                        {candidate?.profile_about}
                                                    </p>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Tech Tools</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className='answers'>
                                                        <div className="answer-bg"> {String(candidate?.tech_tools)} </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-30 ">
                                                <div className="col-lg-5">
                                                    <p className='questions'>Languages</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className='answers'>
                                                        <div className="answer-bg">
                                                            {String(candidate?.languages)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row px-30">
                                            <div className="col-lg-12 d-flex">
                                                <div className="row mt-30">
                                                    <div className="col-lg-2">
                                                        <p className='questions'>Profile</p>
                                                    </div>
                                                    <div className="col-lg-10">
                                                        <p className='answers'>
                                                            {candidate?.profile_about}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='fixed-footer'>
                    <Copyright />
                </div>

            </div>
        </>
    )
}

export default SingleCandidate