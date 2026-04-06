import { useTranslation } from "react-i18next";
import { useState } from "react";
import ConnectWallet from './ConnectWalle';
import BuyTokensButton from './BuyTokensButton';
import { rate } from './CREDENTIALS';

const InvestPage = () => {
  const { t } = useTranslation();
  const [agreed, setAgreed] = useState(false);

  const cardStyle = {
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  const buttonLinkStyle = {
    display: 'inline-block',
    background: '#3366cc',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '6px',
    textDecoration: 'none',
    marginTop: '10px'
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 10px',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        boxSizing: 'border-box'
      }}
    >
      <h2
        style={{
          fontSize: '22px',
          marginBottom: '20px',
          textAlign: 'center',
          padding: '0 5px'
        }}
      >
        {t('invest_in_mun')}
      </h2>

      {/* Секция 1 — Традиционно */}
      <div style={{ ...cardStyle }}>
        <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#444' }}>
          {t('investment.traditional_title')}
        </h3>
        <p>{t('investment.traditional_text')}</p>
        <a href="/contact" style={buttonLinkStyle}>
          {t('write_to_us')}
        </a>
      </div>

      {/* Секция 2 — Через покупку токена */}
      <div style={{ ...cardStyle }}>
        <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#444' }}>
          {t('investment.token_title')}
        </h3>
        <p>{t('investment.token_text')}</p>

        <ul style={{ paddingLeft: '18px', marginBottom: '20px' }}>
          
          <li>{t('token_profit_rights')}</li>
    
          <li>{t('token_description')}</li>
          <li>{t('how_to_buy_token')}</li>
          <li>
            - {t('install_metamask')}{" "}
            <a
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3366cc', textDecoration: 'underline' }}
            >
              metamask.io/download.html
            </a>{" "}
            {t('if_not_installed')}
          </li>
          <li>- {t('create_polygon_wallet')}</li>
          <li>{t('enter_matic_wallet')}</li>
          <li>{t('enter_email')}</li>
          <li>{t('click_buy')}</li>
          <li>{t('receive_passive_income')}</li>
        </ul>

        <div
          style={{
            padding: '15px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        >
          <h4 style={{ marginBottom: '10px' }}>{t('buy_mun')}</h4>
          <p style={{ fontSize: '16px', marginBottom: '15px' }}>
            {t('exchange_rate')}: <strong>1 MUN = {rate} MATIC</strong>
          </p>
          <ConnectWallet />
        </div>

        {/* Чекбокс согласия */}
        <label
          style={{
            fontSize: '14px',
            color: '#555',
            marginBottom: '15px',
            display: 'block'
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            style={{ marginRight: '8px' }}
          />
          {t('agree_terms')}{" "}
          <a
            href="/public_offer_MUN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3366cc', textDecoration: 'underline' }}
          >
            {t('public_offer')}
          </a>.
        </label>

        {/* Кнопка покупки */}
        <div
          style={{
            opacity: agreed ? 1 : 0.5,
            pointerEvents: agreed ? 'auto' : 'none'
          }}
        >
          <BuyTokensButton />
        </div>
      </div>

      {/* 🌍 Секция Whitepaper */}
      <div style={{ ...cardStyle, textAlign: 'center' }}>
        <h3 style={{ color: '#333', marginBottom: '10px' }}>Whitepaper - Road Map</h3>
        <p style={{ fontSize: '14px', marginBottom: '10px' }}>
          {t('whitepaper_description')}
        </p>
        {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          <a href="https://mune-io.github.io/WHITE_PAPER/whitepaper_pl.html" target="_blank" rel="noopener noreferrer" style={buttonLinkStyle}>Polski</a>
          <a href="https://mune-io.github.io/WHITE_PAPER/whitepaper_en.html" target="_blank" rel="noopener noreferrer" style={buttonLinkStyle}>English</a>
          <a href="https://mune-io.github.io/WHITE_PAPER/whitepaper_de.html" target="_blank" rel="noopener noreferrer" style={buttonLinkStyle}>Deutsch</a>
          <a href="https://mune-io.github.io/WHITE_PAPER/whitepaper_ru.html" target="_blank" rel="noopener noreferrer" style={buttonLinkStyle}>Русский</a>
        </div> */}
        <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginTop: '15px'
  }}
>
  <a
    href="https://mune-io.github.io/WHITE_PAPER/whitepaper_pl.html"
    target="_blank"
    rel="noopener noreferrer"
    // style={buttonLinkStyle}
  >
    Polski
  </a>
  <a
    href="https://mune-io.github.io/WHITE_PAPER/whitepaper_en.html"
    target="_blank"
    rel="noopener noreferrer"
    // style={buttonLinkStyle}
  >
    English
  </a>
  <a
    href="https://mune-io.github.io/WHITE_PAPER/whitepaper_de.html"
    target="_blank"
    rel="noopener noreferrer"
    // style={buttonLinkStyle}
  >
    Deutsch
  </a>
  <a
    href="https://mune-io.github.io/WHITE_PAPER/whitepaper_ru.html"
    target="_blank"
    rel="noopener noreferrer"
    // style={buttonLinkStyle}
  >
    Русский
  </a>
</div>

      </div>
    </div>
  );
};

export default InvestPage;

