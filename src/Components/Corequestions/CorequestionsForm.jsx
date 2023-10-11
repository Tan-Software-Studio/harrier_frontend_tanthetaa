import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Common/Header/Header";

// ====== Css =====
import styles from "./Corequestions.module.scss";
import closeIcon from "../../img/common/close-icon.png";
import uploadIcon from "../../img/common/file-upload.png";

// ===== Tabs =====
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";
import {
    Backdrop,
    Button,
    Chip,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    InputBase,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    TextareaAutosize,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { components } from "react-select";
import Checkbox from "@mui/material/Checkbox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Copyright from "../Common/Copyright/Copyright";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import success from "../../img/common/check-circle.gif";
// import DatePicker from 'react-date-picker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ===== For API =====

import axiosInstance from "../../apiServices/axiosInstance";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import { toast } from "react-toastify";
import CustomSelect from "../Common/CustomSelect/CustomSelect";
import dayjs from "dayjs";
import axiosInstanceAuth from "../../apiServices/axiosInstanceAuth";

const CorequestionsForm = ({ coreQuestionData }) => {

    const navigate = useNavigate();

    const filter = createFilterOptions();

    let currentTime = new Date();
    const [value, setValue] = useState(0);
    const [startRoledate, setStartRoledate] = useState(null);
    // const [joinDate, setJoinDate] = useState(null);
    const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
    const [isjoinDateDialogOpen, setIsJoinDateDialogOpen] = useState(false);
    const [validity, setValidity] = useState(currentTime);
    const [validThrough, setValidThrough] = useState(moment());
    const [mobile, setmobile] = useState();
    const [isError, setIsError] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (idx) => {
        setToggleState(idx);
    };

    const [cv, setCv] = useState();
    const [preview, setPreview] = useState();

    const handleCvChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setCv(file);
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const [Opentorolesstate, setOpentoRolesState] = useState([]);
    const [willingBasedstate, setselectWillingBasedsState] = useState([]);
    const [workingArrangementsstate, setWorkingArrangementsState] = useState([]);
    const [customertypestate, setCustomerTypeState] = useState([]);
    const [languagesspeakstate, setlanguagesSpeakState] = useState([]);

    // ===== Date Formater ====

    const [dateFormater, setDateFormater] = useState();
    const [joindateFormater, setJoinDateFormater] = useState();

    // ===== Multiple select =====

    const [desiredRoleOptions, setDesiredRoleOptions] = useState([]);
    const [desiredRoleSelected, setDesiredRoleSelected] = useState([]);

    const [willingBasedOptions, setWillingBasedOptions] = useState([]);
    const [willingBasedSelected, setWillingBasedSelected] = useState([]);
    const [desiredCountrySelected, setDesiredCountrySelected] = useState([]);

    const [workingArrangementsOptions, setWorkingArrangementsOptions] = useState(
        []
    );
    const [currenciesOptions, setCurrenciesOptions] = useState([]);
    const [
        desiredWorkingArrangementsSelected,
        setDesiredWorkingArrangementsSelected,
    ] = useState([]);

    const [customerTypeOptions, setCustomerTypeOptions] = useState([]);
    const [customerTypeSelected, setCustomerTypeSelected] = useState([]);

    const [languagesOption, setLanguagesOption] = useState([]);
    const [languagesSelected, setLanguagesSelected] = useState([]);

    const [disabilityOption, setDisabilityOption] = useState([]);
    const [disabilitySelected, setdisabilitySelected] = useState([]);

    const [legalTechToolsOption, setLegalTechToolsOption] = useState([]);
    const [legalTechToolsSelected, setLegalTechToolsSelected] = useState([]);
    const [testLegalTechToolsSelected, setTestLegalTechToolsSelected] = useState(
        []
    );

    const [techToolsOption, setTechToolsOption] = useState([]);
    const [techToolsSelected, setTechToolsSelected] = useState([]);
    const [testTechToolsSelected, setTestTechToolsSelected] = useState([]);

    const [qualificationOption, setQualificationOption] = useState([]);
    const [qualificationSelected, setQualificationSelected] = useState([]);
    const [testQualificationSelected, setTestQualificationSelected] = useState(
        []
    );

    const [mst_school_types, set_Mst_school_types] = useState([]);
    const [mst_school_types_data, set_Mst_school_types_data] = useState([]);

    // ===== Role Specific ====

    const [lawlegal, setLawLegal] = useState("yes");

    const oncheck = (e) => {
        setLawLegal(e.target.value);
    };

    const [qualifiedLawyer, setQualifiedLawyer] = useState("yes");

    const qualifiedcheck = (e) => {
        setQualifiedLawyer(e.target.value);
    };

    // ======= commercial ======

    const [commercial, setCommercial] = useState("yes");

    const oncheckd = (e) => {
        setCommercial(e.target.value);
    };

    // ======= Date ======

    const [startDate, setStartDate] = useState("");
    const [joinDate, setJoinDate] = useState();
    const [pqeDate, setPqeDate] = useState();

    const [startRoleDate, setStartRoleDate] = useState();
    const [joinRoleDate, setJoinRoleDate] = useState();
    const [pqeDateSelect, setPqeDateSelect] = useState(new Date());
    const [location, setLocation] = useState(window.location.pathname)
    // function roleDate(event) {
    //     const my_date = new Date();
    //     setStartRoleDate(my_date);
    // }

    // function clickHandler(event) {
    //     const my_date = new Date();
    //     setJoinRoleDate(my_date);
    // }

    // ====== Success Modal =====

    const [successopen, setSuccessOpen] = useState(false);
    const successhandleOpen = () => setSuccessOpen(true);
    const successhandleClose = () => {
        setSuccessOpen(false);
        if (location == '/update-guest-profile/') {
            navigate("/guest-dashboard");
        } else {
            navigate("/");
        }

    };

    const [textAreaLength, setTextAreaLength] = useState();

    const [forminputData, setFormInputData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        job_title: "",
        employer: "",
        current_company_url: "",
        // employer_type: "",
        time_in_current_role: "",
        time_in_industry: "",
        line_management: "",
        desired_employer_type: "",
        // current_country: "",
        // current_region: "",
        desired_country: "",
        desired_region: "",
        current_salary: "",
        willing_based: "",
        current_bonus_or_commission: "",
        desired_salary: "",
        desired_bonus_or_commission: "",
        notice_period: "",
        status: "",
        working_arrangements: "",
        // desired_working_arrangements: "",
        // freelance_current: "",
        freelance_future: "",
        freelance_daily_rate: "",

        // ====== Role Specific =====

        jurisdiction: "",
        pqe: "",
        area_of_law: "",
        legal_experience: "",

        deal_size: "",
        sales_quota: "",
        Profile: "",
        disability_specific: "",
    });

    const setStartRoledatePickerStatus = (status) => {
        setIsDateDialogOpen(status);
    };
    const setJoinDatePickerStatus = (status) => {
        setIsJoinDateDialogOpen(status);
    };
    const dateFormat = "DD/MM/YYYY";
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            "aria-controls": `vertical-tabpanel-${index}`,
        };
    }

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        "label + &": {
            marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
            borderRadius: 4,
            position: "relative",
            backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
            border: "1px solid #ced4da",
            fontSize: 16,
            width: "auto",
            padding: "10px 12px",
            transition: theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
            "&:focus": {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));

    // useEffect(() => {
    //     document.title = "Core questions"
    // }, [])

    const CustomInput = (props) => {
        const { maxLength } = props.selectProps;
        const inputProps = { ...props, maxLength };
        return <components.Input {...inputProps} />;
    };

    const inputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormInputData({
            ...forminputData,
            [name]: value,
        });
    };

    const options = [
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
    ];

    const top100FilmsOptions = [
        { label: "one" },
        { label: "two" },
        { label: "three" },
        { label: "four" },
    ];

    const [myValue, setMyValue] = useState([{ label: "by defualt" }]);

    const Opentoroles = [
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
    ];

    const selectOpenRole = (e) => {
        setOpentoRolesState(e);
    };

    const willingBased = [
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
    ];

    const selectWillingBased = (e) => {
        setselectWillingBasedsState(e);
    };

    const workingArrangements = [
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
    ];

    const selectWorkingArrangements = (e) => {
        setWorkingArrangementsState(e);
    };

    const customerType = [
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
    ];

    const selectcustomerType = (e) => {
        setCustomerTypeState(e);
    };

    const languagesSpeak = [
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
    ];

    const selectLanguagesSpeak = (e) => {
        setlanguagesSpeakState(e);
    };



    // const [willingBasedOptions, setWillingBasedOptions] = useState([])
    // const [willingBasedSelected, setWillingBasedSelected] = useState([])

    const DesiredRoleSelectedMap =
        desiredRoleSelected && desiredRoleSelected.map((d, i) => d.id);
    const WillingBasedSelectedMap =
        willingBasedSelected && willingBasedSelected.map((d, i) => d.id);
    const desiredCountrySelectedMap =
        desiredCountrySelected && desiredCountrySelected.map((d, i) => d.id);

    const desiredWorkingArrangementsMap =
        desiredWorkingArrangementsSelected &&
        desiredWorkingArrangementsSelected.map((d, i) => d.id);
    const customerTypeSelectedMap =
        customerTypeSelected && customerTypeSelected.map((d, i) => d.id);
    const languagesSelectedMap =
        languagesSelected && languagesSelected.map((d, i) => d.id);
    const disabilitySelectedMap =
        disabilitySelected && disabilitySelected.map((d, i) => d.id);
    const legalTechToolsSelectedMap =
        legalTechToolsSelected && legalTechToolsSelected.map((d, i) => d.id);
    const techToolsSelectedMap =
        techToolsSelected && techToolsSelected.map((d, i) => d.id);
    const qualificationSelectedMap =
        qualificationSelected && qualificationSelected.map((d, i) => d.id);

    // =====  Dynamic Select ======

    const [employerTypeOption, setEmployerTypeOption] = useState([]);
    const [regionOption, setRegionOption] = useState([]);
    const [coutryOption, setCountryOption] = useState([]);
    const [desiredCoutryOption, setDesiredCountryOption] = useState([]);
    const [culturalbackgroundOption, setCulturalBackgroundOption] = useState([]);
    const [faithOption, setFaithOption] = useState([]);
    const [genderOption, setGenderOption] = useState([]);
    const [genderIdentityOption, setGenderIdentityOption] = useState([]);
    const [candidatesJobStatusoptions, setCandidatesJobStatusoptions] = useState(
        []
    );
    const [ckeck, setCkeck] = useState("");
    const [other, setOther] = useState("");

    const [specificRegionOption, setspecificRegionOption] = useState([]);
    const [sendSpecificRegion, setSendSpecificRegion] = useState({
        id: "",
        title: "",
    });

    const freelanceOptions = [
        { id: 1, title: "Yes" },
        { id: 0, title: "No" },
    ];

    const preferOptions = [
        { id: 1, title: "Yes" },
        { id: 2, title: "No" },
        { id: 3, title: "Prefer not to say" },
    ];

    const [preferSelected, setPreferSelected] = useState({ id: "", title: "" });
    const [higherEduSelected, setHighrEduSelected] = useState({
        id: "",
        title: "",
    });
    const [freeSchoolSelected, setFreeSchoolSelected] = useState({
        id: "",
        title: "",
    });
    const [indicateReligionSelected, setIndicateReligionSelected] = useState({
        id: "",
        title: "",
    });
    const [employmentVisaSelected, setEmploymentVisaSelected] = useState({
        id: "",
        title: "",
    });
    const [earnerOccupationSelected, setEarnerOccupationSelected] = useState({
        id: "",
        title: "",
    });

    const [sendEmpType, setSendEmpType] = useState({ id: "", title: "" });
    const [sendregion, setSendRegion] = useState({ id: "", title: "" });

    const [sendWorkArr, setSendWorkArr] = useState({ id: "", title: "" });
    const [sendCountry, setSendCountry] = useState({ id: "", country_name: "" });

    const [candidatesJobStatusSelected, setCandidatesJobStatusSelected] =
        useState({ id: "", title: "" });

    const [type, setType] = useState();
    const [sendFreelance, setSendFreelance] = useState({ id: "", title: "" });
    const [sendFreelanceFuture, setSendFreelanceFuture] = useState({
        id: "",
        title: "",
    });
    const [currentSalarySymbol, setCureentSalarySymbol] = useState({
        id: "",
        symbol: "",
    });

    const [annualBonusSymbol, setAnnualBonusSymbol] = useState({
        id: "",
        symbol: "",
    });
    const [desiredSalarySymbol, setDesiredSalarySymbol] = useState({
        id: "",
        symbol: "",
    });
    const [desiredAnnualBonusSymbol, setDesiredAnnualBonusSymbol] = useState({
        id: "",
        symbol: "",
    });
    const [desiredDayRateSymbol, setDesiredDayRateSymbol] = useState({
        id: "",
        symbol: "",
    });

    const [sexualOrientationsOptions, setSexualOrientationsOptions] = useState(
        []
    );
    const [sexualOrientations, setSexualOrientations] = useState({
        id: "",
        symbol: "",
    });

    const [mainEarnerOccupationsOptions, setMainEarnerOccupationsOptions] =
        useState([]);
    const [mainEarnerOccupations, setMainEarnerOccupations] = useState({
        id: "",
        symbol: "",
    });

    const [sexSelected, setSexSelected] = useState({ id: "", symbol: "" });
    const [genderIdentitySelected, setGenderIdentitySelected] = useState({
        id: "",
        title: "",
    });

    const [dealSizeSymbol, setDealSizeSymbol] = useState({ id: "", symbol: "" });
    const [saleQuotaSymbol, setSaleQuotaSymbol] = useState({
        id: "",
        symbol: "",
    });

    const [parentHe, setParentHe] = useState({ id: "", title: "" });

    // ===== Data Privacy =====

    const [dataPrivacy, setDataPrivacy] = useState(false);
    const [harrierSearch, setHarrierSearch] = useState(true);
    const [harrierCandidate, setHarrierCandidate] = useState(false);

    const [chearAboutUs, setChearAboutUs] = useState([]);

    console.log(harrierSearch, "harrierSearch");
    console.log(harrierCandidate, "harrierCandidate");
    // =========== Core Question API ========

    const startDates = dayjs(startRoleDate).format("YYYY-MM-DD");
    const joinDates = dayjs(joinRoleDate).format("YYYY-MM-DD");
    const pqeDatesSelected = dayjs(pqeDateSelect).format("YYYY-MM-DD");
    const [coreQuestionsData, setCoreQuestionsData] = useState(coreQuestionData)


    const handleSubmit = async (coreQuestionsData) => {


        let params = {
            first_name: forminputData.first_name,
            last_name: forminputData.last_name,
            email: forminputData.email,
            phone: forminputData.phone,
            job_title: forminputData.job_title,
            employer: forminputData.employer,
            current_company_url: forminputData.current_company_url,
            // employer_type: forminputData.employer_type,
            // employer_type: sendEmpType?.id,
            employer_type: sendEmpType?.id,
            // time_in_current_role: forminputData.time_in_current_role,
            time_in_current_role: startDates,
            // time_in_industry: forminputData.time_in_industry,
            time_in_industry: joinDates,
            line_management: forminputData.line_management,
            // desired_employer_type: forminputData.desired_employer_type,
            desired_employer_type: DesiredRoleSelectedMap,
            // current_country: forminputData.current_country,
            current_country: sendCountry?.id,
            // current_region: forminputData.current_region,

            // current_region: sendregion?.id,
            current_region: sendSpecificRegion?.id,

            desired_country: desiredCountrySelectedMap,
            // desired_country: forminputData.desired_country,
            // desired_region: WillingBasedSelectedMap,

            desired_region: forminputData.desired_region,
            current_salary: forminputData.current_salary,
            current_salary_symbol: currentSalarySymbol?.id,

            current_bonus_or_commission: forminputData.current_bonus_or_commission,
            current_bonus_or_commission_symbol: annualBonusSymbol.id,

            desired_salary: forminputData.desired_salary,
            desired_salary_symbol: desiredSalarySymbol.id,

            desired_bonus_or_commission: forminputData.desired_bonus_or_commission,
            // desired_bonus_or_commission_symbol: desiredDayRateSymbol.id,
            desired_bonus_or_commission_symbol: desiredAnnualBonusSymbol.id,

            notice_period: forminputData.notice_period,
            status: candidatesJobStatusSelected.id,
            working_arrangements: sendWorkArr.id,
            desired_working_arrangements: desiredWorkingArrangementsMap,
            // freelance_current: forminputData.freelance_current,
            freelance_current: sendFreelance.id,
            freelance_future: sendFreelanceFuture.id,
            freelance_daily_rate: forminputData.freelance_daily_rate,
            freelance_daily_rate_symbol: desiredDayRateSymbol?.id,

            // ===== Role Specific =====
            law_degree: lawlegal === "yes" ? 1 : 0,
            qualified_lawyer: qualifiedLawyer === "yes" ? 1 : 0,
            // law_degree: sendFreelance.id,
            // qualified_lawyer: sendFreelance.id,
            jurisdiction: forminputData.jurisdiction,
            pqe: forminputData.pqe,
            area_of_law: forminputData.area_of_law,
            legal_experience: forminputData.legal_experience,
            customer_type: customerTypeSelectedMap,
            deal_size: forminputData.deal_size,
            deal_size_symbol: dealSizeSymbol.id,
            sales_quota: forminputData.sales_quota,
            sales_quota_symbol: saleQuotaSymbol.id,
            languages: languagesSelectedMap,
            // legal_tech_tools: legalTechToolsSelectedMap,
            legal_tech_tools: testLegalTechToolsSelected,

            // tech_tools: techToolsSelectedMap,
            tech_tools: testTechToolsSelected,

            // qualification: qualificationSelectedMap,
            qualification: testQualificationSelected,

            profile_about: forminputData.Profile,
            legaltech_vendor_or_consultancy: commercial === "yes" ? 1 : 0,

            // ====== Diversity ======

            cultural_background: disabilitySelectedMap,
            sex: sexSelected?.id,
            gender: genderIdentitySelected?.id,
            gender_identity: genderIdentitySelected?.id,
            disability: preferSelected?.id,
            first_gen_he: higherEduSelected?.id,
            parents_he: parentHe?.id,
            free_school_meals: freeSchoolSelected?.id,
            faith: indicateReligionSelected?.id,
            visa: employmentVisaSelected?.id,
            // maine_earner_occupation: earnerOccupationSelected?.id,
            main_earner_occupation: mainEarnerOccupations?.id,

            disability_specific: forminputData.disability_specific,
            school_type: mst_school_types_data?.id,
            sexual_orientation: sexualOrientations?.id,

            // ====== Data Privacy ====

            privacy_policy: dataPrivacy == true ? 1 : null,
            harrier_search: harrierSearch == true ? 1 : null,
            harrier_candidate: harrierCandidate == true ? 1 : null,
            channel: ckeck,
            channel_other: forminputData?.otherSpecify,
            referral: forminputData?.referral,
        }

        if (coreQuestionData && coreQuestionData.status && coreQuestionData.status == true) {
            params.uuid = coreQuestionData.uuid;
        }

        const response = Encrypt(
            JSON.stringify(params)
        );

        const formData = new FormData();

        formData.append("response", response);
        formData.append("cv", cv == undefined ? "" : cv);

        await axiosInstance
            .post('v1/candidate/form/create', formData)
            .then((res) => {
                const data = Decrypt(res.data.data);
                const finalData = JSON.parse(data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res.data.success) {
                    // localStorage.setItem("token", finalData.access_token)
                    // toast.success(msg)
                    successhandleOpen();
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log(Error);
                // toast.error("Error")
            });
    };

    // ======= Get Option API =======

    // const getOption = async () => {
    //     await axiosInstance
    //         .get("v1/master_tables_list")
    //         .then((res) => {
    //             const data = Decrypt(res.data.data)
    //             const finalData = JSON.parse(data)

    //             if (res.data.success) {
    //             } else {
    //                 // toast.error(res?.data?.message)
    //             }
    //         })
    //         .catch((err) => {

    //             // toast.error("Error")
    //         })
    // }

    // useEffect(() => {
    //     getOption()
    // }, [])

    const getOptions = async () => {
        await axiosInstance
            .get(`/v1/master_tables_list`)
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));

                console.log("------->>>> MAASTER", myData);

                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const employersTypeList = myData?.mst_employer_types;
                const regionTypeList = myData?.mst_regions;
                const countryList = myData?.mst_countries;
                const desiredCountryList = myData?.mst_desired_countries;
                const currenciesList = myData?.mst_currencies;
                const culturalBackgroundsList = myData?.mst_cultural_backgrounds;
                const genderList = myData?.mst_sexes;
                const genderIdentityList = myData?.mst_genders;
                const willingBased = myData?.mst_regions;
                const workingArr = myData?.mst_working_arrangements;
                const candidatesJobStatusList = myData?.mst_candidate_statuses;
                const customertypeList = myData?.mst_customer_types;
                const languagesList = myData?.mst_languages;
                const culturalbackgroundList = myData?.mst_cultural_backgrounds;
                const mstFaithsList = myData?.mst_faiths;
                const legalTechToolsList = myData?.mst_legal_tech_tools;
                const techToolsList = myData?.mst_tech_tools;
                const qualificatioList = myData?.mst_qualifications;
                const sexualOrientationsList = myData?.mst_sexual_orientations;
                const set_Mst_school_types_list = myData?.mst_school_types;
                const mainEarnerOccupationsList = myData?.mst_main_earner_occupations;
                const mst_channels_data = myData?.mst_channels;

                if (res?.data?.success) {
                    setEmployerTypeOption(employersTypeList);
                    setDesiredRoleOptions(employersTypeList);
                    setRegionOption(regionTypeList);
                    setCountryOption(countryList);
                    setDesiredCountryOption(desiredCountryList);
                    setWillingBasedOptions(willingBased);
                    setWorkingArrangementsOptions(workingArr);
                    setCurrenciesOptions(currenciesList);
                    setCulturalBackgroundOption(culturalBackgroundsList);
                    setFaithOption(mstFaithsList);
                    setGenderOption(genderList);
                    setCandidatesJobStatusoptions(candidatesJobStatusList);
                    setCustomerTypeOptions(customertypeList);
                    setLanguagesOption(languagesList);
                    setGenderIdentityOption(genderIdentityList);
                    setDisabilityOption(culturalbackgroundList);
                    setLegalTechToolsOption(legalTechToolsList);
                    setTechToolsOption(techToolsList);
                    setQualificationOption(qualificatioList);
                    setSexualOrientationsOptions(sexualOrientationsList);
                    set_Mst_school_types(set_Mst_school_types_list);
                    setMainEarnerOccupationsOptions(mainEarnerOccupationsList);
                    setChearAboutUs(mst_channels_data);

                    // toast.success(msg);
                } else {
                    // toast.error(msg)
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };

    const getSpecificRegionOptions = async (value) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                country_id: value?.id,
            })
        );
        await axiosInstanceAuth
            .post(`/v1/list/mst_regions`, {
                response: encryptedData,
            })
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                const regionTypeList = myData?.list;

                if (res?.data?.success) {
                    setspecificRegionOption(regionTypeList);
                } else {
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };

    useEffect(() => {
        getOptions();
    }, []);

    // const [joinDate, setJoinDate] = useState()

    const onSetValue = (selectedOption) => { };

    const datepicker = (data) => {
        setStartDate(data);
        const inFormat = dayjs(startDate).format("YYYY-MM-DD");
        setDateFormater(inFormat);
    };

    const joindatepicker = (data) => {
        setJoinDate(data);
        const inFormat = dayjs(joinDate).format("YYYY-MM-DD");
        setJoinDateFormater(inFormat);
    };

    // ======= Multiple Select Input ======

    // const checkedFun = ((e) => {
    //     const values = e.target.value
    //     if (value === "Other") {
    //         setCkeck()
    //     } else {
    //         setCkeck(values)
    //     }

    const checkedFun = (e) => {
        const values = e.target.value;
        // console.log(ckeck, "ckeck---->")
        if (ckeck === values) {
            setCkeck();
        } else {
            setCkeck(values);
        }
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: 850,
        boxShadow: 24,
        p: 4,
    };

    // useEffect(() => {
    //     if (successopen) {
    //         setTimeout(() => {
    //             setSuccessOpen(true);
    //             // navigate("/");
    //         }, 3000);
    //     }
    // }, [successopen])

    // ====== First step =======

    const firstStep = async () => {
        const response = Encrypt(
            JSON.stringify({
                first_name: forminputData.first_name,
                last_name: forminputData.last_name,
                email: forminputData.email,
                phone: forminputData.phone,
                job_title: forminputData.job_title,
                employer: forminputData.employer,
                current_company_url: forminputData.current_company_url,
                // employer_type: forminputData.employer_type,
                // employer_type: sendEmpType?.id,
                employer_type: sendEmpType?.id,
                // time_in_current_role: forminputData.time_in_current_role,
                time_in_current_role: startDates,
                // time_in_industry: forminputData.time_in_industry,
                time_in_industry: joinDates,
                line_management: forminputData.line_management,
                // desired_employer_type: forminputData.desired_employer_type,
                desired_employer_type: DesiredRoleSelectedMap,
                // current_country: forminputData.current_country,
                current_country: sendCountry?.id,
                // current_region: forminputData.current_region,
                // current_region: sendregion?.id,
                current_region: sendSpecificRegion?.id,
                desired_country: desiredCountrySelectedMap,
                // desired_country: forminputData.desired_country,
                // desired_region: WillingBasedSelectedMap,
                desired_region: forminputData.desired_region,

                willing_based: forminputData.willing_based,
                current_salary: forminputData.current_salary,
                current_salary_symbol: currentSalarySymbol?.id,

                current_bonus_or_commission: forminputData.current_bonus_or_commission,
                current_bonus_or_commission_symbol: annualBonusSymbol.id,

                desired_salary: forminputData.desired_salary,
                desired_salary_symbol: desiredSalarySymbol.id,

                desired_bonus_or_commission: forminputData.desired_bonus_or_commission,
                // desired_bonus_or_commission_symbol: desiredDayRateSymbol.id,
                desired_bonus_or_commission_symbol: desiredAnnualBonusSymbol.id,

                notice_period: forminputData.notice_period,
                status: candidatesJobStatusSelected.id,
                working_arrangements: sendWorkArr.id,
                desired_working_arrangements: desiredWorkingArrangementsMap,
                // freelance_current: forminputData.freelance_current,
                freelance_current: sendFreelance.id,
                freelance_future: sendFreelanceFuture.id,
                freelance_daily_rate: forminputData.freelance_daily_rate,
                freelance_daily_rate_symbol: desiredDayRateSymbol?.id,
            })
        );

        const formData = new FormData();

        formData.append("response", response);

        await axiosInstance
            .post("v1/candidate/form/step/one/validate", formData)
            .then((res) => {
                const data = Decrypt(res.data.data);
                const finalData = JSON.parse(data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res.data.success) {
                    // localStorage.setItem("token", finalData.access_token)
                    // toast.success(msg)
                    // successhandleOpen()
                    toast.success("Core question step successfully done.");
                    setToggleState(toggleState + 1);
                } else {
                    toast.error(msg);
                }

                const body = document.querySelector("#root");
                body.scrollIntoView(
                    {
                        behavior: "smooth",
                    },
                    100
                );
            })
            .catch((err) => {
                console.log(Error);
                // toast.error("Error")
            });
    };

    // ====== Second step =======

    const secondStep = async () => {
        const response = Encrypt(
            JSON.stringify({
                law_degree: lawlegal === "yes" ? 1 : 0,
                qualified_lawyer: qualifiedLawyer === "yes" ? 1 : 0,
                // law_degree: sendFreelance.id,
                // qualified_lawyer: sendFreelance.id,
                jurisdiction: forminputData.jurisdiction,
                // pqe: pqeDatesSelected,
                pqe: forminputData.pqe,
                area_of_law: forminputData.area_of_law,
                legal_experience: forminputData.legal_experience,
                customer_type: customerTypeSelectedMap,
                deal_size: forminputData.deal_size,
                deal_size_symbol: dealSizeSymbol.id,
                sales_quota: forminputData.sales_quota,
                sales_quota_symbol: saleQuotaSymbol.id,
                languages: languagesSelectedMap,
                // legal_tech_tools: legalTechToolsSelectedMap,
                legal_tech_tools: testLegalTechToolsSelected,

                // tech_tools: techToolsSelectedMap,
                tech_tools: testTechToolsSelected,

                // qualification: qualificationSelectedMap,
                qualification: testQualificationSelected,

                profile_about: forminputData.Profile,
                legaltech_vendor_or_consultancy: commercial === "yes" ? 1 : 0,
            })
        );

        const formData = new FormData();

        formData.append("response", response);

        await axiosInstance
            .post("v1/candidate/form/step/two/validate", formData)
            .then((res) => {
                const data = Decrypt(res.data.data);
                const finalData = JSON.parse(data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res.data.success) {
                    // localStorage.setItem("token", finalData.access_token)
                    // toast.success(msg)
                    // successhandleOpen()
                    toast.success("Role Specific step successfully done.");
                    setToggleState(toggleState + 1);
                } else {
                    toast.error(msg);
                }

                const body = document.querySelector("#root");
                body.scrollIntoView(
                    {
                        behavior: "smooth",
                    },
                    100
                );
            })
            .catch((err) => {
                console.log(Error);
                // toast.error("Error")
            });
    };
    // ====== Third step =======

    const thirdStep = async () => {
        const response = Encrypt(
            JSON.stringify({
                cultural_background: disabilitySelectedMap,
                sex: sexSelected?.id,
                gender: genderIdentitySelected?.id,
                gender_identity: genderIdentitySelected?.id,
                disability: preferSelected?.id,
                first_gen_he: higherEduSelected?.id,
                parents_he: parentHe?.id,
                free_school_meals: freeSchoolSelected?.id,
                faith: indicateReligionSelected?.id,
                visa: employmentVisaSelected?.id,
                // Main_EarnerOccupation: earnerOccupationSelected?.id,
                main_earner_occupation: mainEarnerOccupations?.id,
                disability_specific: forminputData.disability_specific,
                school_type: mst_school_types_data?.id,
                sexual_orientation: sexualOrientations?.id,
            })
        );

        const formData = new FormData();

        formData.append("response", response);

        await axiosInstance
            .post("v1/candidate/form/step/three/validate", formData)
            .then((res) => {
                const data = Decrypt(res.data.data);
                const finalData = JSON.parse(data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res.data.success) {
                    // localStorage.setItem("token", finalData.access_token)
                    // toast.success(msg)
                    // successhandleOpen()
                    toast.success("Diversity & Inclusion step successfully done.");
                    setToggleState(toggleState + 1);
                } else {
                    toast.error(msg);
                }

                const body = document.querySelector("#root");
                body.scrollIntoView(
                    {
                        behavior: "smooth",
                    },
                    100
                );
            })
            .catch((err) => {
                console.log(Error);
                // toast.error("Error")
            });
    };



    return (
        <div>
            <div className={`${styles["core-question"]}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 ">
                            <div className="left-tabs ">
                                <button
                                    className={toggleState === 1 ? "tabs tabs-active " : "tabs"}
                                    onClick={() => toggleTab(1)}
                                >
                                    <span> Core Questions </span>
                                </button>
                                <button
                                    className={`${toggleState === 2 ? "tabs tabs-active " : "tabs"
                                        } mt-20`}
                                // onClick={() => toggleTab(2)}
                                >
                                    <div className="d-flex flex-column">
                                        <span> Role Specific </span>
                                        <a>1. Legal</a>
                                        <a>2. Commercial</a>
                                        <a>3. Tech/Other Qualifications</a>
                                    </div>
                                </button>
                                <button
                                    className={`${toggleState === 3 ? "tabs tabs-active" : "tabs"
                                        } mt-20`}
                                // onClick={() => toggleTab(3)}
                                >
                                    <span> Diversity & Inclusion </span>
                                </button>
                                <button
                                    className={`${toggleState === 4 ? "tabs tabs-active" : "tabs"
                                        } mt-20`}
                                // onClick={() => toggleTab(4)}
                                >
                                    <span> Data Privacy</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-9 mt-lg-0 mt-5">
                            <div className="question-bg">
                                <div className="content-tabs">
                                    {/* =========== First Tab ====== */}
                                    <div
                                        className={
                                            toggleState === 1
                                                ? "contents active-contents"
                                                : "contents"
                                        }
                                    >
                                        <h3 className="question-title px-60">Core Questions</h3>
                                        <p className="border-btm"></p>
                                        <div className="form-start px-60">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                What is your First Name?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="firstname"
                                                                // error
                                                                placeholder="Enter first name"
                                                                name="first_name"
                                                                value={forminputData.first_name}
                                                                onChange={inputData}
                                                            // helperText="Please Enter First name"
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="lastname">
                                                                What is your Last Name?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="lastname"
                                                                placeholder="Enter last name"
                                                                name="last_name"
                                                                value={forminputData.last_name}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="enteremail">
                                                                Enter your Email Address{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="enteremail"
                                                                placeholder="Enter email address"
                                                                type="email"
                                                                name="email"
                                                                value={forminputData.email}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="phone-number">
                                                                Enter your Phone Number{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="phone-number"
                                                                placeholder="Enter phone number"
                                                                type="number"
                                                                name="phone"
                                                                value={forminputData.phone}
                                                                onChange={inputData}
                                                                inputProps={{
                                                                    inputMode: "numeric",
                                                                    min: 0,
                                                                    pattern: "[0-9]*",
                                                                }}
                                                            />
                                                            {/* <input type="tel"
                                                                    id="phone-number" placeholder='Enter phone number' name="phone" required onkeypress="return event.charCode == 43 || event.charCode >= 48 && event.charCode <= 57" maxlength="13" value={forminputData.phone}
                                                                    onChange={inputData} className="contact-input" /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="job_title">
                                                                What is your job title?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="job_title"
                                                                placeholder="Enter job title"
                                                                name="job_title"
                                                                value={forminputData.job_title}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="enteremail">
                                                                Who is your current employer?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="enteremail"
                                                                placeholder="Enter current employer"
                                                                name="employer"
                                                                value={forminputData.employer}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="companyurl">
                                                                Enter current employer's URL. &#40; E.g.
                                                                www.slaughterandmay.com &#41;{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                id="companyurl"
                                                                placeholder="E.g. www.slaughterandmay.com"
                                                                name="current_company_url"
                                                                value={forminputData.current_company_url}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                What is your Employer type?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                        </FormControl>

                                                        <Autocomplete
                                                            options={employerTypeOption}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={sendEmpType || {}}
                                                            onChange={(e, value) => {
                                                                setSendEmpType(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />

                                                        {/* <CustomSelect
                                                                options={employerTypeOption}
                                                                setSendEmpType={setSendEmpType}
                                                            /> */}
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mt-auto calendar ">
                                                    <div className="w-100 position-relative">
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <InputLabel shrink htmlFor="startDate">
                                                                When did you start in this job?
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                        </LocalizationProvider>
                                                        <div>
                                                            {/* <DatePicker
                                                                    value={startDate}
                                                                    onChange={datepicker}
                                                                    renderInput={(params) => <TextField {...params} />} /> */}

                                                            {/* <DatePicker
                                                                    dateFormat="dd/MM/yyyy"
                                                                    className="form-control"
                                                                    selected={edit_check_date}
                                                                    // onChange={date => {
                                                                    //     set_edit_check_date(date);
                                                                    // }}
                                                                    onClick={(date) => clickHandler(date)}
                                                                /> */}

                                                            <DatePicker
                                                                dateFormat="dd/MM/yyyy"
                                                                className="form-control w-100"
                                                                selected={startRoleDate}
                                                                onChange={(date) => {
                                                                    setStartRoleDate(date);
                                                                }}
                                                                placeholderText="select a date"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto calendar">
                                                    <div className="w-100 position-relative">
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <InputLabel shrink htmlFor="joinDate">
                                                                When did you join this industry?
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <div>
                                                                    <DatePicker onChange={setJoinDate} value={joinDate} />
                                                                </div> */}

                                                            {/* <div>
                                                                    <DatePicker
                                                                        value={joinDate}
                                                                        onChange={joindatepicker}
                                                                        renderInput={(params) => <TextField {...params} />} />
                                                                </div> */}

                                                            <DatePicker
                                                                dateFormat="dd/MM/yyyy"
                                                                className="form-control"
                                                                selected={joinRoleDate}
                                                                onChange={(date) => {
                                                                    setJoinRoleDate(date);
                                                                }}
                                                                placeholderText="select a date"
                                                            />
                                                        </LocalizationProvider>

                                                        <div>
                                                            {/* <DatePicker
                                                                    dateFormat="dd/MM/yyyy"
                                                                    className="form-control"
                                                                    selected={edit_check_date}
                                                                    onChange={date => {
                                                                        set_edit_check_date(date);

                                                                    }}
                                                                /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="lineManage">
                                                            Do you currently line manage anyone? &#40; If no
                                                            please type 0, if yes please enter specific
                                                            number &#41;
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        <TextField
                                                            id="lineManage"
                                                            placeholder="If so, how many people did you manage? "
                                                            type="number"
                                                            name="line_management"
                                                            value={forminputData.line_management}
                                                            onChange={inputData}
                                                            onKeyPress={(event) => {
                                                                if (
                                                                    event?.key === "-" ||
                                                                    event?.key === "+"
                                                                ) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                            InputProps={{
                                                                inputProps: { min: 0 },
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon  multiple-selects ">
                                                    <FormControl p={4} variant="standard">
                                                        <InputLabel shrink htmlFor="uname">
                                                            Are you open to roles with these employer types?
                                                            &#40; Pick multiple if desired &#41;{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>

                                                        {/* <Select
                                                                isMulti
                                                                options={desiredRoleOptions}
                                                                getOptionLabel={
                                                                    (option) => (option.title)
                                                                }
                                                                name="global-tag-variant"
                                                                tagVariant="outline"                                                
                                                                placeholder="Select some colors..."
                                                                value={desiredRoleSelected}
                                                                onChange={(e) => {
                                                                    setDesiredRoleSelected(e);
                                                              }}
                                                            /> */}

                                                        <Autocomplete
                                                            multiple
                                                            limitTags={1}
                                                            options={desiredRoleOptions}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={desiredRoleSelected || []}
                                                            onChange={(e, value) => {
                                                                setDesiredRoleSelected(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} variant="outlined" />
                                                            )}
                                                        />

                                                        {/* <Select
                                                            
                                                                options={desiredRoleOptions}
                                                                getOptionLabel={
                                                                    (option) => (option.title || "")
                                                                }
                                                                value={sendDesiredEmpType || []}
                                                                onChange={(e, value) => {
                                                                    setSendDesiredEmpType(value);
                                                                }}
                                                                renderInput={
                                                                    params => (
                                                                        <TextField {...params} variant="outlined" />
                                                                    )
                                                                }
                                                            /> */}
                                                    </FormControl>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="uname">
                                                            What country are you based in?{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <Select
                                                                options={coutryOption}
                                                                name='current_country'
                                                                getOptionLabel={
                                                                    (option) => (option.country_name || "")
                                                                }
                                                                myValue={sendCountry || {}}
                                                                components={{ Input: CustomInput }}
                                                                maxLength="4"
                                                                onChange={(e) => { setSendCountry(e) }}
                                                            /> */}

                                                        <Autocomplete
                                                            options={coutryOption}
                                                            getOptionLabel={(option) =>
                                                                option.country_name || ""
                                                            }
                                                            value={sendCountry || {}}
                                                            onChange={(e, value) => {
                                                                setSendCountry(value);
                                                                getSpecificRegionOptions(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />

                                                        {/* <CustomSelect
                                                                options={coutryOption}
                                                                flage={true}
                                                                setSendCountry={setSendCountry}
                                                                setType={setType}
                                                            /> */}
                                                    </FormControl>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="uname">
                                                            What is your current region/state/city?
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <Select
                                                                options={regionOption}
                                                                getOptionLabel={
                                                                    (option) => (option.title || "")
                                                                }
                                                                myValue={sendregion || {}}
                                                                components={{ Input: CustomInput }}
                                                                maxLength="4"
                                                                name='current_region'
                                                                onChange={(e) => { setSendRegion(e) }}
                                                            /> */}

                                                        <Autocomplete
                                                            options={specificRegionOption}
                                                            getOptionLabel={(option) =>
                                                                option.state_name || ""
                                                            }
                                                            value={sendSpecificRegion || {}}
                                                            onChange={(e, value) => {
                                                                setSendSpecificRegion(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />

                                                        {/* <Autocomplete
                                                                options={regionOption}
                                                                getOptionLabel={
                                                                    (option) => (option.title || "")
                                                                }
                                                                value={sendregion || {}}
                                                                onChange={(e, value) => {
                                                                    setSendRegion(value);
                                                                }}
                                                                renderInput={
                                                                    params => (
                                                                        <TextField {...params}
                                                                            placeholder="Select" />
                                                                    )
                                                                }
                                                                className="single-auto-compelete-width"
                                                            /> */}

                                                        {/* <CustomSelect
                                                                options={regionOption}
                                                                setSendEmpType={setSendRegion}
                                                            /> */}
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon  multiple-selects ">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="lineManage">
                                                            Are you open to working in other countries?
                                                            &#40; You may pick none, one or multiple &#41;
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>

                                                        <Autocomplete
                                                            multiple
                                                            limitTags={1}
                                                            options={desiredCoutryOption}
                                                            getOptionLabel={(option) =>
                                                                option.country_name || ""
                                                            }
                                                            value={desiredCountrySelected || []}
                                                            onChange={(e, value) => {
                                                                setDesiredCountrySelected(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} variant="outlined" />
                                                            )}
                                                        />
                                                        {/* <TextField id="lineManage" placeholder='Please State Countries' name='desired_region' value={forminputData.desired_region} onChange={inputData} /> */}
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon  multiple-selects">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="uname">
                                                            Where in your country are you willing to be
                                                            based? &#40; E.g. for UK candidates: London,
                                                            Manchester &#41;{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <Select
                                                                isMulti
                                                                // name="global-tag-variant"
                                                                // tagVariant="outline"
                                                                options={willingBased}
                                                                // placeholder="Select some colors..."
                                                                onChange={selectWillingBased}
                                                                value={willingBasedstate}

                                                            /> */}

                                                        {/* <Autocomplete
                                                                multiple
                                                                options={willingBasedOptions}
                                                                getOptionLabel={
                                                                    (option) => (option.title || "")
                                                                }
                                                                value={willingBasedSelected || []}
                                                                onChange={(e, value) => {
                                                                    setWillingBasedSelected(value);
                                                                }}
                                                                renderInput={
                                                                    params => (
                                                                        <TextField {...params} variant="outlined" />
                                                                    )
                                                                }
                                                            /> */}

                                                        <TextField
                                                            id="desired_region"
                                                            placeholder="E.g. for UK candidates: London, Manchester"
                                                            name="desired_region"
                                                            value={forminputData.desired_region}
                                                            onChange={inputData}
                                                        />
                                                    </FormControl>
                                                </div>

                                                <p className="mt-50 disclaimer">
                                                    Only your desired salary will be shared with
                                                    prospective employers, not your current base.
                                                    Candidates will be able to request guest access to
                                                    the platform and browse the anonymised candidates
                                                    database and see current salaries of their peers for
                                                    their own research. For example, if you are a Legal
                                                    Technologist in London you can search by job title
                                                    to see what other Legal Technologists in your region
                                                    are being paid.
                                                </p>

                                                <p className="mt-20 disclaimer">
                                                    Please choose your Job Seeking Status (Active,
                                                    Passive, Very Passive, Closed) carefully. Employers
                                                    are likely to use this as a key criterion in their
                                                    search. Harrier will be in touch quarterly to make
                                                    sure your profile is up to date. Definitions of the
                                                    Status are as follows :
                                                </p>

                                                <p className="mt-1 disclaimer">
                                                    Active (actively looking for a new role)
                                                </p>
                                                <p className="disclaimer">
                                                    Passive (open to receiving CV requests from
                                                    Employers)
                                                </p>
                                                <p className="disclaimer">
                                                    Very Passive (unlikely to accept CV requests unless
                                                    the role is exceptional)
                                                </p>
                                                <p className="disclaimer">
                                                    Closed (no intention of leaving current employer)
                                                </p>

                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="symbol">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="currentBaseSalary">
                                                                What is your current annual base salary?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <div className="d-flex  border-radius-add">
                                                                <Autocomplete
                                                                    options={currenciesOptions}
                                                                    getOptionLabel={(option) =>
                                                                        option.currency_code || ""
                                                                    }
                                                                    value={currentSalarySymbol || {}}
                                                                    onChange={(e, value) => {
                                                                        setCureentSalarySymbol(value);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="$" />
                                                                    )}
                                                                    className="currency_width"
                                                                />
                                                                {/* <CustomSelect
                                                                        options={currenciesOptions}
                                                                        setCureentSalarySymbol={setCureentSalarySymbol}
                                                                        symbol={true}
                                                                        className="currency_width"
                                                                    /> */}
                                                                <TextField
                                                                    id="currentBaseSalary"
                                                                    placeholder="Enter your base salary"
                                                                    type="number"
                                                                    name="current_salary"
                                                                    value={forminputData.current_salary}
                                                                    onChange={inputData}
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="position-relative symbol">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="commission">
                                                                What is your expected annual bonus, or
                                                                commission if relevant?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <div className="d-flex border-radius-add">
                                                                <Autocomplete
                                                                    options={currenciesOptions}
                                                                    getOptionLabel={(option) =>
                                                                        option.currency_code || ""
                                                                    }
                                                                    value={annualBonusSymbol || {}}
                                                                    onChange={(e, value) => {
                                                                        setAnnualBonusSymbol(value);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="$" />
                                                                    )}
                                                                    className="currency_width"
                                                                />
                                                                {/* <CustomSelect
                                                                        options={currenciesOptions}
                                                                        setCureentSalarySymbol={setAnnualBonusSymbol}
                                                                        symbol={true}
                                                                        className="currency_width"
                                                                    /> */}
                                                                <TextField
                                                                    id="commission"
                                                                    placeholder="Enter your expected amount"
                                                                    type="number"
                                                                    name="current_bonus_or_commission"
                                                                    value={
                                                                        forminputData.current_bonus_or_commission
                                                                    }
                                                                    onChange={inputData}
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <p className="small-disclaimer">
                                                            Please state bonus amount rather than as a
                                                            percentage of the base.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="symbol">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="desiredsalary">
                                                                What is your desired salary in your next role?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <div className="d-flex border-radius-add">
                                                                <Autocomplete
                                                                    options={currenciesOptions}
                                                                    getOptionLabel={(option) =>
                                                                        option.currency_code || ""
                                                                    }
                                                                    value={desiredSalarySymbol || {}}
                                                                    onChange={(e, value) => {
                                                                        setDesiredSalarySymbol(value);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="$" />
                                                                    )}
                                                                    className="currency_width"
                                                                />
                                                                {/* <CustomSelect
                                                                        options={currenciesOptions}
                                                                        setCureentSalarySymbol={setDesiredSalarySymbol}
                                                                        symbol={true}
                                                                        className="currency_width"
                                                                    /> */}
                                                                <TextField
                                                                    id="desiredsalary"
                                                                    placeholder="Enter your desired salary"
                                                                    type="number"
                                                                    name="desired_salary"
                                                                    value={forminputData.desired_salary}
                                                                    onChange={inputData}
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="symbol">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="desiredbonus">
                                                                What is your desired annual bonus, or
                                                                commission if relevant?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <div className="d-flex border-radius-add">
                                                                <Autocomplete
                                                                    options={currenciesOptions}
                                                                    getOptionLabel={(option) =>
                                                                        option.currency_code || ""
                                                                    }
                                                                    value={desiredAnnualBonusSymbol || {}}
                                                                    onChange={(e, value) => {
                                                                        setDesiredAnnualBonusSymbol(value);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="$" />
                                                                    )}
                                                                    className="currency_width"
                                                                />
                                                                {/* <CustomSelect
                                                                        options={currenciesOptions}
                                                                        setCureentSalarySymbol={setDesiredAnnualBonusSymbol}
                                                                        symbol={true}
                                                                        className="currency_width"
                                                                    /> */}
                                                                <TextField
                                                                    id="desiredbonus"
                                                                    placeholder="Enter your base salary"
                                                                    type="number"
                                                                    name="desired_bonus_or_commission"
                                                                    value={
                                                                        forminputData.desired_bonus_or_commission
                                                                    }
                                                                    onChange={inputData}
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="noticePeriod">
                                                            What is your current notice period? &#40; Please
                                                            give number of weeks &#41;{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        <TextField
                                                            id="noticePeriod"
                                                            placeholder="Notice period"
                                                            type="number"
                                                            name="notice_period"
                                                            value={forminputData.notice_period}
                                                            onChange={inputData}
                                                            inputProps={{
                                                                inputMode: "numeric",
                                                                min: 0,
                                                                pattern: "[0-9]*",
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 co-md-6 mt-auto select-down-icon">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="currentJob">
                                                            What is your current job-seeking status?{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <TextField id="currentJob" placeholder='Select your current job-seeking status' name='status' value={forminputData.status} onChange={inputData} /> */}

                                                        <Autocomplete
                                                            options={candidatesJobStatusoptions}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={candidatesJobStatusSelected || {}}
                                                            onChange={(e, value) => {
                                                                setCandidatesJobStatusSelected(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />

                                                        {/* <CustomSelect
                                                                options={candidatesJobStatusoptions}
                                                                setSendEmpType={setCandidatesJobStatusSelected}
                                                            /> */}
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="currentWorking">
                                                            What are your current working arrangements?{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>

                                                        {/* <TextField id="currentWorking" placeholder='Enter your current working arrangements' name='working_arrangements' value={forminputData.working_arrangements} onChange={inputData} /> */}

                                                        <Autocomplete
                                                            options={workingArrangementsOptions}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={sendWorkArr || {}}
                                                            onChange={(e, value) => {
                                                                setSendWorkArr(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />

                                                        {/* <CustomSelect
                                                                options={workingArrangementsOptions}
                                                                setSendEmpType={setSendWorkArr}
                                                            /> */}
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon  multiple-selects">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="currentJob">
                                                            What working arrangements would you consider?
                                                            &#40; You may pick more than one option &#41;{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <TextField id="currentJob" placeholder='Enter your working arrangements' name='desired_working_arrangements' value={forminputData.desired_working_arrangements} onChange={inputData} /> */}

                                                        {/* <Select
                                                                isMulti
                                                                // name="global-tag-variant"
                                                                // tagVariant="outline"
                                                                options={workingArrangements}
                                                                // placeholder="Select some colors..."
                                                                onChange={selectWorkingArrangements}
                                                                value={workingArrangementsstate}
                                                            /> */}

                                                        <Autocomplete
                                                            multiple
                                                            limitTags={1}
                                                            options={workingArrangementsOptions}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={desiredWorkingArrangementsSelected || []}
                                                            onChange={(e, value) => {
                                                                setDesiredWorkingArrangementsSelected(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} variant="outlined" />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="currentWork">
                                                            Do you current work freelance/as a contractor?{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <Select
                                                                options={freelanceOptions}
                                                                components={{ Input: CustomInput }}
                                                                maxLength="4"
                                                                name='freelance_current'
                                                                getOptionLabel={
                                                                    (option) => (option.title || "")
                                                                }
                                                                myValue={sendFreelance || {}}
                                                                onChange={(e) => { setSendFreelance(e) }}
                                                            /> */}

                                                        <Autocomplete
                                                            options={freelanceOptions}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={sendFreelance || {}}
                                                            onChange={(e, value) => {
                                                                setSendFreelance(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />
                                                    </FormControl>
                                                    {/* <CustomSelect setValue={onSetValue} options={freelanceOptions} /> */}

                                                    {/* <CustomSelect
                                                            options={freelanceOptions}
                                                            setSendEmpType={setSendFreelance}
                                                        /> */}
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <FormControl variant="standard">
                                                        <InputLabel shrink htmlFor="openFreelance">
                                                            Are you open to freelance work?{" "}
                                                            <span className="text-red"> * </span>
                                                        </InputLabel>
                                                        {/* <TextField id="openFreelance" placeholder='yes' name='freelance_future' value={forminputData.freelance_future
                                                            } onChange={inputData} /> */}

                                                        <Autocomplete
                                                            options={freelanceOptions}
                                                            getOptionLabel={(option) => option.title || ""}
                                                            value={sendFreelanceFuture || {}}
                                                            onChange={(e, value) => {
                                                                setSendFreelanceFuture(value);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Select" />
                                                            )}
                                                            className="single-auto-compelete-width"
                                                        />

                                                        {/* <CustomSelect
                                                                options={freelanceOptions}
                                                                setSendEmpType={setSendFreelanceFuture}
                                                            /> */}
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto">
                                                    <div className="symbol">
                                                        <FormControl
                                                            variant="standard"
                                                            className={
                                                                sendFreelanceFuture?.id == 1
                                                                    ? ""
                                                                    : "input-disabled"
                                                            }
                                                        >
                                                            <InputLabel shrink htmlFor="dayRate">
                                                                What is your desired day rate?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>

                                                            <div className="d-flex border-radius-add">
                                                                <Autocomplete
                                                                    disabled={
                                                                        sendFreelanceFuture?.id == 1
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    options={currenciesOptions}
                                                                    getOptionLabel={(option) =>
                                                                        option.currency_code || ""
                                                                    }
                                                                    value={desiredDayRateSymbol || {}}
                                                                    onChange={(e, value) => {
                                                                        setDesiredDayRateSymbol(value);
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="$" />
                                                                    )}
                                                                    className="currency_width"
                                                                />
                                                                {/* <CustomSelect
                                                                        options={currenciesOptions}
                                                                        setCureentSalarySymbol={setDesiredDayRateSymbol}
                                                                        symbol={true}
                                                                        className="currency_width"
                                                                    /> */}
                                                                <TextField
                                                                    id="dayRate"
                                                                    placeholder="What is your desired day rate"
                                                                    type="number"
                                                                    name="freelance_daily_rate"
                                                                    value={forminputData.freelance_daily_rate}
                                                                    onChange={inputData}
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                    disabled={
                                                                        sendFreelanceFuture?.id == 1
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-50 text-end">
                                                {/* <button className="commom-blue-button me-3">Cancel</button> */}
                                                <button
                                                    className="commom-sky-button"
                                                    onClick={() => {
                                                        firstStep();
                                                    }}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* =========== Second Tab ====== */}
                                    <div
                                        className={
                                            toggleState === 2
                                                ? "contents active-contents"
                                                : "contents"
                                        }
                                    >
                                        <h3 className="question-title px-60">Role Specific</h3>
                                        <p className="border-btm"></p>
                                        {/* ====== Role Specific 2.1 ===== */}
                                        <div id="legal">
                                            <div className="bg-sky mt-50">
                                                <h3 className="font-20 px-60">1. Legal</h3>
                                            </div>
                                            <div className="px-60">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="radioBtn">
                                                            <FormControl variant="standard">
                                                                <InputLabel shrink htmlFor="lawDegree">
                                                                    Do you hold a law degree?{" "}
                                                                    <span className="text-red"> * </span>
                                                                </InputLabel>
                                                                <RadioGroup
                                                                    aria-labelledby=""
                                                                    defaultValue="female"
                                                                    name="radio-buttons-group"
                                                                    className="mt-11"
                                                                >
                                                                    <div className="d-flex">
                                                                        <FormControlLabel
                                                                            value="yes"
                                                                            control={<Radio />}
                                                                            label="Yes"
                                                                            onChange={oncheck}
                                                                            checked={lawlegal === "yes"}
                                                                        />
                                                                        <FormControlLabel
                                                                            value="no"
                                                                            control={<Radio />}
                                                                            label="No"
                                                                            onChange={oncheck}
                                                                            checked={lawlegal === "no"}
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div>
                                                            <div className="radioBtn">
                                                                <FormControl variant="standard">
                                                                    <InputLabel shrink htmlFor="lawDegree">
                                                                        Are you a qualified lawyer?{" "}
                                                                        <span className="text-red"> * </span>
                                                                    </InputLabel>
                                                                    <RadioGroup
                                                                        aria-labelledby=""
                                                                        defaultValue="female"
                                                                        name="radio-buttons-group"
                                                                        className="mt-11"
                                                                    >
                                                                        <div className="d-flex">
                                                                            <FormControlLabel
                                                                                value="yes"
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                                onChange={qualifiedcheck}
                                                                                checked={qualifiedLawyer == "yes"}
                                                                            />
                                                                            <FormControlLabel
                                                                                value="no"
                                                                                control={<Radio />}
                                                                                label="No"
                                                                                onChange={qualifiedcheck}
                                                                                checked={qualifiedLawyer == "no"}
                                                                            />
                                                                        </div>
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto">
                                                        {/* <div className={`${lawlegal === "yes" ? "input-disabled" : ""}`}> */}
                                                        <div
                                                            className={
                                                                lawlegal == "yes" && qualifiedLawyer == "yes"
                                                                    ? ""
                                                                    : "input-disabled"
                                                            }
                                                        >
                                                            <FormControl variant="standard">
                                                                <InputLabel shrink htmlFor="qualified">
                                                                    If so, in which jurisdiction are you
                                                                    qualified?{" "}
                                                                    <span className="text-red"> * </span>
                                                                </InputLabel>
                                                                <TextField
                                                                    id="qualified"
                                                                    placeholder="Enter qualified jurisdiction"
                                                                    name="jurisdiction"
                                                                    value={forminputData.jurisdiction}
                                                                    onChange={inputData}
                                                                    disabled={
                                                                        lawlegal == "yes" &&
                                                                            qualifiedLawyer == "yes"
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto ">
                                                        <div
                                                            className={
                                                                lawlegal == "yes" && qualifiedLawyer == "yes"
                                                                    ? ""
                                                                    : "input-disabled"
                                                            }
                                                        >
                                                            <FormControl variant="standard">
                                                                <InputLabel shrink htmlFor="yearsPqe">
                                                                    Years PQE{" "}
                                                                    <span className="text-red"> * </span>
                                                                </InputLabel>
                                                                {/* <BootstrapInput id="yearsPqe" placeholder='Enter PQE year' /> */}
                                                                {/* <TextField id="yearsPqe" placeholder='Enter PQE year' name='pqe' value={forminputData.pqe} onChange={inputData} disabled={`${lawlegal === "yes" ? true : ""}`} /> */}
                                                                {/* <DatePicker
                                                                        className="form-control w-100"
                                                                        selected={pqeDateSelect}
                                                                        onChange={date => {
                                                                            setPqeDateSelect(date);
                                                                        }}
                                                                        disabled={lawlegal == "yes" && qualifiedLawyer == "yes" ? true : false}
                                                                    /> */}

                                                                <TextField
                                                                    id="yearsPqe"
                                                                    placeholder="Enter no. of years PQE"
                                                                    type="number"
                                                                    name="pqe"
                                                                    value={forminputData.pqe}
                                                                    onChange={inputData}
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        min: 0,
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                    disabled={
                                                                        lawlegal == "yes" &&
                                                                            qualifiedLawyer == "yes"
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                                {/* disabled={`${lawlegal === "yes" ? true : ""}`} */}
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto">
                                                        <div
                                                            className={
                                                                lawlegal == "yes" && qualifiedLawyer == "yes"
                                                                    ? ""
                                                                    : "input-disabled"
                                                            }
                                                        >
                                                            <FormControl variant="standard">
                                                                <InputLabel shrink htmlFor="yearsPqe">
                                                                    In which area of law do you/did you
                                                                    practise?{" "}
                                                                    <span className="text-red"> * </span>
                                                                </InputLabel>
                                                                {/* <BootstrapInput id="area_of_law" placeholder='Enter area of practise' /> */}
                                                                <TextField
                                                                    id="area_of_law"
                                                                    placeholder="Enter area of practise"
                                                                    name="area_of_law"
                                                                    value={forminputData.area_of_law}
                                                                    onChange={inputData}
                                                                    disabled={
                                                                        lawlegal == "yes" &&
                                                                            qualifiedLawyer == "yes"
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto">
                                                        <div
                                                            className={
                                                                lawlegal == "yes" && qualifiedLawyer == "yes"
                                                                    ? ""
                                                                    : "input-disabled"
                                                            }
                                                        >
                                                            <FormControl variant="standard">
                                                                <InputLabel
                                                                    shrink
                                                                    htmlFor="specialistExperience"
                                                                >
                                                                    Do you have any specialist experience within
                                                                    your area of law?{" "}
                                                                    <span className="text-red"> * </span>
                                                                </InputLabel>
                                                                {/* <BootstrapInput id="yearsPqe" placeholder='Enter Experience ' /> */}
                                                                <TextField
                                                                    id="legal_experience"
                                                                    placeholder="Enter Experience"
                                                                    name="legal_experience"
                                                                    value={forminputData.legal_experience}
                                                                    onChange={inputData}
                                                                    disabled={
                                                                        lawlegal == "yes" &&
                                                                            qualifiedLawyer == "yes"
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ====== Role Specific 2.2 ===== */}
                                        <div id="commercial">
                                            <div className="bg-sky mt-50">
                                                <h3 className="font-20 px-60">2. Commercial</h3>
                                            </div>
                                            <div className="px-60">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="radioBtn">
                                                            <FormControl variant="standard">
                                                                <InputLabel shrink htmlFor="lawDegree">
                                                                    Do you work for a LegalTech
                                                                    vendor/consultancy?{" "}
                                                                    <span className="text-red"> * </span>
                                                                </InputLabel>
                                                                <RadioGroup
                                                                    aria-labelledby=""
                                                                    defaultValue="yes"
                                                                    name="radio-buttons-group"
                                                                >
                                                                    <div className="d-flex mt-11">
                                                                        <FormControlLabel
                                                                            value="yes"
                                                                            control={<Radio />}
                                                                            label="Yes"
                                                                            onChange={oncheckd}
                                                                        />
                                                                        <FormControlLabel
                                                                            value="no"
                                                                            control={<Radio />}
                                                                            label="No"
                                                                            onChange={oncheckd}
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto select-down-icon multiple-selects">
                                                        <div
                                                            className={`${commercial === "no" ? "input-disabled" : ""
                                                                }`}
                                                        >
                                                            <div className="w-100">
                                                                <FormControl
                                                                    disabled={`${commercial === "no" ? true : ""
                                                                        }`}
                                                                >
                                                                    <InputLabel shrink htmlFor="">
                                                                        What type of customer do you work with?
                                                                        {commercial === "yes" ? (
                                                                            <span className="text-red"> * </span>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </InputLabel>
                                                                    <Autocomplete
                                                                        multiple
                                                                        limitTags={1}
                                                                        options={customerTypeOptions}
                                                                        getOptionLabel={(option) =>
                                                                            option.title || ""
                                                                        }
                                                                        value={customerTypeSelected || []}
                                                                        onChange={(e, value) => {
                                                                            setCustomerTypeSelected(value);
                                                                        }}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                variant="outlined"
                                                                            />
                                                                        )}
                                                                        disabled={`${commercial === "no" ? true : ""
                                                                            }`}
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto">
                                                        <div
                                                            className={`${commercial === "no" ? "input-disabled" : ""
                                                                }`}
                                                        >
                                                            <div className="symbol">
                                                                <FormControl
                                                                    variant="standard"
                                                                    disabled={`${commercial === "no" ? true : ""
                                                                        }`}
                                                                >
                                                                    <InputLabel shrink htmlFor="yearsPqe">
                                                                        What is the average deal size with
                                                                        customers you close/manage?
                                                                        {commercial === "yes" ? (
                                                                            <span className="text-red"> * </span>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </InputLabel>
                                                                    <div className="d-flex border-radius-add">
                                                                        <Autocomplete
                                                                            disabled={`${commercial === "no" ? true : ""
                                                                                }`}
                                                                            options={currenciesOptions}
                                                                            getOptionLabel={(option) =>
                                                                                option.currency_code || ""
                                                                            }
                                                                            value={dealSizeSymbol || {}}
                                                                            onChange={(e, value) => {
                                                                                setDealSizeSymbol(value);
                                                                            }}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    placeholder="$"
                                                                                />
                                                                            )}
                                                                            className="currency_width"
                                                                        />
                                                                        {/* <CustomSelect
                                                                                options={currenciesOptions}
                                                                                setCureentSalarySymbol={setDealSizeSymbol}
                                                                                symbol={true}
                                                                                className="currency_width"
                                                                                commercial={commercial}
                                                                            /> */}
                                                                        {/* <BootstrapInput id="yearsPqe" placeholder='Please give ARR' /> */}
                                                                        <TextField
                                                                            id="deal_size"
                                                                            placeholder="What is your desired day rate"
                                                                            type="number"
                                                                            name="deal_size"
                                                                            value={forminputData.deal_size}
                                                                            onChange={inputData}
                                                                            inputProps={{
                                                                                inputMode: "numeric",
                                                                                min: 0,
                                                                                pattern: "[0-9]*",
                                                                            }}
                                                                            disabled={`${commercial === "no" ? true : ""
                                                                                }`}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mt-auto">
                                                        <div
                                                            className={`${commercial === "no" ? "input-disabled" : ""
                                                                }`}
                                                        >
                                                            <div className="symbol">
                                                                <FormControl
                                                                    variant="standard"
                                                                    disabled={`${commercial === "no" ? true : ""
                                                                        }`}
                                                                >
                                                                    <InputLabel shrink htmlFor="yearsPqe">
                                                                        If applicable, what sales quota do you
                                                                        have this year?
                                                                    </InputLabel>
                                                                    <div className="d-flex border-radius-add">
                                                                        {/* <BootstrapInput id="yearsPqe" placeholder='Please give ARR' /> */}

                                                                        <Autocomplete
                                                                            disabled={`${commercial === "no" ? true : ""
                                                                                }`}
                                                                            options={currenciesOptions}
                                                                            getOptionLabel={(option) =>
                                                                                option.currency_code || ""
                                                                            }
                                                                            value={saleQuotaSymbol || {}}
                                                                            onChange={(e, value) => {
                                                                                setSaleQuotaSymbol(value);
                                                                            }}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    placeholder="$"
                                                                                />
                                                                            )}
                                                                            className="currency_width"
                                                                        />
                                                                        {/* <CustomSelect
                                                                                options={currenciesOptions}
                                                                                setCureentSalarySymbol={setSaleQuotaSymbol}
                                                                                symbol={true}
                                                                                className="currency_width"
                                                                                commercial={commercial}
                                                                            /> */}
                                                                        <TextField
                                                                            id="sales_quota"
                                                                            placeholder="Please give ARR"
                                                                            type="number"
                                                                            name="sales_quota"
                                                                            value={forminputData.sales_quota}
                                                                            onChange={inputData}
                                                                            inputProps={{
                                                                                inputMode: "numeric",
                                                                                min: 0,
                                                                                pattern: "[0-9]*",
                                                                            }}
                                                                            disabled={`${commercial === "no" ? true : ""
                                                                                }`}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ====== Role Specific 2.3 ===== */}
                                        <div id="qualification">
                                            <div className="bg-sky mt-50">
                                                <h3 className="font-20 px-60">
                                                    3. Tech/Other Qualifications
                                                </h3>
                                            </div>
                                            <div className="px-60">
                                                <div className="row">
                                                    <div className="col-lg-6 mt-auto multiple-selects">
                                                        {/* <Box
                                                                component="form"
                                                                noValidate
                                                                autoComplete="off"
                                                                className="multiple-selects"
                                                            > */}
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="legaltechtools">
                                                                What LegalTech tools do you have experience
                                                                in? We have some preset core LegalTech tools
                                                                for you to select from where appropriate, but
                                                                do type in any other tools and your
                                                                familiarity. &#40; E.g. Betty Blocks -
                                                                Beginner/Competent/Expert &#41;
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>

                                                            <Autocomplete
                                                                // id="free-solo-with-text-demo"
                                                                limitTags={1}
                                                                multiple
                                                                options={legalTechToolsOption.map(
                                                                    (option) => option.title
                                                                )}
                                                                freeSolo
                                                                onChange={(e, value) => {
                                                                    setTestLegalTechToolsSelected(value);
                                                                }}
                                                                renderTags={(value, getTagProps) =>
                                                                    value.map((option, index) => (
                                                                        <Chip
                                                                            variant="outlined"
                                                                            label={option}
                                                                            {...getTagProps({ index })}
                                                                        />
                                                                    ))
                                                                }
                                                                filterOptions={(options, params) => {
                                                                    const filtered = filter(options, params);
                                                                    const { inputValue } = params;

                                                                    // Suggest the creation of a new value
                                                                    const isExisting = options.some(
                                                                        (option) => inputValue === option.title
                                                                    );

                                                                    if (inputValue !== "" && !isExisting) {
                                                                        filtered.push(inputValue);
                                                                    }
                                                                    return filtered;
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} />
                                                                )}
                                                            />

                                                            {/* <Autocomplete
                                                                    multiple
                                                                    options={legalTechToolsOption}
                                                                    getOptionLabel={
                                                                        (option) => (option.title || "")
                                                                    }
                                                                    value={legalTechToolsSelected || []}
                                                                    onChange={(e, value) => {
                                                                        setLegalTechToolsSelected(value);
                                                                    }}
                                                                    renderInput={
                                                                        params => (
                                                                            <TextField {...params} variant="outlined" />
                                                                        )
                                                                    }
                                                                /> */}
                                                        </FormControl>

                                                        {/* </Box> */}
                                                    </div>
                                                    <div className="col-lg-6 mt-auto multiple-selects">
                                                        {/* <Box
                                                                component="form"
                                                                noValidate
                                                                autoComplete="off"
                                                                className="multiple-selects"
                                                            > */}
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="techExperience">
                                                                Do you have any broader tech experience, such
                                                                as coding or experience using business
                                                                software such as Excel or a CRM platform? We
                                                                have some preset options for you to select
                                                                from where appropriate, but do type in any
                                                                other tools/coding languages and your
                                                                familiarity. &#40; E.g.
                                                                Beginner/Competent/Expert &#41;
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>

                                                            <Autocomplete
                                                                // id="free-solo-with-text-demo"
                                                                limitTags={1}
                                                                multiple
                                                                options={techToolsOption.map(
                                                                    (option) => option.title
                                                                )}
                                                                freeSolo
                                                                onChange={(e, value) => {
                                                                    setTestTechToolsSelected(value);
                                                                }}
                                                                renderTags={(value, getTagProps) =>
                                                                    value.map((option, index) => (
                                                                        <Chip
                                                                            variant="outlined"
                                                                            label={option}
                                                                            {...getTagProps({ index })}
                                                                        />
                                                                    ))
                                                                }
                                                                filterOptions={(options, params) => {
                                                                    const filtered = filter(options, params);
                                                                    const { inputValue } = params;

                                                                    // Suggest the creation of a new value
                                                                    const isExisting = options.some(
                                                                        (option) => inputValue === option.title
                                                                    );

                                                                    if (inputValue !== "" && !isExisting) {
                                                                        filtered.push(inputValue);
                                                                    }
                                                                    return filtered;
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} />
                                                                )}
                                                            />

                                                            {/* <Autocomplete
                                                                    multiple
                                                                    options={techToolsOption}
                                                                    getOptionLabel={
                                                                        (option) => (option.title || "")
                                                                    }
                                                                    value={techToolsSelected || []}
                                                                    onChange={(e, value) => {
                                                                        setTechToolsSelected(value);
                                                                    }}
                                                                    renderInput={
                                                                        params => (
                                                                            <TextField {...params} variant="outlined" />
                                                                        )
                                                                    }

                                                                /> */}
                                                        </FormControl>

                                                        {/* </Box> */}
                                                    </div>
                                                    <div className="col-lg-6 mt-auto multiple-selects">
                                                        {/* <Box
                                                                component="form"
                                                                noValidate
                                                                autoComplete="off"
                                                                className="multiple-selects"
                                                            > */}
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="qualification">
                                                                Do you hold other relevant qualifications?
                                                                &#40; E.g. JD, Scrum Master, Relativity
                                                                Certified Administrator, PRINCE2 &#41;
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>

                                                            <Autocomplete
                                                                // id="free-solo-with-text-demo"
                                                                limitTags={1}
                                                                multiple
                                                                options={qualificationOption.map(
                                                                    (option) => option.title
                                                                )}
                                                                freeSolo
                                                                onChange={(e, value) => {
                                                                    setTestQualificationSelected(value);
                                                                }}
                                                                renderTags={(value, getTagProps) =>
                                                                    value.map((option, index) => (
                                                                        <Chip
                                                                            variant="outlined"
                                                                            label={option}
                                                                            {...getTagProps({ index })}
                                                                        />
                                                                    ))
                                                                }
                                                                filterOptions={(options, params) => {
                                                                    const filtered = filter(options, params);
                                                                    const { inputValue } = params;

                                                                    // Suggest the creation of a new value
                                                                    const isExisting = options.some(
                                                                        (option) => inputValue === option.title
                                                                    );

                                                                    if (inputValue !== "" && !isExisting) {
                                                                        filtered.push(inputValue);
                                                                    }
                                                                    return filtered;
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} />
                                                                )}
                                                            />

                                                            {/* <Autocomplete
                                                                    multiple
                                                                    options={qualificationOption}
                                                                    getOptionLabel={
                                                                        (option) => (option.title || "")
                                                                    }
                                                                    value={qualificationSelected || []}
                                                                    onChange={(e, value) => {
                                                                        setQualificationSelected(value);
                                                                    }}
                                                                    renderInput={
                                                                        params => (
                                                                            <TextField {...params} variant="outlined" />
                                                                        )
                                                                    }
                                                                /> */}
                                                        </FormControl>

                                                        {/* </Box> */}
                                                    </div>
                                                    <div className="col-lg-6 select-down-icon  multiple-selects">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="language">
                                                                What languages do you speak? &#40; For
                                                                avoidance of doubt, please include English if
                                                                applicable &#41;
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>

                                                            {/* <Select
                                                                    isMulti
                                                                    name="global-tag-variant"
                                                                    tagVariant="outline"
                                                                    options={languagesSpeak}
                                                                    placeholder="Select some colors..."
                                                                    onChange={selectLanguagesSpeak}
                                                                    value={languagesspeakstate}
                                                                /> */}
                                                            <Autocomplete
                                                                multiple
                                                                limitTags={1}
                                                                options={languagesOption}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={languagesSelected || []}
                                                                onChange={(e, value) => {
                                                                    setLanguagesSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} variant="outlined" />
                                                                )}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-lg-6 mt-auto">
                                                        {/* <Box
                                                                component="form"
                                                                noValidate
                                                                autoComplete="off"
                                                            > */}
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="profile">
                                                                Profile <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <TextField
                                                                    variant="standard"
                                                                    focused
                                                                    multiline
                                                                    rows={3}
                                                                    placeholder="Now it’s time for you to tell potential employers about you in your own words. This section is optional but strongly recommended, as it’s a chance for you to highlight anything that makes you stand out which hasn’t been covered by the questionnaire so far, and to let employers know what sort of opportunities are  of interest to you."
                                                                /> */}
                                                            <TextareaAutosize
                                                                className="w-100 p-2 h-100"
                                                                // aria-label="empty textarea"
                                                                placeholder="Now it's time for you to tell potential employers about you in your own words. It's a chance for you to highlight anything that makes you stand out which hasn't been covered so far, and to let employers know what sort of opportunities are of interest to you. &#40; Min. 300 characters &#41;"
                                                                value={forminputData.Profile}
                                                                // onChange={inputData}
                                                                onChange={(e) => {
                                                                    const name = e.target.name;
                                                                    const value = e.target.value;

                                                                    setFormInputData({
                                                                        ...forminputData,
                                                                        [name]: value,
                                                                    });

                                                                    setTextAreaLength(value.split("").length);
                                                                }}
                                                                name="Profile"
                                                                aria-label="maximum height"
                                                                minRows={5}
                                                            // maxRows={6}
                                                            />
                                                            {textAreaLength < 302 ? (
                                                                <p className="profile-word-count">
                                                                    <span className="count">
                                                                        {textAreaLength !== undefined
                                                                            ? textAreaLength
                                                                            : 0}
                                                                    </span>{" "}
                                                                    Out of
                                                                    <span className="count">300</span>
                                                                </p>
                                                            ) : null}
                                                        </FormControl>

                                                        {/* <TextField id="sales_quota" placeholder='Please give ARR' type="number"  /> */}
                                                        {/* </Box> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-50 text-end px-60">
                                            <button
                                                className="commom-blue-button me-3"
                                                onClick={() => {
                                                    setToggleState(toggleState - 1);
                                                }}
                                            >
                                                Previous
                                            </button>
                                            <button
                                                className="commom-sky-button"
                                                onClick={() => {
                                                    secondStep();
                                                }}
                                            >
                                                Next
                                            </button>

                                            {/* setValue(value + 1); handleSubmit() }} */}
                                            {/* setToggleState(toggleState + 1); */}
                                        </div>
                                    </div>

                                    {/* =========== Third Tab ====== */}
                                    <div
                                        className={
                                            toggleState === 3
                                                ? "contents active-contents"
                                                : "contents"
                                        }
                                    >
                                        <h3 className="question-title px-60">
                                            Diversity & Inclusion
                                        </h3>
                                        <p className="border-btm"></p>
                                        <div className="form-start px-60">
                                            <div className="row">
                                                <p className="mt-50 disclaimer">
                                                    Harrier Search Ltd is committed to helping clients
                                                    build talented and diverse teams. We are also
                                                    signatories to the{" "}
                                                    <a
                                                        target="blank"
                                                        href="https://recruiter.racefairnesscommitment.com/"
                                                    >
                                                        <span>
                                                            Recruitment Agency Race Fairness Commitment.
                                                        </span>
                                                    </a>{" "}
                                                    To that end we would be grateful if you could
                                                    complete this section of the questionnaire to help
                                                    us in our monitoring and reporting on the diversity
                                                    of candidates submitted to employers and their
                                                    success rates. If you do not wish to share this
                                                    information, each question has a ‘Prefer not to say’
                                                    option. We will never share this personal data, it
                                                    is purely to help us do high-level monitoring and
                                                    reporting.
                                                </p>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon multiple-selects">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Which cultural background do you most identify
                                                                with? <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}
                                                            {/* <CustomSelect setValue={onSetValue} options={culturalbackgroundOption} /> */}
                                                            <Autocomplete
                                                                multiple
                                                                limitTags={1}
                                                                options={disabilityOption}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={disabilitySelected || []}
                                                                onChange={(e, value) => {
                                                                    setdisabilitySelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} variant="outlined" />
                                                                )}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                What is your sex?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={genderOption}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={sexSelected || {}}
                                                                onChange={(e, value) => {
                                                                    setSexSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect setSendEmpType={setSexSelected} options={genderOption} /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                How would you describe your gender identity?
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={genderIdentityOption}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={genderIdentitySelected || {}}
                                                                onChange={(e, value) => {
                                                                    setGenderIdentitySelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect setSendEmpType={setGenderIdentitySelected} options={genderIdentityOption} /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                How would you describe your sexual
                                                                orientation?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={sexualOrientationsOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={sexualOrientations || {}}
                                                                onChange={(e, value) => {
                                                                    setSexualOrientations(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={sexualOrientationsOptions}
                                                                    setSendEmpType={setSexualOrientations}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Do you have a Disability, as defined under the
                                                                Disability Discrimination Act 2005?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={preferOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={preferSelected || {}}
                                                                onChange={(e, value) => {
                                                                    setPreferSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setPreferSelected}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl
                                                            variant="standard"
                                                            className={
                                                                preferSelected?.title == "Yes"
                                                                    ? ""
                                                                    : "input-disabled"
                                                            }
                                                        >
                                                            <InputLabel shrink htmlFor="uname">
                                                                If Yes, please specify{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <TextField
                                                                disabled={preferSelected?.title !== "Yes"}
                                                                id="lineManage"
                                                                placeholder="Please list any disabilities"
                                                                name="disability_specific"
                                                                value={forminputData.disability_specific}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Are you the first generation from your family
                                                                to receive a higher education?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={preferOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={higherEduSelected || {}}
                                                                onChange={(e, value) => {
                                                                    setHighrEduSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setHighrEduSelected}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Did your parent(s) or guardian(s) complete a
                                                                university degree course or equivalent?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={preferOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={parentHe || {}}
                                                                onChange={(e, value) => {
                                                                    setParentHe(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setParentHe}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Have you ever been eligible for free school
                                                                meals or your household received income
                                                                support? <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={preferOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={freeSchoolSelected || {}}
                                                                onChange={(e, value) => {
                                                                    setFreeSchoolSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setFreeSchoolSelected}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                What was the occupation of your main household
                                                                earner when you were aged about 14?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={mainEarnerOccupationsOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={mainEarnerOccupations || {}}
                                                                onChange={(e, value) => {
                                                                    setMainEarnerOccupations(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <Autocomplete
                                                                    options={preferOptions}
                                                                    getOptionLabel={
                                                                        (option) => (option.title || "")
                                                                    }
                                                                    value={earnerOccupationSelected || {}}
                                                                    onChange={(e, value) => {
                                                                        setEarnerOccupationSelected(value);
                                                                    }}
                                                                    renderInput={
                                                                        params => (
                                                                            <TextField {...params}
                                                                                placeholder="Select" />
                                                                        )
                                                                    }
                                                                    className="single-auto-compelete-width"
                                                                /> */}

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setEarnerOccupationSelected}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                What type of school did you attend for the
                                                                majority of your schooling (between the ages
                                                                of 11-18)?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={mst_school_types}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={mst_school_types_data || {}}
                                                                onChange={(e, value) => {
                                                                    set_Mst_school_types_data(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={mst_school_types}
                                                                    setSendEmpType={set_Mst_school_types_data}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Please indicate your Religion/Belief{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            {/* <Select
                                                                    options={options}
                                                                    components={{ Input: CustomInput }}
                                                                    maxLength="4"
                                                                /> */}

                                                            <Autocomplete
                                                                options={faithOption}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={indicateReligionSelected || {}}
                                                                onChange={(e, value) => {
                                                                    setIndicateReligionSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setIndicateReligionSelected}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 mt-auto select-down-icon">
                                                    <div className="w-100">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="uname">
                                                                Will you now or in the future require
                                                                sponsorship for an employment Visa?{" "}
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>

                                                            <Autocomplete
                                                                options={preferOptions}
                                                                getOptionLabel={(option) =>
                                                                    option.title || ""
                                                                }
                                                                value={employmentVisaSelected || {}}
                                                                onChange={(e, value) => {
                                                                    setEmploymentVisaSelected(value);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        placeholder="Select"
                                                                    />
                                                                )}
                                                                className="single-auto-compelete-width"
                                                            />

                                                            {/* <CustomSelect
                                                                    options={preferOptions}
                                                                    setSendEmpType={setEmploymentVisaSelected}
                                                                /> */}
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-50 text-end px-60">
                                            <button
                                                className="commom-blue-button me-3"
                                                onClick={() => {
                                                    setToggleState(toggleState - 1);
                                                }}
                                            >
                                                Previous
                                            </button>

                                            {/* <button className="commom-sky-button" onClick={() => setValue(value + 1)}>Next</button> */}
                                            {/* <button className="commom-sky-button" onClick={() => { setValue(value + 1) }}>Next</button> */}
                                            <button
                                                className="commom-sky-button"
                                                onClick={() => {
                                                    thirdStep();
                                                }}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>

                                    {/* =========== Four Tab ====== */}
                                    <div
                                        className={
                                            toggleState === 4
                                                ? "contents active-contents"
                                                : "contents"
                                        }
                                    >
                                        <div className="data-privacy">
                                            <h3 className="question-title px-60"> Data Privacy </h3>
                                            <p className="border-btm"></p>
                                            <div className="form-start px-60 mt-50">
                                                {/* <div className='checkBox d-flex align-items-center'>
                                                        <Checkbox {...label} onClick={(e) => setDataPrivacy(!dataPrivacy)} />
                                                        <p className='content'> Do you consent to our <Link to=""> Privacy Policy </Link> ? <span className="text-red"> * </span></p>
                                                    </div> */}
                                                <div className="checkBox d-flex align-items-center">
                                                    {/* <p className='content'> Please read our <a target="blank" href='/privacypolicy'>Privacy Policy </a></p> */}
                                                    <p className="content">
                                                        {" "}
                                                        Please read our Privacy Policy which is available
                                                        at{" "}
                                                        <a target="blank" href="/privacypolicy">
                                                            www.harriercandidates.com/privacypolicy{" "}
                                                        </a>
                                                    </p>
                                                </div>
                                                <div className="checkBox d-flex align-items-center mt-3">
                                                    {/* <p className='content'> Please read our  <a target="blank" href='/termsofuse'> Terms of Use </a> </p> */}
                                                    <p className="content">
                                                        {" "}
                                                        Please read our Terms of Use which is available at{" "}
                                                        <a target="blank" href="/termsofuse">
                                                            www.harriercandidates.com/termsofuse{" "}
                                                        </a>{" "}
                                                    </p>
                                                </div>
                                                <div className="checkBox d-flex align-items-start mt-5">
                                                    {/* <p className='content border-0 bg-sky-a'>Please select at least one of these two below boxes  </p> <span className="text-red px-1"> * </span> */}
                                                    <p className="content border-0 bg-sky-a">
                                                        We encourage all users to sign up to our Harrier
                                                        Candidates platform. Those who don’t opt in will
                                                        not be able to gain Guest Access to the platform
                                                        for salary & skills benchmarking, nor will their
                                                        profiles be discoverable by Employers in the wider
                                                        industry.<span className="text-red"> * </span>{" "}
                                                    </p>
                                                </div>
                                                {/* <div className='checkBox d-flex align-items-start mt-3'>
                                                        <Checkbox {...label} onClick={(e) => setHarrierSearch(!harrierSearch)} />
                                                        <p className='content'> Are you happy to share your data with Harrier Search, our Recruitment Agency arm, so that we can approach you about roles on
                                                            behalf of our Clients? CVs are only shared with Clients with your consent on a case by case basis.</p>
                                                    </div> */}
                                                <div className="checkBox d-flex align-items-start mt-3">
                                                    <Checkbox
                                                        {...label}
                                                        onClick={(e) => setHarrierSearch(harrierSearch)}
                                                        checked
                                                        disabled
                                                    />
                                                    <p className="content">
                                                        {" "}
                                                        By signing up with us, we will process your data
                                                        to approach you about roles on behalf of our
                                                        clients as part of our Harrier Search service. CVs
                                                        are only shared with clients with your consent on
                                                        a case by case basis.{" "}
                                                    </p>
                                                </div>
                                                {/* <div className='checkBox d-flex align-items-center justify-content-center mt-3'>
                                                        <p className='content'>&#40; Or &#41;</p>
                                                    </div> */}
                                                <div className="checkBox d-flex align-items-start mt-3">
                                                    <Checkbox
                                                        {...label}
                                                        onClick={(e) =>
                                                            setHarrierCandidate(!harrierCandidate)
                                                        }
                                                    />
                                                    <p className="content">
                                                        I am happy to share my data with Harrier
                                                        Candidates, our platform to enable Employers (the
                                                        wider industry, not just Harrier Search clients)
                                                        to search a no-names database and request your
                                                        no-names CV directly for a specific job? CVs are
                                                        only shared with Employers on a case by case
                                                        basis.
                                                    </p>
                                                </div>
                                                <div className="checkBox d-flex align-items-start mt-40">
                                                    <p className="content pl-0 hear-about-us">
                                                        {" "}
                                                        How did you hear about us?
                                                    </p>
                                                </div>
                                                <div>
                                                    <>
                                                        {chearAboutUs.map((hearAboutUs, index) => (
                                                            <div
                                                                className="checkBox d-flex align-items-center mt-11"
                                                                key={index}
                                                            >
                                                                <Checkbox
                                                                    value={hearAboutUs.id}
                                                                    checked={ckeck == hearAboutUs.id}
                                                                    onChange={(e) => checkedFun(e)}
                                                                    className="channel_check"
                                                                />
                                                                <p className="about-us-here">
                                                                    {" "}
                                                                    {hearAboutUs.title}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </>
                                                    {/* <div className='checkBox d-flex align-items-center mt-6'>
                                                            {console.log(ckeck, "ckeck === 6")}
                                                            <Checkbox value={6} checked={ckeck == 6} onChange={(e) => checkedFun(e)} />
                                                            <p className='about-us-here' > Event (please specify) </p>
                                                        </div>
                                                        <div className='checkBox d-flex align-items-center mt-6'>
                                                            {console.log(ckeck, "ckeck === 6")}
                                                            <Checkbox value={7} checked={ckeck == 7} onChange={(e) => checkedFun(e)} />
                                                            <p className='about-us-here' > Online advert  (please specify) </p>
                                                        </div>
                                                        <div className='checkBox d-flex align-items-center mt-6'>
                                                            {console.log(ckeck, "ckeck === 6")}
                                                            <Checkbox value={8} checked={ckeck == 8} onChange={(e) => checkedFun(e)} />
                                                            <p className='about-us-here' > Other (please specify) </p>
                                                        </div> */}

                                                    <div className="specify-input mt-17">
                                                        {/* <BootstrapInput id=""   /> */}
                                                        <TextField
                                                            placeholder="If Event or Other, please specify"
                                                            disabled={
                                                                ckeck == 5 || ckeck == 6 || ckeck == 7
                                                                    ? ""
                                                                    : "disabled"
                                                            }
                                                            name="otherSpecify"
                                                            value={forminputData.otherSpecify}
                                                            onChange={inputData}
                                                        />
                                                    </div>
                                                    <div className="specify-input">
                                                        <FormControl variant="standard">
                                                            <InputLabel shrink htmlFor="qualified">
                                                                If you were referred by an individual, please
                                                                tell us who so that they’re eligible for a
                                                                potential referral fee.
                                                            </InputLabel>
                                                            <TextField
                                                                placeholder="Enter referral name"
                                                                name="referral"
                                                                value={forminputData.referral}
                                                                onChange={inputData}
                                                            />
                                                        </FormControl>
                                                    </div>

                                                    <div className="specify-input">
                                                        <FormControl
                                                            variant="standard"
                                                            className="mt-1 position-relative"
                                                        >
                                                            <InputLabel shrink htmlFor="">
                                                                Upload CV
                                                                <span className="text-red"> * </span>
                                                            </InputLabel>
                                                            <InputLabel
                                                                shrink
                                                                htmlFor="file_upload"
                                                                className="file_upload d-flex justify-content-center mb-5"
                                                            >
                                                                <img src={uploadIcon} alt="" />{" "}
                                                                <p className="content">
                                                                    Drag & drop or <span> browse</span>
                                                                </p>
                                                            </InputLabel>
                                                            <TextField
                                                                name="logo"
                                                                value=""
                                                                type="file"
                                                                className="inputFile"
                                                                id="file_upload"
                                                                onChange={handleCvChange}
                                                            ></TextField>
                                                            <div className="d-flex justify-content-between">
                                                                {cv?.name}
                                                                {cv?.name && (
                                                                    <button
                                                                        className="bg-transparent border-0 text-right"
                                                                        onClick={() => setCv({})}
                                                                    >
                                                                        {" "}
                                                                        <img src={closeIcon} alt="" />{" "}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-50 text-end px-60">
                                            <button
                                                className="commom-blue-button me-3"
                                                onClick={() => {
                                                    setToggleState(toggleState - 1);
                                                }}
                                            >
                                                Previous
                                            </button>

                                            {/* <button className="commom-sky-button" >Next</button> */}
                                            <button
                                                className="commom-sky-button"
                                                onClick={() => {
                                                    handleSubmit();
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>

                                        {/* ===== Success Modal ===== */}
                                        <Modal
                                            // aria-labelledby="success-modal"
                                            // aria-describedby="transition-m pt-2odal-description"
                                            open={successopen}
                                            onClose={successhandleClose}
                                            // closeAfterTransition
                                            // BackdropComponent={Backdrop}
                                            onKeyPress={(event) => {
                                                var key = event.keyCode || event.which;
                                                if (key === 13 || 27) {
                                                    successhandleClose();
                                                }
                                            }}
                                        // BackdropProps={{
                                        //     timeout: 500,
                                        // }}
                                        >
                                            <Box sx={style}>
                                                <div className="text-end">
                                                    <button
                                                        className="bg-transparent border-0 text-right close-width"
                                                        onClick={successhandleClose}
                                                    >
                                                        {" "}
                                                        <img src={closeIcon} alt="" />{" "}
                                                    </button>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <img src={success} alt="" className="success" />
                                                </div>
                                                <Typography id="success-modal">
                                                    {/* <h5 className="text-center pt-5">
                              Thank you for creating a profile in Harrier
                              Candidates.
                            </h5> */}
                                                    <h6 className="pt-2 lh-base">
                                                        Thank you for signing up! An email will be sent to you explaining the process for gaining guest access for those who have opted into the public Harrier Candidates platform.
                                                    </h6>
                                                    <h6 className="pt-3">
                                                        Kind regards,
                                                    </h6>
                                                    <h6 className="pt-2">
                                                        Harrier team.
                                                    </h6>

                                                    {/* <h6 className="pt-2">
                              In the meantime, if you would like to browse the
                              Harrier Candidates database for salary
                              benchmarking, at the Log In page you can request
                              Guest Access and our team will issue you with a
                              password that provides 24 hour access.
                            </h6> */}
                                                    {/* <h6 className="pt-2">
                              We’d also like to tell you about our Referral
                              Scheme: every time a Candidate who you referred
                              lands a new role via the platform, you will
                              receive 1% of their new base salary as a thank you
                              from us. Every candidate that signs up helps to
                              create a fuller picture of the industry for
                              everyone, so do please share this link to{" "}
                              <Link to=""> www.harriercandidates.com </Link>{" "}
                              with your friends and colleagues in
                              LegalTech/Legal Ops.
                            </h6> */}
                                                    {/* <h6 className="pt-2">
                              Finally, we will endeavour to be in touch with you
                              from time to time to help keep your data up to
                              date. If you want to update your profile, or
                              perhaps change your Jobseeker Status (e.g. from
                              Very Passive to Active), do contact our Candidate
                              Success team at{" "}
                              <Link to="">cs@harriercandidates.com </Link>
                            </h6> */}
                                                </Typography>
                                                <div className="text-center mt-40">
                                                    <button
                                                        className="commom-blue-button"
                                                        onClick={successhandleClose}
                                                    >
                                                        Ok
                                                    </button>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bgs footer-fixed mt-40">
                <Copyright />
            </div>
        </div>
    )
}

export default CorequestionsForm