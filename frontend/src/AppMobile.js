import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import StepByStep from "./StepByStep";
import ContactForm from "./Email";
import Map from "./map/map";
import Carousel from "./Carousel";
import CarouselSmall from "./CarouselSmall";



const AppMobile = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState({
    firstName: localStorage.getItem("first_name:"),
    lastName: localStorage.getItem("last_name:"),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const firstName = localStorage.getItem("first_name:");
      const lastName = localStorage.getItem("last_name:");
      setUser({ firstName, lastName });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const firstName = localStorage.getItem("first_name:");
      const lastName = localStorage.getItem("last_name:");

      if (firstName && lastName && firstName !== "None" && lastName !== "None") {
        setUser({ firstName, lastName });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isUserRegistered =
    user.firstName && user.lastName && user.firstName !== "None" && user.lastName !== "None";

  function RegistrationLogin() {
    return (
      <div className="button-container">
        <a
          href="https://denbarskris.b2clogin.com/denbarskris.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandin&client_id=de8b522f-47b2-4da7-b6a1-74bc333c5029&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login"
          className="login-button"
        >
          {t("login")} / {t("registration")}
        </a>
      </div>
    );
  }
const  slideDataSmall = [<img src="image1.jpg" alt="Slide 1" className="carousel-image" />, <a href="https://www.jackjones.com/pl-pl" target="_blank" rel="noopener noreferrer" key="1"><img src="jnj.jpg" alt="Slide jnj" className="carousel-image" /> </a>,  <img src="image2.jpg" alt="Slide 2" className="carousel-image" />,   <img src="image3.jpg" alt="Slide 3" className="carousel-image" />]


  const slideData = [
    <StepByStep key="step" />,
    <ContactForm key="contact" />,
    <Map key="map" />,
  ];

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ paddingBottom: "10px" }}>
        <CarouselSmall slides={slideDataSmall} />
            </div>  
            <div style={{ paddingTop: "10px" }}> 
            {isUserRegistered ? (
              <div style={{ marginBottom: "10px" }}>
                <span>{t("Hi")}, {user.firstName} {user.lastName}!</span>
              </div>
            ) : (
              <RegistrationLogin />
            )} 
            </div> 

      <Carousel slides={slideData} />

    </div>
  );
};

export default AppMobile;




// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import StepByStep from "./StepByStep";
// import DynamoDBTable from "./DynamoDBTable";
// import HowPeople from "./HowPeople";
// import LinkYouPage from "./linkYouPage";
// import ContactForm from "./Email";
// import Map from "./map/map";
// import Carousel from "./Carousel";
// import CarouselSmall from "./CarouselSmall";
// // import { useNavigate } from "react-router-dom";

// const AppMobile = () => {
//   const { t } = useTranslation();
//   // const navigate = useNavigate();

//   const [user, setUser] = useState({
//     firstName: localStorage.getItem("first_name:"),
//     lastName: localStorage.getItem("last_name:"),
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const firstName = localStorage.getItem("first_name:");
//       const lastName = localStorage.getItem("last_name:");
//       setUser({ firstName, lastName });
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const firstName = localStorage.getItem("first_name:");
//       const lastName = localStorage.getItem("last_name:");

//       if (firstName && lastName && firstName !== "None" && lastName !== "None") {
//         setUser({ firstName, lastName });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const isUserRegistered =
//     user.firstName && user.lastName && user.firstName !== "None" && user.lastName !== "None";

//   function RegistrationLogin() {
//     return (
//       <div className="button-container">
//         <a
//           href="https://denbarskris.b2clogin.com/denbarskris.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandin&client_id=de8b522f-47b2-4da7-b6a1-74bc333c5029&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login"
//           className="login-button"
//         >
//           {t("login")} / {t("registration")}
//         </a>
//       </div>
//     );
//   }

//   const slideDataSmall = [
//     <img src="image1.jpg" alt="Slide 1" className="carousel-image" />,
//     <a
//       href="https://www.jackjones.com/pl-pl"
//       target="_blank"
//       rel="noopener noreferrer"
//       key="1"
//     >
//       <img src="jnj.jpg" alt="Slide jnj" className="carousel-image" />
//     </a>,
//     <img src="image2.jpg" alt="Slide 2" className="carousel-image" />,
//     <img src="image3.jpg" alt="Slide 3" className="carousel-image" />,
//   ];

//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   const BlinkingLinks = () => {
//   return (
//     <div style={{ marginTop: "20px", textAlign: "center", display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px' }}>
//   <a
//     href="/earn"
//     style={{ color: "blue", textDecoration: "underline" }}
//   >
//   earn with us
//   </a>
//   <a
//     href="/invest"
//     style={{ color: "blue", textDecoration: "underline" }}
//   >
//     invest in us
//   </a>
// </div>

//   );
// };



//   const slideData = [
//     <StepByStep key="step" />,
//     <DynamoDBTable key="slots" />,
//     <HowPeople key="how" />,
//     <LinkYouPage key="link" />,
//     <ContactForm key="contact" />,
//     <Map key="map" />,
//     // <EarnPage key="earn" />,
//     // <InvestPage key="invest" />
//   ];

//   return (
//     <div style={{ padding: "10px" }}>
//       <div style={{ paddingBottom: "10px" }}>
//         <CarouselSmall slides={slideDataSmall} />
//       </div>
//       <div style={{ paddingTop: "10px" }}>
//         {isUserRegistered ? (
//           <div style={{ marginBottom: "10px" }}>
//             <span>
//               {t("Hi")}, {user.firstName} {user.lastName}!
//             </span>
//           </div>
//         ) : (
//           <RegistrationLogin />
//         )}
//       </div>

//       <Carousel slides={slideData} />
//       <BlinkingLinks />
//     </div>
//   );
// };

// export default AppMobile;




