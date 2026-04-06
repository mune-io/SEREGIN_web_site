import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';






const DynamoDBTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedPrices, setSelectedPrices] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();
  const { t } = useTranslation();

const [showModal, setShowModal] = useState(false);
const [errorMessage, setErrorMessage] = useState("");


  const apiEndpoint = "https://fromdb.azurewebsites.net/api/http_trigger?";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const response = await fetch(apiEndpoint, { headers: { "Content-Type": "application/json" } });
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const responseData = await response.json();
        setFilteredData(responseData.filter((item) => item.status === "FREE"));
      } catch (error) {
        console.error("Ошибка при получении данных из API:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (slotId, price) => {
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots, [slotId]: !prevSelectedSlots[slotId] };
      setSelectedPrices((prevPrices) => newSelectedSlots[slotId] ? [...prevPrices, price] : prevPrices.filter((p) => p !== price));
      return newSelectedSlots;
    });
  };

  const handlePayment = async () => {
    const selectedSlotIds = Object.keys(selectedSlots).filter((slotId) => selectedSlots[slotId]);
    const token = localStorage.getItem("id_token");
    const user_email = localStorage.getItem("user_email");
    if (!token || !user_email) return alert("Авторизуйтесь заново.");

    // const firstSelectedPrice = selectedPrices.length > 0 ? selectedPrices[0] : 0;
    // console.log("firstSelectedPrice это вот ", firstSelectedPrice  )
    const firstSelectedPrice = selectedPrices
      .map(price => Number(price)) // Преобразуем в числа
      .reduce((acc, price) => acc + price, 0) * 100; // Складываем и умножаем на 100

    console.log("firstSelectedPrice это вот ", firstSelectedPrice);





    try {
      const response = await axios.post(
        "https://okokok2.azurewebsites.net/api/validate_token",
        { selectedSlotIds, user_email, selectedPrices: firstSelectedPrice },
        { params: { token } }
      );
      console.log(response.data);   ////////////////////////////////////////////////////////
      if (response.status === 200 && response.data.payment_url?.[0]) {
        window.location.href = response.data.payment_url[0];
      } else {
        alert("Ошибка: Не удалось получить ссылку для платежа.");
      }
    }
    //  catch (error) {alert(`Ошибка оплаты:  ЗАРЕГИСТРИРУЙТЕСЬ ЕЩЕ РАЗ ${error.response?.status || 'Неизвестная ошибка'}`   );    }
    catch (error) {
      setErrorMessage(`Ошибка оплаты: ЗАРЕГИСТРИРУЙТЕСЬ ЕЩЕ РА  login again please  (${error.response?.status || 'Неизвестная ошибка'})`);
      setShowModal(true);
    }
    

  };

  return (
    <div>
      



      <h3>{t('purchase')}</h3>
      <table border="1">
        <thead>
          <tr>
            <th>{t('week_number')}</th>
            <th>{t('week_days')}</th>
            <th>{t('price')}</th>
            <th>{t('status')}</th>
            <th>{t('reserve')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.week_number}</td>
              <td>{item.week_days.join(", ")}</td>
              <td>{item.price}</td>
              <td style={{ backgroundColor: item.status === "RESERVED" ? "red" : "green", color: "white" }}>
                {item.status}
              </td>
              <td>
                {item.status === "FREE" ? (
                  <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input
                      type="checkbox"
                      checked={selectedSlots[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id, item.price)}
                      style={{ transform: "scale(1.2)", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "14px", color: "#007BFF" }}>{t("reserve")}</span>
                  </label>
                ) : (
                  <span style={{ fontSize: "14px", color: "#666" }}>{t("reserved")}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        {t('reserving')}: <strong>{Object.values(selectedSlots).filter(Boolean).length}</strong> {t('weeks')}
      </div>
      <button
        onClick={handlePayment}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        {t('pay')}
      </button>

      {showModal && (
  <div style={{
    position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "white", padding: "20px", borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center"
    }}>
      <p>{errorMessage}</p>
      <a
        href="https://munepl.b2clogin.com/munepl.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_mune_auth&client_id=a0fb190b-7964-4f58-8fb1-28e8e630c5e4&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=_ZZZ5MRUFQQaPnCPaSek7OrbZc92rD2Uj7qCkxajVLQ"
        style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", borderRadius: "5px", textDecoration: "none", marginTop: "10px" }}
      >
        {t("login")} / {t("registration")}
      </a>
      <br />
      <button onClick={() => setShowModal(false)} style={{ marginTop: "10px", padding: "8px 16px", border: "none", backgroundColor: "#DC3545", color: "white", borderRadius: "5px" }}>
        Закрыть
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default DynamoDBTable;