import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewHeader from "../Common/NewHeader/NewHeader";

// ====== Img =====

// ====== Import =====
import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// ===== css ====
import styles from "../Shortlist/Shortlist.module.scss";
import Copyright from "../Common/Copyright/Copyright";
import axiosInstanceAuth from "../../apiServices/axiosInstanceAuth";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import { toast } from "react-toastify";

const Shortlist = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  const [candidatesListDetails, setCandidatesListDetails] = useState([]);
  const [oldCandidatesListDetails, setOldCandidatesListDetails] = useState([]);
  const [lastPage, setlastPage] = useState();

  useEffect(() => {
    document.title = "List of candidates";
    getCandidatesList(1);
  }, []);

  const getCandidatesList = async (page) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        // response: response,
      })
    );
    await axiosInstanceAuth
      .post(`v1/emp/candidates/short/list?page=${page}`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const candidatesList = myData?.data;

        if (res?.data?.success) {
          setCandidatesListDetails(candidatesList);
          setOldCandidatesListDetails(candidatesList);
          setlastPage(myData?.last_page);
        } else {
          // toast.error("error")
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const handlePageChange = (event, value) => {
    getCandidatesList(value);
  };

  const handleEdit = (uuid) => {
    // navigate(`/candidate-list/${uuid}`);
  };

  return (
    <>
      <NewHeader isLoggedIn={isLoggedIn} />

      <div className={`${styles["short-list"]}`}>
        <div className="container">
          <div className="main-tabs">
            <p className="disclaimer">
              Shortlisting is for candidates who are of interest, but you don't
              have a vacancy for them right now. When a candidate’s data is
              updated (for instance, if they go from being Very Passive to
              Active) this will prompt a notification so that you can approach
              this talent before your competitors.
            </p>

            <div className="d-flex align-items-center mt-20 justify-content-end">
              <div className="update-pagination ">
                <Stack spacing={3}>
                  <Pagination
                    count={lastPage}
                    onChange={handlePageChange}
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>

            <div className="tables mt-20 mh-auto">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Candidate #</TableCell>
                      <TableCell align="right">Job Title</TableCell>
                      {/* <TableCell align="right">Employer Type</TableCell> */}
                      <TableCell align="right">Years in Role</TableCell>
                      <TableCell align="right">Years in Industry</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Desired salary</TableCell>
                      <TableCell align="right">D. Bonus / commission</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {candidatesListDetails.map((d, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        className="pointer"
                        onClick={(e) => handleEdit(d.uuid)}
                      >
                        <TableCell component="th" scope="row">
                          #{d?.id}
                        </TableCell>
                        <TableCell align="right">{d.job_title}</TableCell>
                        {/* <TableCell align="right">{d.employer_type_list?.title}</TableCell> */}
                        <TableCell align="right">
                          {d.time_in_current_role_diff}
                        </TableCell>
                        <TableCell align="right">
                          {d.time_in_industry_diff}
                        </TableCell>

                        <TableCell align="right">
                          {d.status === 1 ? (
                            <div className="bg-Color-success d-flex justify-content-center">
                              Active
                            </div>
                          ) : d.status === 2 ? (
                            <div className="bg-Color-warning d-flex justify-content-center">
                              Passive
                            </div>
                          ) : d.status === 3 ? (
                            <div className="bg-Color-info d-flex justify-content-center">
                              Very Passive
                            </div>
                          ) : d.status === 4 ? (
                            <div className="bg-Color-error d-flex justify-content-center">
                              Closed
                            </div>
                          ) : null}
                        </TableCell>

                        <TableCell align="right">
                          {d?.desired_salary_symbol_list?.currency_code}{" "}
                          {d.desired_salary}
                        </TableCell>
                        <TableCell align="right">
                          {
                            d?.desired_bonus_or_commission_symbol_list
                              ?.currency_code
                          }{" "}
                          {d.desired_bonus_or_commission}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        <div className="fixed-footer">
          <Copyright mb_20="mb-20" />
        </div>
      </div>
    </>
  );
};

export default Shortlist;
