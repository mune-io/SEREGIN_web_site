import React, { useState } from "react";
import { ethers } from "ethers";
import {
  contractABI,
  CONTRACT_ADDRESS
} from "./CREDENTIALS";

export default function WithdrawButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const withdrawTokens = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask не найден");
        return;
      }

      setLoading(true);
      setError("");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.withdrawTokens();
      console.log("TX sent:", tx.hash);
      await tx.wait();

      alert("✅ Токены успешно выведены!");
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка при выводе токенов");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={withdrawTokens} disabled={loading}>
        {loading ? "Подождите..." : "Вывести токены"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}


// import React, { useState } from "react";
// import { Contract, BrowserProvider } from "ethers";
// import {   tokenAddress,   saleContractAddress,  tokenABI,  contractABI,  appConfig, rate, ratePerMUN ,  CONTRACT_ADDRESS   } from './CREDENTIALS';


// const contractAddress = "0xfbedd3947ebc6f6535f666e8242902e578055e62";

// export default function WithdrawButton() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const withdrawTokens = async () => {
//     try {
//       if (!window.ethereum) {
//         setError("MetaMask не найден");
//         return;
//       }

//       setLoading(true);
//       setError("");

//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new Contract(contractAddress, contractABI, signer);

//       const tx = await contract.withdrawTokens();
//       console.log("TX sent:", tx.hash);
//       await tx.wait();
//       alert("Токены выведены!");
//     } catch (err) {
//       console.error("Ошибка:", err);
//       setError("Ошибка при выводе токенов");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={withdrawTokens} disabled={loading}>
//         {loading ? "Подождите..." : "Вывести токены"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }
