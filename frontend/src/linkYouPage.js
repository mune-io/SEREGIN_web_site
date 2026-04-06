
import { useTranslation } from 'react-i18next';

const LinkYouPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      paddingTop: "50px",
      boxSizing: "border-box"
    }}>


      <h1> {t('link_to_your_site')} ?</h1>
      <h4> {t('link_to_your_site_text')} </h4>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        {/* Если нужны другие картинки, добавляй сюда */}
      </div>

      <img
        src="patatos.gif"
        alt="Patatos animation"
        style={{
          width: "100%",
          maxWidth: "500px", // Ограничим максимум
          height: "auto",
          marginTop: "20px",
          objectFit: "contain"
        }}
      />
    </div>
  );
};

export default LinkYouPage;
