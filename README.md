# Macinino

**Calcolatore della macinatura del caffè che parte da dove sei tu, non da un numero astratto.**

🇬🇧 [English version below](#macinino-english)

---

## Cosa fa

La maggior parte dei calcolatori di macinatura ti dà un numero su una scala che il tuo macinino non usa. Macinino fa il contrario: **impara la scala del tuo macinino** e ti dice di quanto muoverti rispetto all'ultima volta, non un valore astratto.

Alla prima estrazione con un metodo, l'app non inventa nulla: ti chiede solo che numero hai usato. Da lì in poi ti guida: *"una tacca più grossa"*, *"come l'ultima volta"*, sempre con il motivo.

## Come funziona

- **Tredici parametri verificati su fonti**, come metodo, tostatura, giorni dalla tostatura, lavorazione del chicco, pressione, acqua e umidità, combinati in un algoritmo che stima quanto sposta la macinatura ogni fattore
- **Impara dal feedback.** Rispondi *acido*, *perfetto* o *amaro* dopo ogni caffè, e l'app corregge sia la posizione sia quanto è ampio un passo sul tuo macinino specifico
- **Diagnosi del tempo di estrazione.** Se il tempo e il gusto si contraddicono (per esempio veloce e amaro insieme), l'app riconosce la canalizzazione invece di consigliare una correzione sbagliata
- **Due modalità.** *Casa* chiede solo ciò che chiunque sa guardando il sacchetto; *Bar* aggiunge i parametri professionali: pressione, dose, temperatura dell'acqua, durezza

## Caratteristiche tecniche

- **Applicazione web progressiva (PWA)**: si installa come un'app nativa e funziona **interamente offline**
- **Nessun account, nessun server, nessun dato raccolto**: tutto resta sul dispositivo, in `localStorage`
- Italiano e inglese, cambio lingua istantaneo
- Nessuna dipendenza esterna in produzione: HTML, CSS e JavaScript scritti a mano

## Metodi supportati

Turco, Espresso, Moka, AeroPress (in tre varianti), V60, Americana, Chemex, Napoletana, French Press, Cold Brew.

## Provala

**[macinino.vercel.app](https://macinino.vercel.app)**

Su Android, Chrome mostra da solo la barra "Installa". Su iOS, in Safari: tocca Condividi, poi Aggiungi alla schermata Home.

## Licenza

© 2026 Studionodo. Codice visibile ma non riutilizzabile senza permesso: dettagli in [`LICENSE`](./LICENSE).

---

<a name="macinino-english"></a>
## Macinino (English)

**A coffee grind calculator that starts from where you are, not from an abstract number.**

### What it does

Most grind calculators give you a number on a scale your grinder doesn't use. Macinino does the opposite: it **learns your grinder's own scale** and tells you how far to move from your last brew, not an abstract value.

The first time you use a method, the app doesn't guess — it simply asks what setting you used. From then on it guides you: *"one step coarser,"* *"same as last time,"* always with a reason attached.

### How it works

- **Thirteen parameters checked against sources** — method, roast, days since roasting, processing, pressure, water, humidity and more — combined into an algorithm that estimates how much each factor shifts the grind
- **Learns from your feedback.** Answer *sour*, *perfect* or *bitter* after each brew, and the app corrects both the position and how big a step is on your specific grinder
- **Extraction-time diagnosis.** When time and taste disagree (fast and bitter together, for instance), the app recognises channelling instead of suggesting the wrong fix
- **Two modes.** *Home* asks only what anyone can read off the bag; *Bar* adds professional parameters — pressure, dose, water temperature, hardness

### Technical details

- **Progressive Web App (PWA)** — installs like a native app, works **fully offline**
- **No account, no server, no data collected** — everything stays on-device, in `localStorage`
- Italian and English, instant language switch
- No external dependencies in production: hand-written HTML, CSS and JavaScript

### Supported methods

Turkish, Espresso, Moka, AeroPress (three variants), V60, Drip machine, Chemex, Neapolitan, French Press, Cold Brew.

### Try it

**[macinino.vercel.app](https://macinino.vercel.app)**

On Android: Chrome shows an "Install" prompt automatically. On iOS: Safari → Share → Add to Home Screen.

### License

© 2026 Studionodo. Source is visible but not reusable without permission — see [`LICENSE`](./LICENSE) for details.
