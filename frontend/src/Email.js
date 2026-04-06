import { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next"; // Хук для перевода

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(
      "service_3x874qq",   // ID сервиса из EmailJS
      "template_nv6gmj6",  // ID шаблона письма
      formData,
      "NLojWH0kvUJiAH0cf"       // Ваш public user ID из EmailJS
    )
    .then(() => alert(t('message_sent_success')))
    .catch(() => alert(t('message_send_error')));
  };

  return (
    <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '10px' }}>
        {t('contact_us')}
      </h2>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" name="name" placeholder={t('name_placeholder')} onChange={handleChange} required />
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <textarea name="message" placeholder={t('message_placeholder')} onChange={handleChange} required />
      </div>
  
      <div>
        <button type="submit">{t('send')}</button>
      </div></div>
    </form>
  );
  
};

export default ContactForm;
