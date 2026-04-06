import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppMobile from "./AppMobile"; // <-- мобильная версия приложения
import TokenRetriever from "./TokenRetriever";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";


import "./index.css";

import { isMobile } from "react-device-detect";


// ===== Language Switcher =====
function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ru")}>RU</button>
      <button onClick={() => changeLanguage("pl")}>PL</button>
      <button onClick={() => changeLanguage("de")}>DE</button>
      <button onClick={() => changeLanguage("uk")}>UK</button>
    </div>
  );
}


// ===== MainWrapper with conditional App =====
const MainWrapper = () => {
  return (
    <div className="app-container">
      <LanguageSwitcher />
      {/* <BlinkingButtons /> */}
      {/* <Carousel slides={slideData} /> */}
      {isMobile ? <AppMobile /> : <App />}
      <TokenRetriever />
    </div>
  );
};

// ===== Apply saved language =====
const savedLanguage = localStorage.getItem("language");
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainWrapper />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
