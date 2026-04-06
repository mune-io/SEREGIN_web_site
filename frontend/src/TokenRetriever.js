import React, { useEffect } from "react";
import axios from "axios";

const decodeBase64 = (base64) => {
  try {
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Error decoding base64:", error);
    return null;
  }
};

const TokenRetriever = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const codeVerifier = localStorage.getItem("pkce_verifier"); // мы его сохранили до редиректа

    if (code && codeVerifier) {
      const endpoint = `https://tokenretriv.azurewebsites.net/api/tokenretriever`;

      axios
        .post(endpoint, { code, code_verifier: codeVerifier })
        .then((response) => {
          const { id_token, access_token, refresh_token, profile_info } = response.data;

          console.log("Access Token:", access_token);
          console.log("ID Token:", id_token);
          console.log("Refresh Token:", refresh_token);
          console.log("Profile Info (raw):", profile_info);

          // ---------- Декодируем ID токен ----------
          if (id_token) {
            const [, payload] = id_token.split(".");
            const userInfo = decodeBase64(payload);

            if (userInfo) {
              console.log("User Info from ID Token:", userInfo);

              if (userInfo.family_name) {
                localStorage.setItem("last_name", userInfo.family_name);
              }
              if (userInfo.given_name) {
                localStorage.setItem("first_name", userInfo.given_name);
              }

              // Email (может быть в разных полях)
              const userEmail = userInfo.email || (userInfo.emails ? userInfo.emails[0] : null);
              if (userEmail) {
                localStorage.setItem("user_email", userEmail);
                console.log("Extracted Email:", userEmail);
              }
            }
          }

          // ---------- Сохраняем токены ----------
          if (access_token) localStorage.setItem("access_token", access_token);
          if (id_token) localStorage.setItem("id_token", id_token);
          if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
          if (profile_info) localStorage.setItem("profile_info", profile_info);
        })
        .catch((error) => {
          console.error("Token exchange error:", error);
        });
    } else {
      console.warn("Code or code_verifier is missing");
    }
  }, []);

  return <div></div>;
};

export default TokenRetriever;



// import React, { useEffect } from "react";
// import axios from "axios";

// const decodeBase64 = (base64) => {
//   try {
//     return JSON.parse(atob(base64));
//   } catch {
//     return null;
//   }
// };

// const TokenRetriever = () => {
//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const code = queryParams.get("code");

//     // если кода нет — ничего не делаем (не редиректим!)
//     if (!code) return;

//     const endpoint = `https://tokenretriv.azurewebsites.net/api/tokenretriever`;
//     const verifier = localStorage.getItem("pkce_verifier");

//     axios
//       .post(endpoint, { code, verifier })
//       .then((response) => {
//         const { id_token, access_token, refresh_token, profile_info } = response.data;

//         // сохранить токены и данные в localStorage
//         localStorage.setItem("access_token", access_token);
//         localStorage.setItem("id_token", id_token);
//         localStorage.setItem("refresh_token", refresh_token);
//         localStorage.setItem("profile_info", profile_info);

//         // извлечь email из id_token
//         if (id_token) {
//           const [, payload] = id_token.split(".").slice(0, 2);
//           const userInfo = decodeBase64(payload);
//           if (userInfo?.email) {
//             localStorage.setItem("user_email", userInfo.email);
//           }
//         }
//       })
//       .catch((err) => console.error("Token exchange error:", err));
//   }, []);

//   return null;
// };

// export default TokenRetriever;





// // TokenRetriever.jsx
// import React, { useEffect } from "react";
// import axios from "axios";

// // --- PKCE utils ---
// function base64URLEncode(arrayBuffer) {
//   return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }

// async function generateCodeChallenge(verifier) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(verifier);
//   const digest = await crypto.subtle.digest("SHA-256", data);
//   return base64URLEncode(digest);
// }

// export async function generatePKCE() {
//   const array = new Uint8Array(32);
//   crypto.getRandomValues(array);
//   const verifier = base64URLEncode(array);
//   const challenge = await generateCodeChallenge(verifier);

//   localStorage.setItem("pkce_verifier", verifier);

//   return { verifier, challenge };
// }

// // --- Token decoding helper ---
// const decodeBase64 = (base64) => {
//   try {
//     return JSON.parse(atob(base64));
//   } catch (error) {
//     console.error("Error decoding base64:", error);
//     return null;
//   }
// };

// const TokenRetriever = () => {
//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const code = queryParams.get("code");

//     // Если code отсутствует → генерируем PKCE и редиректим пользователя на авторизацию
//     // if (!code) {
//     //   (async () => {
//     //     const { challenge } = await generatePKCE();

//     //     const clientId = "a0fb190b-7964-4f58-8fb1-28e8e630c5e4";
//     //     const redirectUri = encodeURIComponent(window.location.origin + "/");
//     //     const authEndpoint = "https://munepl.b2clogin.com/munepl.onmicrosoft.com/oauth2/v2.0/authorize"; 
//     //     // поменяй на свой endpoint

//     //     const url =
//     //       `${authEndpoint}?client_id=${clientId}` +
//     //       `&response_type=code` +
//     //       `&redirect_uri=${redirectUri}` +
//     //       `&response_mode=query` +
//     //       `&scope=openid profile email offline_access` +
//     //       `&code_challenge=${challenge}` +
//     //       `&code_challenge_method=S256`;

//     //     window.location.href = url;
//     //   })();
//     //   return;
//     // }

//     // Если code есть → отправляем его на backend для обмена на токены
//     const endpoint = `https://tokenretriv.azurewebsites.net/api/tokenretriever`;

//     const verifier = localStorage.getItem("pkce_verifier");

//     axios
//       .post(endpoint, { code, verifier })
//       .then((response) => {
//         const { id_token, access_token, refresh_token, profile_info } = response.data;

//         console.log("Access Token:", access_token);
//         console.log("ID Token:", id_token);
//         console.log("Refresh Token:", refresh_token);
//         console.log("Profile Info (raw):", profile_info);

//         let userEmail = null;

//         if (id_token) {
//           const [, payload] = id_token.split(".").slice(0, 2);
//           const userInfo = decodeBase64(payload);

//           if (userInfo) {
//             console.log("User Info from ID Token:", userInfo);

//             console.log("last_name:", userInfo.family_name);
//             localStorage.setItem("last_name", userInfo.family_name);

//             console.log("first_name:", userInfo.given_name);
//             localStorage.setItem("first_name", userInfo.given_name);

//             userEmail = userInfo.email || (userInfo.emails ? userInfo.emails[0] : null);
//             console.log("Extracted Email:", userEmail);
//           }
//         }

//         localStorage.setItem("access_token", access_token);
//         localStorage.setItem("id_token", id_token);
//         localStorage.setItem("refresh_token", refresh_token);
//         localStorage.setItem("profile_info", profile_info);

//         if (userEmail) {
//           localStorage.setItem("user_email", userEmail);
//         }
//       })
//       .catch((error) => {
//         console.error("Error sending code to endpoint:", error);
//       });
//   }, []);

//   return <div>Loading...</div>;
// };

// export default TokenRetriever;


//100% работает
// import React, { useEffect } from "react";
// import axios from "axios";

// const decodeBase64 = (base64) => {
//   try {
//     return JSON.parse(atob(base64));
//   } catch (error) {
//     console.error("Error decoding base64:", error);
//     return null;
//   }
// };

// const TokenRetriever = () => {
//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const code = queryParams.get("code");

//     if (code) {
//       const endpoint = `https://tokenretriv.azurewebsites.net/api/tokenretriever`;

//       axios
//         .post(endpoint, { code })
//         .then((response) => {
//           const { id_token, access_token, refresh_token, profile_info } = response.data;

//           console.log("Access Token:", access_token);
//           console.log("ID Token:", id_token);
//           console.log("Refresh Token:", refresh_token);
//           console.log("Profile Info (raw):", profile_info);

//           let userEmail = null;

//           // Декодируем `id_token` для получения информации о пользователе
//           if (id_token) {
//             const [, payload] = id_token.split(".").slice(0, 2);
//             const userInfo = decodeBase64(payload);
            
//             if (userInfo) {
//               console.log("User Info from ID Token:", userInfo);

//               console.log("last_name:", userInfo.family_name);
//               localStorage.setItem("last_name:", userInfo.family_name);

//               console.log("first_name:", userInfo.given_name);
//               localStorage.setItem("first_name:", userInfo.given_name);

//               // Извлекаем email
//               userEmail = userInfo.email || (userInfo.emails ? userInfo.emails[0] : null);
//               console.log("Extracted Email:", userEmail);
//             }
//           }

//           // Сохраняем данные в localStorage
//           localStorage.setItem("access_token", access_token);
//           localStorage.setItem("id_token", id_token);
//           localStorage.setItem("refresh_token", refresh_token);
//           localStorage.setItem("profile_info", profile_info);

//           if (userEmail) {
//             localStorage.setItem("user_email", userEmail);
//           }

//         })
//         .catch((error) => {
//           console.error("Error sending code to endpoint:", error);
//         });
//     } else {
//       console.warn("Code parameter is missing in the URL");
//     }
//   }, []);

//   return <div></div>;
// };

// export default TokenRetriever;
