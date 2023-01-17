let policy = "";
let use = "";
let business = "";

policy = process.env.REACT_APP_PRIVACY_POLICY;
use = process.env.REACT_APP_TERMS_OF_USE;
business = process.env.REACT_APP_TERMS_OF_BUSINESS;

const PRIVACY_POLICY_PATH = policy;
const TERMS_OF_USE_PATH = use;
const TERMS_OF_BUSINESS_PATH = business;

export {
    PRIVACY_POLICY_PATH,
    TERMS_OF_USE_PATH,
    TERMS_OF_BUSINESS_PATH,

};
