import { useState } from "react";

const advantages = [
  "У них выше шансы на успех в тендерах, чем у несертифицированных компаний.",
  "Повышение рыночной конкурентоспособности и увеличение стоимости компании.",
  "Повышение престижа и имиджа компании.",
  "Повышение доверия клиентов.",
  "Позитивная узнаваемость на рынке.",
  "Пространство для непрерывного повышения уровня процессов в компании (надзорные аудиты).",
  "Можно комбинировать с другими стандартами, например, ISO 14001, 45001 (аудиты МС, надзорные аудиты МС).",
];

const Iso9001Page = () => {
  const [form, setForm] = useState({
    certification: "Certifikát ISO 9001",
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
    <div style={{ maxWidth: "860px", padding: "20px", lineHeight: "1.7" }}>

      {/* ── Заголовок ── */}
      <h1>Сертификат ISO 9001 | Система управления качеством</h1>
      <p>
        Базовый сертификат качества, основанный на процессном подходе. Компания получает его,
        если внедряет организационные и управленческие процессы, обеспечивающие непрерывное
        повышение уровня работы и увеличение удовлетворенности клиентов. Сертификат ISO 9001
        предназначен для компаний независимо от их профессиональной специализации.
      </p>

      <p>
        Благодаря сертификации качества ISO 9001 вы можете доказать своим деловым партнерам,
        что являетесь надежной компанией.
      </p>
      <p>
        ISO 9001 — это наиболее широко используемый, международно признанный сертификат качества,
        подтверждающий способность вашей компании предоставлять услуги и поставлять продукцию
        на самом высоком уровне.
      </p>

      {/* ── Преимущества ── */}
      <h2>Основные преимущества сертификации:</h2>
      <ul style={{ paddingLeft: "20px" }}>
        {advantages.map((a, i) => <li key={i} style={{ marginBottom: "6px" }}>{a}</li>)}
      </ul>

      {/* ── CTA ── */}
      <div style={{ background: "#f0f4ff", border: "1px solid #c5d0f0", borderRadius: "8px", padding: "20px", margin: "28px 0" }}>
        <h2 style={{ margin: "0 0 6px" }}>Вас интересует сертификация по стандарту ISO 9001?</h2>
        <p style={{ margin: "0 0 12px" }}>
          Заполните короткую форму, и мы проконсультируем вас о том, как без проблем
          и стресса пройти сертификацию по стандарту ISO 9001.
        </p>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          <li>✔ Мы ответим без каких-либо обязательств.</li>
          <li>✔ Мы предоставим профессиональную консультацию.</li>
          <li>✔ Вы не платите ни единого евро.</li>
        </ul>
      </div>

      {/* ── Форма ── */}
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

export default Iso9001Page;
