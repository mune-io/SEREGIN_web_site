import { useState } from "react";

const certificates = [
  {
    title: "Сертификат системы управления качеством ISO 9001",
    desc: "Базовый сертификат качества, подтверждающий непрерывное повышение уровня работы и качества предоставляемых услуг.",
  },
  {
    title: "Сертификат системы экологического менеджмента ISO 14001",
    desc: "Сертификат, учитывающий систему управления с акцентом на охрану окружающей среды.",
  },
  {
    title: "Сертификат OHSAS 18001 «Система безопасности и охраны труда»",
    desc: "Сертификация предназначена для компаний с повышенным уровнем риска на рабочем месте.",
  },
  {
    title: "Сертификат информационной безопасности ISO 27001",
    desc: "Сертификация для повышения информационной безопасности компаний и работы с конфиденциальными данными.",
  },
  {
    title: "Сертификат ISO 16949, сертификация автомобильной промышленности",
    desc: "Сертификация качества компаний и поставщиков в автомобильной промышленности.",
  },
  {
    title: "Сертификат ISO 22301 по управлению непрерывностью бизнеса",
    desc: "Новый стандарт ISO для обеспечения непрерывности бизнеса.",
  },
  {
    title: "Сертификат ISO 42001, сертификат по управлению искусственным интеллектом",
    desc: "Сертификация системы управления искусственным интеллектом (AIMS).",
  },
];

const otherCertificates = [
  { title: "Сертификат ISO 3834, подтверждающий качество сварки",                desc: "Стандарт ISO 3834 устанавливает точные условия для поддержания качества в области сварки." },
  { title: "Сертификат ISO 50001 для энергетической отрасли",                    desc: "Новый глобальный стандарт ISO для управления энергопотреблением, производства и переработки энергии." },
  { title: "Сертификат ISO 13485 в сфере здравоохранения",                       desc: "Если вы работаете в сфере здравоохранения, этот сертификат — именно то, что вам нужно." },
  { title: "Сертификат системы противодействия коррупции ISO 37001",             desc: "Стандарт для построения системы управления противодействием коррупции в вашей организации." },
  { title: "Сертификат ISO 29990. Сертификация образовательных услуг",           desc: "Система управления образовательными услугами и обучением." },
  { title: "Аудит TISAX. Информационная безопасность в автомобильной промышленности", desc: "Система TISAX для поставщиков автомобильной промышленности." },
  { title: "Стандарт PAX",                                                        desc: "Стандарт безопасного обращения с химическими веществами." },
  { title: "Стандарты PEFC и FSC",                                               desc: "Система сертификации лесной и древесной продукции." },
  { title: "Стандарт ISSC",                                                      desc: "Европейский стандарт надлежащего использования биомассы." },
  { title: "Стандарт HACCP",                                                     desc: "Стандарт для производителей и поставщиков в пищевой промышленности." },
  { title: "Стандарты GMP и FSA",                                                desc: "Европейские стандарты производства и переработки кормов." },
  { title: "Регламент Совета ЕС № 333/2011",                                     desc: "Европейское регулирование для компаний, занимающихся переработкой металлолома." },
  { title: "Стандарты IFS, BRC, FSSC и ISO 22000",                               desc: "Комплексная система стандартов и сертификатов для обеспечения безопасности производства и поставок продуктов питания." },
  { title: "Стандарт ISO 28001:2022",                                            desc: "Комплексная система для организаций, работающих в международных цепочках поставок и логистики." },
  { title: "Стандарт ISO 17100:2015",                                            desc: "Стандарт ISO для компаний, предоставляющих услуги перевода." },
];

const CertCard = ({ title, desc }) => (
  <div style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "18px",
    background: "#fafafa",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}>
    <div>
      <h4 style={{ margin: "0 0 8px", fontSize: "15px" }}>{title}</h4>
      <p style={{ margin: "0 0 14px", fontSize: "14px", color: "#555" }}>{desc}</p>
    </div>
    <button
      onClick={() => alert(`Интерес к: ${title}`)}
      style={{
        alignSelf: "flex-start",
        padding: "7px 16px",
        background: "#1a4fc4",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "13px",
      }}
    >
      Мне это интересно
    </button>
  </div>
);

const IsoStandardsPage = () => {
  const [form, setForm] = useState({
    certification: "ISO certifikát",
    recommended: "",
    additional: "",
    activity: "",
    employees: "",
    name: "",
    email: "",
    phone: "",
    question: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.consent) { alert("Пожалуйста, дайте согласие на обработку данных."); return; }
    alert("Форма отправлена!");
  };

  return (
    <div style={{ maxWidth: "900px", padding: "20px", lineHeight: "1.7" }}>

      {/* ── Шапка ── */}
      <h1>Сертификат ISO — наиболее распространенная система сертификации.</h1>
      <p style={{ fontSize: "17px" }}>
        Сертифицируйте свою компанию с помощью международного сертификата ISO.<br />
        Получите сертификаты ISO 9001, ISO 14001, ISO 45001 и другие.
      </p>
      <p style={{ fontSize: "20px", fontWeight: "500", color: "#1a4fc4" }}>
        быстро, легко и без лишних забот
      </p>

      <p>
        Сертификат ISO является наиболее широко признанным на международном уровне и подтверждает
        способность вашей компании предоставлять услуги и поставлять продукцию на самом высоком уровне.
      </p>

      {/* ── CTA ── */}
      <div style={{ background: "#f0f4ff", border: "1px solid #c5d0f0", borderRadius: "8px", padding: "20px", margin: "24px 0" }}>
        <h2 style={{ margin: "0 0 10px" }}>Мы поможем вам с сертификацией ISO.</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          <li>✔ Мы ответим без каких-либо обязательств.</li>
          <li>✔ Мы предоставим профессиональную консультацию.</li>
          <li>✔ Вы не платите ни единого евро.</li>
        </ul>
      </div>

      <p>
        Всего несколько кликов, и мы организуем все необходимое для сертификации вашей компании.<br />
        У вас есть 2 минуты? Заполните подробную анкету по сертификации ISO, а заботы о сертификации ISO оставьте нам.
      </p>

      {/* ── Форма ── */}
      <h2>Интерес к сертификации ISO</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "520px" }}>

        <label>
          Меня интересует данная сертификация:
          <input type="text" name="certification" value={form.certification} onChange={handleChange} style={inp} />
        </label>

        <label>
          Мы также рекомендуем учитывать следующие ключевые стандарты ISO:
          <input type="text" name="recommended" value={form.recommended} onChange={handleChange} style={inp} placeholder="(необязательно)" />
        </label>

        <label>
          Также следует учитывать некоторые дополнительные стандарты и проверки:
          <input type="text" name="additional" value={form.additional} onChange={handleChange} style={inp} placeholder="(необязательно)" />
        </label>

        <label>
          Какая деятельность будет сертифицирована:
          <input type="text" name="activity" value={form.activity} onChange={handleChange} style={inp} placeholder="например, производство, качество продукции" />
        </label>

        <label>
          Ориентировочное количество сотрудников для сертификации:
          <input type="number" name="employees" value={form.employees} onChange={handleChange} style={inp} placeholder="Введите количество сотрудников" min="1" />
        </label>

        <label>
          Ваше имя:
          <input type="text" name="name" value={form.name} onChange={handleChange} required style={inp} />
        </label>

        <label>
          Рабочий адрес электронной почты:
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={inp} />
        </label>

        <label>
          Рабочий телефон (ускоряет связь):
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} style={inp} placeholder="09xx123456" />
        </label>

        <label>
          Место для вопросов и дополнительной информации:
          <textarea name="question" value={form.question} onChange={handleChange} rows={4} style={{ ...inp, resize: "vertical" }} />
        </label>

        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px" }}>
          <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} style={{ marginTop: "3px" }} />
          Я согласен на обработку персональных данных (подробнее)
        </label>

        <button type="submit" style={{ padding: "12px 24px", background: "#1a4fc4", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", cursor: "pointer" }}>
          Отправьте форму без каких-либо обязательств.
        </button>
      </form>

      {/* ── 3 преимущества ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", margin: "40px 0" }}>
        {[
          { h: "Правильная настройка процесса",    t: "Благодаря сертификации качества ISO вы сможете правильно настроить все процессы вашей компании, и она начнет функционировать как безупречный часовой механизм." },
          { h: "Четкая и лаконичная структура",    t: "Сертификация ISO устанавливает четкую структуру управления компанией на всех важных уровнях — в руководстве и управлении, исполнительных отделах и производстве." },
          { h: "Декларация о качестве обслуживания", t: "Независимо от того, производите ли вы продукцию или оказываете услуги, сертификация ISO является доказательством того, что процессы вашей компании функционируют должным образом и что вы соответствуете всем стандартам качества." },
        ].map(({ h, t }) => (
          <div key={h} style={{ background: "#f8f8f8", borderLeft: "4px solid #1a4fc4", padding: "16px", borderRadius: "6px" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "15px" }}>{h}</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{t}</p>
          </div>
        ))}
      </div>

      {/* ── Основные сертификаты ── */}
      <h2>Мы предоставляем самые распространенные сертификаты ISO:</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {certificates.map((c) => <CertCard key={c.title} {...c} />)}
      </div>

      {/* ── Другие сертификаты ── */}
      <h2>Другие сертификаты ISO для вашей компании</h2>
      <p>Если вы работаете в определенных отраслях промышленности, здравоохранения или пищевой промышленности, вас могут заинтересовать следующие сертификаты ISO:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {otherCertificates.map((c) => <CertCard key={c.title} {...c} />)}
      </div>

    </div>
  );
};

const inp = {
  display: "block",
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
  boxSizing: "border-box",
};

export default IsoStandardsPage;
