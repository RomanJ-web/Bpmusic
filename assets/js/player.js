// Agrega aquí tus canciones. Para sumar otra, copia un bloque { ... } y cambia los datos.
const canciones = [
  {
    titulo: "Acid ROMANCE",
    artista: "FIIKRA",
    plataforma: "spotify",
    url: "https://open.spotify.com/embed/track/68SnhWMKT586faV9aaMDuu?autoplay_ok=1",
  },
];


const alturas = { spotify: 152, soundcloud: 166, bandcamp: 120, youtube: 315 };

const contenedor = document.getElementById("lista-canciones");

canciones.forEach((c) => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-cancion";

  const titulo = document.createElement("h3");
  titulo.textContent = c.titulo;

  const artista = document.createElement("p");
  artista.textContent = c.artista;

  const iframe = document.createElement("iframe");
  iframe.src = c.url;
  iframe.width = "100%";
  iframe.height = alturas[c.plataforma] || 152;
  iframe.style.border = "0";
  iframe.loading = "lazy";
  iframe.allow = "encrypted-media; autoplay; clipboard-write";

  tarjeta.append(titulo, artista, iframe);
  contenedor.appendChild(tarjeta);
});