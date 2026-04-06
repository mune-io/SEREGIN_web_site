import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, contractABI } from './CREDENTIALS';

function SetRate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!window.ethereum) {
      alert("MetaMask не найден");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Сначала запрос аккаунтов
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      console.log("Аккаунты:", accounts);

      // Подключаемся
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Контракт
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Устанавливаем rate = 613120784794604 (1 токен = 1631 MATIC в твоей логике)
      // const tx = await contract.setRate("613120784794604");

      const tx = await contract.setRate("300");
      console.log("Транзакция отправлена:", tx.hash);
      await tx.wait();

      // alert("Курс установлен: 1 MUN = 1631 MATIC");
      alert("Курс установлен: 1 MUN = 300 MATIC");
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Не удалось установить курс");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Установить курс: 1 MUN = 300 MATIC"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default SetRate;







// import { useEffect, useState } from 'react';
// import { BrowserProvider, Contract } from "ethers";
// import {   tokenAddress,   saleContractAddress,  tokenABI,  contractABI,  appConfig, rate, ratePerMUN ,  CONTRACT_ADDRESS   } from './CREDENTIALS';







// function SetRate() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const setRate = async () => {
//     try {
//       if (!window.ethereum) {
//         alert("MetaMask не найден");
//         return;
//       }

//       setIsLoading(true);
//       setError("");

//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const contract = new Contract(
//         CONTRACT_ADDRESS,
//         contractABI,
//         signer
//       );

//       const tx = await contract.setRate(1); // Устанавливаем rate = 1
//       await tx.wait();
//       alert("Курс установлен: 1 MUN = 1 MATIC");
//     } catch (err) {
//       console.error("Ошибка:", err);
//       setError("Не удалось установить курс");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={setRate} disabled={isLoading}>
//         {isLoading ? "Загрузка..." : "Установить курс: 1 токен за 1 MATIC"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// export default SetRate;
