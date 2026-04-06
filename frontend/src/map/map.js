const courses = [
  { title: "Проект по внедрению GDPR для строительной компании",     priceVat: "159,00", priceNet: "129,27" },
  { title: "Видеообучение по обновлению IATF 16949",                  priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеоуроки по аудиту и применению стандарта ISO 19011:2018", priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеоурок по безопасности пищевых продуктов ISO 22000:2018 и FSSC версии 5.1", priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеообучение для корпоративного метролога",               priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеоурок для внутреннего аудитора по стандарту ISO 14001:2015", priceVat: "159,00", priceNet: "129,27" },
  { title: "Видеоурок для внутреннего аудитора по стандарту ISO 22000:2018", priceVat: "159,00", priceNet: "129,27" },
  { title: "Видеоурок для внутреннего аудитора по стандарту ISO 37001:2016", priceVat: "159,00", priceNet: "129,27" },
  { title: "Видеоурок для внутреннего аудитора по стандарту ISO 45001:2018", priceVat: "159,00", priceNet: "129,27" },
  { title: "Видеоурок для внутреннего аудитора по стандарту ISO 9001:2015",  priceVat: "159,00", priceNet: "129,27" },
  { title: "Видеоурок по ISO 37001 | Система борьбы с коррупцией",     priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеообучение 5x Методология «Почему?»",                   priceVat: "79,00",  priceNet: "64,23"  },
  { title: "Видеообучение по стандарту ISO 14001:2015",                 priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеообучение по стандарту ISO 45001:2018",                 priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеообучение по стандарту ISO 9001:2015",                  priceVat: "120,00", priceNet: "97,56"  },
  { title: "Видеоурок по системе управления безопасностью цепочки поставок ISO 28000:2022", priceVat: "120,00", priceNet: "97,56"  },
];

const Map = () => {
  return (
    <div style={{ maxWidth: "800px", padding: "20px" }}>

      <h1>Практическое видеообучение и онлайн-курсы</h1>
      <p style={{ fontSize: "18px", color: "#555" }}>
        Учитесь онлайн где угодно и когда угодно.
      </p>

      <h2>Видеоуроки и онлайн-курсы по стандартам ISO</h2>
      <p>
        Мы предлагаем вам практические видеоуроки в области стандартов ISO по
        выгодной цене, которые вы можете удобно смотреть онлайн без ограничений.
      </p>
      <p>
        <strong>Выберите один из наших видеоуроков.</strong>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
        {courses.map((course, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              background: "#fafafa",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ margin: 0, fontWeight: "500" }}>{course.title}</p>
              <p style={{ margin: "6px 0 0", color: "#444", fontSize: "14px" }}>
                <strong>{course.priceVat} € с НДС</strong>
                {" | "}
                <span style={{ color: "#777" }}>{course.priceNet} € без НДС</span>
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
              <button
                style={{
                  padding: "8px 18px",
                  background: "#1a4fc4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => alert(`Покупка: ${course.title}`)}
              >
                Купить
              </button>
              <button
                style={{
                  padding: "8px 18px",
                  background: "#fff",
                  color: "#1a4fc4",
                  border: "1px solid #1a4fc4",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => alert(`Подробности: ${course.title}`)}
              >
                Подробности
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
