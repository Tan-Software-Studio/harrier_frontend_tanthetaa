import React from "react";
import Header from "../Common/Header/Header";
import CorequestionsForm from "./CorequestionsForm";


const Corequestions = () => {
  return (
    <>
      <Header />
      {/* ====== Core questions ===== */}
      <section className="common-bg pt-199 pb-20">
        <CorequestionsForm />
      </section>
    </>
  );
};

export default Corequestions;
