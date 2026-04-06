import { useTranslation } from "react-i18next";

const EarnPage = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontSize: "18px",
        lineHeight: "1.6",
      }}
    >
      <h1>{t("earn_with_us")}</h1>

      <p>{t("if_you_are_driver_or_car_owner")}:</p>
      <ul>
        <li>{t("tablet_at_home_download_app")}</li>
        <li>
          {t("download_app_description")}{" "}
          <a
            href="https://munepl.s3.eu-north-1.amazonaws.com/mune_pl_privat.apk"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("download_app_link") || "📥 Скачать приложение"}
          </a>
        </li>
        <li>{t("choose_and_order_frame")}</li>
        <li>{t("charge_tablet_attach_earn")}</li>
        <li>{t("app_detects_viewers_automatically")}</li>
        <li>{t("around_200_zloty_passive_income")}</li>
        <li>{t("while_driving_taxi_tablet_earns")}</li>
        <li>{t("order_tablet_from_us_if_needed")}</li>
        <li>{t("install_yourself_or_partner_shops")}</li>
        <li>{t("earn_up_to_90_percent_ad_revenue")}</li>
      </ul>

      <p>{t("if_you_are_fleet_owner")}:</p>
      <ul>
        <li>{t("write_to_us")}</li>
        <li>{t("earn_5_percent_providing_api")}</li>
      </ul>

      <p>{t("know_advertiser")}?</p>
      <ul>
        <li>{t("write_to_us")}</li>
        <li>{t("bring_advertiser")}</li>
        <li>{t("earn_around_15_percent_ad_revenue")}</li>
      </ul>

      {/* Новый раздел — установка через QR */}
      <h2>{t("how_to_install_monitor_permanently")}</h2>
      <p>{t("permanent_installation_description")}</p>

      <ul>
        <li>{t("reset_to_factory_settings")}</li>
        <li>{t("select_language_and_wifi")}</li>
        <li>{t("on_google_login_enter_afw")}</li>
        <li>{t("enter_afw_setup_instructions")}</li>
        <li>{t("camera_opens_scan_qr")}</li>
        <li>
          {t("scan_qr_image")}{" "}
  
        </li>

        {/* Отображение картинки из public */}
        <img
          src="/enrollment_qr_manual.png"
          alt="QR код для установки"
          style={{
            display: "block",
            maxWidth: "300px",
            margin: "1rem auto",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)"
          }}
        />

        <li>{t("installation_continues_automatically")}</li>
        <li>{t("enter_tablet_nickname_in_app")}</li>
        <li>{t("be_careful_wrong_nickname_no_payment")}</li>
      </ul>
    </div>
  );
};

export default EarnPage;

