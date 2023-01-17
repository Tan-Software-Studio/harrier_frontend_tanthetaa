import React, { useState } from 'react'
import "./CustomSelect.scss"
const CustomSelect = ({ options, setSendEmpType, setSendCountry, flage, setType, symbol, setCureentSalarySymbol, commercial }) => {

  const selectLabel = { title: "Select", id: "" };
  const selectOptions = [selectLabel, ...options];
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectOptions[0]
  );


  const selectLabelOption = { country_name: "Select", id: "" };
  const selectOptionsOption = [selectLabelOption, ...options];
  const [selectedOptionTest, setSelectedOptionTest] = useState(
    selectOptionsOption[0]
  );

  const onSelect = (option) => {

    setOpenMenu(!openMenu)
    if (flage === true) {
      setType(option)
      setSelectedOptionTest(option);
      setSendCountry(option)
    }
    else if (symbol === true) {
      setSelectedOptionTest(option);
      setCureentSalarySymbol(option)
      console.log(option, "options========?");
    }
    else {
      setSendEmpType(option)
      setSelectedOption(option)
    }
  };
  console.log(commercial, "commercial---->")

  return (
    <div className="custom-select">
      <div className="select-c" onClick={() => setOpenMenu(!openMenu)}>
        <input disabled={`${commercial === "no" ? true : ""}`} className={`${symbol === true ? "currency_width" : ""} select-title w-100 select-down-icon `} value={flage === true ? selectedOptionTest.country_name : symbol === true ? selectedOptionTest.currency_code : selectedOption?.title} />
      </div>
      {
        commercial === "no" ? ("") : (<div className="options-container">


          {
            openMenu && options
              // .filter((option) => (flage === true ? option.country_name !== "Select" : symbol === true ? option.symbol !== "Select" : option.title !== "Select"))
              .map((option, index) => (
                <div
                  className="option"
                  key={index.toString()}
                  onClick={() => onSelect(option)}

                >
                  {flage === true ? option.country_name : symbol === true ? option.currency_code : option.title}
                </div>
              ))
          }
        </div>)
      }

    </div >
  );
};




export default CustomSelect