import { useEffect } from "react";
import { ethers } from "ethers";

function CheckOwner() {
  useEffect(() => {
    const checkOwner = async () => {
      try {
        if (!window.ethereum) {
          console.log("MetaMask не найден");
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Запрос разрешения

        const signer = provider.getSigner();
        const myAddress = await signer.getAddress();
        console.log("🧾 Current signer:", myAddress);

        const contract = new ethers.Contract(
          "0xfbedd3947ebc6f6535f666e8242902e578055e62",
          [
            {
              name: "owner",
              type: "function",
              stateMutability: "view",
              inputs: [],
              outputs: [{ internalType: "address", name: "", type: "address" }]
            }
          ],
          signer
        );

        const owner = await contract.owner();
        console.log("🔐 Owner:", owner);
      } catch (error) {
        console.error("Ошибка при проверке владельца:", error);
      }
    };

    checkOwner();
  }, []);

  return <div />;
}

export default CheckOwner;




// import { useEffect } from 'react';
// import { BrowserProvider, Contract } from "ethers";

// function CheckOwner() {
//   useEffect(() => {
//     const checkOwner = async () => {
//       try {
//         if (!window.ethereum) {
//           console.log("Ethereum provider not found");
//           return;
//         }

//         const provider = new BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();

// const myAddress = await signer.getAddress();
// console.log("🧾 Current signer:", myAddress);


//         const contract = new Contract(
//           "0xfbedd3947ebc6f6535f666e8242902e578055e62",
//           [
//             {
//               name: "owner",
//               type: "function",
//               stateMutability: "view",
//               inputs: [],
//               outputs: [{ internalType: "address", name: "", type: "address" }]
//             }
//           ],
//           signer
//         );

//         const owner = await contract.owner();
//         console.log("Owner:", owner);
        
//       } catch (error) {
//         console.error("Error checking owner:", error);
//       }
//     };

//     checkOwner();
//   }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

//   return (
//     <div>
//       {/* Ваш JSX */}
//     </div>
//   );
// }

// export default CheckOwner;