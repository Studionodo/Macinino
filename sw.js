/* ═══════════════════════════════════════════════════════════════
   MACININO — calcolatore della macinatura del caffè
   Copyright © 2026 Studionodo. Tutti i diritti riservati.
   Autore: [nome e cognome] · macinino.vercel.app · agosto 2026

   Opera protetta dal diritto d'autore (L. 633/1941, D.Lgs. 518/1992).
   Il codice è leggibile dal browser, come in ogni applicazione web:
   questo NON ne autorizza la copia, la ridistribuzione né opere
   derivate. Condizioni complete nel file LICENSE.
   ═══════════════════════════════════════════════════════════════ */
/* Service worker: mette in cache l'intera app al primo caricamento.
   Da lì in poi funziona senza rete, anche a connessione assente.

   ⚠️  ALZARE QUESTO NUMERO A OGNI PUBBLICAZIONE.
   Senza, chi ha già aperto l'app continua a vedere la versione vecchia. */
const CACHE = "macinino-v47";

const ASSETS = [
  "./", "./index.html", "./app.js", "./manifest.webmanifest",
  "./icon.svg", "./icon-192.png", "./icon-512.png",
  "./icon-maskable-512.png", "./LICENSE", "./icon-180.png",
  "./fonts/fraunces.woff2", "./fonts/fraunces-italic.woff2", "./fonts/geist-mono.woff2",
];

/* Pagine statiche che NON devono essere dirottate sull'app.
   Aggiungi qui ogni nuova pagina (es. "/privacy.html"). */
const STANDALONE_PAGES = ["/privacy.html", "/termini.html", "/LICENSE"];

/* Risposta di ripiego sempre valida: respondWith() non deve mai
   ricevere undefined, altrimenti il worker va in crash silenzioso
   con "TypeError: Failed to convert value to 'Response'". */
function offlineResponse(req) {
  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    return new Response(
      "<!doctype html><meta charset=utf-8>" +
      "<title>Non disponibile</title>" +
      "<body style=\"background:#16181B;color:#918F87;font-family:monospace;" +
      "display:grid;place-items:center;height:100vh;margin:0;text-align:center\">" +
      "<p>Pagina non disponibile offline.<br>Riprova quando torna la connessione.</p>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
  return new Response("", { status: 503, statusText: "Offline" });
}

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll fallisce in blocco se un file manca: si aggiungono uno a uno
      // così un asset assente non impedisce l'installazione.
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch { return; }
  if (url.origin !== self.location.origin) return;   // Ko-fi e link esterni non passano di qui

  e.respondWith((async () => {
    // 1. Copia in cache, se c'è
    const hit = await caches.match(req);
    if (hit) return hit;

    // 2. Rete, con salvataggio in cache della risposta buona
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === "basic") {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    } catch {
      // 3. Rete assente. Si serve l'app SOLO per la navigazione verso la
      //    radice: le altre pagine statiche restano se stesse, e i file
      //    (font, icone, script) non devono mai ricevere HTML al loro posto.
      const isNavigation =
        req.mode === "navigate" ||
        (req.headers.get("accept") || "").includes("text/html");

      const isStandalone = STANDALONE_PAGES.some(p => url.pathname.endsWith(p));

      if (isNavigation && !isStandalone) {
        const shell = await caches.match("./index.html");
        if (shell) return shell;                    // mai undefined: si controlla
      }
      return offlineResponse(req);                  // ripiego sempre valido
    }
  })());
});
