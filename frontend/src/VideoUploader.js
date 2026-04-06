

// VideoUploader.js
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import AuthModal from "./registerAgain"; // Импорт модального окна

const token = localStorage.getItem("id_token");
const user_email = localStorage.getItem("user_email");

const VideoUploader = () => {
  const { t } = useTranslation();
  const [videoFile, setVideoFile] = useState(null);
  
  const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
  const [errorMessage, setErrorMessage] = useState(""); // Состояние для хранения текста ошибки

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) return;
    
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("user_email", user_email);
    
    try {
      const response = await fetch("https://privatroom.azurewebsites.net/api/uploadvideo", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      
      if (response.ok) {
        alert(t("Video successfully submitted for review"));
        setVideoFile(null);
      } else {
        setErrorMessage(t("Error uploading video. Please try again."));
        setShowModal(true);
      }
    } catch (error) {
      setErrorMessage(t("Request error. Please log in again."));
      setShowModal(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div 
        onDrop={handleFileDrop} 
        onDragOver={(event) => event.preventDefault()} 
        style={{ border: "2px dashed #007BFF", padding: "20px", width: "50%", margin: "auto" }}
      >
        {videoFile ? <p>{videoFile.name}</p> : <p>{t('Drag and drop a video file here')}</p>}
      </div>
      <button 
        onClick={handleSubmit} 
        style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}
      >
        {t('Submit for Review')}
      </button>

      {/* Модальное окно должно быть отдельно, а не внутри кнопки */}
      <AuthModal show={showModal} onClose={() => setShowModal(false)} message={errorMessage} />
    </div>
  );
};

export default VideoUploader;
