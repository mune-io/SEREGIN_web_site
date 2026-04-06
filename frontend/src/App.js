import  { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { generatePKCE } from "./pkce";

import { useTranslation } from "react-i18next"; // Хук для перевода
import YourAccount from "./YourAccount";
import StepByStep from "./StepByStep";
import "./App.css"; // Styles
import ContactForm from "./Email";

import Map    from './map/map';
import IsoStandardsPage from "./pages/IsoStandardsPage";
import Iso9001Page from "./pages/Iso9001Page";

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

  const certMenus = [
    {
      label: "Высшие стандарты ISO",
      link: "/iso-standards",
      items: [
        { label: "Сертификат ISO 9001", link: "/iso-9001" },
        "Сертификат ISO 14001","Сертификат ISO 27001","Сертификат ISO 37001","Сертификат ISO 37301","ISO 45001/OHSAS 18001","Сертификация ISO 42001:2023","Сертификат ISO 50001","Сертификация подрядчиков специализированных сооружений"
      ],
    },
    {
      label: "Сертификат SCC",
      items: ["Сертификат SCC для компаний","Сертификат SCC для сотрудников"],
    },
    {
      label: "Сертификация ISO",
      items: ["Сертификат ISO 1090","Сертификат ISO 17100","Сертификация ISO 18788:2015","Сертификат ISO 20700","Сертификат ISO 28000","Сертификат IATF 16949:2016","Сертификат ISO 3834","Сертификат ISO 22301","Сертификат ISO 29990","Стандарт PAX","Регламент Совета ЕС № 333/2011"],
    },
    {
      label: "GDPR",
      items: ["GDPR – основная информация","GDPR – подробная анкета","Интерес к GDPR"],
    },
    {
      label: "ИТ-стандарты",
      items: ["Сертификат ISO 20000","Сертификат ISO 27001","Аудит TISAX","Аудит кибербезопасности","Тестирование безопасности ИТ-систем"],
    },
    {
      label: "Углеродный след",
      items: ["Корпоративный сертификат углеродного следа","Проект компенсации","Общая информация","Проверка углеродного следа","Отчет о портале CDP","Сертификат EPD","Анализ LCA"],
    },
    {
      label: "Экологические сертификаты",
      items: ["Сертификат ISO 14001","Сертификация EMAS","Стандарт ISSC","Стандарты PEFC и FSC","Стандарты углеродного следа продукции","Сертификация Green Globe","Сертификация GSTC"],
    },
    {
      label: "Пищевая промышленность",
      items: ["Стандарты IFS, BRC, FSSC и ISO 22000","Стандарт HACCP","Стандарты GMP и FSA"],
    },
    {
      label: "Здравоохранение и фармацевтика",
      items: ["Сертификат ISO 13485","Сертификат ISO 15224","GDP – Надлежащая практика дистрибуции"],
    },
    {
      label: "Социальная ответственность",
      items: ["Сертификат ISO 26000","Сертификация SA8000","Аудит SEDEX / SMETA","Отчет по ESG"],
    },
    {
      label: "Международные стандарты",
      items: ["Сертификация CE","Сертификация EAC","Сертификация UKRSEPRO","Сертификация UKCA","BREEAM и LEED для зданий и сооружений"],
    },
  ];

  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (idx) => setOpenMenu(openMenu === idx ? null : idx);

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
              <Link to="/map">{t('map')}</Link>
            </li>

            {certMenus.map((menu, idx) => (
              <li key={idx} style={{ listStyle: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {menu.link ? (
                    <Link to={menu.link} style={{ fontSize: "14px", color: "#0066cc", padding: "4px 0", flex: 1 }}>
                      {menu.label}
                    </Link>
                  ) : (
                    <span style={{ fontSize: "14px", color: "#0066cc", padding: "4px 0", flex: 1 }}>
                      {menu.label}
                    </span>
                  )}
                  <button
                    onClick={() => toggleMenu(idx)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "10px", color: "#0066cc", padding: "4px 2px" }}
                  >
                    {openMenu === idx ? "▲" : "▼"}
                  </button>
                </div>
                {openMenu === idx && (
                  <ul style={{ paddingLeft: "12px", margin: "4px 0", listStyle: "disc" }}>
                    {menu.items.map((item, i) => {
                      const label = typeof item === "object" ? item.label : item;
                      const link  = typeof item === "object" ? item.link  : null;
                      return (
                        <li key={i} style={{ fontSize: "13px", padding: "2px 0" }}>
                          {link
                            ? <Link to={link} style={{ color: "#0066cc" }}>{label}</Link>
                            : <span style={{ color: "#333" }}>{label}</span>
                          }
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}

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
            <Route path="/contact" element={<ContactForm />} />

            <Route path="/map" element={<Map />} />
            <Route path="/iso-standards" element={<IsoStandardsPage />} />
            <Route path="/iso-9001" element={<Iso9001Page />} />

          </Routes>
        </div>

      </div>
    </div>
  );
};



export default App;


