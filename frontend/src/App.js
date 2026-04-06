import  { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { generatePKCE } from "./pkce";

import { useTranslation } from "react-i18next"; // Хук для перевода
import DynamoDBTable from "./DynamoDBTable";
import HowPeople from "./HowPeople";
import LinkYouPage from "./linkYouPage";
import YourAccount from "./YourAccount";
import StepByStep from "./StepByStep";
import "./App.css"; // Styles
import ContactForm from "./Email";

import Map    from './map/map';

import EarnPage from "./pages/EarnPage";
import InvestPage from "./pages/InvestPage";
import CarouselSmall from "./CarouselSmall";  

const App = () => {
  const { t } = useTranslation();
  
  // Состояние пользователя
  const [user, setUser] = useState({
    firstName: localStorage.getItem("first_name:"),
    lastName: localStorage.getItem("last_name:"),
  });

  // Обновление состояния, если localStorage меняется через событие
  useEffect(() => {
    const handleStorageChange = () => {
      const firstName = localStorage.getItem("first_name:");
      const lastName = localStorage.getItem("last_name:");
      setUser({ firstName, lastName });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Обновление состояния пользователя каждые 1000 мс (1 секунда)
  useEffect(() => {
    const interval = setInterval(() => {
      const firstName = localStorage.getItem("first_name");
      const lastName = localStorage.getItem("last_name");

      if (firstName && lastName && firstName !== "None" && lastName !== "None") {
        setUser({ firstName, lastName }); // Обновляем состояние
      }
    }, 1000);

    return () => clearInterval(interval); // Очистка при размонтировании
  }, []);

  const isUserRegistered = user.firstName && user.lastName && user.firstName !== "None" && user.lastName !== "None";

  
  function RegistrationLogin() {
    const { t } = useTranslation();

    async function handleLogin(e) {
      e.preventDefault();

      const { challenge } = await generatePKCE();

      const clientId = "a0fb190b-7964-4f58-8fb1-28e8e630c5e4";
      const redirectUri = encodeURIComponent("https://www.mune.pl");
      const scope = encodeURIComponent("openid offline_access");
      const policy = "B2C_1_mune_auth";

      const url = `https://munepl.b2clogin.com/munepl.onmicrosoft.com/oauth2/v2.0/authorize?p=${policy}&client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&code_challenge_method=S256&code_challenge=${challenge}&prompt=login`;

      window.location.href = url;
    }

    return (
      <div className="button-container">
        <button onClick={handleLogin} className="login-button">
          {t("login")} / {t("registration")}
        </button>
      </div>
    );
  }

// function RegistrationLogin() {
//   const { t } = useTranslation();

//   return (
//     <div className="button-container">
//       <a
//         // href="https://denbarskris.b2clogin.com/denbarskris.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandin&client_id=de8b522f-47b2-4da7-b6a1-74bc333c5029&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login"
//         href= "https://munepl.b2clogin.com/munepl.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_mune_auth&client_id=a0fb190b-7964-4f58-8fb1-28e8e630c5e4&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmune.pl&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=EqqMh-ZXFgXjkeXR_vXuAh2O6A_656bXd1hHS_g1Mrg"
//         className="login-button"
//       >
//         {t("login")} / {t("registration")}
//       </a>

//     </div>
//   );
// }
const  slideDataSmall = [<img src="image1.jpg" alt="Slide 1" className="carousel-image" />, <a href="https://www.jackjones.com/pl-pl" target="_blank" rel="noopener noreferrer" key="1"><img src="jnj.jpg" alt="Slide jnj" className="carousel-image" /> </a>,  <img src="image2.jpg" alt="Slide 2" className="carousel-image" />,   <img src="image3.jpg" alt="Slide 3" className="carousel-image" />,   <img src="image4.jpg" alt="Slide 4" className="carousel-image" />]



const BlinkingButtons = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/earn"); // Переход на /earn
  };

  const handleClick2 = () => {
    navigate("/invest"); // Переход на /invest
  };

  return (
    <div className="blinking-buttons-container">
      <button className="blinking-button" onClick={handleClick1}>EARN WITH US</button>
      <button className="blinking-button" onClick={handleClick2}>INVEST IN US</button>
    </div>
  );
};

  return (
    <div>
         <CarouselSmall slides={slideDataSmall} />
      <div style={{ display: "flex" }}>

        <nav style={{ width: "200px", padding: "20px", background: "#f4f4f4" }}>

      <div className="greeting-container">
        {isUserRegistered ? (
          <>
            {/* <h1>{t('Hi')}, {user.firstName} {user.lastName}! <br/></h1>
            <br/> */}
           

      
            <li>
            <span>{t('Hi')},</span>
              <span>{user.firstName} {user.lastName}!</span>
              <br/>
              <br/>
              <Link to="/profile">{t('PERSONAL_ACCOUNT')}</Link>
            </li>      

          </>
          
        ) : (
          <h1> <RegistrationLogin /> </h1>
        )}
      </div>



          <ul className="menu-list">
            {/* <li>
              <Link to="/profile">{t('Личный кабинет')}</Link>
            </li> */}

            <h2>{t('menu')}</h2>
            <li>
              <Link to="/">{t('home')}</Link>
            </li>
            <li>
              <Link to="/slots">{t('free_slots')}</Link>
            </li>
            <li>
              <Link to="/howpeoples">{t('how_many_people')}</Link>
            </li>
            <li>
              <Link to="/link_to_your_site">{t('link_to_your_site')}</Link>
            </li>
            <li>
              <Link to="/slots">{t('Buy_ free_slots')}</Link>
            </li>
            <li>
              <Link to="/map">{t('map')}</Link>
            </li>

            <li>
              <Link to="/contact">{t('Contact us')}</Link>
            </li>
          </ul>
        </nav>

        {/* Основной контент */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/profile" element={<YourAccount />} />
          </Routes>
          <Routes>
            {/* <Route path="/profile" element={<YourAccount />} /> */}
            <Route path="/" element={<StepByStep />} />
            <Route path="/slots" element={<DynamoDBTable />} />
            <Route path="/howpeoples" element={<HowPeople />} />
            <Route path="/link_to_your_site" element={<LinkYouPage />} />   
            <Route path="/contact" element={<ContactForm />} />

            <Route path="/map" element={<Map />} />

             <Route path="/earn" element={<EarnPage />} />
      <Route path="/invest" element={<InvestPage />} />

          </Routes>
        </div>
                 <BlinkingButtons />
      </div>
    </div>
  );
};



export default App;


