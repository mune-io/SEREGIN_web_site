import { useState } from "react";
import { ethers } from "ethers";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

import {
  contractABI,
  rate,
  CONTRACT_ADDRESS,
} from "./CREDENTIALS";

export default function BuyTokensSection() {
  const { t } = useTranslation();
  const [amountMUN, setAmountMUN] = useState("");
  const [userWallet, setUserWallet] = useState("");
  // const [trxWallet, setTrxWallet] = useState("");
  const [email, setEmail] = useState("");
  const [txnHash, setTxnHash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (txHash) => {
    const formData = {
      name: `${email}`,
      message: `Транзакция: https://polygon.blockscout.com/tx/${txHash}`,
    };
    console.log("Данные для отправки:", formData);

    emailjs
      .send(
        "service_3x874qq",     // ID сервиса
        "template_nv6gmj6",    // ID шаблона
        formData,
        "NLojWH0kvUJiAH0cf"    // Public Key
      )
      .then(() => alert("Сообщение отправлено на email!"))
      .catch(() => alert("Ошибка при отправке email"));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const buyTokens = async () => {
  console.log("Функция buyTokens вызвана");
  try {
    if (!window.ethereum) {
      setError(
        <span>
          MetaMask не установлен. Установите его по ссылке:{" "}
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            https://metamask.io/download.html
          </a>
        </span>
      );
      return;
    }

    setLoading(true);
    setError("");

    // Запрашиваем аккаунты с обработкой ошибок
    let accounts;
    try {
      accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      }).catch(err => {
        if (err.code === 4001) {
          throw new Error("Пользователь отклонил запрос подключения");
        }
        throw err;
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    console.log("Аккаунты получены:", accounts);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    // Используем accounts из запроса вместо signer.getAddress()
    const address = accounts[0];
    console.log("Адрес кошелька:", address);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    console.log("Контракт создан");

    const amount = parseFloat(amountMUN);
    if (isNaN(amount) || amount <= 0) {
      setError("Введите корректное количество токенов");
      setLoading(false);
      return;
    }

    if (!email ) {
      setError("Укажите email и TRX20-кошелёк для получения прибыли");
      setLoading(false);
      return;
    }

    const maticNeeded = amount * rate;
    const value = ethers.utils.parseEther(maticNeeded.toString());

    const tx = await contract.buyTokens({ value, gasLimit: 400000 });
    console.log("Транзакция отправлена:", tx.hash);
    
    await tx.wait();
    console.log("Транзакция подтверждена");

    setTxnHash(tx.hash);
    sendEmail(tx.hash);
    alert(`Успешно! TX: ${tx.hash}`);
  } catch (err) {
    console.error("Ошибка при покупке:", err);
    setError("Ошибка при вызове контракта: " + (err.message || "Неизвестная ошибка"));
  } finally {
    setLoading(false);
  }
};


  // return (
  //   <div style={{ maxWidth: 500, margin: "0 auto" }}>

  //     {/* Основная форма покупки токенов */}
  //     <h3>Покупка токенов MUN</h3>
  //     <input
  //       type="text"
  //       placeholder="Введите адрес вашего кошелька"
  //       value={userWallet}
  //       onChange={(e) => setUserWallet(e.target.value)}
  //       style={{ width: "100%", marginBottom: 10, padding: 8 }}
  //     />
  //     <input
  //       type="number"
  //       placeholder="Сколько MUN вы хотите купить"
  //       value={amountMUN}
  //       onChange={(e) => setAmountMUN(e.target.value)}
  //       style={{ width: "100%", marginBottom: 10, padding: 8 }}
  //     />

  //     <input
  //       type="email"
  //       placeholder="Ваш e-mail"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       style={{ width: "100%", marginBottom: 10, padding: 8 }}
  //     />

  //     <button
  //       onClick={buyTokens}
  //       disabled={!amountMUN || !userWallet || loading}
  //       style={{ 
  //         padding: "10px 20px", 
  //         backgroundColor: "#2196F3", 
  //         color: "white", 
  //         border: "none", 
  //         borderRadius: 4, 
  //         cursor: "pointer", 
  //         width: "100%" 
  //       }}
  //     >
  //       {loading ? "Обработка..." : `Купить за ${(amountMUN * rate).toFixed(6)} MATIC`}
  //     </button>

  //     {txnHash && (
  //       <p style={{ marginTop: 10 }}>
  //         ✅{" "}
  //         <a
  //           href={`https://polygon.blockscout.com/tx/${txnHash}`}
  //           target="_blank"
  //           rel="noreferrer"
  //           style={{ color: "#2196F3" }}
  //         >
  //           Транзакция успешно отправлена
  //         </a>
  //       </p>
  //     )}

  //     {error && <p style={{ color: "red" }}>{error}</p>}
  //   </div>
  // );
return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      {/* Основная форма покупки токенов */}
      <h3>{t('buy_mun_tokens')}</h3>
      
      <input
        type="text"
        placeholder={t('wallet_address_placeholder')}
        value={userWallet}
        onChange={(e) => setUserWallet(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      
      <input
        type="number"
        placeholder={t('mun_amount_placeholder')}
        value={amountMUN}
        onChange={(e) => setAmountMUN(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        type="email"
        placeholder={t('email_placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <button
        onClick={buyTokens}
        disabled={!amountMUN || !userWallet || loading}
        style={{ 
          padding: "10px 20px", 
          backgroundColor: "#2196F3", 
          color: "white", 
          border: "none", 
          borderRadius: 4, 
          cursor: "pointer", 
          width: "100%" 
        }}
      >
        {loading ? t('processing') : `${t('buy_for')} ${(amountMUN * rate).toFixed(6)} MATIC`}
      </button>

      {txnHash && (
        <p style={{ marginTop: 10 }}>
          ✅{" "}
          <a
            href={`https://polygon.blockscout.com/tx/${txnHash}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2196F3" }}
          >
            {t('transaction_success')}
          </a>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );

}


