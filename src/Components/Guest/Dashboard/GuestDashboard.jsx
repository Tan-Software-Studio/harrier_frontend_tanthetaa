import React, { useEffect, useState } from 'react'
import styles from "./GuestDashboard.module.scss"

// ====== Img ======
import plusIcon from "../../../img/common/plus-icon.png"
import closeIcon from ".././../../img/common/cancel-icon.png"
import clearUp from "../../../img/common/clearUp.png"
import Trash from "../../../img/common/trash.png"
import searchIcon from "../../../img/common/search001.png"
import removeInput from "../../../img/create-job/remove-input.png"
import addInput from "../../../img/create-job/add-input.png"

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


// ====== Import ======

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Box, Button, Chip, FormControl, InputLabel, Menu, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';

// ==== Pagination ====

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Copyright from '../../Common/Copyright/Copyright';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstanceAuth from '../../../apiServices/axiosInstanceAuth';
import Encrypt from '../../../customHook/customHook/EncryptDecrypt/Encrypt';
import Decrypt from '../../../customHook/customHook/EncryptDecrypt/Decrypt';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import GuestHeader from '../../Common/GuestHeader/GuestHeader'



const GuestDashboard = () => {

    // useEffect(() => {
    //     window.addEventListener('popstate', (e) => {
    //         window.history.go(1);
    //     });
    // }, []);

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            // window.history.go(1);
            window.history.go("/guest-dashboard");
        };
    }, []);

    const navigate = useNavigate();
    const isLoggedGuestIn = localStorage.getItem("token") !== null;

    let getSelectValue = localStorage.getItem("Select");
    let selectValue = (getSelectValue !== null ? getSelectValue.split(",").slice(0) : null);

    let getFilterValue = JSON.parse(localStorage.getItem("Filter"));

    // let getIsShow = localStorage.getItem("isShow");

    let isGuest = useLocation().pathname;

    useEffect(() => {

        if (!isLoggedGuestIn) {
            navigate("/");
        }
        if (isGuest === "/guest-dashboard") {
            document.body.classList.add('bg-salmon');
        }
    });

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const filter = createFilterOptions();
    const [value, setValue] = useState({ title: "", id: "" });

    const mainOptions = [
        { id: 1, title: "Overview" },
        { id: 2, title: "Legal" },
        { id: 3, title: "Tech" },
        { id: 4, title: "Commercial" },
    ]

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

    const sendQuickSearchTitle = (e) => {
    }

    const [filterRow, setFilterRow] = useState(2);
    const [isActiveFilterRow, setisActiveFilterRow] = useState(false);


    const [personFilter, setPersonFilter] = useState(selectValue || []);
    const [personName, setPersonName] = useState([]);
    const [currenciesOptions, setCurrenciesOptions] = useState([])

    const [candidatesListDetails, setCandidatesListDetails] = useState([]);
    const [oldCandidatesListDetails, setOldCandidatesListDetails] = useState([]);

    const [checked, setChecked] = useState(false);
    const [selctedColumns, setSelctedColumns] = useState(selectValue || []);

    const [testSelctedColumns, setTestSelctedColumns] = useState([]);



    // const [testing, setTesting] = useState([]);


    // console.log("---->> candidatesListDetails", candidatesListDetails)
    // console.log("---->> selctedColumns", selctedColumns)


    // // setTesting(candidatesListDetails.filter(x => selctedColumns.includes(x?.job_title)));
    // // setTesting(candidatesListDetails.filter(x => x !== selctedColumns.includes(x)));

    // console.log("-------->>>  setTesting", candidatesListDetails.filter(x => selctedColumns.includes(x)))



    // ===== First Filter =======
    const [isChecked1, setIsChecked1] = useState(false);
    const [condition, setCondition] = useState("is");
    const [QuickSearchOptions, setQuickSearchOptions] = useState([]);
    const [QuickSearch, setQuickSearch] = useState("");
    const [subSearch, setsubSearch] = useState("");

    const [sendSearchResponse, setSendSearchResponse] = useState({ first: "", second: "" });
    const [secondOption1, setSecondOption1] = useState("");

    let SubOption = QuickSearchOptions.filter((x) => QuickSearch.includes(x?.select));


    // ===== Second Filter =======

    const [isChecked2, setIsChecked2] = useState(false);
    const [condition2, setCondition2] = useState("is");
    const [QuickSearchOptions2, setQuickSearchOptions2] = useState([]);
    const [QuickSearch2, setQuickSearch2] = useState("");
    const [subSearch2, setsubSearch2] = useState("");

    const [sendSearchResponse2, setSendSearchResponse2] = useState({ first: "", second: "" });
    const [secondOption2, setSecondOption2] = useState("");

    let SubOption2 = QuickSearchOptions2.filter((x) => QuickSearch2.includes(x?.select));



    const [lastPage, setlastPage] = useState();

    const [open, setopen] = useState(false);

    const openSubOptions = () => {
        setopen(true);
    }
    const closeSubOptions = () => {
        setopen(false);
    }

    const AddFilterRow = () => {
        setFilterRow(() => filterRow + 1)
        setisActiveFilterRow(true);
        console.log("ADD", filterRow);
    }

    const RemoveFilterRow = () => {
        if (filterRow >= 1) {
            setFilterRow(() => filterRow - 1)
            setisActiveFilterRow(false);

            setsubSearch2("");
            setQuickSearch2("");
            setSecondOption2("");
            // getDropDownList({
            //     sendSearchResponse,
            //     secondOption1,
            // })

        }
        console.log("Remove", filterRow);
    }

    const handleCheck = (event) => {
        setChecked(event.target.checked);
        // localStorage.setItem("isShow", event.target.checked);
    }

    const handleCheck1 = (event) => {
        setIsChecked1(event.target.checked);
    }

    const handleCheck2 = (event) => {
        setIsChecked2(event.target.checked);
    }

    const handelSelectSubOption = (second) => {
        // getDropDownList({
        //     sendSearchResponse,
        //     second,
        //     sendSearchResponse2,
        //     secondOption2,
        // })
    }

    const handelSelectSubOption2 = (second2) => {
        // getDropDownList({
        //     sendSearchResponse,
        //     secondOption1,
        //     sendSearchResponse2,
        //     second2
        // })
    }

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
    const CustomSelect = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 300,
            },
        },
    };
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


    const handleChangeFilter = (event) => {
        const {
            target: { value },
        } = event;

        localStorage.setItem("Select", typeof value === 'string' ? value.split(',') : value);

        setPersonFilter(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        setSelctedColumns(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
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
            }
        ]);
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
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ColumnOptions = [
        { id: 1, title: "Job Title" },
        { id: 2, title: "Employer Type" },

        { id: 3, title: "Time in Current Role" },
        { id: 4, title: "Time in Industry" },

        { id: 5, title: "Desired Employer Type" },

        { id: 6, title: "Line Management" },
        { id: 7, title: "Notice Period" },

        { id: 8, title: "Current Country" },
        { id: 9, title: "Desired Country" },

        { id: 10, title: "Current Region" },

        { id: 11, title: "Current Salary" },
        { id: 12, title: "Current Bonus / Commission" },

        { id: 13, title: "Desired Salary" },
        { id: 14, title: "Desired Bonus / Commission" },

        { id: 15, title: "Current Freelancer" },
        { id: 16, title: "Open to Freelance" },
        { id: 17, title: "Day Rate" },

        { id: 18, title: "Current Working Arrangements" },
        { id: 19, title: "Desired Working Arrangements" },

        { id: 20, title: "Law Degree" },
        { id: 21, title: "Qualified Lawyer" },
        { id: 22, title: "Jurisdiction" },
        { id: 23, title: "Post-Qualified Experience" },
        { id: 24, title: "Legal Specialism" },
        { id: 25, title: "Area of Law" },

        { id: 26, title: "LegalTech Vendor/Consultancy" },
        { id: 27, title: "Customer Type" },
        { id: 28, title: "Deal Size" },
        { id: 29, title: "Sales quota" },

        { id: 30, title: "LegalTech Tools" },
        { id: 31, title: "Tech Tools" },
        { id: 32, title: "Qualifications" },
        { id: 33, title: "Languages" },

        // { id: 41, title: "Direct Reports" },

    ];

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const theme = useTheme();


    const handlePageChange = (event, value) => {
        getCandidatesList(value);
    };


    useEffect(() => {
        getCandidatesList(1);
        getQuickSearch();
        getCurrenciesList();

        // getColumnOptions();

        // getDropDownListTest(storage);
    }, [])

    const getCurrenciesList = async () => {
        await axiosInstanceAuth
            .get(`/v1/master_tables_list`)
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));

                const currenciesList = myData?.mst_currencies;

                if (res?.data?.success) {
                    setCurrenciesOptions(currenciesList);
                }
                else {
                }

            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };


    const handleEdit = (uuid) => {
        navigate(`/guest-candidate-details/${uuid}`);
    };

    const getCandidatesList = async (page) => {
        const encryptedData = Encrypt(
            JSON.stringify({
            })
        );
        await axiosInstanceAuth
            .post(`/v1/guest/candidates/list?page=${page}&search=`, {
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
                    toast.error("error")
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };

    // const getDropDownList = async ({ sendSearchResponse, second, secondOption1, sendSearchResponse2,
    //     second2, secondOption2 }) => {
    //     console.log("||| res 1---------->>>", sendSearchResponse?.first, "&", second, "||", second?.title, "||", secondOption1?.title)
    //     console.log("||| res 2---------->>>", sendSearchResponse2?.first, "&", second2, "||", second2?.title, "||", secondOption2?.title)


    //     const encryptedData = Encrypt(
    //         JSON.stringify({
    //             [sendSearchResponse?.first]: second?.title || secondOption1?.title || second,
    //             [sendSearchResponse2?.first]: second2?.title || secondOption2?.title || second2,
    //         }));
    //     await axiosInstanceAuth
    //         .post(`/v1/guest/candidates/list?page=`, {
    //             response: encryptedData,
    //         })
    //         .then((res) => {
    //             const myData = JSON.parse(Decrypt(res?.data?.data));
    //             const candidatesList = myData?.data;

    //             if (res?.data?.success) {
    //                 setCandidatesListDetails(candidatesList);
    //                 setOldCandidatesListDetails(candidatesList);
    //                 setlastPage(myData?.last_page);
    //             } else {
    //                 toast.error("error")
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("err--->", err);
    //         });

    // };

    const getQuickSearch = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
            })
        );
        await axiosInstanceAuth
            .get(`/v1/filter/quick/search`, {
                response: encryptedData,
            })
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));

                if (res?.data?.success) {
                    setQuickSearchOptions(myData);
                    setQuickSearchOptions2(myData);
                } else {
                    toast.error("error")
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };

    // const getColumnOptions = async () => {
    //     const encryptedData = Encrypt(
    //         JSON.stringify({
    //         })
    //     );
    //     await axiosInstanceAuth
    //         .post(`/v1/guest/candidates/list/filter`, {
    //             response: encryptedData,
    //         })
    //         .then((res) => {
    //             const myData = JSON.parse(Decrypt(res?.data?.data));
    //             if (res?.data?.success) {
    //                 setColumnOptions(myData);
    //             } else {
    //                 toast.error("error")
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("err--->", err);
    //         });
    // };

    const quickTypeSearch = (e) => {

        if (e.target.value) {
            const searchData = oldCandidatesListDetails.filter((i) => {
                // console.log("------->>>>>> SEARCH TEXT", i);

                let job_title = i?.job_title?.toLowerCase().includes(e.target.value.toLowerCase())
                let employer_type_list = i?.employer_type_list?.title?.toLowerCase().includes(e.target.value.toLowerCase())
                let time_in_current_role_diff = i?.time_in_current_role_diff?.toLowerCase().includes(e.target.value.toLowerCase())

                let current_salary = i?.current_salary.toString().includes(e.target.value)
                let current_bonus_or_commission = i?.current_bonus_or_commission.toString().includes(e.target.value)
                let desired_salary = i?.desired_salary.toString().includes(e.target.value)
                let desired_bonus_or_commission = i?.desired_bonus_or_commission.toString().includes(e.target.value)

                // let deal_size = i?.deal_size.toString().includes(e.target.value)
                // let sales_quota = i?.sales_quota.toString().includes(e.target.value)
                // let deal_size_symbol_list = i?.deal_size_symbol_list?.currency_code?.toLowerCase().includes(e.target.value.toLowerCase())
                // let sales_quota_symbol_list = i?.sales_quota_symbol_list?.currency_code?.toLowerCase().includes(e.target.value.toLowerCase())

                let current_salary_symbol_list = i?.current_salary_symbol_list?.currency_code?.toLowerCase().includes(e.target.value.toLowerCase())
                let current_bonus_or_commission_symbol_list = i?.current_bonus_or_commission_symbol_list?.currency_code?.toLowerCase().includes(e.target.value.toLowerCase())
                let desired_salary_symbol_list = i?.desired_salary_symbol_list?.currency_code?.toLowerCase().includes(e.target.value.toLowerCase())
                let desired_bonus_or_commission_symbol_list = i?.desired_bonus_or_commission_symbol_list?.currency_code?.toLowerCase().includes(e.target.value.toLowerCase())



                let jurisdiction = i?.jurisdiction?.toLowerCase().includes(e.target.value.toLowerCase())
                let pqe = i?.pqe?.toString().toLowerCase().includes(e.target.value.toLowerCase())
                let area_of_law = i?.area_of_law?.toLowerCase().includes(e.target.value.toLowerCase())

                let notice_period = i?.notice_period.toString().includes(e.target.value)

                let customer_type_list = i?.customer_type_list.map((d, i) => (d?.title).toLowerCase().includes(e.target.value.toLowerCase()))
                let tech_tools_list = i?.tech_tools.map((d, i) => (d).toLowerCase().includes(e.target.value.toLowerCase()))
                let legal_tech_tools_list = i?.legal_tech_tools.map((d, i) => (d).toLowerCase().includes(e.target.value.toLowerCase()))
                let qualification_list = i?.qualification.map((d, i) => (d).toLowerCase().includes(e.target.value.toLowerCase()))
                let desired_working_arrangements_list = i?.desired_working_arrangements_list.map((d, i) => (d?.title).toLowerCase().includes(e.target.value.toLowerCase()))


                return (
                    job_title
                    || employer_type_list
                    || time_in_current_role_diff

                    || current_salary
                    || current_bonus_or_commission
                    || desired_salary
                    || desired_bonus_or_commission

                    // || deal_size
                    // || sales_quota
                    // || deal_size_symbol_list
                    // || sales_quota_symbol_list

                    || current_salary_symbol_list
                    || current_bonus_or_commission_symbol_list
                    || desired_salary_symbol_list
                    || desired_bonus_or_commission_symbol_list

                    || jurisdiction
                    || pqe
                    || area_of_law

                    || notice_period

                    || customer_type_list?.[0]
                    || tech_tools_list?.[0]
                    || legal_tech_tools_list?.[0]
                    || qualification_list?.[0]
                    || desired_working_arrangements_list?.[0]
                );

            });
            setCandidatesListDetails(searchData);
        } else {
            setCandidatesListDetails(oldCandidatesListDetails);
        }
    }


    const [myFilterData, setMyFilterData] = useState(getFilterValue || [
        {
            is_show: "",
            first_option: "",
            filter_type: "is",
            second_option: "",
            third_option: "",
            currency: "",
            currency_code: "",
        }
    ])
    // console.log("|---------->>> myFilterData", myFilterData)

    const [storage, setStorage] = useState({
        is_show: "",
        first_option: "",
        filter_type: "is",
        second_option: "",
        third_option: "",
        currency: "",
        currency_code: "",
    })
    // console.log("|---------->>> storage", storage)


    //* handle click event of the Remove button
    const handleRemoveClick = (e) => {
        let list = [...myFilterData]
        list.splice(e, 1)
        setMyFilterData(list)
    }
    //* handle click event of the Add button
    const handleAddClick = (e) => {
        // setMyFilterData([...myFilterData, storage])
        setMyFilterData([...myFilterData, {
            is_show: "",
            first_option: "",
            filter_type: "is",
            second_option: "",
        }])
    }

    const handelSearchFilter = (e) => {
        localStorage.setItem("Filter", JSON.stringify(e));
        getDropDownListTest(e);
    }


    const getDropDownListTest = async (myFilterData) => {

        const encryptedData = Encrypt(
            JSON.stringify({
                main_filter: myFilterData,
            }));

        await axiosInstanceAuth
            .post(`/v1/guest/candidates/list?page=`, {
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
                    toast.error("error")
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });

    };


    return (
        <>
            <GuestHeader isLoggedGuestIn={isLoggedGuestIn} />

            <div className={`${styles['list-of-candidates']}`}>
                <div className='container'>
                    <div className='main-tabs'>

                        {/* ===== Filter input ==== */}
                        <div className='row d-flex justify-content-between'>
                            <div className='col-lg-3 select-down-icon filter-select'>
                                <FormControl>
                                    <Select
                                        value={selectedOption || ""}
                                        onChange={(e, value) => {
                                            setSelectedOption(e.target.value);
                                        }}
                                    >
                                        {mainOptions.map((d, i) => (
                                            <MenuItem
                                                key={i}
                                                value={d?.title}
                                                onClick={(e) => sendQuickSearchTitle(d?.title)}
                                            >
                                                <ListItemText primary={d?.title} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div className='col-lg-3 select-down-icon filter-select'>
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
                                    <div key={index} className='mt-20 d-flex add-remove-input justify-content-between align-items-center'>
                                        <div className="simple-checkbox">
                                            <Checkbox
                                                // checked={storage?.is_show}
                                                checked={i?.is_show}
                                                onChange={(event) => {
                                                    i.is_show = event.target.checked;

                                                    setStorage({
                                                        ...storage,
                                                        is_show: event.target.checked,
                                                    })
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </div>


                                        <div className={`${i?.filter_type === 'is_between' ? 'second-input-multi' : 'second-input'} second-input-multi-limit`}>
                                            <div className="filter-select select-down-icon">
                                                <div className='w-100'>

                                                    <FormControl >
                                                        <Select
                                                            // disabled={storage?.is_show == false}
                                                            disabled={i?.is_show == false}
                                                            value={[i?.first_option]}
                                                            name="first"
                                                            onChange={(e, value) => {
                                                                i.first_option = value?.props?.value;

                                                                setStorage({
                                                                    ...storage,
                                                                    first_option: value?.props?.value,
                                                                })

                                                                setQuickSearch(value?.props?.value);
                                                                setSendSearchResponse({
                                                                    ...sendSearchResponse,
                                                                    [e.target.name]: value?.props?.value,
                                                                });
                                                            }}
                                                            input={<OutlinedInput />}
                                                            MenuProps={MenuProps}
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            {QuickSearchOptions.length > 0 && QuickSearchOptions.map((option, i) => (
                                                                <MenuItem
                                                                    key={i}
                                                                    value={option.select}
                                                                    style={getStyles(option.name, personName, theme)}
                                                                >
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${i?.filter_type === 'is_between' ? 'first-input-multi' : (i?.first_option === 'desired_salary') || (i?.first_option === 'desired_bonus_or_commission') || (i?.first_option === 'freelance_daily_rate') || (i?.first_option === 'deal_size') || (i?.first_option === 'sales_quota') ? 'first-input' : 'first-input-multi-limit'}`}>
                                            <div className="select-down-icon filter-select">
                                                <div className='w-100'>
                                                    <FormControl>
                                                        <Select
                                                            disabled={i?.is_show == false}
                                                            // disabled={storage?.is_show == false}
                                                            // value={storage?.filter_type || "is"}
                                                            value={i?.filter_type || "is"}
                                                            onChange={(e) => {

                                                                i.filter_type = e.target.value;

                                                                setStorage({
                                                                    ...storage,
                                                                    filter_type: e.target.value,
                                                                })
                                                            }}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {/* <MenuItem value="is">IS</MenuItem>
                                                            <MenuItem value="is_not">IS NOT</MenuItem>
                                                            <MenuItem value="contains">CONTAINS</MenuItem> */}

                                                            {console.log("-------->>> i?.first_option", i?.first_option)}


                                                            {i?.first_option === 'time_in_industry'
                                                                ?
                                                                filterType2Options.map((d) => (
                                                                    <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                ))
                                                                :
                                                                i?.first_option === 'time_in_current_role'
                                                                    ?
                                                                    filterType2Options.map((d) => (
                                                                        <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                    ))
                                                                    :
                                                                    i?.first_option === 'time_in_current_role'
                                                                        ?
                                                                        filterType2Options.map((d) => (
                                                                            <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                        ))
                                                                        :
                                                                        i?.first_option === 'line_management'
                                                                            ?
                                                                            filterType2Options.map((d) => (
                                                                                <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                            ))
                                                                            :
                                                                            i?.first_option === 'notice_period'
                                                                                ?
                                                                                filterType2Options.map((d) => (
                                                                                    <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                ))
                                                                                :
                                                                                i?.first_option === 'freelance_current'
                                                                                    ?
                                                                                    filterType2Options.map((d) => (
                                                                                        <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                    ))
                                                                                    :
                                                                                    i?.first_option === 'freelance_future'
                                                                                        ?
                                                                                        filterType2Options.map((d) => (
                                                                                            <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                        ))
                                                                                        :
                                                                                        i?.first_option === 'status'
                                                                                            ?
                                                                                            filterType2Options.map((d) => (
                                                                                                <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                            ))
                                                                                            :
                                                                                            i?.first_option === 'legaltech_vendor_or_consultancy'
                                                                                                ?
                                                                                                filterType2Options.map((d) => (
                                                                                                    <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                ))
                                                                                                :
                                                                                                i?.first_option === 'desired_salary'
                                                                                                    ?
                                                                                                    filterTypeRangeOptions.map((d) => (
                                                                                                        <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                    ))
                                                                                                    :
                                                                                                    i?.first_option === 'desired_bonus_or_commission'
                                                                                                        ?
                                                                                                        filterTypeRangeOptions.map((d) => (
                                                                                                            <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                        ))
                                                                                                        :
                                                                                                        i?.first_option === 'freelance_daily_rate'
                                                                                                            ?
                                                                                                            filterTypeRangeOptions.map((d) => (
                                                                                                                <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                            ))
                                                                                                            :
                                                                                                            i?.first_option === 'pqe'
                                                                                                                ?
                                                                                                                filterTypeRangeOptions.map((d) => (
                                                                                                                    <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                                ))
                                                                                                                :

                                                                                                                i?.first_option === 'deal_size'
                                                                                                                    ?
                                                                                                                    filterTypeRangeOptions.map((d) => (
                                                                                                                        <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                                    ))
                                                                                                                    :
                                                                                                                    i?.first_option === 'sales_quota'
                                                                                                                        ?
                                                                                                                        filterTypeRangeOptions.map((d) => (
                                                                                                                            <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                                        ))
                                                                                                                        :

                                                                                                                        filterType3Options.map((d) => (
                                                                                                                            <MenuItem value={d?.value}>{d?.title}</MenuItem>
                                                                                                                        ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            (i?.first_option === "desired_salary") || (i?.first_option === "desired_bonus_or_commission") || (i?.first_option === "freelance_daily_rate") || (i?.first_option === "deal_size") || (i?.first_option === "sales_quota")
                                                ?
                                                <div className={`${(i?.filter_type === 'is_between') || (i?.filter_type === 'is_more_than') || (i?.filter_type === 'is_less_than') ? 'currency-input' : 'currency-input-multi'}`}>
                                                    <div className="select-down-icon filter-select">
                                                        <div className='w-100'>
                                                            <FormControl>
                                                                <Autocomplete
                                                                    options={currenciesOptions}
                                                                    getOptionLabel={
                                                                        (option) => (option.currency_code || i?.currency_code)
                                                                    }
                                                                    value={i?.currency || i?.currency_code}
                                                                    onChange={(e, newValue) => {

                                                                        i.currency = newValue?.id;
                                                                        i.currency_code = newValue?.currency_code;

                                                                        setStorage({
                                                                            ...storage,
                                                                            currency: newValue?.id,
                                                                            currency_code: newValue?.currency_code,
                                                                        })
                                                                    }}
                                                                    renderInput={
                                                                        params => (
                                                                            <TextField {...params} placeholder="Currency" />
                                                                        )
                                                                    }
                                                                    className="single-auto-compelete-width"
                                                                />
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null}

                                        <div className={`${i?.filter_type === 'is_between' ? 'third-input-multi' : 'third-input'} third-input-multi-limit`}>
                                            <div className="filter-select select-down-icon">
                                                <div className='w-100'>

                                                    <FormControl>

                                                        <Autocomplete
                                                            // disabled={storage?.is_show == false}
                                                            disabled={QuickSearch === ""}
                                                            name="second"
                                                            value={i?.second_option}
                                                            onChange={(e, newValue) => {

                                                                setsubSearch(newValue);
                                                                setSendSearchResponse({
                                                                    ...sendSearchResponse,
                                                                    [e.target.name]: newValue,
                                                                });
                                                                setSecondOption1(newValue);
                                                                handelSelectSubOption(newValue)


                                                                if (typeof newValue === 'string') {
                                                                    i.second_option = newValue;

                                                                    setStorage({
                                                                        ...storage,
                                                                        second_option: newValue,
                                                                    })
                                                                    // setMyFilterData([...myFilterData, {
                                                                    //     is_show: storage?.is_show,
                                                                    //     first_option: storage?.first_option,
                                                                    //     filter_type: storage?.filter_type,
                                                                    //     second_option: newValue,
                                                                    // }])

                                                                    setValue({
                                                                        title: newValue,
                                                                    });
                                                                } else if (newValue && newValue.inputValue) {
                                                                    // Create a new value from the user input
                                                                    i.second_option = newValue.inputValue;

                                                                    setStorage({
                                                                        ...storage,
                                                                        second_option: newValue.inputValue,
                                                                    })
                                                                    // setMyFilterData([...myFilterData, {
                                                                    //     is_show: storage?.is_show,
                                                                    //     first_option: storage?.first_option,
                                                                    //     filter_type: storage?.filter_type,
                                                                    //     second_option: newValue?.inputValue,
                                                                    // }])

                                                                    setValue({
                                                                        title: newValue.inputValue,
                                                                    });
                                                                } else {
                                                                    i.second_option = newValue.title;

                                                                    setStorage({
                                                                        ...storage,
                                                                        second_option: newValue?.title,
                                                                    })
                                                                    // setMyFilterData([...myFilterData, {
                                                                    //     is_show: storage?.is_show,
                                                                    //     first_option: storage?.first_option,
                                                                    //     filter_type: storage?.filter_type,
                                                                    //     second_option: newValue?.title,
                                                                    // }])


                                                                    setValue(newValue);
                                                                }

                                                                // setMyFilterData([...myFilterData, {
                                                                //     is_show: storage?.is_show,
                                                                //     first_option: storage?.first_option,
                                                                //     filter_type: storage?.filter_type,
                                                                //     second_option: storage?.second_option,
                                                                // }])


                                                            }}
                                                            filterOptions={(options, params) => {

                                                                const filtered = filter(options, params);
                                                                const { inputValue } = params;
                                                                // Suggest the creation of a new value
                                                                const isExisting = options.some(
                                                                    (option) => inputValue === option.title
                                                                );
                                                                if (inputValue !== '' && !isExisting) {
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
                                                            options={SubOption?.[0]?.list}
                                                            getOptionLabel={(option) => {
                                                                // Value selected with enter, right from the input
                                                                if (typeof option === 'string') {
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
                                                            renderInput={(params) =>
                                                                <TextField
                                                                    {...params}
                                                                    placeholder={(i?.first_option === "desired_salary") || (i?.first_option === "desired_bonus_or_commission") || (i?.first_option === "freelance_daily_rate") || (i?.first_option === "deal_size") || (i?.first_option === "sales_quota") || (i?.first_option === "pqe") ? "Please enter number" : ""}
                                                                />}
                                                            className="single-auto-compelete-width"
                                                        />
                                                    </FormControl>

                                                </div>
                                            </div>
                                        </div>

                                        {i?.filter_type === 'is_between' ? "To" : null}

                                        {i?.filter_type === 'is_between' ?
                                            <div className={`${i?.filter_type === 'is_between' ? 'third-input-multi' : 'third-input'}`}>
                                                <div className="filter-select select-down-icon">
                                                    <div className='w-100'>

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


                                                                    if (typeof newValue === 'string') {
                                                                        i.third_option = newValue;

                                                                        setStorage({
                                                                            ...storage,
                                                                            third_option: newValue,
                                                                        })

                                                                    } else if (newValue && newValue.inputValue) {
                                                                        // Create a new value from the user input
                                                                        i.third_option = newValue.inputValue;

                                                                        setStorage({
                                                                            ...storage,
                                                                            third_option: newValue.inputValue,
                                                                        })

                                                                    } else {
                                                                        i.third_option = newValue.title;

                                                                        setStorage({
                                                                            ...storage,
                                                                            third_option: newValue?.title,
                                                                        })
                                                                    }

                                                                }}
                                                                filterOptions={(options, params) => {

                                                                    const filtered = filter(options, params);
                                                                    const { inputValue } = params;
                                                                    // Suggest the creation of a new value
                                                                    const isExisting = options.some(
                                                                        (option) => inputValue === option.title
                                                                    );
                                                                    if (inputValue !== '' && !isExisting) {
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
                                                                options={SubOption?.[0]?.list}
                                                                getOptionLabel={(option) => {
                                                                    // Value selected with enter, right from the input
                                                                    if (typeof option === 'string') {
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
                                                                renderInput={(params) =>
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="please enter number"
                                                                    />}
                                                                className="single-auto-compelete-width"
                                                            />
                                                        </FormControl>

                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }

                                        <div className='add-with-serach-box'>
                                            {index == myFilterData.length - 1 ? (
                                                <button
                                                    className='bg-transparent border-0'
                                                    onClick={(e) => handelSearchFilter(myFilterData)}
                                                >
                                                    <img className='small-search-icon' src={searchIcon} alt="" />
                                                </button>
                                            ) : (
                                                null
                                            )}

                                            {index == myFilterData.length - 1 ? (
                                                <button
                                                    className='bg-transparent border-0 px-2'
                                                    onClick={(e) => handelClearFilter()}
                                                >
                                                    <img className='small-search-icon' src={Trash} alt="" />
                                                </button>
                                            ) : (
                                                null
                                            )}

                                            {index != 0 ? (
                                                <button
                                                    className='bg-transparent border-0'
                                                    onClick={(e) => handleRemoveClick(index)}
                                                >
                                                    <img src={removeInput} alt="" />
                                                </button>
                                            ) : (
                                                <button
                                                    className='bg-transparent border-0'
                                                    onClick={(e) => handleAddClick()}
                                                >
                                                    <img className='add-input' src={addInput} alt="" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        })}

                        <p className="border-bottom mt-30"></p>


                        <div className='d-flex align-items-center mt-20 justify-content-between'>
                            <div className='d-flex align-items-center'>
                                {/* <div>
                                    <div className="simple-checkbox">
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                </div> */}
                                <div className='data-filter select-down-icon ms-3 simple-checkbox'>
                                    {/* <div className='data-filter select-down-icon ms-3 simple-checkbox-select'> */}

                                    <FormControl >
                                        <InputLabel
                                            variant="standard"
                                            htmlFor="uncontrolled-native"
                                            sx={{ px: "10px", pt: "5px" }}
                                        >
                                            Add / Remove Columns
                                        </InputLabel>

                                        {/* {console.log("|------>>> personFilter", personFilter)} */}
                                        {/* {console.log("|------>>> selctedColumns", selctedColumns)} */}
                                        <div className='d-flex'>
                                            <Select
                                                sx={{ minWidth: "300px" }}
                                                // disabled={!checked}
                                                multiple
                                                value={personFilter}
                                                onChange={handleChangeFilter}
                                                input={<OutlinedInput />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                        <strong>Selected {personFilter.length} Columns</strong>
                                                        {/* {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))} */}
                                                    </Box>
                                                )}
                                                MenuProps={CustomSelect}
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
                                            </Select>

                                            <button
                                                className='bg-transparent border-0 px-3 text-muted cursor-pointer'
                                                onClick={(e) => handelClearColumns()}
                                            >
                                                Clear
                                            </button>
                                        </div>

                                        {/* {console.log("|------>>> testSelctedColumns", testSelctedColumns)}
                                        <Autocomplete
                                            multiple
                                            limitTags={1}
                                            options={ColumnOptions}
                                            getOptionLabel={
                                                (option) => (option.title || "")
                                            }
                                            disableCloseOnSelect
                                            renderOption={(props, option, { selected }) => (
                                                < li  {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    // checked={testSelctedColumns.indexOf(option.title) > -1}
                                                    />
                                                    {option.title}
                                                </li>
                                            )}

                                            onChange={(e, newValue) => {
                                                console.log("newValue -------- >>", newValue);
                                                setTestSelctedColumns(newValue);
                                            }}
                                            style={{ width: 270 }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Add / Remove Columns"
                                                />
                                            )}
                                        /> */}
                                    </FormControl>
                                </div>
                            </div>
                            <div className='update-pagination'>
                                <Stack spacing={3}>
                                    <Pagination count={lastPage} onChange={handlePageChange} shape="rounded" />
                                </Stack>
                            </div>
                        </div>

                        <div className="tables mt-20">
                            {personFilter.length > 0 ?
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Candidate #</TableCell>
                                                {selctedColumns.length > 0 && selctedColumns.map((d, i) => (
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
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    className="pointer"
                                                    onClick={(e) => handleEdit(d.uuid)}
                                                >
                                                    <TableCell component="th" scope="row" >
                                                        #{d?.id}
                                                    </TableCell>

                                                    {selctedColumns.includes("Job Title") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.job_title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Employer Type") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.employer_type_list?.title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Time in Current Role") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.time_in_current_role_diff}
                                                        </TableCell>
                                                        : null}


                                                    {selctedColumns.includes("Time in Industry") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.time_in_industry_diff}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Desired Employer Type") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.desired_employer_types.map((d) => (`${d?.desired_employer_types_view?.title}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Line Management") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.line_management}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Notice Period") ?
                                                        <TableCell component="th" scope="row" >
                                                            {(d.notice_period == 0) || (d.notice_period == 1) ? `${d.notice_period} Week` : d.notice_period == null ? "" : `${d.notice_period} Weeks`}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Country") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.current_country_list?.country_name}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Desired Country") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.desired_country_list.map((d) => (`${d?.country_name}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Region") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.current_regions_list?.title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Salary") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Bonus / Commission") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Desired Salary") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.desired_salary_symbol_list?.currency_code} {d.desired_salary}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Desired Bonus / Commission") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.desired_bonus_or_commission_symbol_list?.currency_code} {d.desired_bonus_or_commission}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Freelancer") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.current_freelance?.[0]?.title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Open to Freelance") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.open_to_freelance?.[0]?.title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Day Rate") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.freelance_daily_rate_symbol_list?.currency_code} {d?.day_rate}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Current Working Arrangements") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.current_working_arrangements_list?.title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Desired Working Arrangements") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.desired_working_arrangements_list.map((d) => (`${d?.title}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Law Degree") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d.law_degree === 0 ? "No" : "Yes"}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Qualified Lawyer") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d.qualified_lawyer === 0 ? "No" : "Yes"}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Jurisdiction") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d.jurisdiction}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Post-Qualified Experience") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.pqe}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Legal Specialism") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.legal_specialism}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Area of Law") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d.area_of_law}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("LegalTech Vendor/Consultancy") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.legaltech_vendor_or_consultancy_list?.[0]?.title}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Customer Type") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.customer_type_list.map((d) => (`${d?.title}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Deal Size") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.deal_size_symbol_list?.currency_code} {d?.deal_size}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Sales quota") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.sales_quota_symbol_list?.currency_code} {d?.sales_quota}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("LegalTech Tools") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.legal_tech_tools.map((d) => (`${d}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Tech Tools") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.tech_tools.map((d) => (`${d}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Qualifications") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.qualification.map((d) => (`${d}, `))}
                                                        </TableCell>
                                                        : null}

                                                    {selctedColumns.includes("Languages") ?
                                                        <TableCell component="th" scope="row" >
                                                            {d?.languages_list.map((d) => (`${d?.title}, `))}
                                                        </TableCell>
                                                        : null}

                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                                :
                                checked === false && selectedOption === "Legal" ?
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
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        className="pointer"
                                                        onClick={(e) => handleEdit(d.uuid)}
                                                    >
                                                        <TableCell component="th" scope="row" >
                                                            #{d?.id}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.job_title}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.time_in_current_role_diff}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.law_degree === 0 ? "No" : "Yes"}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.qualified_lawyer === 0 ? "No" : "Yes"}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.jurisdiction}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.pqe_diff}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d.area_of_law}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {d?.legal_tech_tools.map((d) => (`${d}, `))}
                                                        </TableCell>
                                                        <TableCell align="right" >
                                                            {d?.qualification.map((d) => (`${d}, `))}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :
                                    checked === false && selectedOption === "Tech" ?
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
                                                        <TableCell align="right">Desired Working Arrangements</TableCell>
                                                        <TableCell align="right">Notice period</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {candidatesListDetails.map((d, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            className="pointer"
                                                            onClick={(e) => handleEdit(d.uuid)}
                                                        >
                                                            <TableCell component="th" scope="row" >
                                                                #{d?.id}
                                                            </TableCell>
                                                            <TableCell align="right" >
                                                                {d.job_title}
                                                            </TableCell>
                                                            <TableCell align="right" >
                                                                {d.time_in_current_role_diff}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {d?.tech_tools.map((d) => (`${d}, `))}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {d?.legal_tech_tools.map((d) => (`${d}, `))}
                                                            </TableCell>
                                                            <TableCell align="right" >
                                                                {d?.qualification.map((d) => (`${d}, `))}
                                                            </TableCell>
                                                            <TableCell align="right" >
                                                                {d?.desired_working_arrangements_list.map((d) => (`${d?.title}, `))}
                                                            </TableCell>
                                                            <TableCell align="right" >
                                                                {(d.notice_period == 0) || (d.notice_period == 1) ? `${d.notice_period} Week` : d.notice_period == null ? "" : `${d.notice_period} Weeks`}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        :
                                        checked === false && selectedOption === "Commercial" ?
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Candidate #</TableCell>
                                                            <TableCell align="right">Job Title</TableCell>
                                                            <TableCell align="right">Years in Role</TableCell>
                                                            {/* <TableCell align="right">Desired Role</TableCell> */}
                                                            <TableCell align="right">Desired salary</TableCell>
                                                            <TableCell align="right">Desired Bonus / commission</TableCell>
                                                            <TableCell align="right">Customer Type</TableCell>
                                                            <TableCell align="right">Deal Size</TableCell>
                                                            <TableCell align="right">Sales quota</TableCell>
                                                            <TableCell align="right">Notice Period</TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {candidatesListDetails.map((d, index) => (
                                                            <TableRow TableRow
                                                                key={index}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                className="pointer"
                                                                onClick={(e) => handleEdit(d.uuid)}
                                                            >
                                                                <TableCell component="th" scope="row" >
                                                                    #{d?.id}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {d.job_title}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {d.time_in_current_role_diff}
                                                                </TableCell>
                                                                {/* <TableCell align="right" >
                                                            {d?.desired_employer_type_list.map((d) => (`${ d?.title }, `))}
                                                        </TableCell> */}
                                                                <TableCell align="right" >
                                                                    {d?.desired_salary_symbol_list?.currency_code} {d.desired_salary}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {d?.desired_bonus_or_commission_symbol_list?.currency_code} {d.desired_bonus_or_commission}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {d?.customer_type_list.map((d) => (`${d?.title}, `))}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {d?.deal_size_symbol_list?.currency_code} {d?.deal_size}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {d?.sales_quota_symbol_list?.currency_code} {d?.sales_quota}
                                                                </TableCell>
                                                                <TableCell align="right" >
                                                                    {(d.notice_period == 0) || (d.notice_period == 1) ? `${d.notice_period} Week` : d.notice_period == null ? "" : `${d.notice_period} Weeks`}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            :
                                            checked === false && selectedOption === "Overview" ?
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Candidate #</TableCell>
                                                                <TableCell align="right">Employer Type</TableCell>
                                                                <TableCell align="right">Job Title</TableCell>
                                                                <TableCell align="right">Years in Role</TableCell>
                                                                <TableCell align="right">Current Salary</TableCell>
                                                                <TableCell align="right">Desired salary</TableCell>
                                                                <TableCell align="right">C. Bonus / Commission</TableCell>
                                                                <TableCell align="right">D. Bonus / commission</TableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        <TableBody>
                                                            {candidatesListDetails.map((d, index) => (
                                                                <TableRow
                                                                    key={index}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    className="pointer"
                                                                    onClick={(e) => handleEdit(d.uuid)}
                                                                >
                                                                    <TableCell component="th" scope="row" >
                                                                        #{d?.id}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d?.employer_type_list?.title}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d.job_title}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d.time_in_current_role_diff}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d?.desired_salary_symbol_list?.currency_code} {d.desired_salary}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d?.current_bonus_or_commission_symbol_list?.currency_code} {d.current_bonus_or_commission}
                                                                    </TableCell>
                                                                    <TableCell align="right" >
                                                                        {d?.desired_bonus_or_commission_symbol_list?.currency_code} {d.desired_bonus_or_commission}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                :
                                                null
                                // <TableContainer component={Paper}>
                                //     <Table aria-label="simple table">
                                //         <TableHead>
                                //             <TableRow>
                                //                 <TableCell>Candidate #</TableCell>
                                //                 {selctedColumns.length > 0 && selctedColumns.map((d, i) => (
                                //                     <TableCell key={i}>{d}</TableCell>
                                //                 ))}
                                //                 {/* {testSelctedColumns.length > 0 && testSelctedColumns.map((d, i) => (
                                //     <TableCell key={i}>{d?.title}</TableCell>
                                // ))} */}
                                //             </TableRow>
                                //         </TableHead>

                                //         <TableBody>
                                //             {candidatesListDetails.map((d, index) => (
                                //                 <TableRow
                                //                     key={index}
                                //                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                //                     className="pointer"
                                //                     onClick={(e) => handleEdit(d.uuid)}
                                //                 >
                                //                     <TableCell component="th" scope="row" >
                                //                         #{d?.id}
                                //                     </TableCell>

                                //                     {selctedColumns.includes("Job Title") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.job_title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Employer Type") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.employer_type_list?.title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Time in Current Role") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.time_in_current_role_diff}
                                //                         </TableCell>
                                //                         : null}


                                //                     {selctedColumns.includes("Time in Industry") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.time_in_industry_diff}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Desired Employer Type") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.desired_employer_types.map((d) => (`${d?.desired_employer_types_view?.title}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Line Management") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.line_management}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Notice Period") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d.notice_period == null ? "" : `${d.notice_period} Week`}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Current Country") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.current_country_list?.country_name}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Desired Country") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.desired_country_list.map((d) => (`${d?.country_name}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Current Region") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.current_regions_list?.title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Current Salary") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Current Bonus / Commission") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.current_salary_symbol_list?.currency_code} {d.current_salary}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Desired Salary") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.desired_salary_symbol_list?.currency_code} {d.desired_salary}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Desired Bonus / Commission") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.desired_bonus_or_commission_symbol_list?.currency_code} {d.desired_bonus_or_commission}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Current Freelancer") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.current_freelance?.[0]?.title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Open to Freelance") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.open_to_freelance?.[0]?.title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Day Rate") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.freelance_daily_rate_symbol_list?.currency_code} {d?.day_rate}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Current Working Arrangements") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.current_working_arrangements_list?.title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Desired Working Arrangements") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.desired_working_arrangements_list.map((d) => (`${d?.title}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Law Degree") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d.law_degree === 0 ? "No" : "Yes"}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Qualified Lawyer") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d.qualified_lawyer === 0 ? "No" : "Yes"}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Jurisdiction") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d.jurisdiction}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Post-Qualified Experience") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.pqe}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Legal Specialism") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.legal_specialism}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Area of Law") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d.area_of_law}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("LegalTech Vendor/Consultancy") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.legaltech_vendor_or_consultancy_list?.[0]?.title}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Customer Type") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.customer_type_list.map((d) => (`${d?.title}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Deal Size") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.deal_size_symbol_list?.currency_code} {d?.deal_size}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Sales quota") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.sales_quota_symbol_list?.currency_code} {d?.sales_quota}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("LegalTech Tools") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.legal_tech_tools.map((d) => (`${d}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Tech Tools") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.tech_tools.map((d) => (`${d}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Qualifications") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.qualification.map((d) => (`${d}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                     {selctedColumns.includes("Languages") ?
                                //                         <TableCell component="th" scope="row" >
                                //                             {d?.languages_list.map((d) => (`${d?.title}, `))}
                                //                         </TableCell>
                                //                         : null}

                                //                 </TableRow>
                                //             ))}
                                //         </TableBody>

                                //     </Table>
                                // </TableContainer>
                            }

                        </div>
                    </div >
                </div >
                <div className='fixed-footer'>
                    <Copyright mb_20="mb-20" />
                </div>
            </div >

        </>
    )
}

export default GuestDashboard