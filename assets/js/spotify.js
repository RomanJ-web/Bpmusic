const clientId = "c2db24da6ae940cda3baee1bc299b46a";
const redirectUri = "https://romanj-web.github.io/Bpmusic/";
const scope = "streaming user-read-email user-read-private";

function randomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, v => chars[v % chars.length]).join("");
}

function base64url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function login() {
  const verifier = randomString(64);
  localStorage.setItem("verifier", verifier);
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: base64url(hash),
  });
  window.location = "https://accounts.spotify.com/authorize?" + params;
}

async function handleCallback() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: localStorage.getItem("verifier"),
    }),
  });
  const data = await res.json();
  console.log("Token:", data.access_token);
  window.history.replaceState({}, "", redirectUri);
}

document.getElementById("login").addEventListener("click", login);
handleCallback();