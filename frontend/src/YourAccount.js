import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import VideoUploader from "./VideoUploader";

const API_URL     = "https://1jiguexuq9.execute-api.eu-north-1.amazonaws.com/default/taxi_search_by_device";
const NICKNAME_URL = "https://ВАШ_AZURE_ENDPOINT/api/set_nickname"; // ← замени

const TaxiSearch = () => {
  const { t } = useTranslation();

  // Поиск
  // const [deviceNum, setDeviceNum] = useState("");
  const [deviceNum, setDeviceNum] = useState(() => localStorage.getItem("nickname") || "");
  const [dateFrom,  setDateFrom]  = useState("");
  const [dateTo,    setDateTo]    = useState("");
  const [results,   setResults]   = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);

  // Никнейм
  const [nickname,        setNickname]        = useState("");
  const [nicknameInput,   setNicknameInput]   = useState("");
  const [nicknameLoading, setNicknameLoading] = useState(false);
  const [nicknameError,   setNicknameError]   = useState(null);
  const [nicknameSuccess, setNicknameSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nickname");
    if (saved) setNickname(saved);
  }, []);

  const handleSendNickname = async () => {
    if (!nicknameInput.trim()) {
      setNicknameError(t('ya_enter_nickname'));
      return;
    }

    const user_email  = localStorage.getItem("user_email");
    const id_token    = localStorage.getItem("id_token");

    setNicknameLoading(true);
    setNicknameError(null);
    setNicknameSuccess(false);

    try {
      const response = await fetch(NICKNAME_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": id_token || "",
        },
        body: JSON.stringify({
          nickname:   nicknameInput.trim(),
          user_email: user_email || "",
        }),
      });

      if (response.ok) {
        localStorage.setItem("nickname", nicknameInput.trim());
        setNickname(nicknameInput.trim());
        setNicknameSuccess(true);
        setNicknameInput("");
      } else {
        const data = await response.json();
        setNicknameError(data.error || t('ya_server_error'));
      }
    } catch (e) {
      setNicknameError(t('ya_network_error') + e.message);
    } finally {
      setNicknameLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!deviceNum || !dateFrom || !dateTo) {
      setError(t('fields_not_filled'));
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_num: deviceNum,
          date_from:  dateFrom + ":00",
          date_to:    dateTo   + ":59",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || t('ya_request_error'));
      }
    } catch (e) {
      setError(t('ya_network_error') + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

      {/* СЕКЦИЯ НИКНЕЙМА */}
      <div style={{ marginBottom: "32px", padding: "16px", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
        {nickname ? (
          <p style={{ margin: 0, fontSize: "16px" }}>
            🏷️ {t('ya_device_name_label')} <strong>{nickname}</strong>
          </p>
        ) : (
          <div>
            <p style={{ color: "#c0392b", marginBottom: "12px" }}>
              {t('ya_no_nickname_text')}{" "}
              <strong>{t('ya_nickname_visible_note')}</strong>
            </p>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
              <div>
                <label>{t('ya_your_nickname')}</label><br />
                <input
                  type="text"
                  placeholder={t('ya_nickname_placeholder')}
                  value={nicknameInput}
                  onChange={e => setNicknameInput(e.target.value)}
                />
              </div>
              <button onClick={handleSendNickname} disabled={nicknameLoading}>
                {nicknameLoading ? t('ya_sending') : t('ya_send_btn')}
              </button>
            </div>

            {nicknameError   && <p style={{ color: "red",   marginTop: "8px" }}>{nicknameError}</p>}
            {nicknameSuccess && <p style={{ color: "green", marginTop: "8px" }}>{t('ya_nickname_saved')}</p>}
          </div>
        )}
      </div>

      {/* Два столбца */}
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

        {/* ЛЕВАЯ КОЛОНКА — поиск показов */}
        <div style={{ flex: 2 }}>
          <h2>{t('ya_search_shows')}</h2>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "20px" }}>
            <div>
              <label>{t('ya_device_or_nickname')}</label><br />
              <input
                type="text"
                placeholder={t('ya_enter_device_placeholder')}
                value={deviceNum}
                onChange={e => setDeviceNum(e.target.value)}
              />
            </div>
            <div>
              <label>{t('ya_from')}</label><br />
              <input type="datetime-local" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div>
              <label>{t('ya_to')}</label><br />
              <input type="datetime-local" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
            <div>
              <button onClick={handleSearch} disabled={loading}>
                {loading ? t('loading') : t('ya_search_btn')}
              </button>
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {results.length > 0 && (
            <>
            <table>
              <thead>
                <tr>
                  <th>Device</th>
                  <th>{t('ya_datetime_col')}</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>{t('ya_file_col')}</th>
                  <th>{t('ya_video_col')}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>
                    <td>{row.device_num}</td>
                    <td>{row.datetime}</td>
                    <td>{row.latitude}</td>
                    <td>{row.longitude}</td>
                    <td>{row.name_of_clip || "—"}</td>
                    <td>
                      {row.video_link
                        ? <a href={row.video_link} target="_blank" rel="noopener noreferrer">{t('ya_watch_link')}</a>
                        : "—"
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "8px", color: "gray" }}>
      {t('ya_total_shows')}: <strong>{results.length}</strong>
    </p>
  </>
            
          )}

          {!loading && results.length === 0 && !error && (
            <p style={{ color: "gray" }}>{t('ya_no_data')}</p>
          )}
        </div>

        {/* ПРАВАЯ КОЛОНКА — загрузка видео */}
        <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "32px" }}>
          <h2>{t('Upload_your_video')}</h2>
          <VideoUploader />
        </div>

      </div>
    </div>
  );
};

export default TaxiSearch;

// import React, { useState } from "react";
// import { useTranslation } from 'react-i18next';
// import VideoUploader from "./VideoUploader";

// const API_URL = "https://1jiguexuq9.execute-api.eu-north-1.amazonaws.com/default/taxi_search_by_device";

// const TaxiSearch = () => {
//   const { t } = useTranslation();

//   const [deviceNum, setDeviceNum] = useState("");
//   const [dateFrom,  setDateFrom]  = useState("");
//   const [dateTo,    setDateTo]    = useState("");
//   const [results,   setResults]   = useState([]);
//   const [loading,   setLoading]   = useState(false);
//   const [error,     setError]     = useState(null);

//   const handleSearch = async () => {
//     if (!deviceNum || !dateFrom || !dateTo) {
//       setError("Заполните все поля");
//       return;
//     }
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           device_num: deviceNum,
//           date_from:  dateFrom + ":00",
//           date_to:    dateTo   + ":59",
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setResults(data);
//       } else {
//         setError(data.error || "Ошибка запроса");
//       }
//     } catch (e) {
//       setError("Ошибка сети: " + e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

//       {/* Два столбца */}
//       <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

//         {/* ЛЕВАЯ КОЛОНКА — поиск поездок */}
//         <div style={{ flex: 2 }}>
//           <h2>{t('Поиск поездок')}</h2>

//           {/* Форма поиска в строку */}
//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "20px" }}>
//             <div>
//               <label>Устройство / никнейм</label><br />
//               <input
//                 type="text"
//                 placeholder="Введите device_num"
//                 value={deviceNum}
//                 onChange={e => setDeviceNum(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>От</label><br />
//               <input
//                 type="datetime-local"
//                 value={dateFrom}
//                 onChange={e => setDateFrom(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>До</label><br />
//               <input
//                 type="datetime-local"
//                 value={dateTo}
//                 onChange={e => setDateTo(e.target.value)}
//               />
//             </div>

//             <div>
//               <button onClick={handleSearch} disabled={loading}>
//                 {loading ? "Загрузка..." : "Искать"}
//               </button>
//             </div>
//           </div>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {results.length > 0 && (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Device</th>
//                   <th>Дата / Время</th>
//                   <th>Latitude</th>
//                   <th>Longitude</th>
//                   <th>Файл</th>
//                   <th>Видео</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((row, i) => (
//                   <tr key={i}>
//                     <td>{row.device_num}</td>
//                     <td>{row.datetime}</td>
//                     <td>{row.latitude}</td>
//                     <td>{row.longitude}</td>
//                     <td>{row.name_of_clip || "—"}</td>
//                     <td>
//                       {row.video_link
//                         ? <a href={row.video_link} target="_blank" rel="noopener noreferrer">▶ Смотреть</a>
//                         : "—"
//                       }
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {!loading && results.length === 0 && !error && (
//             <p style={{ color: "gray" }}>Нет данных для отображения</p>
//           )}
//         </div>

//         {/* ПРАВАЯ КОЛОНКА — загрузка видео */}
//         <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "32px" }}>
//           <h2>{t('Upload_your_video')}</h2>
//           <VideoUploader />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TaxiSearch;




// import React, { useEffect, useState } from "react";
// import { useTranslation } from 'react-i18next';
// import VideoUploader from "./VideoUploader";
// import './styles.css'; // Import the stylesheet

// const token = localStorage.getItem("id_token");
// const user_email = localStorage.getItem("user_email");

// const YourAccount = () => {
//   const { t } = useTranslation();
//   const [reservedSlots, setReservedSlots] = useState([]);
//   const [yourVideos, setYourVideos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://privatroom.azurewebsites.net/api/privatroom", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ user_email }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setReservedSlots(data.reserved_slots);
//           setYourVideos(data.user_videos);
//         } else {
//           console.error("Error:", response.status);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container"> {/* Use container class for general styling */}
//       <h1>{t('THIS IS YOUR PERSONAL ACCOUNT')}</h1>

//       <section> {/* Added semantic section elements */}
//         <h2>{t('Reserved Slots')}</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Owner</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reservedSlots.map((slot, index) => (
//               <tr key={index}>
//                 <td>{slot.id}</td>
//                 <td>{slot.owner}</td>
//                 <td>{slot.status}</td>
//                 <td>{slot.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       <section>
//         <h2>{t('Your Videos')}</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>User</th>
//               <th>Video URL</th>
//               <th>Status</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {yourVideos.map((video, index) => (
//               <tr key={index}>
//                 <td>{video.id}</td>
//                 <td>{video.user}</td>
//                 <td><a href={video.video_url} target="_blank" rel="noopener noreferrer">{t('Watch Video')}</a></td>
//                 <td>{video.status}</td>
//                 <td>{video.created_at}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       <section>
//         <h2>{t('Upload_your_video')}</h2>
//         <VideoUploader />
//       </section>
//     </div>
//   );
// };

// export default YourAccount;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
