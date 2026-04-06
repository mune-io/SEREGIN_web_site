// import React from "react";
import { useTranslation } from "react-i18next";

const AuthModal = ({ show, onClose, message }) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "white", padding: "20px", borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center"
      }}>
        <p>{message}</p>
        <a
          // href="https://denbarskris.b2clogin.com/denbarskris.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandin&client_id=de8b522f-47b2-4da7-b6a1-74bc333c5029&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login"
          href= "https://munepl.b2clogin.com/munepl.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_mune_auth&client_id=a0fb190b-7964-4f58-8fb1-28e8e630c5e4&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmune.pl&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=EqqMh-ZXFgXjkeXR_vXuAh2O6A_656bXd1hHS_g1Mrg"
          style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", borderRadius: "5px", textDecoration: "none", marginTop: "10px" }}
        >
          {t("login")} / {t("registration")}
        </a>
        <br />
        <button onClick={onClose} style={{ marginTop: "10px", padding: "8px 16px", border: "none", backgroundColor: "#DC3545", color: "white", borderRadius: "5px" }}>
          {t("close")}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
