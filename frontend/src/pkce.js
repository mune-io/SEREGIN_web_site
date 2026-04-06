// src/pkce.js
// Небольшая, надёжная реализация PKCE для браузера.
// Экспортируем только named-экспорт generatePKCE()

function base64URLEncode(buf) {
  // buf может быть ArrayBuffer или Uint8Array
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
  // small arrays — безопасно использовать apply
  let str = String.fromCharCode.apply(null, bytes);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

export async function generatePKCE() {
  // генерируем 32 байта случайных данных
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  // code_verifier (base64url от random bytes) — длина ~43 символа, соответствует RFC
  const verifier = base64URLEncode(array);

  // code_challenge = BASE64URL( SHA256(verifier) )
  const digest = await sha256(verifier);
  const challenge = base64URLEncode(digest);

  // сохраняем verifier для последующего обмена на токены (backend / TokenRetriever)
  localStorage.setItem("pkce_verifier", verifier);

  return { verifier, challenge };
}
