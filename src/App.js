import "./App.css";

import "bootstrap/dist/css/bootstrap.css"; //Bootsrap
import "bootstrap/dist/js/bootstrap.js"; //Bootsrap
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Corequestions from "./Components/Corequestions/Corequestions";
// import CreateJob from './Components/CreateJob/CreateJob';
import CandidateDetails from "./Components/CandidateDetails/CandidateDetails";
import Listofcandidates from "./Components/Listofcandidates/Listofcandidates";
import MyJobs from "./Components/MyJobs/MyJobs";
import Shortlist from "./Components/Shortlist/Shortlist";
import Livejobs from "./Components/LiveJobs/Livejobs";
import CreateJobs from "./Components/CreateJobs/CreateJobs";
import UpdateJobs from "./Components/UpdateJobs/UpdateJobs";
import UpdateEmployer from "./Components/UpdateEmployer/UpdateEmployer";
import GuestDashboard from "./Components/Guest/Dashboard/GuestDashboard";
import SingleCandidate from "./Components/Guest/SingleCandidate/SingleCandidate";

// ====== Toastify ====

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Updatepassword from "./Components/Updatepassword/Updatepassword";
import CorequestionsCopy from "./Components/Corequestions/Corequestions";
import TermsOfUse from "./Components/documents/TermsOfUse";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/privacypolicy" element={<TermsOfUse />} />
          <Route path="/termsofbusiness" element={<TermsOfUse />} />

          <Route path="/corequestions" element={<Corequestions />} />
          {/* <Route path="/createjob" element={<CreateJob />} /> */}
          <Route path="/candidates" element={<Listofcandidates />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/short-list" element={<Shortlist />} />
          <Route path="/live-jobs" element={<Livejobs />} />
          <Route path="/create-job" element={<CreateJobs />} />
          <Route path="/update-job/:job_id" element={<UpdateJobs />} />
          <Route path="/update-employer-profile" element={<UpdateEmployer />} />
          <Route path="/candidate-list/:uuid" element={<CandidateDetails />} />
          <Route
            path="/authentication/reset-password"
            element={<Updatepassword />}
          />

          <Route path="/guest-dashboard" element={<GuestDashboard />} />
          <Route
            path="/guest-candidate-details/:uuid"
            element={<SingleCandidate />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
