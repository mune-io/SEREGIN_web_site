// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const StepByStep = () => {
  const { t } = useTranslation();


  

  return (
    // <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "5%" }}>



          <h1>{t("howToStart")}</h1>
          <h4>
          <h4>{t("steps.step1")}</h4>
          <h4>{t("steps.step2")}</h4>
          <h4>{t("steps.step3")}</h4>
          <h5>- - - {t("steps.step3_1")}</h5>
          <h4>{t("steps.step4")}</h4>
          <h4>{t("steps.step5")}</h4>
          <h4>{t("steps.step6")}</h4>  
          {t("minRequirement")}
          {/* <p>{t("viewsCount")}</p> */}
          </h4>

    </div>
  );
};

export default StepByStep;
