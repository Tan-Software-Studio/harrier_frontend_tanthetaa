import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NewHeader from "../Common/NewHeader/NewHeader";
// ====== Css =====
import styles from "./CandidateDetails.module.scss";
import backButton from "../../img/common/back.png";
import closeIcon from "../../img/common/cancel-icon.png";
import doneIcon from "../../img/Update-Employer/Vector.png";
import CloseIcon from "@mui/icons-material/Close";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";
import axiosInstanceAuth from "../../apiServices/axiosInstanceAuth";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import { toast } from "react-toastify";
import Copyright from "../Common/Copyright/Copyright";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";

const CandidateDetails = () => {
  const { uuid } = useParams();

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  const [candidate, setCandidate] = useState({});

  const [UUIDSelected, setUUIDSelected] = useState({});
  const [jobTitleSelected, setJobTitleSelected] = useState();
  const [jobNames, setJobNames] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openThankYouPopUp, setOpenThankYouPopUp] = useState(false);

  const [EmployerTypesOptions, setEmployerTypesOptions] = useState([]);
  const [CountryOptions, setCountryOptions] = useState([]);
  const [RegionOptions, setRegionOptions] = useState([]);
  const [WorkingArrangementsOptions, setWorkingArrangementsOptions] = useState(
    []
  );
  const [CustomerTypeOptions, setCustomerTypeOptions] = useState([]);
  const [LegalTechToolsOptions, setLegalTechToolsOptions] = useState([]);
  const [TechToolsOptions, setTechToolsOptions] = useState([]);
  const [QualificationsOptions, setQualificationsOptions] = useState([]);
  const [LanguagesOptions, setLanguagesOptions] = useState([]);
  const [jobStatusOptions, setJobStatusOptions] = useState([]);
  const [interviewBtn, setInterviewBtn] = useState(false);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getSingleCandidatedetails();
    getOptionsList();
  }, []);


  const getSingleCandidatedetails = async () => {
    const encryptedData = Encrypt(
      JSON.stringify({
        uuid: uuid,
      })
    );
    await axiosInstanceAuth
      .post("/v1/emp/single/candidates/list", {
        response: encryptedData,
      })
      .then((res) => {
        const data = Decrypt(res?.data?.data);
        const mydata = JSON.parse(data);
        // console.log("---> SINGLE VIEW", mydata);

        if (res?.data?.success) {
          setCandidate(mydata);

        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const getOptionsList = async () => {
    await axiosInstanceAuth
      .get("/v1/master_tables_list")
      .then((res) => {
        const data = Decrypt(res?.data?.data);
        const mydata = JSON.parse(data);

        if (res?.data?.success) {
          setEmployerTypesOptions(mydata?.mst_employer_types);
          setCountryOptions(mydata?.mst_employer_types);
          setRegionOptions(mydata?.mst_employer_types);
          setWorkingArrangementsOptions(mydata?.mst_employer_types);
          setCustomerTypeOptions(mydata?.mst_employer_types);
          setLegalTechToolsOptions(mydata?.mst_employer_types);
          setTechToolsOptions(mydata?.mst_employer_types);
          setQualificationsOptions(mydata?.mst_employer_types);
          setLanguagesOptions(mydata?.mst_employer_types);
          setJobStatusOptions(mydata?.mst_candidate_job_statuses);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const handleShortlist = (uuid) => {
    isShortlisted(uuid);
  };

  const isShortlisted = async (e) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        c_uuid: e,
      })
    );
    await axiosInstanceAuth
      .post("/v1/emp/shortlist/addremove/candidate", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          toast.success(msg);
          getSingleCandidatedetails();
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const handleOpenPopUp = (uuid) => {
    setUUIDSelected(uuid);
    getJobNames();
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleOpenThankYouPopUp = () => {
    setOpenThankYouPopUp(true);
  };

  const handleCloseThankYouPopUp = () => {
    setOpenThankYouPopUp(false);
    getSingleCandidatedetails();
  };

  const handleCreateJob = () => {
    navigate("/create-job");
  };

  const handleSubmit = () => {
    submitCvRequest();
  };

  const handleInterview = (uuid) => {
    setUUIDSelected(uuid);
    getInterview(uuid);
  };


  const getInterview = async (uuid) => {
    const encryptedData = Encrypt(JSON.stringify({
      id: uuid,
      empId: candidate?.is_cv_list_same_emp?.emp_uid
    }));
    await axiosInstanceAuth
      .post("/v1/emp/interview/request", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        const mydata = JSON.parse(Decrypt(res?.data?.data));

        if (res?.data?.success) {
          toast.success(msg)
          setInterviewBtn(true)
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });


  }

  const getJobNames = async () => {
    const encryptedData = Encrypt(JSON.stringify({}));
    await axiosInstanceAuth
      .post("/v1/emp/live/job/names", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        const mydata = JSON.parse(Decrypt(res?.data?.data));

        if (res?.data?.success) {
          setJobNames(mydata);
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };


  const submitCvRequest = async () => {
    const encryptedData = Encrypt(
      JSON.stringify({
        job_id: jobTitleSelected,
        c_uid: UUIDSelected,
      })
    );
    await axiosInstanceAuth
      .post("/v1/emp/cv/request/post", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        const mydata = JSON.parse(Decrypt(res?.data?.data));

        if (res?.data?.success) {
          setOpenPopUp(false);
          handleOpenThankYouPopUp();
        } else {
          toast.error(msg);
        }
        setOpenPopUp(false);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };





  return (
    <>
      <NewHeader isLoggedIn={isLoggedIn} />
      <div className={`${styles["candidate-details"]}`}>
        <div className="common-bg">
          <div className="container">
            <button
              className="bg-transparent border-0 back-button d-flex align-items-center"
              onClick={() => navigate("/candidates")}
            >
              <img src={backButton} alt="" /> <span> Back </span>{" "}
            </button>

            <div className="wrapper d-flex justify-content-end align-items-center">
              <table border='0'>
                <tr>
                  <th className="text-end"><div className="title">Shortlist</div></th>
                  <td className="px-2"> {/* ---- Shortlist ---- */}
                    <div className=" mx-2 left-side-buttons">
                      {
                        <div
                          align="right"
                          className="button-box"
                          onClick={(e) => handleShortlist(candidate?.uuid)}
                        >
                          {candidate?.emp_short_list === null ? (
                            <div className="active-status d-flex justify-content-center">
                              Add
                            </div>
                          ) : candidate?.emp_short_list ? (
                            <div className="closed-status d-flex justify-content-center">
                              Remove
                            </div>
                          ) : null}
                        </div>
                      }
                    </div></td>
                </tr>
                <tr>
                  <th className="text-end"><div className="title">Request CV</div></th>
                  <td className="px-2">{/* ---- Request CV ---- */}
                    <div className="left-side-buttons">
                      {candidate?.is_cv_list_same_emp?.is_cv === 1 || candidate?.is_cv_list_same_emp?.is_cv === 2 || candidate?.is_cv_list_same_emp?.is_cv === 3 ? (
                        <div align="right" className="mx-2 button-box">
                          {candidate?.is_cv_list_same_emp?.is_cv == 2 ? (
                            <div className="active-status">Accepted</div>
                          ) : candidate?.is_cv_list_same_emp?.is_cv == 1 ? (
                            <div className="requested-status">Requested</div>
                          ) : candidate?.is_cv_list_same_emp?.is_cv == 3 ? (
                            <div className="closed-status">Rejected</div>
                          ) : null}
                        </div>
                      ) : (
                        <div
                          align="right"
                          className="mx-2 button-box"
                          onClick={(e) => handleOpenPopUp(candidate?.uuid)}
                        >
                          <div className="request-status">Request</div>
                        </div>
                      )}
                    </div></td>
                </tr>
                {candidate?.is_cv_list_same_emp == null || candidate?.is_cv_list_same_emp?.is_cv == 1 ? <tr></tr> : <tr>
                  <th className="text-end"><div className="title">Request Interview </div></th>
                  <td className="px-2">
                    <div className="left-side-buttons">
                      <div align="right" className="button-box">
                        <div className="left-side-buttons">
                          {candidate?.is_cv_list_same_emp?.interview_request === 1 || candidate?.is_cv_list_same_emp?.interview_request === 2 || candidate?.is_cv_list_same_emp?.interview_request === 3 ? (
                            <div align="right" className="mx-2 button-box">
                              {candidate?.is_cv_list_same_emp?.interview_request == 2 ? (
                                <div className="active-status">Accepted</div>
                              ) : candidate?.is_cv_list_same_emp?.interview_request == 1 ? (
                                <div className="requested-status">Requested</div>
                              ) : candidate?.is_cv_list_same_emp?.interview_request == 3 ? (
                                <div className="closed-status">Rejected</div>
                              ) : null}
                            </div>
                          ) : (
                            <div
                              align="right"
                              className="button-box"
                            >
                              {interviewBtn ? <div className="requested-status">Requested</div> : <div className="request-status" onClick={() => handleInterview(candidate.uuid)}>Request</div>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>}
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4 my-3">
                <div className="candidate-bg">
                  <h3 className="question-title px-30">Core Questions</h3>
                  <p className="border-btm"></p>

                  {/* ====== Core Questions ====== */}
                  <div className="px-30 mt-30">
                    <div className="row align-items-center   ">
                      <div className="col-lg-4">
                        <p className="questions">Job Title</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">{candidate?.job_title}</p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Employer Type</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">{candidate?.employer_type}</p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Time in Current Role</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.time_in_current_role_diff}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Time in Industry</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.time_in_industry_diff}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Line Management</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">{candidate?.line_management}</p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Desired Employer Type</p>
                      </div>
                      <div className="col-lg-8">
                        <div className="answers">
                          <div className="answer-bg">
                            {candidate?.desired_employer_type?.length > 0
                              ? candidate?.desired_employer_type.map(
                                (d) => `${d}, `
                              )
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Country</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">{candidate?.current_country}</p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Region</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">{candidate?.current_region}</p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Desired Country</p>
                      </div>
                      <div className="col-lg-8">
                        <div className="answers">
                          <div className="answer-bg">
                            {candidate?.desired_country?.length > 0
                              ? candidate?.desired_country.map((d) => `${d}, `)
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Desired Region</p>
                      </div>
                      <div className="col-lg-8">
                        <div className="answers">
                          <div className="answer-bg">
                            {String(candidate?.desired_region)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Desired Salary</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.desired_salary_symbol}{" "}
                          {String(candidate?.desired_salary)}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Desired Bonus / Commission</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.desired_bonus_or_commission_symbol}{" "}
                          {candidate?.desired_bonus_or_commission}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Notice Period</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate.notice_period == 0 ||
                            candidate.notice_period == 1
                            ? `${candidate.notice_period} Week`
                            : candidate.notice_period == null
                              ? ""
                              : `${candidate.notice_period} Weeks`}
                        </p>
                      </div>
                    </div>

                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Status</p>
                      </div>
                      <div className="col-lg-8">
                        <div className="answers">
                          {candidate.status == 1 ? (
                            <div className="bg-Color-success">Active</div>
                          ) : candidate.status == 2 ? (
                            <div className="bg-Color-warning">Passive</div>
                          ) : candidate.status == 3 ? (
                            <div className="bg-Color-info">Very Passive</div>
                          ) : candidate.status == 4 ? (
                            <div className="bg-Color-error">Closed</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Freelance (Current)</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.freelance_current == 1 ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Freelance (Future)</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.freelance_future == 1 ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Freelance rate (daily rate)</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.freelance_daily_rate_symbol}{" "}
                          {candidate?.freelance_daily_rate}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">Working Arrangements</p>
                      </div>
                      <div className="col-lg-8">
                        <p className="answers">
                          {candidate?.working_arrangements}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                      <div className="col-lg-4">
                        <p className="questions">
                          Desired Working Arrangements
                        </p>
                      </div>
                      <div className="col-lg-8">
                        <div className="answers">
                          <div className="answer-bg">
                            {candidate?.desired_working_arrangements?.length > 0
                              ? candidate?.desired_working_arrangements.map(
                                (d) => `${d}, `
                              )
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 my-3">
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
                          <p className="questions">Law Degree</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">
                            {candidate?.law_degree == 1 ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Jurisdiction</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">{candidate?.jurisdiction}</p>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Area of Law</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">{candidate?.area_of_law}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Qualified Lawyer</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">
                            {candidate?.qualified_lawyer == 1 ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">PQE</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">{candidate?.pqe_diff}</p>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Legal Experience</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">
                            {candidate?.legal_experience == 1 ? "Yes" : "No"}
                          </p>
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
                          <p className="questions">
                            LegalTech vendor / consultancy
                          </p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">
                            {candidate?.legaltech_vendor_or_consultancy == 1
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Deal Size</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">
                            {candidate?.deal_size_symbol} {candidate?.deal_size}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Sales quota</p>
                        </div>
                        <div className="col-lg-7">
                          <p className="answers">
                            {candidate?.sales_quota_symbol}{" "}
                            {candidate?.sales_quota}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Customer Type</p>
                        </div>
                        <div className="col-lg-7">
                          <div className="answers">
                            <div className="answer-bg">
                              {candidate?.customer_type?.length > 0
                                ? candidate?.customer_type.map((d) => `${d}, `)
                                : null}
                            </div>
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
                          <p className="questions">Legal Tech Tools</p>
                        </div>
                        <div className="col-lg-7">
                          <div className="answers">
                            <div className="answer-bg">
                              {candidate?.legal_tech_tools?.length > 0
                                ? candidate?.legal_tech_tools.map(
                                  (d) => `${d}, `
                                )
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Qualifications</p>
                        </div>
                        <div className="col-lg-7">
                          <div className="answers">
                            <div className="answer-bg">
                              {candidate?.qualification?.length > 0
                                ? candidate?.qualification.map((d) => `${d}, `)
                                : null}
                            </div>
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
                          <p className="questions">Tech Tools</p>
                        </div>
                        <div className="col-lg-7">
                          <div className="answers">
                            <div className="answer-bg">
                              {candidate?.tech_tools?.length > 0
                                ? candidate?.tech_tools.map((d) => `${d}, `)
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-30 ">
                        <div className="col-lg-5">
                          <p className="questions">Languages</p>
                        </div>
                        <div className="col-lg-7">
                          <div className="answers">
                            <div className="answer-bg">
                              {candidate?.languages?.length > 0
                                ? candidate?.languages.map((d) => `${d}, `)
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row px-30">
                      <div className="col-lg-12 d-flex">
                        <div className="row mt-30">
                          <div className="col-lg-2">
                            <p className="questions">Profile</p>
                          </div>
                          <div className="col-lg-10">
                            <p className="answers pb-3">
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

        <div className="fixed-footer">
          <Copyright />
        </div>
      </div>

      {/* ===== Select Job Pop Up ====== */}

      <div div>
        <Dialog open={openPopUp} onClose={handleClosePopUp}>
          <div className="job-update-container">
            <DialogContent>
              <DialogContentText>
                <div className="job-update-wrapper">
                  <div
                    className="d-flex justify-content-end"
                    onClick={handleClosePopUp}
                  >
                    <CloseIcon />
                  </div>
                  <div className="main-title">Select Live Job</div>
                  <div className="sub-title">
                    Select Live Job for which you want to approach the candidate
                  </div>
                  <div
                    component="form"
                    role="form"
                    className="form-content new-mh-height"
                  >
                    {jobNames.length > 0 &&
                      jobNames.map((d, i) => {
                        return (
                          <div className="radioBtn detail-content" key={i}>
                            <label class="form-check-label" for="radio1">
                              {d?.job_title}
                            </label>
                            <input
                              type="radio"
                              class="form-check-input"
                              name="optradio"
                              value={d?.id}
                              onChange={(e) => {
                                setJobTitleSelected(e.target.value);
                              }}
                            />
                          </div>
                        );
                      })}
                    <button type="submit" class="btn btn-primary mt-3">
                      Submit
                    </button>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button className="pop-up-create-btn" onClick={handleCreateJob}>
                Create job
              </button>
              <button className="pop-up-submit-btn" onClick={handleSubmit}>
                Select Job
              </button>
            </DialogActions>
          </div>
        </Dialog>
      </div>

      {/* ===== Thank You Pop Up ====== */}

      <div>
        <dialog
          open={openThankYouPopUp}
          onClose={handleCloseThankYouPopUp}
          className="z-index-99 border-0"
        >
          <div className="container">
            <div className="modal-size">
              <Box sx={style}>
                <div className="text-end">
                  <button
                    className="bg-transparent border-0 text-right"
                    onClick={handleCloseThankYouPopUp}
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </div>
                <div className="inside-modal">
                  <div className="text-center done-icon">
                    <img src={doneIcon} alt="" />
                  </div>
                  <Typography
                    id="modal-modal-title"
                    className="modal-modal-title mt-30"
                  >
                    <h1>Congratulations!</h1>
                  </Typography>
                  <Typography className="modal-modal-description mt-17">
                    <p>
                      You have successfully sent the Candidate a CV Request. You
                      will be notified when the Candidate decides to accept or
                      reject your CV Request.
                    </p>
                  </Typography>
                  <div className="text-center mt-40">
                    <Link to="/live-jobs">
                      <button className="pop-up-submit-btn">Done</button>
                    </Link>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default CandidateDetails;
