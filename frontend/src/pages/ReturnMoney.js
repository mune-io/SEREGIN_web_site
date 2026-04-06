import React, { useState } from "react";
import { ethers } from "ethers";
import {
  contractABI,
  CONTRACT_ADDRESS
} from "./CREDENTIALS";

export default function WithdrawPOLButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const withdrawPOL = async () => {
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

      // вызываем withdrawFunds (POL/MATIC)
      const tx = await contract.withdrawFunds();
      console.log("TX sent:", tx.hash);
      await tx.wait();

      alert("✅ POL (MATIC) успешно выведен на кошелек владельца!");
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка при выводе POL (MATIC)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={withdrawPOL} disabled={loading}>
        {loading ? "Подождите..." : "Вывести POL (MATIC)"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
