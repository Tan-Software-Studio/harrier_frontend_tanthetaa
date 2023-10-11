import React, { useEffect, useState } from "react";
import styles from "./Listofcandidates.module.scss";

// ====== Img ======
import plusIcon from "../../img/common/plus-icon.png";
import clearUp from "../../img/common/clearUp.png";
import Trash from "../../img/common/trash.png";
import removeInput from ".././../img/create-job/remove-input.png";
import thankIcon from ".././../img/common/thank-you-icon.png";
import closeIcon from ".././../img/common/cancel-icon.png";
import doneIcon from ".././../img/Update-Employer/Vector.png";
import searchIcon from "../../img/common/search001.png";
import addInput from "../../img/create-job/add-input.png";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// ====== Import ======

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import NativeSelect from "@mui/material/NativeSelect";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import TableContainer from "@mui/material/TableContainer";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";

// ==== Pagination ====

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import NewHeader from "../Common/NewHeader/NewHeader";
import Copyright from "../Common/Copyright/Copyright";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstanceAuth from "../../apiServices/axiosInstanceAuth";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import { toast } from "react-toastify";
import { Modal } from "bootstrap";
import CurrencyFormat from "react-currency-format";

const Listofcandidates = () => {
  let isEmp = useLocation().pathname;

  // useEffect(() => {
  //     window.addEventListener('popstate', (e) => {
  //         window.history.go(1);
  //     });
  // }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go("/candidates");
      // window.history.go(1);
    };
  }, []);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  let getSelectValue = localStorage.getItem("Select");
  let selectValue =
    getSelectValue !== null ? getSelectValue.split(",").slice(0) : null;


  let getFilterValue = JSON.parse(localStorage.getItem("Filter"));
  // console.log("--------->>>> getFilterValue", getFilterValue);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (isEmp === "/candidates") {
      document.body.classList.add("bg-salmon");
    }
  });

  const filter = createFilterOptions();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const mainOptions = [
    { id: 1, title: "Overview" },
    { id: 2, title: "Legal" },
    { id: 3, title: "Tech" },
    { id: 4, title: "Commercial" },
  ];

  const filterType3Options = [
    { id: 1, value: "is", title: "IS" },
    { id: 2, value: "is_not", title: "IS NOT" },
    { id: 3, value: "contains", title: "CONTAINS" },
  ];

  const filterTypeRangeOptions = [
    { id: 1, value: "is_more_than", title: "IS MORE THAN" },
    { id: 2, value: "is_less_than", title: "IS LESS THAN" },
    { id: 3, value: "is_between", title: "IS BETWEEN" },
  ];

  const filterType2Options = [
    { id: 1, value: "is", title: "IS" },
    { id: 2, value: "is_not", title: "IS NOT" },
  ];

  const [selectedOption, setSelectedOption] = useState("Overview");

  const [personFilter, setPersonFilter] = useState(selectValue || []);
  const [personName, setPersonName] = useState([]);
  const [jobNames, setJobNames] = useState([]);
  const [currenciesOptions, setCurrenciesOptions] = useState([]);

  const [UUIDSelected, setUUIDSelected] = useState({});
  const [jobTitleSelected, setJobTitleSelected] = useState();

  const [candidatesListDetails, setCandidatesListDetails] = useState([]);
  const [oldCandidatesListDetails, setOldCandidatesListDetails] = useState([]);
  const [lastPage, setlastPage] = useState();
  const [allPage, setAllPage] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openThankYouPopUp, setOpenThankYouPopUp] = useState(false);

  const [QuickSearchOptions, setQuickSearchOptions] = useState([]);
  const [QuickSearch, setQuickSearch] = useState("");
  const [sendSearchResponse, setSendSearchResponse] = useState({
    first: "",
    second: "",
  });
  let SubOption = QuickSearchOptions.filter((x) =>
    QuickSearch.includes(x?.select)
  );

  const [checked, setChecked] = useState(false);
  const [selctedColumns, setSelctedColumns] = useState(selectValue || []);
  const [search, setSearch] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [testSelctedColumns, setTestSelctedColumns] = useState([]);

  let searchTimeout;

  // const [myFilterData, setMyFilterData] = useState([
  //     {
  //         is_show: "",
  //         first_option: "",
  //         filter_type: "is",
  //         second_option: "",
  //         third_option: "",
  //         currency: "",
  //         currency_code: "",
  //         sub_options: [],
  //     }
  // ])

  const [myFilterData, setMyFilterData] = useState(
    getFilterValue || [
      {
        is_show: "",
        first_option: "",
        filter_type: "is",
        second_option: "",
        third_option: "",
        currency: "",
        currency_code: "",
        sub_options: [],
      },
    ]
  );

  const [storage, setStorage] = useState({
    is_show: "",
    first_option: "",
    filter_type: "is",
    second_option: "",
    third_option: "",
    currency: "",
    currency_code: "",
    sub_options: [],
  });


  const ColumnOptions = [
    { id: 1, title: "Job Title" },
    { id: 2, title: "Employer Type" },

    { id: 3, title: "Time in Current Role" },
    { id: 4, title: "Time in Industry" },

    { id: 5, title: "Status" },
    { id: 6, title: "Desired Employer Type" },

    { id: 7, title: "Line Management" },
    { id: 8, title: "Notice Period" },

    { id: 9, title: "Current Country" },
    { id: 10, title: "Desired Country" },

    { id: 11, title: "Current Region" },
    { id: 12, title: "Desired Region" },

    // { id: 12, title: "Current Salary" },
    // { id: 13, title: "Current Bonus / Commission" },

    { id: 14, title: "Desired Salary" },
    { id: 15, title: "Desired Bonus / Commission" },

    { id: 16, title: "Current Freelancer" },
    { id: 17, title: "Open to Freelance" },
    { id: 18, title: "Day Rate" },

    { id: 19, title: "Current Working Arrangements" },
    { id: 20, title: "Desired Working Arrangements" },

    { id: 21, title: "Law Degree" },
    { id: 22, title: "Qualified Lawyer" },
    { id: 23, title: "Jurisdiction" },
    { id: 24, title: "Post-Qualified Experience" },
    { id: 25, title: "Legal Specialism" },
    { id: 26, title: "Area of Law" },

    { id: 27, title: "LegalTech Vendor/Consultancy" },
    { id: 28, title: "Customer Type" },
    { id: 29, title: "Deal Size" },
    { id: 30, title: "Sales quota" },

    { id: 31, title: "LegalTech Tools" },
    { id: 32, title: "Tech Tools" },
    { id: 33, title: "Qualifications" },
    { id: 34, title: "Languages" },

    // { id: 41, title: "Direct Reports" },
  ];


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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

  const CustomSelect = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 300,
      },
    },
  };

  // ===== Table ===

  const handleChangeFilter = (event) => {
    const {
      target: { value },
    } = event;


    localStorage.setItem(
      "Select",
      typeof value === "string" ? value.split(",") : value
    );


    setPersonFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    //  add array as a table show wise 
    const newOrderArray = [
      "Job Title",
      "Desired Region",
      "Employer Type",
      "Time in Current Role",
      "Time in Industry",
      "Status",
      "Desired Employer Type",
      "Line Management",
      "Notice Period",
      "Current Country",
      "Desired Country",
      "Current Region",
      "Desired Salary",
      "Desired Bonus / Commission",
      "Current Freelancer",
      "Open to Freelance",
      "Day Rate",
      "Current Working Arrangements",
      "Desired Working Arrangements",
      "Law Degree",
      "Qualified Lawyer",
      "Jurisdiction",
      "Post-Qualified Experience",
      "Legal Specialism",
      "Area of Law",
      "LegalTech Vendor/Consultancy",
      "Customer Type",
      "Deal Size",
      "Sales quota",
      "LegalTech Tools",
      "Tech Tools",
      "Qualifications",
      "Languages"
    ];

    const resultArray = [...value];

    resultArray.sort((a, b) => {
      const aIndex = newOrderArray.indexOf(a);
      const bIndex = newOrderArray.indexOf(b);

      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });

    setSelctedColumns(
      typeof resultArray === "string" ? resultArray.split(",") : resultArray
    );
  };

  const handelClearColumns = (event) => {
    // if (checked) {
    setPersonFilter([]);
    setSelctedColumns([]);
    localStorage.removeItem("Select");
    // }
  };

  const handelClearFilter = (event) => {

    localStorage.removeItem("Filter");
    setMyFilterData([
      {
        is_show: "",
        first_option: "",
        filter_type: "is",
        second_option: "",
        third_option: "",
        currency: "",
        currency_code: "",
        sub_options: [],
      },
    ]);
    getDropDownListTest([
      {
        is_show: "",
        first_option: "",
        filter_type: "is",
        second_option: "",
        third_option: "",
        currency: "",
        currency_code: "",
        sub_options: [],
      },
    ], 1)
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const candidateList = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const theme = useTheme();

  const handlePageChange = (event, value) => {
    // getCandidatesList(value);
    if (search == true) {
      searchDetail(searchKey, value)
    } else {
      getDropDownListTest(myFilterData, value);
    }
  };

  useEffect(() => {
    document.title = "List of candidates";
    getDropDownListTest(myFilterData, 1);
    // getCandidatesList(1);
    getQuickSearch();
    getCurrenciesList();
    // getCVrequestList();
  }, []);

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

          getDropDownListTest(myFilterData, 1);
          // getCandidatesList(1);
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const handleEdit = (uuid) => {
    navigate(`/candidate-list/${uuid}`);
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
  };

  const handleCreateJob = () => {
    navigate("/create-job");
  };

  const handleSubmit = () => {
    submitCvRequest();
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const getCurrenciesList = async () => {
    await axiosInstanceAuth
      .get(`/v1/master_tables_list`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));

        const currenciesList = myData?.mst_currencies;

        if (res?.data?.success) {
          setCurrenciesOptions(currenciesList);
        } else {
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getCandidatesList = async (page) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        // response: response,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/emp/candidates/list?page=${page}`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const candidatesList = myData?.data;
        // console.log("--->  VIEW", candidatesList);

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

  const getQuickSearch = async () => {
    const encryptedData = Encrypt(JSON.stringify({}));
    await axiosInstanceAuth
      .get(`/v1/filter/quick/search`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));

        if (res?.data?.success) {
          // console.log("quick::>>", myData);
          setQuickSearchOptions(myData);
        } else {
          // toast.error("error")
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  //* handle click event of the Remove button
  const handleRemoveClick = (e) => {
    let list = [...myFilterData];
    list.splice(e, 1);
    setMyFilterData(list);
  };
  //* handle click event of the Add button
  const handleAddClick = (e) => {
    setMyFilterData([
      ...myFilterData,
      {
        is_show: "",
        first_option: "",
        filter_type: "is",
        second_option: "",
        third_option: "",
        currency: "",
        currency_code: "",
        sub_options: [],
      },
    ]);
  };

  const handelSearchFilter = (e) => {
    localStorage.setItem("Filter", JSON.stringify(e));

    getDropDownListTest(e, 1);
  };

  const getDropDownListTest = async (myFilterData, value) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        main_filter: myFilterData,
      })
    );

    await axiosInstanceAuth
      .post(`/v1/emp/candidates/list?page=${value}`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const candidatesList = myData?.data;

        // console.log("--->  VIEW", candidatesList);

        if (res?.data?.success) {
          setCandidatesListDetails(candidatesList);
          setOldCandidatesListDetails(candidatesList);
          setlastPage(myData?.last_page);
          setAllPage(myData?.last_page);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const searchDetail = (searchKey, value) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      if (searchKey.length > 0) {
        const encryptedData = Encrypt(
          JSON.stringify({
            search: searchKey,
          })
        );
        await axiosInstanceAuth
          .post(
            `/v1/emp/candidates/list?search=${encryptedData}&page=${value}`,
            { response: encryptedData }
          )
          .then((res) => {
            const myData = JSON.parse(Decrypt(res?.data?.data));
            const searchCandidatesList = myData?.data;
            // console.log("--->  VIEW", candidatesList);

            if (res?.data?.success) {
              setSearch(true)
              setCandidatesListDetails(searchCandidatesList);
              setlastPage(myData?.last_page);
            } else {
              toast.error("error");
            }
          })
          .catch((err) => {
            console.log("err--->", err);
          });
      } else {
        setSearch(false)
        setSearchKey('')
        getDropDownListTest(myFilterData, value)
      }
    }, 2000);
  }

  const quickTypeSearch = (e, value) => {

    searchDetail(e.target.value, value)

    setSearchKey(e.target.value)
    // if (search == false) {
    //   if (e.target.value.length === 0) {
    //     setSearch(false)
    //     getDropDownListTest(myFilterData, value)
    //   } else {
    //     setSearchKey(e.target.value)
    //     searchDetail(e.target.value, value)
    //   }
    // }
    // else {
    //   setSearchKey(e.target.value)
    //   searchDetail(e.target.value, value)
    // }
    // if (e.target.value) {
    //   const searchData = oldCandidatesListDetails.filter((i) => {
    //     // console.log("------->>>>>> SEARCH TEXT", i);

    //     let job_title = i?.job_title
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let employer_type_list = i?.employer_type_list?.title
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let time_in_current_role_diff = i?.time_in_current_role_diff
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let time_in_industry_diff = i?.time_in_industry_diff
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());

    //     let current_salary = i?.current_salary
    //       .toString()
    //       .includes(e.target.value);
    //     let current_bonus_or_commission = i?.current_bonus_or_commission
    //       .toString()
    //       .includes(e.target.value);
    //     let desired_salary = i?.desired_salary
    //       .toString()
    //       .includes(e.target.value);
    //     let desired_bonus_or_commission = i?.desired_bonus_or_commission
    //       .toString()
    //       .includes(e.target.value);

    //     let deal_size = i?.deal_size.toString().includes(e.target.value);
    //     let sales_quota = i?.sales_quota.toString().includes(e.target.value);
    //     let deal_size_symbol_list = i?.deal_size_symbol_list?.currency_code
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let sales_quota_symbol_list = i?.sales_quota_symbol_list?.currency_code
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());

    //     let current_salary_symbol_list =
    //       i?.current_salary_symbol_list?.currency_code
    //         ?.toLowerCase()
    //         .includes(e.target.value.toLowerCase());
    //     let current_bonus_or_commission_symbol_list =
    //       i?.current_bonus_or_commission_symbol_list?.currency_code
    //         ?.toLowerCase()
    //         .includes(e.target.value.toLowerCase());
    //     let desired_salary_symbol_list =
    //       i?.desired_salary_symbol_list?.currency_code
    //         ?.toLowerCase()
    //         .includes(e.target.value.toLowerCase());
    //     let desired_bonus_or_commission_symbol_list =
    //       i?.desired_bonus_or_commission_symbol_list?.currency_code
    //         ?.toLowerCase()
    //         .includes(e.target.value.toLowerCase());

    //     let jurisdiction = i?.jurisdiction
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let pqe = i?.pqe
    //       ?.toString()
    //       .toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let area_of_law = i?.area_of_law
    //       ?.toLowerCase()
    //       .includes(e.target.value.toLowerCase());
    //     let notice_period = i?.notice_period
    //       .toString()
    //       ?.toLowerCase()
    //       .includes(e.target.value?.toLowerCase());

    //     let customer_type_list = i?.customer_type_list.map((d, i) =>
    //       (d?.title).toLowerCase().includes(e.target.value.toLowerCase())
    //     );
    //     let legal_tech_tools_list = i?.legal_tech_tools.map((d, i) =>
    //       d.toLowerCase().includes(e.target.value.toLowerCase())
    //     );
    //     let qualification_list = i?.qualification.map((d, i) =>
    //       d.toLowerCase().includes(e.target.value.toLowerCase())
    //     );

    //     let desired_working_arrangements_list =
    //       i?.desired_working_arrangements_list.map((d, i) =>
    //         (d?.title).toLowerCase().includes(e.target.value.toLowerCase())
    //       );

    //     let languages_list = i?.languages_list.map((d, i) =>
    //       (d?.title).toLowerCase().includes(e.target.value.toLowerCase())
    //     );

    //     let line_management = i?.line_management
    //       .toString()
    //       ?.toLowerCase()
    //       .includes(e.target.value?.toLowerCase());

    //     let desired_employer_types = i?.desired_employer_types.map((d, i) =>
    //       (d?.desired_employer_types_view?.title)
    //         .toLowerCase()
    //         .includes(e.target.value.toLowerCase())
    //     );

    //     let current_country_list = i?.current_country_list?.country_name
    //       .toString()
    //       ?.toLowerCase()
    //       .includes(e.target.value?.toLowerCase());

    //     let current_regions_list = i?.current_regions_list?.title
    //       .toString()
    //       ?.toLowerCase()
    //       .includes(e.target.value?.toLowerCase());

    //     let desired_country_list = i?.desired_country_list.map((d, i) =>
    //       (d?.country_name).toLowerCase().includes(e.target.value.toLowerCase())
    //     );

    //     let freelance_daily_rate_symbol_list =
    //       i?.freelance_daily_rate_symbol_list?.currency_code
    //         .toString()
    //         ?.toLowerCase()
    //         .includes(e.target.value?.toLowerCase());

    //     let day_rate = i?.day_rate
    //       .toString()
    //       ?.toLowerCase()
    //       .includes(e.target.value?.toLowerCase());

    //     let current_working_arrangements_list =
    //       i?.current_working_arrangements_list?.title
    //         .toString()
    //         ?.toLowerCase()
    //         .includes(e.target.value?.toLowerCase());

    //     let legaltech_vendor_or_consultancy_list =
    //       i?.legaltech_vendor_or_consultancy_list?.[0]?.title
    //         ?.toLowerCase()
    //         .includes(e.target.value.toLowerCase());

    //     let tech_tools = i?.tech_tools.map((d, i) =>
    //       d?.toLowerCase().includes(e.target.value.toLowerCase())
    //     );

    //     let profile_about = i?.profile_about
    //       ?.toLowerCase()
    //       .includes(e.target.value?.toLowerCase());

    //     // console.log("------- desired_employer_types", desired_employer_types);
    //     // console.log("------- desired_country_list", desired_country_list);
    //     // console.log(
    //     //   "------- desired_working_arrangements_list",
    //     //   desired_working_arrangements_list
    //     // );
    //     // console.log("------- languages_list", languages_list);
    //     // console.log("------- customer_type_list", customer_type_list);
    //     // console.log("------- legal_tech_tools_list", legal_tech_tools_list);
    //     // console.log("------- tech_tools", tech_tools);
    //     // console.log("------- qualification_list", qualification_list);

    //     return (
    //       job_title ||
    //       employer_type_list ||
    //       time_in_current_role_diff ||
    //       time_in_industry_diff ||
    //       line_management ||
    //       desired_employer_types?.[0] ||
    //       desired_employer_types?.[1] ||
    //       desired_employer_types?.[2] ||
    //       desired_employer_types?.[3] ||
    //       desired_employer_types?.[4] ||
    //       desired_employer_types?.[5] ||
    //       desired_employer_types?.[6] ||
    //       desired_employer_types?.[7] ||
    //       desired_employer_types?.[8] ||
    //       desired_employer_types?.[9] ||
    //       current_country_list ||
    //       current_regions_list ||
    //       desired_country_list?.[0] ||
    //       desired_country_list?.[1] ||
    //       desired_country_list?.[2] ||
    //       desired_country_list?.[3] ||
    //       desired_country_list?.[4] ||
    //       desired_country_list?.[5] ||
    //       desired_country_list?.[6] ||
    //       desired_country_list?.[7] ||
    //       desired_country_list?.[8] ||
    //       desired_country_list?.[9] ||
    //       freelance_daily_rate_symbol_list ||
    //       day_rate ||
    //       desired_working_arrangements_list?.[0] ||
    //       desired_working_arrangements_list?.[1] ||
    //       desired_working_arrangements_list?.[2] ||
    //       desired_working_arrangements_list?.[3] ||
    //       desired_working_arrangements_list?.[4] ||
    //       desired_working_arrangements_list?.[5] ||
    //       desired_working_arrangements_list?.[6] ||
    //       desired_working_arrangements_list?.[7] ||
    //       desired_working_arrangements_list?.[8] ||
    //       desired_working_arrangements_list?.[9] ||
    //       languages_list?.[0] ||
    //       languages_list?.[1] ||
    //       languages_list?.[2] ||
    //       languages_list?.[3] ||
    //       languages_list?.[4] ||
    //       languages_list?.[5] ||
    //       languages_list?.[6] ||
    //       languages_list?.[7] ||
    //       languages_list?.[8] ||
    //       languages_list?.[9] ||
    //       current_working_arrangements_list ||
    //       // desired_region_list ||
    //       // status ||
    //       // freelance_current ||
    //       // freelance_future ||
    //       current_salary ||
    //       current_bonus_or_commission ||
    //       desired_salary ||
    //       desired_bonus_or_commission ||
    //       deal_size ||
    //       sales_quota ||
    //       deal_size_symbol_list ||
    //       sales_quota_symbol_list ||
    //       current_salary_symbol_list ||
    //       current_bonus_or_commission_symbol_list ||
    //       desired_salary_symbol_list ||
    //       desired_bonus_or_commission_symbol_list ||
    //       // law_degree ||
    //       // qualified_lawyer ||
    //       jurisdiction ||
    //       pqe ||
    //       area_of_law ||
    //       notice_period ||
    //       legaltech_vendor_or_consultancy_list ||
    //       customer_type_list?.[0] ||
    //       customer_type_list?.[1] ||
    //       customer_type_list?.[2] ||
    //       customer_type_list?.[3] ||
    //       customer_type_list?.[4] ||
    //       customer_type_list?.[5] ||
    //       customer_type_list?.[6] ||
    //       customer_type_list?.[7] ||
    //       customer_type_list?.[8] ||
    //       customer_type_list?.[9] ||
    //       legal_tech_tools_list?.[0] ||
    //       legal_tech_tools_list?.[1] ||
    //       legal_tech_tools_list?.[2] ||
    //       legal_tech_tools_list?.[3] ||
    //       legal_tech_tools_list?.[4] ||
    //       legal_tech_tools_list?.[5] ||
    //       legal_tech_tools_list?.[6] ||
    //       legal_tech_tools_list?.[7] ||
    //       legal_tech_tools_list?.[8] ||
    //       legal_tech_tools_list?.[9] ||
    //       tech_tools?.[0] ||
    //       tech_tools?.[1] ||
    //       tech_tools?.[2] ||
    //       tech_tools?.[3] ||
    //       tech_tools?.[4] ||
    //       tech_tools?.[5] ||
    //       tech_tools?.[6] ||
    //       tech_tools?.[7] ||
    //       tech_tools?.[8] ||
    //       tech_tools?.[9] ||
    //       qualification_list?.[0] ||
    //       qualification_list?.[1] ||
    //       qualification_list?.[2] ||
    //       qualification_list?.[3] ||
    //       qualification_list?.[4] ||
    //       qualification_list?.[5] ||
    //       qualification_list?.[6] ||
    //       qualification_list?.[7] ||
    //       qualification_list?.[8] ||
    //       qualification_list?.[9] ||
    //       profile_about
    //     );
    //   });
    //   setCandidatesListDetails(searchData);
    // } else {
    //   setCandidatesListDetails(oldCandidatesListDetails);
    // }
  };

  return (
    <>
      <NewHeader isLoggedIn={isLoggedIn} />

      <div className={`${styles["list-of-candidates"]}`}>
        <div className="container">
          <div className="main-tabs">
            {/* ===== Filter input ==== */}
            <div className="row d-flex justify-content-between">
              <div className="col-lg-3 select-down-icon filter-select">
                <FormControl>
                  <Select
                    value={selectedOption || ""}
                    onChange={(e, value) => {
                      setSelectedOption(e.target.value);
                    }}
                  >
                    {mainOptions.map((d, i) => (
                      <MenuItem key={i} value={d?.title}>
                        <ListItemText primary={d?.title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-lg-3 select-down-icon filter-select">
                <FormControl>
                  <TextField
                    type="text"
                    placeholder="Quick Search"
                    onChange={quickTypeSearch}
                  />
                </FormControl>
              </div>
            </div>

            {/* ===== add and remove input ==== */}

            {/* ===== First filter ===== */}

            {myFilterData.map((i, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="mt-20 d-flex add-remove-input justify-content-between align-items-center"
                  >
                    <div className="simple-checkbox">
                      <Checkbox
                        // checked={storage?.is_show}
                        checked={i?.is_show}
                        onChange={(event) => {
                          i.is_show = event.target.checked;

                          setStorage({
                            ...storage,
                            is_show: event.target.checked,
                          });
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>

                    <div
                      className={`${i?.filter_type === "is_between"
                        ? "second-input-multi"
                        : "second-input"
                        } second-input-multi-limit`}
                    >
                      <div className="filter-select select-down-icon">
                        <div className="w-100">
                          <FormControl>
                            <Select
                              // disabled={storage?.is_show == false}
                              disabled={i?.is_show == false}
                              value={[i?.first_option]}
                              name="first"
                              onChange={(e, value) => {
                                i.first_option = value?.props?.value;

                                i.sub_options = QuickSearchOptions.filter((x) =>
                                  value?.props?.value.includes(x?.select)
                                );

                                setStorage({
                                  ...storage,
                                  first_option: value?.props?.value,
                                });

                                setQuickSearch(value?.props?.value);
                                setSendSearchResponse({
                                  ...sendSearchResponse,
                                  [e.target.name]: value?.props?.value,
                                });
                              }}
                              input={<OutlinedInput />}
                              MenuProps={MenuProps}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {QuickSearchOptions.length > 0 &&
                                QuickSearchOptions.map((option, i) => (
                                  <MenuItem
                                    key={i}
                                    value={option.select}
                                    style={getStyles(
                                      option.name,
                                      personName,
                                      theme
                                    )}
                                  >
                                    {option.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${i?.filter_type === "is_between"
                        ? "first-input-multi"
                        : i?.first_option === "desired_salary" ||
                          i?.first_option === "desired_bonus_or_commission" ||
                          i?.first_option === "freelance_daily_rate" ||
                          i?.first_option === "deal_size" ||
                          i?.first_option === "sales_quota"
                          ? "first-input"
                          : "first-input-multi-limit"
                        }`}
                    >
                      <div className="select-down-icon filter-select">
                        <div className="w-100">
                          <FormControl>
                            <Select
                              disabled={i?.is_show == false}
                              // disabled={storage?.is_show == false}
                              // value={storage?.filter_type || "contains"}
                              value={i?.filter_type || "is"}
                              onChange={(e, newValue) => {
                                i.filter_type = e.target.value;

                                setStorage({
                                  ...storage,
                                  filter_type: e.target.value,
                                });
                              }}
                              MenuProps={MenuProps}
                            >
                              {i?.first_option === "time_in_industry"
                                ? filterType2Options.map((d) => (
                                  <MenuItem value={d?.value}>
                                    {d?.title}
                                  </MenuItem>
                                ))
                                : i?.first_option === "time_in_current_role"
                                  ? filterType2Options.map((d) => (
                                    <MenuItem value={d?.value}>
                                      {d?.title}
                                    </MenuItem>
                                  ))
                                  : i?.first_option === "time_in_current_role"
                                    ? filterType2Options.map((d) => (
                                      <MenuItem value={d?.value}>
                                        {d?.title}
                                      </MenuItem>
                                    ))
                                    : i?.first_option === "line_management"
                                      ? filterType2Options.map((d) => (
                                        <MenuItem value={d?.value}>
                                          {d?.title}
                                        </MenuItem>
                                      ))
                                      : i?.first_option === "notice_period"
                                        ? filterType2Options.map((d) => (
                                          <MenuItem value={d?.value}>
                                            {d?.title}
                                          </MenuItem>
                                        ))
                                        : i?.first_option === "freelance_current"
                                          ? filterType2Options.map((d) => (
                                            <MenuItem value={d?.value}>
                                              {d?.title}
                                            </MenuItem>
                                          ))
                                          : i?.first_option === "freelance_future"
                                            ? filterType2Options.map((d) => (
                                              <MenuItem value={d?.value}>
                                                {d?.title}
                                              </MenuItem>
                                            ))
                                            : i?.first_option === "status"
                                              ? filterType2Options.map((d) => (
                                                <MenuItem value={d?.value}>
                                                  {d?.title}
                                                </MenuItem>
                                              ))
                                              : i?.first_option ===
                                                "legaltech_vendor_or_consultancy"
                                                ? filterType2Options.map((d) => (
                                                  <MenuItem value={d?.value}>
                                                    {d?.title}
                                                  </MenuItem>
                                                ))
                                                : i?.first_option === "desired_salary"
                                                  ? filterTypeRangeOptions.map((d) => (
                                                    <MenuItem value={d?.value}>
                                                      {d?.title}
                                                    </MenuItem>
                                                  ))
                                                  : i?.first_option ===
                                                    "desired_bonus_or_commission"
                                                    ? filterTypeRangeOptions.map((d) => (
                                                      <MenuItem value={d?.value}>
                                                        {d?.title}
                                                      </MenuItem>
                                                    ))
                                                    : i?.first_option === "freelance_daily_rate"
                                                      ? filterTypeRangeOptions.map((d) => (
                                                        <MenuItem value={d?.value}>
                                                          {d?.title}
                                                        </MenuItem>
                                                      ))
                                                      : i?.first_option === "pqe"
                                                        ? filterTypeRangeOptions.map((d) => (
                                                          <MenuItem value={d?.value}>
                                                            {d?.title}
                                                          </MenuItem>
                                                        ))
                                                        : i?.first_option === "deal_size"
                                                          ? filterTypeRangeOptions.map((d) => (
                                                            <MenuItem value={d?.value}>
                                                              {d?.title}
                                                            </MenuItem>
                                                          ))
                                                          : i?.first_option === "sales_quota"
                                                            ? filterTypeRangeOptions.map((d) => (
                                                              <MenuItem value={d?.value}>
                                                                {d?.title}
                                                              </MenuItem>
                                                            ))
                                                            : i?.first_option === "languages"
                                                              ? filterType2Options.map((d) => (
                                                                <MenuItem value={d?.value}>
                                                                  {d?.title}
                                                                </MenuItem>
                                                              ))
                                                              : filterType3Options.map((d) => (
                                                                <MenuItem value={d?.value}>
                                                                  {d?.title}
                                                                </MenuItem>
                                                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>

                    {i?.first_option === "desired_salary" ||
                      i?.first_option === "desired_bonus_or_commission" ||
                      i?.first_option === "freelance_daily_rate" ||
                      i?.first_option === "deal_size" ||
                      i?.first_option === "sales_quota" ? (
                      <div
                        className={`${i?.filter_type === "is_between" ||
                          i?.filter_type === "is_more_than" ||
                          i?.filter_type === "is_less_than"
                          ? "currency-input"
                          : "currency-input-multi"
                          }`}
                      >
                        <div className="select-down-icon filter-select">
                          <div className="w-100">
                            <FormControl>
                              <Autocomplete
                                options={currenciesOptions}
                                getOptionLabel={(option) =>
                                  option.currency_code || i?.currency_code
                                }
                                value={i?.currency || i?.currency_code}
                                onChange={(e, newValue) => {
                                  i.currency = newValue?.id;
                                  i.currency_code = newValue?.currency_code;

                                  setStorage({
                                    ...storage,
                                    currency: newValue?.id,
                                    currency_code: newValue?.currency_code,
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Currency"
                                  />
                                )}
                                className="single-auto-compelete-width"
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div
                      className={`${i?.filter_type === "is_between"
                        ? "third-input-multi"
                        : "third-input"
                        } third-input-multi-limit`}
                    >
                      <div className="filter-select select-down-icon">
                        <div className="w-100">
                          <FormControl>
                            <Autocomplete
                              // disabled={storage?.is_show == false}
                              disabled={QuickSearch === ""}
                              name="second"
                              value={i?.second_option}
                              onChange={(e, newValue) => {
                                setSendSearchResponse({
                                  ...sendSearchResponse,
                                  [e.target.name]: newValue,
                                });

                                if (typeof newValue === "string") {
                                  i.second_option = newValue;

                                  setStorage({
                                    ...storage,
                                    second_option: newValue,
                                  });
                                } else if (newValue && newValue.inputValue) {
                                  // Create a new value from the user input
                                  i.second_option = newValue.inputValue;

                                  setStorage({
                                    ...storage,
                                    second_option: newValue.inputValue,
                                  });
                                } else {
                                  i.second_option = newValue.title;

                                  setStorage({
                                    ...storage,
                                    second_option: newValue?.title,
                                  });
                                }
                              }}
                              filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some(
                                  (option) => inputValue === option.title
                                );
                                if (inputValue !== "" && !isExisting) {
                                  filtered.push({
                                    inputValue,
                                    title: `Add "${inputValue}"`,
                                  });
                                }
                                return filtered;
                              }}
                              selectOnFocus
                              clearOnBlur
                              handleHomeEndKeys
                              // id="free-solo-with-text-demo"
                              options={i.sub_options?.[0]?.list}
                              // options={SubOption?.[0]?.list}
                              getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === "string") {
                                  return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                  return option.inputValue;
                                }
                                // Regular option
                                return option.title;
                              }}
                              renderOption={(props, option) => (
                                <li {...props}>{option.title}</li>
                              )}
                              freeSolo
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder={
                                    i?.first_option === "desired_salary" ||
                                      i?.first_option ===
                                      "desired_bonus_or_commission" ||
                                      i?.first_option ===
                                      "freelance_daily_rate" ||
                                      i?.first_option === "deal_size" ||
                                      i?.first_option === "sales_quota" ||
                                      i?.first_option === "pqe"
                                      ? "Please enter number"
                                      : ""
                                  }
                                />
                              )}
                              className="single-auto-compelete-width"
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>

                    {i?.filter_type === "is_between" ? "To" : null}

                    {i?.filter_type === "is_between" ? (
                      <div
                        className={`${i?.filter_type === "is_between"
                          ? "third-input-multi"
                          : "third-input"
                          }`}
                      >
                        <div className="filter-select select-down-icon">
                          <div className="w-100">
                            <FormControl>
                              <Autocomplete
                                // disabled={storage?.is_show == false}
                                disabled={QuickSearch === ""}
                                name="third"
                                value={i?.third_option || ""}
                                onChange={(e, newValue) => {
                                  setSendSearchResponse({
                                    ...sendSearchResponse,
                                    [e.target.name]: newValue,
                                  });

                                  if (typeof newValue === "string") {
                                    i.third_option = newValue;

                                    setStorage({
                                      ...storage,
                                      third_option: newValue,
                                    });
                                  } else if (newValue && newValue.inputValue) {
                                    // Create a new value from the user input
                                    i.third_option = newValue.inputValue;

                                    setStorage({
                                      ...storage,
                                      third_option: newValue.inputValue,
                                    });
                                  } else {
                                    i.third_option = newValue.title;

                                    setStorage({
                                      ...storage,
                                      third_option: newValue?.title,
                                    });
                                  }
                                }}
                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                                  const { inputValue } = params;
                                  // Suggest the creation of a new value
                                  const isExisting = options.some(
                                    (option) => inputValue === option.title
                                  );
                                  if (inputValue !== "" && !isExisting) {
                                    filtered.push({
                                      inputValue,
                                      title: `Add "${inputValue}"`,
                                    });
                                  }
                                  return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                // id="free-solo-with-text-demo"
                                options={i.sub_options?.[0]?.list}
                                // options={SubOption?.[0]?.list}
                                getOptionLabel={(option) => {
                                  // Value selected with enter, right from the input
                                  if (typeof option === "string") {
                                    return option;
                                  }
                                  // Add "xxx" option created dynamically
                                  if (option.inputValue) {
                                    return option.inputValue;
                                  }
                                  // Regular option
                                  return option.title;
                                }}
                                renderOption={(props, option) => (
                                  <li {...props}>{option.title}</li>
                                )}
                                freeSolo
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="please enter number"
                                  />
                                )}
                                className="single-auto-compelete-width"
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="mw-52">
                      {index == myFilterData.length - 1 ? (
                        <button
                          className="bg-transparent border-0 "
                          onClick={(e) => handelSearchFilter(myFilterData)}
                        >
                          <img
                            className="small-search-icon"
                            src={searchIcon}
                            alt=""
                          />
                        </button>
                      ) : null}

                      {index == myFilterData.length - 1 ? (
                        <button
                          className="bg-transparent border-0 px-2"
                          onClick={(e) => handelClearFilter()}
                        >
                          <img
                            className="small-search-icon"
                            src={Trash}
                            alt=""
                          />
                        </button>
                      ) : null}

                      {index != 0 ? (
                        <button
                          className="bg-transparent border-0"
                          onClick={(e) => handleRemoveClick(index)}
                        >
                          <img src={removeInput} alt="" />
                        </button>
                      ) : (
                        <button
                          className="bg-transparent border-0"
                          onClick={(e) => handleAddClick()}
                        >
                          <img className="add-input" src={addInput} alt="" />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })}

            <p className="border-bottom mt-30"></p>

            <div className="d-flex align-items-center mt-20 justify-content-between">
              <div className="d-flex align-items-center">
                {/* <div>
                                    <div className="simple-checkbox">
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                </div> */}
                {/* <div className='data-filter select-down-icon ms-3 simple-checkbox-select'> */}
                <div className="data-filter select-down-icon ms-3 simple-checkbox">
                  <FormControl>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                      sx={{ px: "10px", pt: "5px" }}
                    >
                      Add / Remove Columns
                    </InputLabel>

                    {/* <Select
                                            // labelId="data-filter"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={personFilter}
                                            onChange={handleChangeFilter}
                                            input={<OutlinedInput label="1" />}
                                            renderValue={(selected) => {
                                                selected.join(', ')
                                                setSelctedColumns(selected);
                                            }}
                                            MenuProps={MenuProps}
                                        >
                                            {ColumnOptions.map((d, i) => (
                                                <MenuItem
                                                    key={i}
                                                    value={d?.title}
                                                >
                                                    <Checkbox checked={personFilter.indexOf(d?.title) > -1} />
                                                    <ListItemText primary={d?.title} />
                                                </MenuItem>
                                            ))}
                                        </Select> */}

                    {/* {console.log("|------>>> testSelctedColumns", testSelctedColumns)}
                                        <Autocomplete
                                            multiple
                                            limitTags={1}
                                            filterSelectedOptions={true}
                                            options={ColumnOptions}
                                            getOptionLabel={
                                                (option) => (option.title || "")
                                            }
                                            value={testSelctedColumns || []}
                                            onChange={(e, value) => {
                                                console.log("value -------- >>", value);
                                                setTestSelctedColumns(value);
                                            }}
                                            // disableCloseOnSelect
                                            // renderOption={(props, option, { selected }) => (
                                            //     < li  {...props}>
                                            //         <Checkbox
                                            //             icon={icon}
                                            //             checkedIcon={checkedIcon}
                                            //             style={{ marginRight: 8 }}
                                            //             // checked={selected}
                                            //             checked={testSelctedColumns.indexOf(option.title) > -1}
                                            //         />
                                            //         {option.title}
                                            //     </li>
                                            // )}

                                            style={{ width: 270 }}
                                            renderInput={
                                                params => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Add / Remove Columns"
                                                    />
                                                )
                                            }
                                        /> */}

                    <div className="d-flex">
                      <Select
                        // disabled={!checked}
                        sx={{ minWidth: "300px" }}
                        multiple
                        value={personFilter}
                        onChange={handleChangeFilter}
                        input={<OutlinedInput />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            <strong>
                              Selected {personFilter.length} Columns
                            </strong>
                            {/* {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))} */}
                          </Box>
                        )}
                        MenuProps={CustomSelect}
                      >
                        {ColumnOptions.map((d, i) => (
                          <MenuItem key={i} value={d?.title}>
                            <Checkbox
                              checked={personFilter.indexOf(d?.title) > -1}
                            />
                            <ListItemText primary={d?.title} />
                          </MenuItem>
                        ))}
                      </Select>

                      <button
                        className="bg-transparent border-0 px-3 text-muted cursor-pointer"
                        onClick={(e) => handelClearColumns()}
                      >
                        Clear
                      </button>
                    </div>
                  </FormControl>
                </div>
              </div>
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
              {personFilter.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Candidate #</TableCell>
                        <TableCell align="right">Request CV</TableCell>
                        <TableCell align="right">Shortlist</TableCell>
                        {selctedColumns.length > 0 &&
                          selctedColumns.map((d, i) => (
                            <TableCell key={i}>{d}</TableCell>
                          ))}

                        {/* {testSelctedColumns.length > 0 && testSelctedColumns.map((d, i) => (
                                <TableCell key={i}>{d?.title}</TableCell>
                            ))} */}
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
                        >
                          <TableCell component="th" scope="row">
                            #{d?.id}
                          </TableCell>

                          {d?.is_cv_list_same_emp?.is_cv == 1 || d?.is_cv_list_same_emp?.is_cv == 2 || d?.is_cv_list_same_emp?.is_cv == 3 ? (
                            <TableCell align="right">
                              {d?.is_cv_list_same_emp?.is_cv == 2 ? (
                                <div className="active-status">Accepted</div>
                              ) : d?.is_cv_list_same_emp?.is_cv == 1 ? (
                                <div className="requested-status">
                                  Requested
                                </div>
                              ) : d?.is_cv_list_same_emp?.is_cv == 3 ? (
                                <div className="closed-status">Rejected</div>
                              ) : null}
                            </TableCell>
                          ) : (
                            <TableCell
                              align="right"
                              onClick={(e) => handleOpenPopUp(d.uuid)}
                            >
                              <div className="request-status">Request</div>
                            </TableCell>
                          )}

                          {
                            <TableCell
                              align="right"
                              onClick={(e) => handleShortlist(d.uuid)}
                            >
                              {d?.emp_short_list === null ? (
                                <div className="bg-Color-add d-flex justify-content-center">
                                  Add
                                </div>
                              ) : d?.emp_short_list ? (
                                <div className="bg-Color-remove d-flex justify-content-center">
                                  Remove
                                </div>
                              ) : null}
                            </TableCell>
                          }

                          {/* {selctedColumns.map((columnTitle) => {
                            const dataField = columnMapping[columnTitle];

                            // Check if the selected column exists in the mapping
                            if (dataField) {
                              return (
                                <TableCell
                                  key={columnTitle} // Use a unique key for each cell
                                  component="th"
                                  scope="row"
                                  onClick={(e) => handleEdit(d.uuid)}
                                >
                                  {d[dataField]}
                                </TableCell>
                              );
                            } else {
                              return null;
                            }
                          })} */}



                          {selctedColumns.includes("Job Title") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.job_title}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Desired Region") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.desired_region}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Employer Type") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.employer_type_list?.title}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Time in Current Role") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.time_in_current_role_diff}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Time in Industry") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.time_in_industry_diff}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Status") ? (
                            <TableCell
                              align="right"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d.status === 1 ? (
                                <div className="bg-Color-success d-flex justify-content-center">
                                  Active
                                </div>
                              ) : d.status === 2 ? (
                                <div className="bg-Color-info d-flex justify-content-center">
                                  Passive
                                </div>
                              ) : d.status === 3 ? (
                                <div className="bg-Color-warning d-flex justify-content-center">
                                  Very Passive
                                </div>
                              ) : d.status === 4 ? (
                                <div className="bg-Color-error d-flex justify-content-center">
                                  Closed
                                </div>
                              ) : null}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Desired Employer Type") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.desired_employer_types.map(
                                (d) =>
                                  `${d?.desired_employer_types_view?.title}, `
                              )}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Line Management") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.line_management}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Notice Period") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d.notice_period == 0 || d.notice_period == 1
                                ? `${d.notice_period} Week`
                                : d.notice_period == null
                                  ? ""
                                  : `${d.notice_period} Weeks`}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Current Country") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.current_country_list?.country_name}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Desired Country") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.desired_country_list.map(
                                (d) => `${d?.country_name}, `
                              )}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Current Region") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.current_regions_list?.title}
                            </TableCell>
                          ) : null}

                          {/* {selctedColumns.includes("Current Salary") ?
                                                        <TableCell component="th" scope="row" onClick={(e) => handleEdit(d.uuid)} >
                                                            {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Bonus / Commission") ?
                                                        <TableCell component="th" scope="row" onClick={(e) => handleEdit(d.uuid)}>
                                                            {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                                        </TableCell>
                                                        : null} */}

                          {selctedColumns.includes("Desired Salary") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.desired_salary_symbol_list?.currency_code}{" "}
                              {d.desired_salary}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes(
                            "Desired Bonus / Commission"
                          ) ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {
                                d?.desired_bonus_or_commission_symbol_list
                                  ?.currency_code
                              }{" "}
                              {d.desired_bonus_or_commission}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Current Freelancer") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.current_freelance?.[0]?.title}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Open to Freelance") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.open_to_freelance?.[0]?.title}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Day Rate") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {
                                d?.freelance_daily_rate_symbol_list
                                  ?.currency_code
                              }{" "}
                              {d?.day_rate}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes(
                            "Current Working Arrangements"
                          ) ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.current_working_arrangements_list?.title}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes(
                            "Desired Working Arrangements"
                          ) ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.desired_working_arrangements_list.map(
                                (d) => `${d?.title}, `
                              )}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Law Degree") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d.law_degree === 0 ? "No" : "Yes"}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Qualified Lawyer") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d.qualified_lawyer === 0 ? "No" : "Yes"}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Jurisdiction") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d.jurisdiction}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes(
                            "Post-Qualified Experience"
                          ) ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.pqe}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Legal Specialism") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.legal_specialism}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Area of Law") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d.area_of_law}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes(
                            "LegalTech Vendor/Consultancy"
                          ) ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {
                                d?.legaltech_vendor_or_consultancy_list?.[0]
                                  ?.title
                              }
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Customer Type") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.customer_type_list.map(
                                (d) => `${d?.title}, `
                              )}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Deal Size") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.deal_size_symbol_list?.currency_code}{" "}
                              {d?.deal_size}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Sales quota") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.sales_quota_symbol_list?.currency_code}{" "}
                              {d?.sales_quota}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("LegalTech Tools") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.legal_tech_tools.map((d) => `${d}, `)}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Tech Tools") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.tech_tools.map((d) => `${d}, `)}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Qualifications") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.qualification.map((d) => `${d}, `)}
                            </TableCell>
                          ) : null}

                          {selctedColumns.includes("Languages") ? (
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(e) => handleEdit(d.uuid)}
                            >
                              {d?.languages_list.map((d) => `${d?.title}, `)}
                            </TableCell>
                          ) : null}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : checked === false && selectedOption === "Legal" ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Candidate #</TableCell>
                        <TableCell align="right">Job Title</TableCell>
                        <TableCell align="right">Years in Role</TableCell>
                        <TableCell align="right">Law Degree</TableCell>
                        <TableCell align="right">Qualified Lawyer</TableCell>
                        <TableCell align="right">Jurisdiction</TableCell>
                        <TableCell align="right">PQE</TableCell>
                        <TableCell align="right">Area of Law</TableCell>
                        <TableCell align="right">LegalTech Tools</TableCell>
                        <TableCell align="right">Qualifications</TableCell>
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
                          <TableCell align="right">
                            {d.time_in_current_role_diff}
                          </TableCell>
                          <TableCell align="right">
                            {d.law_degree === 0 ? "No" : "Yes"}
                          </TableCell>
                          <TableCell align="right">
                            {d.qualified_lawyer === 0 ? "No" : "Yes"}
                          </TableCell>
                          <TableCell align="right">{d.jurisdiction}</TableCell>
                          <TableCell align="right">{d.pqe_diff}</TableCell>
                          <TableCell align="right">{d.area_of_law}</TableCell>
                          <TableCell align="right">
                            {d?.legal_tech_tools.map((d) => `${d}, `)}
                          </TableCell>
                          <TableCell align="right">
                            {d?.qualification.map((d) => `${d}, `)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : checked === false && selectedOption === "Tech" ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Candidate #</TableCell>
                        <TableCell align="right">Job Title</TableCell>
                        <TableCell align="right">Years in Role</TableCell>
                        <TableCell align="right">Tech Tools</TableCell>
                        <TableCell align="right">LegalTech Tools</TableCell>
                        <TableCell align="right">Qualifications</TableCell>
                        <TableCell align="right">
                          Desired Working Arrangements
                        </TableCell>
                        <TableCell align="right">Notice period</TableCell>
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
                          <TableCell align="right">
                            {d.time_in_current_role_diff}
                          </TableCell>
                          <TableCell align="right">
                            {d?.tech_tools.map((d) => `${d}, `)}
                          </TableCell>
                          <TableCell align="right">
                            {d?.legal_tech_tools.map((d) => `${d}, `)}
                          </TableCell>
                          <TableCell align="right">
                            {d?.qualification.map((d) => `${d}, `)}
                          </TableCell>
                          <TableCell align="right">
                            {d?.desired_working_arrangements_list.map(
                              (d) => `${d?.title}, `
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {/* {d.notice_period == null ? "" : `${d.notice_period} Week`} */}
                            {d.notice_period == 0 || d.notice_period == 1
                              ? `${d.notice_period} Week`
                              : d.notice_period == null
                                ? ""
                                : `${d.notice_period} Weeks`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : checked === false && selectedOption === "Commercial" ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Candidate #</TableCell>
                        <TableCell align="right">Job Title</TableCell>
                        <TableCell align="right">Years in Role</TableCell>
                        {/* <TableCell align="right">Desired Role</TableCell> */}
                        <TableCell align="right">Desired salary</TableCell>
                        <TableCell align="right">
                          Desired Bonus / commission
                        </TableCell>
                        <TableCell align="right">Customer Type</TableCell>
                        <TableCell align="right">Deal Size</TableCell>
                        <TableCell align="right">Sales quota</TableCell>
                        <TableCell align="right">Notice Period</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {candidatesListDetails.map((d, index) => (
                        <TableRow
                          TableRow
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
                          <TableCell align="right">
                            {d.time_in_current_role_diff}
                          </TableCell>
                          {/* <TableCell align="right" >
                                                            {d?.desired_employer_type_list.map((d) => (`${ d?.title }, `))}
                                                        </TableCell> */}
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
                          <TableCell align="right">
                            {d?.customer_type_list.map((d) => `${d?.title}, `)}
                          </TableCell>
                          <TableCell align="right">
                            {d?.deal_size_symbol_list?.currency_code}{" "}
                            {d?.deal_size}
                          </TableCell>
                          <TableCell align="right">
                            {d?.sales_quota_symbol_list?.currency_code}{" "}
                            {d?.sales_quota}
                          </TableCell>
                          <TableCell align="right">
                            {/* {d.notice_period == null ? "" : `${d.notice_period} Week`} */}
                            {d.notice_period == 0 || d.notice_period == 1
                              ? `${d.notice_period} Week`
                              : d.notice_period == null
                                ? ""
                                : `${d.notice_period} Weeks`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : checked === false && selectedOption === "Overview" ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Candidate #</TableCell>
                        <TableCell align="right">Request CV</TableCell>
                        <TableCell align="right">Shortlist</TableCell>
                        <TableCell align="right">Job Title</TableCell>
                        <TableCell align="right">Employer Type</TableCell>
                        <TableCell align="right">Years in Role</TableCell>

                        <TableCell align="right">Years in Industry</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Desired salary</TableCell>
                        <TableCell align="right">
                          D. Bonus/ commission
                        </TableCell>
                        {/* <TableCell align="right">Notice
                                                                Period(wks)</TableCell>
                                                            <TableCell align="right">PQE</TableCell>
                                                            <TableCell align="right">LegalTech Tools</TableCell> */}
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
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            #{d?.id}
                          </TableCell>
                          {d?.is_cv_list_same_emp?.is_cv === 1 || d?.is_cv_list_same_emp?.is_cv == 2 || d?.is_cv_list_same_emp?.is_cv == 3 ? (
                            <TableCell align="right">
                              {d?.is_cv_list_same_emp?.is_cv === 2 ? (
                                <div className="active-status">Accepted</div>
                              ) : d?.is_cv_list_same_emp?.is_cv === 1 ? (
                                <div className="requested-status">
                                  Requested
                                </div>
                              ) : d?.is_cv_list_same_emp?.is_cv === 3 ? (
                                <div className="closed-status">Rejected</div>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          ) : (
                            <TableCell
                              align="right"
                              onClick={(e) => handleOpenPopUp(d.uuid)}
                            >
                              <div className="request-status">Request</div>
                            </TableCell>
                          )}

                          {
                            <TableCell
                              align="right"
                              onClick={(e) => handleShortlist(d.uuid)}
                            >
                              {d?.emp_short_list === null ? (
                                <div className="bg-Color-add d-flex justify-content-center">
                                  Add
                                </div>
                              ) : d?.emp_short_list ? (
                                <div className="bg-Color-remove d-flex justify-content-center">
                                  Remove
                                </div>
                              ) : null}
                            </TableCell>
                          }

                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            {d.job_title}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            {d.employer_type_list?.title}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            {d.time_in_current_role_diff}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            {d.time_in_industry_diff}
                          </TableCell>

                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
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

                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            {d?.desired_salary_symbol_list?.currency_code}{" "}
                            {d.desired_salary}
                            {/* <CurrencyFormat value={d.desired_salary} displayType={'text'} thousandSeparator={true} prefix={d?.desired_salary_symbol_list?.symbol} /> */}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={(e) => handleEdit(d.uuid)}
                          >
                            {
                              d?.desired_bonus_or_commission_symbol_list
                                ?.currency_code
                            }{" "}
                            {d.desired_bonus_or_commission}
                            {/* <CurrencyFormat value={d.desired_bonus_or_commission} displayType={'text'} thousandSeparator={true} prefix={d?.desired_bonus_or_commission_symbol_list?.symbol} /> */}
                          </TableCell>
                          {/* <TableCell align="right" onClick={(e) => handleEdit(d.uuid)}>{d.notice_period} Week</TableCell>
                                                                <TableCell align="right" onClick={(e) => handleEdit(d.uuid)}>{d.pqe_diff}</TableCell>
                                                                <TableCell align="right" onClick={(e) => handleEdit(d.uuid)}>
                                                                    {d?.legal_tech_tools.map((d) => (`${d}, `))}
                                                                </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </div>
          </div>
        </div>
        <div className="fixed-footer">
          <Copyright mb_20="mb-20" />
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
                          <div className="radioBtn detail-content">
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
                    {" "}
                    <img src={closeIcon} alt="" />{" "}
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
                    <h1>Congratulations!</h1>{" "}
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
                      {" "}
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

export default Listofcandidates;
