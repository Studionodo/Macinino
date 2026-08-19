/* ═══════════════════════════════════════════════════════════════
   MACININO — calcolatore della macinatura del caffè
   Copyright © 2026 Istante Labs. Tutti i diritti riservati.
   Autore: [nome e cognome] · macinino.vercel.app · agosto 2026

   Opera protetta dal diritto d'autore (L. 633/1941, D.Lgs. 518/1992).
   Il codice è leggibile dal browser, come in ogni applicazione web:
   questo NON ne autorizza la copia, la ridistribuzione né opere
   derivate. Condizioni complete nel file LICENSE.

   App web autonoma: nessuna chiamata di rete, nessun account,
   nessun dato che lasci il dispositivo. Funziona offline.
   ═══════════════════════════════════════════════════════════════ */
"use strict";

const KOFI = "https://ko-fi.com/istantelabs/tip";
const STORE_KEY = "macinino.v1";

/* ─────────────── TRADUZIONI ─────────────── */
const T = {
it:{
  tagline:"Calcolatore grana", home:"Casa", bar:"Bar",
  lblMethod:"Metodo", lblRoast:"Tostatura", lblProcessing:"Lavorazione del chicco",
  lblBlend:"Arabica e robusta", lblAge:"Giorni dalla tostatura",
  lblMachine:"Pressione della macchina", lblDose:"Dose di caffè",
  lblAmbientHum:"Umidità del locale", lblAmbientTemp:"Temperatura del locale",
  lblWater:"Durezza dell'acqua", lblWaterTemp:"Temperatura dell'acqua",
  lblFilter:"Tipo di filtro", lblUniformity:"Regolarità della macinatura",
  lblFeedback:"Com'è venuto il caffè", lblHow:"Come funziona",
  methods:{turkish:"Turco",espresso:"Espresso",moka:"Moka",aeropress_fast:"AeroPress rapida",
    aeropress:"AeroPress",v60:"V60",americana:"Americana",aeropress_long:"AeroPress lunga",
    chemex:"Chemex",napoletana:"Napoletana",frenchpress:"French Press",coldbrew:"Cold Brew"},
  roasts:{light:"Chiara",medium:"Media",dark:"Scura"},
  process:{lavato:"Lavato",honey:"Honey",naturale:"Naturale"},
  waters:{molto_morbida:"Molto morbida",ideale:"Ideale",dura:"Dura",molto_dura:"Molto dura"},
  filters:{sottile:"Sottile",spesso:"Spesso",metallo:"Metallo",stoffa:"Stoffa"},
  uniformity:{alta:"Regolare",media:"Media",bassa:"Irregolare"},
  fbLabels:{sour:"Acido",ok:"Perfetto",bitter:"Amaro"},
  unitArabica:"% Arabica", unitBar:"bar", unitC:"°C", unitG:"g",
  ageHints:["troppo fresco","il periodo migliore","ancora buono","comincia a perdere","ormai vecchio"],
  ageUnknown:"non conosco la data", ageKnownBack:"inserisci la data", ageUnknownHint:"non lo conto nel calcolo",
  blendHints:["tutto arabica","quasi tutto arabica","metà e metà","soprattutto robusta"],
  tempHints:["acqua tiepida","temperatura giusta","acqua molto calda"], barHints:["sotto la norma","la più comune","sopra la norma","molto alta"],
  doseHints:["poco caffè","dose classica","tanto caffè"],
  humHints:["aria secca","aria normale","aria umida"], airHints:["locale fresco","temperatura normale","locale caldo"],
  adjSour:"annotato: era acquoso → macina più fine",
  adjOk:"così va bene, resta su questa ✓",
  adjBitter:"annotato: era troppo forte → macina più grossa", calibReset:"azzera",
  fbPrompt:"prepara il caffè e dimmi com'è venuto: ogni risposta sposta la taratura di 2",
  onbTitle:"Cosa fa Macinino",
  onbLead:"Non ti dà un numero calato dall'alto: parte da dove sei tu sul tuo macinino e ti dice di quanto muoverti.",
  onbPoints:[
    ["Parla nella tua scala.","Ti dice la tua tacca, non un valore astratto."],
    ["Tredici parametri.","Metodo, tostatura, giorni, acqua, ambiente: tutti verificati su fonti."],
    ["Impara dal tuo caffè.","Dici com'è venuto e la volta dopo è più precisa."],
    ["Resta sul tuo telefono.","Funziona offline, nessun account, nessun dato raccolto."],
  ],
  onbNext:"Avanti",
  onbBack:"Torna indietro",
  onbAsk:"Quante tacche ha il tuo macinino?",
  onbWhy:"Serve solo a partire più vicino al giusto. Se non lo sai, l'app lo impara comunque dall'uso.",
  onbPlaceholder:"per esempio 40",
  onbStart:"Iniziamo",
  onbSkip:"Non lo so — vai avanti lo stesso",
  firstTime:"prima volta con questo metodo",
  usedWhat:"Che numero hai usato?",
  usedHint:"la tua tacca",
  hintNone:"Imposta il macinino dove ti sembra giusto, prepara il caffè e dimmi com'è venuto.",
  hintSame:"Più o meno come per {m}.",
  hintFiner:"Più fine di {m}.",
  hintMuchFiner:"Molto più fine di {m}.",
  hintCoarser:"Più grossa di {m}.",
  hintMuchCoarser:"Molto più grossa di {m}.",
  moveSame:"come l'ultima volta",
  moveFiner:"più fine",
  moveCoarser:"più grossa",
  moveHalf:"mezza tacca",
  moveOne:"una tacca",
  moveN:"tacche",
  whySour:"era acquoso",
  whyBitter:"era troppo forte",
  whyOlder:"il caffè ha {n} giorni in più",
  whyFresher:"il caffè è più fresco di {n} giorni",
  whyRoast:"hai cambiato tostatura: ora {r}",
  whyWetter:"oggi l'aria è più umida",
  whyDrier:"oggi l'aria è più secca",
  whyWater:"hai cambiato acqua",
  lblAir:"L'aria rispetto all'ultimo caffè",
  airs:{drier:"Più secco", same:"Uguale", wetter:"Più umido"},
  fbFirst:"prepara il caffè e dimmi com'è venuto",
  fbKnown:"tarato",
  learnStart:"sto imparando il tuo macinino — dimmi com'è venuto",
  learnStartN:"sto imparando il tuo macinino su {n} metodi",
  learnOne:"ho imparato il tuo macinino su un metodo",
  learnN:"ho imparato il tuo macinino su {n} metodi",
  learnFineOne:"conosco il passo del tuo macinino su questo metodo",
  learnFine:"conosco il passo del tuo macinino su {n} metodi",
  fbNone:"non ancora tarato",
  lblShotTime:"Tempo", lblShotYield:"In tazza", unitS:"sec",
  shotOn:"ho cronometrato l'estrazione", shotOff:"non cronometro",
  shotFast:"troppo veloce", shotSlow:"troppo lento", shotOk:"nella finestra",
  ratioShort:"ristretto", ratioLong:"lungo", ratioOk:"rapporto classico",
  diagAgree:"tempo e gusto concordano: correzione doppia",
  diagGrindOk:"il tempo è giusto: la grana non è la causa. Guarda dose, distribuzione o freschezza del caffè.",
  diagChannel:"tempo e gusto non concordano: probabile canalizzazione. Controlla distribuzione e pressatura, non la macinatura.",
  grpBean:"Il chicco", grpMachine:"La macchina", grpRoom:"L'ambiente",
  grpWater:"L'acqua", grpGrind:"La macinatura",
  impactLabels:{alto:"Impatto alto",medio:"Impatto medio",basso:"Impatto basso"},
  a11yInfo:"informazioni",
  close:"Chiudi",
  editWhere:"dove sei adesso",
  airFirst:"la prima volta lascia Uguale — servirà dal prossimo caffè",
  airSame:"nessuna correzione per l'aria",
  airWetter:"aria più umida → grana più grossa",
  airDrier:"aria più secca → grana più fine",
  editHint:"tocca il numero per correggerlo", a11yLess:"diminuisci", a11yMore:"aumenta",
  kofi:"Offrimi un caffè",
  rights:"Tutti i diritti riservati",
  footClaim:"Impara dal tuo caffè · 13 parametri verificati",
  footNote:"Offline · Nessun account · Nessun dato raccolto",
  installTxt:"Installala sulla schermata home: si apre a schermo intero e funziona senza rete.",
  installGo:"Installa", installNo:"Chiudi",
  info:{
    metodo:{impact:"alto",
      body:`Il <em>metodo di estrazione</em> è il parametro dominante: da solo copre quasi tutta l'escursione della scala. Cambia superficie di contatto, pressione e durata del contatto tra acqua e caffè. L'AeroPress è divisa in tre varianti perché è l'unico metodo il cui intervallo di grana copre quasi l'intera scala a seconda della tecnica.`,
      src:`<b>Da dove viene:</b> valori di riferimento dalla pratica barista consolidata e dalle scale di macinatura dichiarate dai produttori.`},
    tostatura:{impact:"alto",
      body:`Una tostatura <em>scura</em> rende il chicco più poroso e fragile: estrae più in fretta, quindi serve grana più grossa per non sovra-estrarre. Una tostatura <em>chiara</em> è più densa e meno solubile: serve grana più fine per esporre più superficie.`,
      src:`<b>Da dove viene:</b> relazione documentata fra densità del chicco, solubilità e velocità di estrazione.`},
    lavorazione:{impact:"basso",
      body:`Il <em>processo post-raccolta</em> incide sulla struttura del chicco. Il <em>lavato</em> toglie subito la polpa: chicco più denso, estrazione più lenta. Il <em>naturale</em> asciuga con la polpa addosso: più zuccheri e oli, estrazione più rapida, grana più grossa. L'<em>honey</em> sta in mezzo.`,
      src:`<b>Da dove viene:</b> pratica di torrefazione specialty.`},
    arabica:{impact:"medio",
      body:`La <em>robusta</em> ha un chicco più duro dell'arabica e in macinatura produce più <em>fini</em>: particelle piccolissime che sovra-estraggono e portano amaro. Per compensarle conviene salire di grana.`,
      src:`<b>Da dove viene:</b> stesso principio applicato all'uniformità di macinatura — si contrastano i fini andando più grossi.`},
    eta:{impact:"medio",
      body:`Dopo la tostatura il chicco rilascia CO₂, che <em>ostacola l'acqua</em> durante l'estrazione. Nei primissimi giorni il gas è troppo: serve grana più grossa. Intorno al <em>settimo giorno</em> la correzione si annulla. Poi il caffè ossida e si scende progressivamente di grana.`,
      src:`<b>Da dove viene:</b> curva di degassamento esponenziale, non a fasce: evita i salti bruschi da un giorno all'altro. Se non conosci la data, escludilo.`},
    macchina:{impact:"medio",
      body:`La <em>pressione di erogazione</em> spinge l'acqua attraverso il panello. A pressione più alta l'acqua passa più in fretta: per riportare il tempo di estrazione nel bersaglio serve grana <em>più fine</em>, che aumenta la resistenza.`,
      src:`<b>Da dove viene:</b> legge di Darcy — la portata è proporzionale alla pressione e alla permeabilità del panello. Riferimento 9 bar.`},
    dose:{impact:"basso",
      body:`La <em>dose</em> determina la profondità del panello. Una dose più alta significa più materiale da attraversare e quindi più resistenza: si può salire leggermente di grana mantenendo lo stesso tempo di estrazione.`,
      src:`<b>Da dove viene:</b> stessa logica di resistenza del panello della pressione. Riferimento 18 g, cestello doppio.`},
    ambienteumidita:{impact:"basso",
      body:`L'<em>umidità dell'aria</em> è il parametro che i baristi correggono più spesso nell'arco della giornata. Il chicco è igroscopico: con aria umida assorbe acqua e la polvere tende a compattarsi, rallentando il flusso. Si compensa salendo di grana.`,
      src:`<b>Da dove viene:</b> pratica di bancone, dove la macinatura viene ritoccata più volte al giorno. <b>Come misurarlo:</b> un igrometro, oppure il meteo locale.`},
    ambientetemp:{impact:"basso",
      body:`La <em>temperatura del locale</em> influenza la temperatura dei chicchi al momento della macinatura e la dispersione di calore durante l'estrazione. Un ambiente caldo accelera leggermente l'estrazione: si sale di grana.`,
      src:`<b>Da dove viene:</b> stessa pratica di bancone dell'umidità; l'effetto è reale ma più debole.`},
    acqua:{impact:"medio",
      body:`L'acqua è un ingrediente, non un mezzo. Calcio e magnesio si <em>legano ai composti aromatici</em> e ne favoriscono l'estrazione: acqua dura estrae di più, serve grana più grossa. Acqua troppo povera di minerali sotto-estrae.`,
      src:`<b>Da dove viene:</b> standard SCA per l'acqua da caffè — obiettivo 68 mg/L, intervallo 50–175 ppm. <b>Dove leggerlo:</b> etichetta dell'acqua minerale o sito dell'acquedotto.`},
    acquatemp:{impact:"basso",
      body:`La <em>temperatura</em> regola la velocità con cui i solubili si sciolgono. Sopra i 94 °C l'estrazione accelera e serve grana più grossa; sotto gli 88 °C rallenta e si compensa scendendo di grana.`,
      src:`<b>Da dove viene:</b> riferimento 93 °C, al centro dell'intervallo raccomandato dalla SCA.`},
    filtro:{impact:"medio",
      body:`Il <em>filtro</em> decide quanta resistenza incontra l'acqua e quanti fini finiscono in tazza. La carta spessa rallenta il flusso e allunga il contatto: si sale di grana. Il metallo lascia passare i fini, che intorbidiscono: si sale ancora di più.`,
      src:`<b>Da dove viene:</b> permeabilità e ritenzione dei fini per tipo di filtro.`},
    uniformita:{impact:"medio",
      body:`Un macinino di qualità produce particelle di <em>dimensione omogenea</em>. Uno economico o a lame produce un misto di fini e pezzi grossi nello stesso colpo: i fini sovra-estraggono e portano amaro. Si contrastano impostando una grana più grossa.`,
      src:`<b>Da dove viene:</b> effetto della distribuzione granulometrica bimodale.`},
    feedback:{impact:"alto",
      body:`Il <em>feedback</em> è l'unico punto in cui l'app riceve un dato <em>reale</em> invece di stimarne uno. <em>Acido</em> vuol dire sotto-estrazione: si scende di grana. <em>Amaro</em> vuol dire sovra-estrazione: si sale. Ogni risposta sposta la macinatura di una tacca o due nella direzione giusta, e l'app impara <em>quanto</em> serve muoversi sul tuo macinino.
      <br><br><b>Se non sai cosa rispondere</b>, bevi un sorso, aspetta un minuto senza bere acqua e chiediti una cosa sola: <em>ne berrei ancora?</em> Se la risposta è sì di slancio, tocca <em>Perfetto</em>.`,
      src:`<b>Come funziona:</b> ogni metodo ha la sua posizione e il suo passo — l'espresso non tocca la French Press. Tutto resta sul dispositivo.<br><br><b>Se ripeti la stessa lamentela</b> l'app capisce che si muoveva troppo poco e allarga il passo; se arriva quella opposta capisce di aver esagerato e lo stringe.
      <br><br><b>Il tempo di estrazione</b> non entra nel calcolo: è un <em>esito</em>, non un parametro. Serve a qualificare il giudizio sul gusto. Se tempo e gusto concordano la correzione raddoppia; se si contraddicono la causa non è la grana ma quasi sempre la canalizzazione.
      <br><br><b>Amaro e secchezza sono due cose diverse.</b> L'amaro è un <em>sapore</em> e lo senti mentre bevi, sul fondo della lingua: pensa alla scorza di pompelmo o al cacao amaro. La secchezza è una <em>sensazione fisica</em> e arriva dopo aver deglutito: la bocca resta asciutta e ruvida, come dopo un cachi acerbo o un tè lasciato troppo in infusione. Un caffè estratto bene lascia un ricordo dolce; uno sovra-estratto lascia la bocca vuota e ti fa venire voglia d'acqua.
      <br><br><b>La finestra non è fissa:</b> lo standard 25–30 secondi vale per una tostatura media a rapporto 1:2 ({{medium}} s nell'app). Una tostatura scura è più porosa ed estrae prima ({{dark}} s); una chiara è più densa e ne chiede di più ({{light}} s). L'app sposta la finestra in base alla tostatura che hai indicato.`},
    aria:{impact:"basso",
      body:`A casa nessuno ha un igrometro, ma tutti sentono se l'aria è più pesante del solito. Con più umidità la polvere si compatta e trattiene l'acqua più a lungo: serve una grana leggermente più grossa. Con aria secca succede il contrario.`,
      src:`<b>Perché un confronto e non un numero:</b> quello che conta non è l'umidità assoluta ma <em>quanto è cambiata</em> dall'ultimo caffè. Un barista corregge il macinino più volte al giorno per questo.
      <br><br><b>È una rifinitura:</b> su un macinino a tacche larghe può valere meno di mezza tacca e non spostare nulla da sola. Conta quando si somma agli altri fattori. In modalità Bar puoi indicare l'umidità reale in percentuale.`},
    comefunziona:{
      body:`Il numero che vedi è <em>la tua tacca</em>, non un valore inventato dall'app. Macinino non sa com'è fatto il tuo macinino e non finge di saperlo: parte da dove sei tu e ti dice <em>di quanto muoverti</em> quando cambiano le condizioni.`,
      src:`<b>Come si usa:</b> la prima volta con un metodo l'app non ti dà un numero — ti dice solo se andare più fine o più grossa rispetto a un metodo che già conosci. Prepari il caffè dove ti sembra giusto, le dici che numero hai usato, e da lì in poi lavora nella tua scala.
      <br><br><b>Cosa fa davvero:</b> tredici parametri — metodo, tostatura, giorni, acqua, ambiente e altri — servono a calcolare <em>quanto è cambiato</em> dall'ultima volta. Se non è cambiato niente, l'app ti dice di restare dove sei.
      <br><br><b>Cosa impara:</b> ogni volta che dici com'è venuto, l'app corregge il tiro e capisce quanto sono fitte le tacche del tuo macinino. Dopo tre o quattro caffè conosce la tua scala meglio di qualsiasi tabella.
      <br><br><b>Cosa non può fare:</b> non misura micron, non conosce il tuo caffè, non sa che macinino hai. Il palato resta il giudice — l'app tiene il conto.`},
  },
},
en:{
  tagline:"Grind calculator", home:"Home", bar:"Bar",
  lblMethod:"Method", lblRoast:"Roast", lblProcessing:"How the bean was processed",
  lblBlend:"Arabica and robusta", lblAge:"Days since roasting",
  lblMachine:"Machine pressure", lblDose:"Coffee dose",
  lblAmbientHum:"Room humidity", lblAmbientTemp:"Room temperature",
  lblWater:"Water hardness", lblWaterTemp:"Water temperature",
  lblFilter:"Filter type", lblUniformity:"How evenly it grinds",
  lblFeedback:"How did the coffee turn out", lblHow:"How it works",
  methods:{turkish:"Turkish",espresso:"Espresso",moka:"Moka",aeropress_fast:"AeroPress fast",
    aeropress:"AeroPress",v60:"V60",americana:"Drip machine",aeropress_long:"AeroPress long",
    chemex:"Chemex",napoletana:"Neapolitan",frenchpress:"French Press",coldbrew:"Cold Brew"},
  roasts:{light:"Light",medium:"Medium",dark:"Dark"},
  process:{lavato:"Washed",honey:"Honey",naturale:"Natural"},
  waters:{molto_morbida:"Very soft",ideale:"Ideal",dura:"Hard",molto_dura:"Very hard"},
  filters:{sottile:"Thin",spesso:"Thick",metallo:"Metal",stoffa:"Cloth"},
  uniformity:{alta:"Even",media:"Medium",bassa:"Uneven"},
  fbLabels:{sour:"Sour",ok:"Perfect",bitter:"Bitter"},
  unitArabica:"% Arabica", unitBar:"bar", unitC:"°C", unitG:"g",
  ageHints:["too fresh","the best window","still good","starting to fade","past its best"],
  ageUnknown:"I don't know the date", ageKnownBack:"enter the date", ageUnknownHint:"not counted in the calculation",
  blendHints:["all arabica","mostly arabica","half and half","mostly robusta"],
  tempHints:["water too cool","right temperature","water very hot"], barHints:["below normal","the most common","above normal","very high"],
  doseHints:["little coffee","classic dose","lots of coffee"],
  humHints:["dry air","normal air","humid air"], airHints:["cool room","normal temperature","warm room"],
  adjSour:"noted: it was watery → grind finer",
  adjOk:"that works, stay on this one ✓",
  adjBitter:"noted: it was too strong → grind coarser", calibReset:"reset",
  fbPrompt:"brew it and tell me how it came out: each answer shifts the calibration by 2",
  onbTitle:"What Macinino does",
  onbLead:"It doesn't hand you a number out of nowhere: it starts from where you are on your grinder and tells you how far to move.",
  onbPoints:[
    ["It speaks your scale.","It gives you your own setting, not an abstract value."],
    ["Thirteen parameters.","Method, roast, days, water, environment — all checked against sources."],
    ["It learns from your coffee.","Tell it how the cup came out and next time it's closer."],
    ["It stays on your phone.","Works offline, no account, no data collected."],
  ],
  onbNext:"Next",
  onbBack:"Go back",
  onbAsk:"How many steps does your grinder have?",
  onbWhy:"It only helps the first guess land closer. If you don't know, the app learns it from use anyway.",
  onbPlaceholder:"for example 40",
  onbStart:"Let's start",
  onbSkip:"I don't know — carry on anyway",
  firstTime:"first time with this method",
  usedWhat:"What setting did you use?",
  usedHint:"your step",
  hintNone:"Set the grinder wherever seems right, brew, and tell me how it came out.",
  hintSame:"About the same as {m}.",
  hintFiner:"Finer than {m}.",
  hintMuchFiner:"Much finer than {m}.",
  hintCoarser:"Coarser than {m}.",
  hintMuchCoarser:"Much coarser than {m}.",
  moveSame:"same as last time",
  moveFiner:"finer",
  moveCoarser:"coarser",
  moveHalf:"half a step",
  moveOne:"one step",
  moveN:"steps",
  whySour:"it was watery",
  whyBitter:"it was too strong",
  whyOlder:"the coffee is {n} days older",
  whyFresher:"the coffee is {n} days fresher",
  whyRoast:"you changed roast: now {r}",
  whyWetter:"the air is more humid today",
  whyDrier:"the air is drier today",
  whyWater:"you changed water",
  lblAir:"Air versus your last brew",
  airs:{drier:"Drier", same:"Same", wetter:"More humid"},
  fbFirst:"brew and tell me how it came out",
  fbKnown:"calibrated",
  learnStart:"learning your grinder — tell me how it came out",
  learnStartN:"learning your grinder across {n} methods",
  learnOne:"I've learned your grinder on one method",
  learnN:"I've learned your grinder on {n} methods",
  learnFineOne:"I know your grinder's step on this method",
  learnFine:"I know your grinder's step on {n} methods",
  fbNone:"not calibrated yet",
  lblShotTime:"Time", lblShotYield:"In cup", unitS:"sec",
  shotOn:"I timed the shot", shotOff:"I don't time shots",
  shotFast:"too fast", shotSlow:"too slow", shotOk:"inside the window",
  ratioShort:"ristretto", ratioLong:"lungo", ratioOk:"classic ratio",
  diagAgree:"time and taste agree: double correction",
  diagGrindOk:"the time is right: grind isn't the cause. Check dose, distribution or coffee freshness.",
  diagChannel:"time and taste disagree: likely channelling. Check distribution and tamping, not the grind.",
  grpBean:"The bean", grpMachine:"The machine", grpRoom:"The room",
  grpWater:"The water", grpGrind:"The grind",
  impactLabels:{alto:"High impact",medio:"Medium impact",basso:"Low impact"},
  a11yInfo:"information",
  close:"Close",
  editWhere:"where you are now",
  airFirst:"leave it on Same the first time — it matters from the next brew",
  airSame:"no correction for the air",
  airWetter:"more humid air → coarser grind",
  airDrier:"drier air → finer grind",
  editHint:"tap the number to correct it", a11yLess:"decrease", a11yMore:"increase",
  kofi:"Buy me a coffee",
  rights:"All rights reserved",
  footClaim:"Learns from your coffee · 13 verified parameters",
  footNote:"Works offline · No account · No data collected",
  installTxt:"Install it to your home screen: opens full-screen and works with no connection.",
  installGo:"Install", installNo:"Dismiss",
  info:{
    metodo:{impact:"alto",
      body:`The <em>brewing method</em> is the dominant parameter: on its own it covers nearly the whole range of the scale. It changes contact surface, pressure and contact time. AeroPress is split into three variants because it is the only method whose grind range spans almost the entire scale depending on technique.`,
      src:`<b>Where it comes from:</b> reference values from established barista practice and manufacturers' published grind scales.`},
    tostatura:{impact:"alto",
      body:`A <em>dark</em> roast makes the bean more porous and brittle: it extracts faster, so you need a coarser grind to avoid over-extraction. A <em>light</em> roast is denser and less soluble: it needs a finer grind to expose more surface area.`,
      src:`<b>Where it comes from:</b> the documented relationship between bean density, solubility and extraction rate.`},
    lavorazione:{impact:"basso",
      body:`The <em>post-harvest process</em> affects bean structure. <em>Washed</em> strips the pulp immediately: denser bean, slower extraction. <em>Natural</em> dries with the pulp on: more sugars and oils, faster extraction, coarser grind. <em>Honey</em> sits in between.`,
      src:`<b>Where it comes from:</b> specialty roasting practice.`},
    arabica:{impact:"medio",
      body:`<em>Robusta</em> has a harder bean than arabica and produces more <em>fines</em> when ground: very small particles that over-extract and turn bitter. Going coarser compensates for them.`,
      src:`<b>Where it comes from:</b> the same principle applied to grind uniformity — you counter fines by going coarser.`},
    eta:{impact:"medio",
      body:`After roasting the bean releases CO₂, which <em>obstructs water</em> during extraction. In the first days there is too much gas: go coarser. Around <em>day seven</em> the correction cancels out. After that the coffee oxidises and the grind steps progressively finer.`,
      src:`<b>Where it comes from:</b> an exponential degassing curve rather than banded steps, which avoids abrupt jumps. If you don't know the date, exclude it.`},
    macchina:{impact:"medio",
      body:`The <em>brew pressure</em> pushes water through the puck. At higher pressure water passes faster: to bring extraction time back on target you need a <em>finer</em> grind, which adds resistance.`,
      src:`<b>Where it comes from:</b> Darcy's law — flow rate is proportional to pressure and to the permeability of the bed. Reference 9 bar.`},
    dose:{impact:"basso",
      body:`The <em>dose</em> sets the depth of the puck. A larger dose means more material to pass through and therefore more resistance: you can go slightly coarser while keeping the same extraction time.`,
      src:`<b>Where it comes from:</b> the same bed-resistance logic as pressure. Reference 18 g, double basket.`},
    ambienteumidita:{impact:"basso",
      body:`<em>Air humidity</em> is the parameter baristas correct most often over the course of a day. The bean is hygroscopic: in humid air it absorbs moisture and the grounds tend to clump, slowing the flow. Compensate by going coarser.`,
      src:`<b>Where it comes from:</b> bar practice, where grind is retouched several times a day. <b>How to measure it:</b> a hygrometer, or the local weather reading.`},
    ambientetemp:{impact:"basso",
      body:`<em>Room temperature</em> affects the temperature of the beans at grinding and heat loss during extraction. A warm room speeds extraction slightly: go coarser.`,
      src:`<b>Where it comes from:</b> the same bar practice as humidity; the effect is real but weaker.`},
    acqua:{impact:"medio",
      body:`Water is an ingredient, not a medium. Calcium and magnesium <em>bind to flavour compounds</em> and help pull them out: hard water extracts more, so go coarser. Water too low in minerals under-extracts.`,
      src:`<b>Where it comes from:</b> the SCA water standard — target 68 mg/L, range 50–175 ppm. <b>Where to read it:</b> your bottled water label or water utility site.`},
    acquatemp:{impact:"basso",
      body:`<em>Temperature</em> governs how fast solubles dissolve. Above 94 °C extraction speeds up and needs a coarser grind; below 88 °C it slows down and you compensate by going finer.`,
      src:`<b>Where it comes from:</b> reference 93 °C, mid-range of the SCA recommended interval.`},
    filtro:{impact:"medio",
      body:`The <em>filter</em> decides how much resistance water meets and how many fines reach the cup. Thick paper slows the flow and lengthens contact: go coarser. Metal lets fines through, muddying the cup: go coarser still.`,
      src:`<b>Where it comes from:</b> permeability and fines retention by filter type.`},
    uniformita:{impact:"medio",
      body:`A quality grinder produces particles of <em>even size</em>. A budget or blade grinder produces a mix of fines and boulders in the same pass: the fines over-extract and turn bitter. Counter them with a coarser setting.`,
      src:`<b>Where it comes from:</b> the effect of bimodal particle size distribution.`},
    feedback:{impact:"alto",
      body:`The <em>feedback</em> is the one place where the app receives a <em>real</em> data point instead of estimating one. <em>Sour</em> means under-extraction: go finer. <em>Bitter</em> means over-extraction: go coarser. Each answer moves the grind a step or two in the right direction, and the app learns <em>how far</em> it needs to move on your grinder.
      <br><br><b>If you're not sure what to answer</b>, take a sip, wait a minute without drinking water, and ask yourself one thing: <em>would I have another?</em> If the answer is an immediate yes, tap <em>Perfect</em>.`,
      src:`<b>How it works:</b> each method has its own position and its own step — espresso doesn't affect French Press. Everything stays on your device.<br><br><b>If you repeat the same complaint</b> the app understands it was moving too little and widens the step; if the opposite arrives it understands it overshot and narrows it.
      <br><br><b>Extraction time</b> does not enter the calculation: it is an <em>outcome</em>, not a parameter. It qualifies the taste judgement. When time and taste agree the correction doubles; when they contradict each other the cause isn't the grind but almost always channelling.
      <br><br><b>Bitterness and dryness are two different things.</b> Bitterness is a <em>taste</em> and you notice it while drinking, at the back of the tongue: think grapefruit peel or unsweetened cocoa. Dryness is a <em>physical sensation</em> that arrives after swallowing: the mouth feels stripped and rough, like after an unripe persimmon or over-steeped tea. A well extracted coffee leaves a sweet memory; an over-extracted one leaves the mouth empty and makes you reach for water.
      <br><br><b>The window isn't fixed:</b> the 25–30 second standard applies to a medium roast at a 1:2 ratio ({{medium}} s in the app). A dark roast is more porous and extracts sooner ({{dark}} s); a light one is denser and needs longer ({{light}} s). The app moves the window according to the roast you selected.`},
    aria:{impact:"basso",
      body:`Nobody at home has a hygrometer, but everyone can tell when the air feels heavier than usual. With more humidity the grounds compact and hold water longer: a slightly coarser grind is needed. Dry air does the opposite.`,
      src:`<b>Why a comparison and not a number:</b> what matters isn't absolute humidity but <em>how much it changed</em> since the last coffee. Baristas adjust their grinder several times a day for this reason.
      <br><br><b>It's a fine adjustment:</b> on a grinder with wide steps it can be worth less than half a step and move nothing on its own. It counts when it adds to the other factors. In Bar mode you can enter the actual humidity as a percentage.`},
    comefunziona:{
      body:`The number you see is <em>your own setting</em>, not something the app made up. Macinino doesn't know your grinder and doesn't pretend to: it starts from where you are and tells you <em>how far to move</em> when conditions change.`,
      src:`<b>How to use it:</b> the first time with a method the app gives you no number — only whether to go finer or coarser than a method you already know. You brew where it seems right, tell it what setting you used, and from then on it works in your scale.
      <br><br><b>What it actually does:</b> thirteen parameters — method, roast, days, water, environment and others — are used to work out <em>how much has changed</em> since last time. If nothing changed, the app tells you to stay put.
      <br><br><b>What it learns:</b> every time you say how it came out, the app corrects itself and works out how closely spaced your grinder's steps are. After three or four coffees it knows your scale better than any chart.
      <br><br><b>What it cannot do:</b> it doesn't measure microns, doesn't know your coffee, doesn't know your grinder. Your palate is the judge — the app keeps score.`},
  },
},
};

/* ─────────────── DATI ─────────────── */
const METHODS=[
  {id:"turkish",base:8},{id:"espresso",base:25},{id:"moka",base:38},
  {id:"aeropress_fast",base:38},{id:"aeropress",base:50},
  {id:"v60",base:58},{id:"americana",base:61},
  {id:"aeropress_long",base:65},{id:"chemex",base:65},
  {id:"napoletana",base:67},{id:"frenchpress",base:78},
  {id:"coldbrew",base:88},
];
const WATER=[
  {id:"molto_morbida",ppm:"< 50",adj:-3},{id:"ideale",ppm:"50–100",adj:0},
  {id:"dura",ppm:"100–200",adj:2},{id:"molto_dura",ppm:"> 200",adj:4},
];
const FILTER_IDS=["sottile","spesso","metallo","stoffa"];
const FILTER_ADJ={sottile:0,spesso:2,metallo:4,stoffa:-1};
const UNIFORMITY_IDS=["alta","media","bassa"];
const UNIFORMITY_ADJ={alta:0,media:2,bassa:5};
const ROAST_IDS=["light","medium","dark"];
const AIR_IDS=["drier","same","wetter"];
const PROCESS_IDS=["lavato","honey","naturale"];
const FB_IDS=["sour","ok","bitter"];
const GRIND_MAX=[12,30,45,62,72,85,101];


/* Il tempo di estrazione è un esito solo dove la grana lo determina.
   Su French Press, moka o cold brew il tempo lo decidi tu: chiederlo
   sarebbe una domanda senza senso. */

/* Limiti e passo di ogni parametro regolabile, in un solo posto:
   li usano sia il disegno sia il meccanismo di incremento. */
const RANGES={
  arabica:{min:0,max:100,step:1},
  machinebar:{min:6,max:13,step:0.5},
  dose:{min:7,max:25,step:0.5},
  humidity:{min:10,max:100,step:1},
  airTemp:{min:-5,max:45,step:1},
  waterTemp:{min:70,max:100,step:1},
  age:{min:1,max:90,step:1},
  shotTime:{min:15,max:60,step:1},
  shotYield:{min:15,max:70,step:1},
};

/* Ritmo della pressione prolungata. Prima una pausa perché un tocco
   singolo non faccia partire la ripetizione, poi una cadenza che
   accelera per gradi: né a scatti né incontrollabile. */
/* Il tempo di estrazione è un ESITO, non un parametro: non entra nel
   calcolo della grana. Serve a qualificare il feedback sul gusto —
   quando i due segnali concordano la correzione è più decisa, quando si
   contraddicono la causa non è la grana. */
/* Finestra di estrazione per grado di tostatura. Lo standard SCA indica
   25–30 secondi, ma la finestra si sposta: le tostature chiare danno il
   meglio più tardi, le scure prima. La tostatura è già un parametro
   dell'app, quindi la finestra si adatta da sola. */
const SHOT_WINDOW={
  light:  {min:28, max:35},
  medium: {min:25, max:31},
  dark:   {min:21, max:27},
};
function shotWindow(){ return SHOT_WINDOW[S.roast] || SHOT_WINDOW.medium; }
/* Il colore della diagnosi parla la stessa lingua del risultato: ambra
   quando serve andare più fini, terracotta quando serve andare più grossi.
   Non è decorazione — indica la direzione della correzione. */
function shotColor(){
  const sig=timeSignal();
  if(sig===-1) return "#E5A03C";   // veloce → più fine → lato ambra
  if(sig===1)  return "#C9573C";   // lento  → più grossa → lato terracotta
  return null;                     // dentro la finestra → nessun colore
}

/* Riepilogo di quel che dicono tempo e rapporto, prima ancora di
   toccare i pulsanti del gusto. */
function shotDiagnosis(t){
  const parti=[];
  const sig=timeSignal();
  const w=shotWindow();
  const finestra=" ("+w.min+"–"+w.max+"s)";
  if(sig===-1) parti.push(t.shotFast+finestra);
  else if(sig===1) parti.push(t.shotSlow+finestra);
  else parti.push(t.shotOk+finestra);
  const r=S.shotYield/S.dose;
  const rs="1:"+ (Math.round(r*10)/10).toString().replace(".",S.lang==="it"?",":".");
  if(r<1.8)      parti.push(rs+" — "+t.ratioShort);
  else if(r>2.8) parti.push(rs+" — "+t.ratioLong);
  else           parti.push(rs+" — "+t.ratioOk);
  return parti.join(" · ");
}

function timeSignal(){
  if(!S.shotKnown) return null;
  const w=shotWindow();
  if(S.shotTime<w.min) return -1;   // veloce → sotto-estratto → più fine
  if(S.shotTime>w.max) return  1;   // lento  → sovra-estratto → più grossa
  return 0;                         // dentro la finestra
}

/* ══ DAL PUNTEGGIO INTERNO ALLE TACCHE DELL'UTENTE ══
   La scala 1–98 è interna e non corrisponde a nessun macinino reale: un
   macinino da 100 tacche può avere tutta la gamma utile nelle prime venti.
   Per questo l'app non converte MAI una posizione assoluta. Converte solo
   la DIFFERENZA rispetto all'ultima volta, con un fattore k che parte da
   una stima prudente e viene corretto dall'uso.
   Verificato: k reale sta quasi sempre fra 0,2 e 0,6 tacche per punto. */

const K_DEFAULT = 0.5, K_MIN = 0.1, K_MAX = 3;
const FB_POINTS = 2;          // quanto vale una risposta sul gusto

function anchor(m){ return S.anchors[m||S.method] || null; }

function kFor(m){
  const a = anchor(m);
  if(a && a.k) return a.k;
  /* Stima iniziale: un macinino con molte tacche le distribuisce più fitte,
     quindi ogni punto vale più tacche — ma mai quanto la proporzione
     diretta suggerirebbe, che è l'errore della versione precedente. */
  if(S.notches) return clamp(S.notches/98*0.5, K_MIN, K_MAX);
  return K_DEFAULT;
}

/* Spostamento suggerito, in tacche, rispetto alla posizione ancorata. */
function drift(internalNow){
  const a = anchor();
  if(!a) return null;
  return (internalNow - a.internal) * kFor();
}

/* Posizione da mostrare: la posizione dell'utente più lo spostamento. */
function suggested(internalNow){
  const a = anchor();
  if(!a) return null;
  const d = drift(internalNow);
  const raw = a.pos + d;
  const dec = S.notches && S.notches <= 30;      // scale corte: mezze tacche
  return dec ? Math.round(raw*2)/2 : Math.round(raw);
}

/* ── COME SI LEGGE IL RISULTATO ── */

function fmtPos(v){
  if(v===null) return "—";
  return (Math.round(v)===v) ? String(v)
       : String(v).replace(".", S.lang==="it" ? "," : ".");
}
function unitPos(t){ return S.notches ? "/"+S.notches : ""; }

/* Testo dello spostamento: è la parte che l'utente usa davvero. */
/* Lo spostamento si misura dalla posizione in cui l'utente ha DAVVERO
   macinato l'ultima volta (from), non dall'ancoraggio corrente — che dopo
   una correzione è già la posizione nuova e darebbe sempre zero. */
function moveText(t){
  const a=anchor(); if(!a) return "";
  const d=suggested(currentInternal()) - (a.from!=null?a.from:a.pos);
  const n=Math.abs(d);
  if(n < 0.25) return t.moveSame;
  const verso = d>0 ? t.moveCoarser : t.moveFiner;
  const q = n<=0.5 ? t.moveHalf : n<1.5 ? t.moveOne : fmtPos(Math.round(n*2)/2)+" "+t.moveN;
  return q+" "+verso;
}
function moveTone(){
  const a=anchor(); if(!a) return null;
  const d=suggested(currentInternal()) - (a.from!=null?a.from:a.pos);
  if(Math.abs(d)<0.25) return null;
  return d>0 ? "#C9573C" : "#E5A03C";   // grosso → terra, fine → ambra
}

/* Prima volta con un metodo: l'unica cosa che l'app sa davvero è la
   posizione RELATIVA fra i metodi. Se l'utente ne ha già tarato uno,
   glielo si usa come riferimento. */
function relativeHint(t){
  const noti=Object.keys(S.anchors);
  if(!noti.length) return t.hintNone;
  const mio=baseOf(S.method);
  let vicino=null, dist=1e9;
  for(const m of noti){
    const d=Math.abs(baseOf(m)-mio);
    if(d<dist){ dist=d; vicino=m; }
  }
  const dd=mio-baseOf(vicino);
  const nome=t.methods[vicino];
  if(Math.abs(dd)<4)  return t.hintSame.replace("{m}",nome);
  const forte=Math.abs(dd)>=18;
  const verso=dd>0
    ? (forte?t.hintMuchCoarser:t.hintCoarser)
    : (forte?t.hintMuchFiner:t.hintFiner);
  return verso.replace("{m}",nome);
}
function baseOf(id){ const m=METHODS.find(x=>x.id===id); return m?m.base:50; }

/* ── PERCHÉ ──
   Lo spostamento senza spiegazione è un ordine; con la spiegazione è uno
   strumento. Si elencano solo le condizioni davvero cambiate rispetto
   all'ultima preparazione ancorata. */
function reasons(t){
  const a=anchor(); if(!a) return [];
  const out=[];
  const c=a.cond||{};

  if(a.lastFb==="sour")   out.push(t.whySour);
  if(a.lastFb==="bitter") out.push(t.whyBitter);

  if(S.ageKnown && c.age!=null && S.age!==c.age){
    const d=S.age-c.age;
    if(Math.abs(d)>=2) out.push((d>0?t.whyOlder:t.whyFresher).replace("{n}",Math.abs(d)));
  }
  if(c.roast && S.roast!==c.roast)
    out.push(t.whyRoast.replace("{r}",t.roasts[S.roast].toLowerCase()));

  /* Confronto sui valori e non sulle etichette: tornare da "più umido" a
     "uguale" sposta comunque la macinatura, e prima restava senza spiegazione. */
  if(S.mode!=="bar" && c.air){
    const ora=AIR[S.air]||AIR.same, prima=AIR[c.air]||AIR.same;
    if(ora!==prima) out.push(ora>prima?t.whyWetter:t.whyDrier);
  }

  if(S.mode==="bar"){
    if(c.humidity!=null && Math.abs(S.humidity-c.humidity)>=8)
      out.push((S.humidity>c.humidity?t.whyWetter:t.whyDrier));
    if(c.water && S.water!==c.water) out.push(t.whyWater);
  }
  return out.slice(0,3);
}

/* Fotografia delle condizioni al momento dell'ancoraggio: serve a dire
   dopo che cosa è cambiato. */
function snapshot(){
  return {age:S.ageKnown?S.age:null, roast:S.roast, air:S.air,
          humidity:S.humidity, water:S.water, method:S.method};
}

/* ── COSA HO IMPARATO ──
   L'apprendimento è la cosa più preziosa dell'app ed è invisibile: succede
   nei dati, non sullo schermo. Questa riga lo rende visibile mentre accade,
   senza occupare spazio finché non c'è niente da dire. */
function learnedLine(t){
  const n=Object.keys(S.anchors).length;
  if(!n) return "";
  const a0=anchor();
  if(a0 && !a0.lastFb) return t.editHint;   // ancorato ma mai corretto: si spiega il tocco
  const tarati=Object.values(S.anchors).filter(a=>a.lastFb).length;
  if(!tarati) return n===1 ? t.learnStart : t.learnStartN.replace("{n}",n);
  const a=anchor();
  const preciso=a && a.lastFb && Math.abs(kFor()-K_DEFAULT)>0.08;
  if(preciso) return tarati===1 ? t.learnFineOne : t.learnFine.replace("{n}",tarati);
  return tarati===1 ? t.learnOne : t.learnN.replace("{n}",tarati);
}

const HOLD_DELAY=340;
const holdRate=n => n<3?100 : n<8?65 : n<16?42 : 26;

const DEFAULTS={arabica:80,processing:"lavato",machinebar:9,dose:18,
  water:"ideale",waterTemp:93,filter:"sottile",uniformity:"alta",humidity:60,airTemp:20};

/* ─────────────── ALGORITMO ─────────────── */
function ageAdjustment(age){
  if(age==null) return 0;
  return 7*Math.exp(-age/3.5) - 6.5*(1-Math.exp(-age/45));
}
function barColor(idx){
  if(idx<=1) return "#E5A03C";   // fine   — ambra
  if(idx<=4) return "#DD7A3D";   // medio  — arancio bruciato
  return "#C9573C";              // grosso — terra
}
function compute(o){
  let g=o.base;
  if(o.roast==="light") g-=5;
  if(o.roast==="dark")  g+=5;
  g+=ageAdjustment(o.age);
  g+=(100-o.arabica)*0.06;
  g+={lavato:0,honey:1.5,naturale:3}[o.processing];
  g+=(9-o.machinebar)*1.5;                       // più pressione → più fine
  if(o.dose!=null) g+=(o.dose-18)*0.3;
  g+=o.waterAdj;
  g+=(o.waterTemp-93)*0.15;
  g+=o.filterAdj;
  g+=o.uniformityAdj;
  g+=(o.humidity-60)*0.06;
  g+=(o.temp-20)*0.08;
  g+=o.feedbackOffset;
  return Math.round(Math.max(1,Math.min(98,g)));
}

/* ─────────────── STATO E PERSISTENZA ─────────────── */
const initial={
  lang:(navigator.language||"it").toLowerCase().startsWith("it")?"it":"en",
  mode:"casa", method:"espresso", roast:"medium",
  age:10, ageKnown:false,
  arabica:DEFAULTS.arabica, processing:DEFAULTS.processing,
  machinebar:DEFAULTS.machinebar, dose:DEFAULTS.dose,
  humidity:DEFAULTS.humidity, airTemp:DEFAULTS.airTemp,
  water:DEFAULTS.water, waterTemp:DEFAULTS.waterTemp,
  filter:DEFAULTS.filter, uniformity:DEFAULTS.uniformity,
  /* ── ANCORAGGI ──
     Per ogni metodo l'app ricorda dove sta l'utente sul PROPRIO macinino,
     con quale valore interno, e quante tacche vale un punto di scala.
     Non converte posizioni assolute — quelle non le può conoscere —
     ma solo spostamenti rispetto all'ultima volta. */
  anchors:{},              // { metodo: {pos, internal, k, lastFb} }
  notches:null,            // tacche del macinino, se dichiarate
  onboarded:false,         // primo avvio già visto
  howSeen:false,           // pannello "Come funziona" già aperto almeno una volta
  posDraft:"",             // campo "ho usato" e correzione manuale
  editing:false,           // sto correggendo la posizione a mano
  onbStep:0,               // pagina del primo avvio
  air:"same",              // Casa: drier | same | wetter
  groups:{},
  shotKnown:false, shotTime:27, shotYield:36,
  openInfo:null, installDismissed:false,
};
let S=Object.assign({},initial);

let saveTimer=null;
function saveSoon(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(save,250);
}

function save(){
  try{
    const {openInfo,lastDiag,posDraft,editing,onbStep,...keep}=S;
    localStorage.setItem(STORE_KEY,JSON.stringify(keep));
  }catch(e){/* modalità privata o quota piena: l'app resta usabile */}
}
function load(){
  try{
    const raw=localStorage.getItem(STORE_KEY);
    if(!raw) return;
    const d=JSON.parse(raw);
    if(!d||typeof d!=="object") return;
    // Si accettano solo chiavi note, con il tipo atteso: un salvataggio
    // manomesso o di una versione futura non deve rompere l'app.
    for(const k of Object.keys(initial)){
      if(!(k in d)) continue;
      // typeof null è "object": senza questo controllo un null salvato
      // supererebbe la verifica di tipo e manderebbe l'app in errore.
      if(d[k]===null) continue;
      if(typeof d[k]!==typeof initial[k]) continue;
      S[k]=d[k];
    }
    if(!METHODS.some(m=>m.id===S.method)) S.method=initial.method;
    if(!WATER.some(w=>w.id===S.water))    S.water=initial.water;
    if(!ROAST_IDS.includes(S.roast))      S.roast=initial.roast;
    if(!PROCESS_IDS.includes(S.processing)) S.processing=initial.processing;
    if(!FILTER_IDS.includes(S.filter))    S.filter=initial.filter;
    if(!UNIFORMITY_IDS.includes(S.uniformity)) S.uniformity=initial.uniformity;
    if(S.mode!=="casa"&&S.mode!=="bar")   S.mode=initial.mode;
    if(S.lang!=="it"&&S.lang!=="en")      S.lang=initial.lang;
    S.age=clamp(Math.round(S.age)||10,1,90);
    if(!["drier","same","wetter"].includes(S.air)) S.air=initial.air;
    S.notches=Number.isFinite(S.notches)?clamp(Math.round(S.notches),2,300):null;
    S.anchors=sanitizeAnchors(S.anchors);
    S.groups=sanitizeGroups(S.groups);
  }catch(e){ S=Object.assign({},initial); }
}
/* Solo nomi di gruppo noti e valori booleani: un gruppo inventato o un
   valore di altro tipo verrebbe comunque ignorato, ma è meglio non
   portarselo dietro nel salvataggio. */
function sanitizeGroups(g){
  const validi=["chicco","macchina","ambiente","acqua","macinatura","feedback"];
  const out={};
  if(!g || typeof g!=="object" || Array.isArray(g)) return out;
  for(const k of validi) if(g[k]===true) out[k]=true;
  return out;
}

/* Un ancoraggio è la memoria più preziosa dell'app: va accettato solo se
   completo e sensato, mai a metà. */
function sanitizeAnchors(o){
  const out={};
  if(!o || typeof o!=="object" || Array.isArray(o)) return out;
  for(const [k,v] of Object.entries(o)){
    if(!METHODS.some(m=>m.id===k)) continue;
    if(!v || typeof v!=="object" || Array.isArray(v)) continue;
    if(!Number.isFinite(v.pos) || !Number.isFinite(v.internal)) continue;
    out[k]={
      pos:clamp(v.pos,0,999),
      from:Number.isFinite(v.from)?clamp(v.from,0,999):clamp(v.pos,0,999),
      internal:clamp(v.internal,1,98),
      k:Number.isFinite(v.k)?clamp(v.k,K_MIN,K_MAX):K_DEFAULT,
      lastFb:["sour","ok","bitter"].includes(v.lastFb)?v.lastFb:null,
      cond:(v.cond && typeof v.cond==="object" && !Array.isArray(v.cond))?v.cond:{},
    };
  }
  return out;
}
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const fmt=v => (S.lang==="it" ? String(v).replace(".",",") : String(v));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function set(patch,{persist=true}={}){
  Object.assign(S,patch);
  if(persist) save();
  render();
}

/* ─────────────── FRAMMENTI DI VISTA ─────────────── */
/* Titolo del pannello: la stessa etichetta che compare accanto alla "i",
   così chi apre il riquadro sa subito di che parametro sta leggendo. */
const INFO_TITLES={
  metodo:"lblMethod", tostatura:"lblRoast", eta:"lblAge", aria:"lblAir",
  lavorazione:"lblProcessing", arabica:"lblBlend", macchina:"lblMachine",
  dose:"lblDose", ambienteumidita:"lblAmbientHum", ambientetemp:"lblAmbientTemp",
  acqua:"lblWater", acquatemp:"lblWaterTemp", filtro:"lblFilter",
  uniformita:"lblUniformity", comefunziona:"lblHow", feedback:"lblFeedback",
};
function infoTitle(id,t){ const k=INFO_TITLES[id]; return (k&&t[k])||""; }

function labelRow(id,label,t){
  const open=S.openInfo===id;
  return `<div class="lbl-row">
    <span class="lbl">${esc(label)}</span>
    <button class="info-btn" data-info="${id}" aria-expanded="${open}"
      aria-label="${esc(label)} — ${esc(t.a11yInfo)}">i</button>
  </div>`;
}
/* Le finestre del tempo comparivano scritte a mano nei pannelli e avevano
   già preso strade diverse dal codice. Ora si sostituiscono al volo: una
   sola fonte di verità, impossibile che divergano di nuovo. */
function finestre(txt){
  if(!txt || txt.indexOf("{{")<0) return txt;
  return txt.replace(/\{\{(light|medium|dark)\}\}/g,
    (_,r)=>SHOT_WINDOW[r].min+"–"+SHOT_WINDOW[r].max);
}

/* Il pannello si apre al centro invece che in linea. Tre ragioni:
   si legge senza cercarlo, non spinge giù il contenuto sotto le dita, e
   soprattutto non gonfia il blocco fisso — che "Come funziona" faceva,
   mandando in tilt la misura della riduzione. */
function infoPanel(id,t){
  const e=t.info[id]; if(!e) return "";
  const tag=e.impact?`<span class="impact-tag impact-${e.impact}">${esc(t.impactLabels[e.impact])}</span>`:"";
  const tit=infoTitle(id,t);
  return `<div class="info-veil" data-infoclose role="dialog" aria-modal="true"
      aria-label="${esc(tit||t.a11yInfo)}">
    <div class="info-card" data-infostop>
      <div class="info-head">
        <div class="info-titles">
          ${tit?`<div class="info-title">${esc(tit)}</div>`:""}
          ${tag}
        </div>
        <button class="info-x" data-infoclose aria-label="${esc(t.close)}">×</button>
      </div>
      <div class="info-scroll">
        <div class="info-body">${finestre(e.body)}</div>
        <div class="info-src">${finestre(e.src)}</div>
      </div>
    </div>
  </div>`;
}
function seg(items,current,attr,nota){
  return `<div class="seg">${items.map(([id,lbl])=>
    `<button class="seg-btn" data-${attr}="${id}" aria-pressed="${current===id}">${esc(lbl)}</button>`
  ).join("")}</div>${nota?`<div class="seg-note">${esc(nota)}</div>`:""}`;
}

/* Che effetto ha la scelta sull'aria, detto in chiaro. Il controllo altrimenti
   non comunica nulla: si vede una riga di pulsanti e non si capisce a cosa serva. */
function airNote(t){
  if(!anchor()) return t.airFirst;            // prima volta: non c'è un "prima"
  if(S.air==="same")   return t.airSame;
  return S.air==="wetter" ? t.airWetter : t.airDrier;
}
/* Contatore: numero sopra, riga di avanzamento in mezzo, − e + ai lati.
   Niente trascinamento: elimina il conflitto col gesto di scorrimento e
   dà lo stesso scatto preciso su ogni parametro, anche a mani bagnate. */
function stepper(id,val,unit,note,label,t,{shown=null,disabled=false,extra="",band=null}={}){
  const r=RANGES[id];
  const pct=disabled?0:((val-r.min)/(r.max-r.min))*100;
  const atMin=disabled||val<=r.min, atMax=disabled||val>=r.max;
  return `<div class="stp" data-for="${id}"${disabled?' data-off="1"':''}>
    <div class="stp-top">
      <span class="stp-num${disabled?" off":""}${(id==="shotTime"&&timeSignal()!==0&&S.shotKnown)?" alert":""}">${shown!==null?shown:fmt(val)}</span>
      ${unit?`<span class="stp-unit">${esc(unit)}</span>`:""}
      <span class="stp-hint">${esc(note)}</span>
    </div>
    <div class="stp-row">
      <button class="stp-btn" data-nudge="${id}" data-dir="-1" ${atMin?"disabled":""}
        aria-label="${esc(label)} — ${esc(t.a11yLess)}">−</button>
      <div class="stp-hit" aria-hidden="true">
        <div class="stp-track">
          ${band?`<span class="stp-band" style="left:${((band.min-r.min)/(r.max-r.min))*100}%;
            width:${((band.max-band.min)/(r.max-r.min))*100}%"></span>`:""}
          <div class="stp-fill" style="width:${pct}%"></div>
          <span class="stp-knob" style="left:${pct}%"></span>
        </div>
      </div>
      <button class="stp-btn" data-nudge="${id}" data-dir="1" ${atMax?"disabled":""}
        aria-label="${esc(label)} — ${esc(t.a11yMore)}">+</button>
    </div>
    ${extra}
  </div>`;
}

/* ─────────────── RENDER ─────────────── */
/* Suggerimento testuale di ogni cursore. Estratto perché serve in due
   punti: al disegno completo e all'aggiornamento durante il trascinamento. */
/* Riepilogo di un gruppo chiuso: senza, richiudere significherebbe
   nascondere, e per controllare lo stato bisognerebbe riaprire tutto. */
function groupSummary(id,t,isEsp){
  const p=[];
  switch(id){
    case "chicco":
      p.push(t.roasts[S.roast].toLowerCase());
      p.push(t.process[S.processing].toLowerCase());
      p.push(S.arabica+"% ar.");
      if(S.ageKnown) p.push(S.age+"g");
      break;
    case "macchina":
      p.push(fmt(S.machinebar)+" bar"); p.push(fmt(S.dose)+" g");
      break;
    case "ambiente":
      p.push(S.humidity+"%"); p.push(fmt(S.airTemp)+t.unitC);
      break;
    case "acqua":
      p.push(t.waters[S.water].toLowerCase()); p.push(fmt(S.waterTemp)+t.unitC);
      break;
    case "feedback":
      return anchor() ? t.fbKnown : t.fbNone;
    case "macinatura":
      p.push(t.filters[S.filter].toLowerCase());
      p.push(t.uniformity[S.uniformity].toLowerCase());
      break;
  }
  return p.join(" · ");
}

/* Involucro di un gruppo richiudibile. L'intera riga è il bersaglio,
   come per il feedback. */
/* L'intestazione fa una cosa sola: apre e chiude. Ospitare anche la "i"
   creava una zona di tocco invisibile in mezzo alla riga che apriva la
   spiegazione al posto del gruppo. */
function group(id,titolo,t,contenuto,isEsp){
  const aperto = S.groups[id]===true;
  return `<div class="grp">
    <div class="grp-head" data-grp="${id}" role="button" tabindex="0"
      aria-expanded="${aperto}" aria-label="${esc(titolo)}">
      <span class="lbl">${esc(titolo)}</span>
      <span class="grp-tail">
        ${!aperto?`<span class="grp-sum">${esc(groupSummary(id,t,isEsp))}</span>`:""}
        <svg class="fb-chev${aperto?" up":""}" width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
          <path d="M3 5l3.5 3.5L10 5" stroke="currentColor" stroke-width="1.4"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    ${aperto?`<div class="grp-body">${contenuto}</div>`:""}
  </div>`;
}

function hintFor(key,v,t){
  switch(key){
    case "arabica":    return v>=95?t.blendHints[0]:v>=70?t.blendHints[1]:v>=40?t.blendHints[2]:t.blendHints[3];
    case "machinebar": return v<8?t.barHints[0]:v<=10?t.barHints[1]:v<=11?t.barHints[2]:t.barHints[3];
    case "dose":       return v<16?t.doseHints[0]:v<=20?t.doseHints[1]:t.doseHints[2];
    case "humidity":   return v<40?t.humHints[0]:v<=70?t.humHints[1]:t.humHints[2];
    case "airTemp":    return v<15?t.airHints[0]:v<=26?t.airHints[1]:t.airHints[2];
    case "waterTemp":  return v<88?t.tempHints[0]:v<=94?t.tempHints[1]:t.tempHints[2];
    case "age":        return !S.ageKnown?t.ageUnknownHint
                            :v<3?t.ageHints[0]:v<14?t.ageHints[1]:v<30?t.ageHints[2]
                            :v<45?t.ageHints[3]:t.ageHints[4];
    default: return "";
  }
}

/* Calcolo del risultato a partire dallo stato corrente. */
function currentGrind(){
  const isBar=S.mode==="bar", isEsp=S.method==="espresso";
  const m=METHODS.find(x=>x.id===S.method);
  const wData=WATER.find(x=>x.id===(isBar?S.water:DEFAULTS.water));
  return compute({
    base:m.base, roast:S.roast, age:S.ageKnown?S.age:null,
    arabica:isBar?S.arabica:DEFAULTS.arabica,
    processing:isBar?S.processing:DEFAULTS.processing,
    machinebar:(isBar&&isEsp)?S.machinebar:DEFAULTS.machinebar,
    dose:(isBar&&isEsp)?S.dose:null,
    waterAdj:wData.adj,
    waterTemp:isBar?S.waterTemp:DEFAULTS.waterTemp,
    filterAdj:isBar?FILTER_ADJ[S.filter]:FILTER_ADJ[DEFAULTS.filter],
    uniformityAdj:isBar?UNIFORMITY_ADJ[S.uniformity]:UNIFORMITY_ADJ[DEFAULTS.uniformity],
    humidity:isBar?S.humidity:airHumidity(),
    temp:isBar?S.airTemp:DEFAULTS.airTemp,
    feedbackOffset:0,
  });
}
/* Il punteggio interno non è più un risultato da mostrare: è la scala su
   cui si misurano le DIFFERENZE fra una preparazione e la successiva. */
function currentInternal(){ return currentGrind(); }

/* In Casa nessuno ha un igrometro. Si chiede il confronto con ieri, che è
   l'unica cosa che una persona percepisce davvero, e si traduce in uno
   scostamento dall'umidità di riferimento. */
const AIR={drier:38, same:60, wetter:82};
function airHumidity(){ return AIR[S.air] || AIR.same; }

/* Aggiorna SOLO le parti che dipendono da un valore continuo, senza
   ricostruire il DOM. È ciò che permette al trascinamento di sopravvivere:
   ridisegnare l'albero distruggeva il cursore sotto il dito. */
function paintResult(){
  const t=T[S.lang];
  const grind=currentInternal();
  const gIdx=GRIND_MAX.findIndex(mx=>grind<=mx);
  const tone=moveTone();
  const color=tone||barColor(gIdx);

  const hero=document.querySelector(".hero-num");
  if(hero){
    hero.firstChild.nodeValue=fmtPos(suggested(grind));
    hero.style.color=color;
  }
  const mv=document.querySelector(".move");
  if(mv && anchor()){ mv.textContent=moveText(t); mv.style.color=tone||"var(--mid)"; }

  const mark=document.querySelector(".brand-mark ellipse");
  if(mark) mark.setAttribute("fill",color);

  const notes=document.querySelector(".result-notes");
  if(notes){
    const out=reasons(t).map(r=>`<div class="note-line">${esc(r)}</div>`).join("");
    if(notes.innerHTML!==out) notes.innerHTML=out;
  }
  const lr=document.querySelector(".learned");
  if(lr){ const txt=learnedLine(t); if(lr.textContent!==txt) lr.textContent=txt; }
}

/* ── PRIMO AVVIO ──
   Una schermata sola. Dice come ragiona l'app e chiede l'unica cosa che
   chiunque può sapere prima di aver fatto un caffè: quante tacche ha il
   macinino. Si può saltare: senza, l'app usa un passo prudente e lo
   impara comunque dall'uso. */
function onboarding(t){
  const marchio = `<div class="onb-top">
        <div class="onb-mark">Macinino<svg width="17" height="17" viewBox="0 0 64 64" aria-hidden="true">
          <g transform="rotate(40 32 32)">
            <ellipse cx="32" cy="32" rx="18.7" ry="26.7" fill="#E5A03C"/>
            <path d="M32 8.5Q23.5 32 32 55.5" stroke="#16181B" stroke-width="5.6" fill="none" stroke-linecap="round"/>
          </g>
        </svg></div>
        <div class="lang-pill">
          <button class="lang-btn" data-lang="it" aria-pressed="${S.lang==="it"}" aria-label="Italiano">IT</button>
          <button class="lang-btn" data-lang="en" aria-pressed="${S.lang==="en"}" aria-label="English">EN</button>
        </div>
      </div>`;

  const punti = (n) => `<ul class="onb-list">${t.onbPoints.map(([forte,resto])=>
      `<li><b>${esc(forte)}</b> ${esc(resto)}</li>`).join("")}</ul>`;

  const pallini = `<div class="onb-dots" aria-hidden="true">
      <span class="${S.onbStep===0?"on":""}"></span><span class="${S.onbStep===1?"on":""}"></span></div>`;

  /* Pagina 1: cosa fa l'app. Pagina 2: l'unica cosa che le serve sapere.
     Separarle evita il muro di testo su una schermata sola. */
  const pagina = S.onbStep===0 ? `
      <h2 class="onb-title">${esc(t.onbTitle)}</h2>
      <p class="onb-body">${esc(t.onbLead)}</p>
      ${punti()}
      <button class="onb-go" data-onbnext>${esc(t.onbNext)}</button>
    ` : `
      <h2 class="onb-title">${esc(t.onbAsk)}</h2>
      <p class="onb-body">${esc(t.onbWhy)}</p>
      <input class="onb-input" type="text" inputmode="numeric" id="notchInput"
        value="${S.notches||""}" placeholder="${esc(t.onbPlaceholder)}" aria-label="${esc(t.onbAsk)}">
      <button class="onb-go" data-startapp>${esc(t.onbStart)}</button>
      <button class="onb-skip" data-skipnotches>${esc(t.onbSkip)}</button>
    `;

  return `<div class="onb" role="dialog" aria-modal="true" aria-label="${esc(t.onbTitle)}">
    <div class="onb-card">
      ${marchio}
      ${pagina}
      ${pallini}
      ${S.onbStep===1?`<button class="onb-back" data-onbback>${esc(t.onbBack)}</button>`:""}
    </div>
  </div>`;
}

function render(){
  const t=T[S.lang];
  document.documentElement.lang=S.lang;

  const isBar=S.mode==="bar";
  const isEsp=S.method==="espresso";
  const m=METHODS.find(x=>x.id===S.method);
  const wData=WATER.find(x=>x.id===(isBar?S.water:DEFAULTS.water));

  const grind=compute({
    base:m.base, roast:S.roast, age:S.ageKnown?S.age:null,
    arabica:isBar?S.arabica:DEFAULTS.arabica,
    processing:isBar?S.processing:DEFAULTS.processing,
    machinebar:(isBar&&isEsp)?S.machinebar:DEFAULTS.machinebar,
    dose:(isBar&&isEsp)?S.dose:null,
    waterAdj:wData.adj,
    waterTemp:isBar?S.waterTemp:DEFAULTS.waterTemp,
    filterAdj:isBar?FILTER_ADJ[S.filter]:FILTER_ADJ[DEFAULTS.filter],
    uniformityAdj:isBar?UNIFORMITY_ADJ[S.uniformity]:UNIFORMITY_ADJ[DEFAULTS.uniformity],
    humidity:isBar?S.humidity:airHumidity(),
    temp:isBar?S.airTemp:DEFAULTS.airTemp,
    feedbackOffset:0,
  });

  const gIdx=GRIND_MAX.findIndex(mx=>grind<=mx);
  const pos=suggested(grind);
  const moveTxt=moveText(t);
  const tone=moveTone();
  const color=tone||barColor(gIdx);
  const moveColor=tone||"var(--mid)";

  const ageHint=S.age<3?t.ageHints[0]:S.age<14?t.ageHints[1]:S.age<30?t.ageHints[2]:S.age<45?t.ageHints[3]:t.ageHints[4];
  const blendHint=hintFor("arabica",S.arabica,t);
  const tempHint=hintFor("waterTemp",S.waterTemp,t);
  const barHint=hintFor("machinebar",S.machinebar,t);
  const doseHint=hintFor("dose",S.dose,t);
  const humHint=hintFor("humidity",S.humidity,t);
  const airHint=hintFor("airTemp",S.airTemp,t);

  const html=`
  ${!S.onboarded?onboarding(t):""}
  ${S.openInfo?infoPanel(S.openInfo,t):""}
  <div class="pinned">
  <div class="top">
    <div class="brand-wrap">
      <span class="brand">Macinino<svg class="brand-mark" width="17" height="17" viewBox="0 0 64 64" aria-hidden="true">
        <g transform="rotate(40 32 32)">
          <ellipse cx="32" cy="32" rx="18.7" ry="26.7" fill="${color}"/>
          <path d="M32 8.5Q23.5 32 32 55.5" stroke="#16181B" stroke-width="5.6" fill="none" stroke-linecap="round"/>
        </g>
      </svg></span>
      <span class="brand-sub">${esc(t.tagline)}</span>
    </div>
    <div class="mode-seg">
      <button class="mode-btn" data-mode="casa" aria-pressed="${!isBar}">${esc(t.home)}</button>
      <button class="mode-btn" data-mode="bar"  aria-pressed="${isBar}">${esc(t.bar)}</button>
    </div>
  </div>

  ${anchor() ? `
  ${S.editing?`
  <div class="edit-row">
    <input class="edit-input" type="text" inputmode="decimal" id="posInput"
      value="${esc(S.posDraft)}" aria-label="${esc(t.editWhere)}">
    <span class="edit-unit">${esc(unitPos(t))}</span>
    <button class="edit-x" data-editcancel aria-label="${esc(t.close)}">×</button>
  </div>
  <div class="move">${esc(t.editWhere)}</div>
  ` : `
  <div class="hero-row">
    <button class="hero-num" style="color:${color}" data-editpos
      aria-label="${esc(fmtPos(pos))} — ${esc(t.editWhere)}">${esc(fmtPos(pos))}<span class="hero-sup">${esc(unitPos(t))}</span></button>
    <button class="info-btn hero-i${S.howSeen?"":" pulse"}" data-info="comefunziona"
      aria-label="${esc(t.lblHow)} — ${esc(t.a11yInfo)}">i</button>
  </div>
  <div class="move" style="color:${moveColor}">${esc(moveTxt)}</div>
  `}
  ` : `
  <div class="hero-first">—<span class="hero-sup">
    <button class="info-btn${S.howSeen?"":" pulse"}" data-info="comefunziona"
      aria-label="${esc(t.lblHow)} — ${esc(t.a11yInfo)}">i</button>
  </span></div>
  <div class="move">${esc(t.firstTime)}</div>
  <div class="first-hint">${esc(relativeHint(t))}</div>
  <div class="first-ask">
    <span class="first-lbl">${esc(t.usedWhat)}</span>
    <input class="pos-input" type="text" inputmode="decimal" id="posInput"
      value="${esc(S.posDraft)}" placeholder="${esc(t.usedHint)}"
      aria-label="${esc(t.usedWhat)}">
  </div>
  `}

  <div class="result-notes">
    ${reasons(t).map(r=>`<div class="note-line">${esc(r)}</div>`).join("")}
  </div>
  ${learnedLine(t)?`<div class="learned">${esc(learnedLine(t))}</div>`:""}
  </div>

  <div class="section">
    ${labelRow("metodo",t.lblMethod,t)}
    <div class="pills-wrap"><div class="pills" id="pills">
      ${METHODS.map(x=>`<button class="pill" data-method="${x.id}" aria-pressed="${S.method===x.id}">${esc(t.methods[x.id])}</button>`).join("")}
    </div></div>
  </div>

  <hr class="rule">

  ${!isBar?`
  <div class="section">
    ${labelRow("tostatura",t.lblRoast,t)}
    ${seg(ROAST_IDS.map(id=>[id,t.roasts[id]]),S.roast,"roast")}
  </div>

  <div class="section">
    ${labelRow("eta",t.lblAge,t)}
    ${stepper("age",S.age,"",S.ageKnown?ageHint:t.ageUnknownHint,t.lblAge,t,
      {shown:S.ageKnown?null:"—", disabled:!S.ageKnown,
       extra:`<button class="inline-toggle" data-ageknown aria-pressed="${!S.ageKnown}">${esc(S.ageKnown?t.ageUnknown:t.ageKnownBack)}</button>`})}
  </div>

  <div class="section">
    ${labelRow("aria",t.lblAir,t)}
    ${seg(AIR_IDS.map(id=>[id,t.airs[id]]),S.air,"air",airNote(t))}
  </div>
  `:`
  ${group("chicco",t.grpBean,t,`
    <div class="section">
      ${labelRow("tostatura",t.lblRoast,t)}
      ${seg(ROAST_IDS.map(id=>[id,t.roasts[id]]),S.roast,"roast")}
    </div>
    <div class="section">
      ${labelRow("lavorazione",t.lblProcessing,t)}
      ${seg(PROCESS_IDS.map(id=>[id,t.process[id]]),S.processing,"process")}
    </div>
    <div class="section">
      ${labelRow("arabica",t.lblBlend,t)}
      ${stepper("arabica",S.arabica,t.unitArabica,blendHint,t.lblBlend,t)}
    </div>
    <div class="section" style="margin-bottom:0">
      ${labelRow("eta",t.lblAge,t)}
      ${stepper("age",S.age,"",S.ageKnown?ageHint:t.ageUnknownHint,t.lblAge,t,
        {shown:S.ageKnown?null:"—", disabled:!S.ageKnown,
         extra:`<button class="inline-toggle" data-ageknown aria-pressed="${!S.ageKnown}">${esc(S.ageKnown?t.ageUnknown:t.ageKnownBack)}</button>`})}
    </div>
  `,isEsp)}

  ${isEsp?group("macchina",t.grpMachine,t,`
    <div class="section">
      ${labelRow("macchina",t.lblMachine,t)}
      ${stepper("machinebar",S.machinebar,t.unitBar,barHint,t.lblMachine,t)}
    </div>
    <div class="section" style="margin-bottom:0">
      ${labelRow("dose",t.lblDose,t)}
      ${stepper("dose",S.dose,t.unitG,doseHint,t.lblDose,t)}
    </div>
  `,isEsp):""}

  ${group("ambiente",t.grpRoom,t,`
    <div class="section">
      ${labelRow("ambienteumidita",t.lblAmbientHum,t)}
      ${stepper("humidity",S.humidity,"%",humHint,t.lblAmbientHum,t)}
    </div>
    <div class="section" style="margin-bottom:0">
      ${labelRow("ambientetemp",t.lblAmbientTemp,t)}
      ${stepper("airTemp",S.airTemp,t.unitC,airHint,t.lblAmbientTemp,t)}
    </div>
  `,isEsp)}

  ${group("acqua",t.grpWater,t,`
    <div class="section">
      ${labelRow("acqua",t.lblWater,t)}
      <div class="water-pills">
        ${WATER.map(w=>`<button class="wpill" data-water="${w.id}" aria-pressed="${S.water===w.id}">
          <span>${esc(t.waters[w.id])}</span><span class="ppm">${esc(w.ppm)}</span></button>`).join("")}
      </div>
    </div>
    <div class="section" style="margin-bottom:0">
      ${labelRow("acquatemp",t.lblWaterTemp,t)}
      ${stepper("waterTemp",S.waterTemp,t.unitC,tempHint,t.lblWaterTemp,t)}
    </div>
  `,isEsp)}

  ${group("macinatura",t.grpGrind,t,`
    <div class="section">
      ${labelRow("filtro",t.lblFilter,t)}
      ${seg(FILTER_IDS.map(id=>[id,t.filters[id]]),S.filter,"filter")}
    </div>
    <div class="section">
      ${labelRow("uniformita",t.lblUniformity,t)}
      ${seg(UNIFORMITY_IDS.map(id=>[id,t.uniformity[id]]),S.uniformity,"uniformity")}
    </div>
  `,isEsp)}
  `}

  <hr class="rule">

  ${group("feedback",t.lblFeedback,t,`
    ${(isBar&&isEsp)?`
    <div class="shot">
      ${S.shotKnown?`
      <div class="shot-grid">
        <div><span class="shot-lbl">${esc(t.lblShotTime)}</span>
          ${stepper("shotTime",S.shotTime,t.unitS,"",t.lblShotTime,t,{band:shotWindow()})}</div>
        <div><span class="shot-lbl">${esc(t.lblShotYield)}</span>
          ${stepper("shotYield",S.shotYield,t.unitG,"",t.lblShotYield,t)}</div>
      </div>
      <div class="shot-diag"${shotColor()?` style="color:${shotColor()}"`:""}>${shotDiagnosis(t)}</div>
      `:""}
      <button class="inline-toggle" data-shotknown aria-pressed="${S.shotKnown}">
        ${esc(S.shotKnown?t.shotOff:t.shotOn)}</button>
    </div>
    `:""}

    <div class="calib-panel">
      <div class="calib-head">
        <span class="calib-cap">${esc(anchor()?t.fbPrompt:t.fbFirst)}
          <button class="info-btn" data-info="feedback" aria-expanded="${S.openInfo==="feedback"}"
            aria-label="${esc(t.lblFeedback)} — ${esc(t.a11yInfo)}">i</button></span>
        ${anchor()?`<button class="fb-reset" data-fbreset>${esc(t.calibReset)}</button>`:""}
      </div>
      ${S.lastDiag?`<div class="calib-msg">${esc(S.lastDiag)}</div>`:""}
    </div>

    <div class="fb-row">
      ${FB_IDS.map(id=>`<button class="fb-btn fb-${id}" data-fb="${id}">
        <span class="fb-sign">${id==="sour"?"−2":id==="bitter"?"+2":"="}</span>
        <span class="fb-name">${esc(t.fbLabels[id])}</span>
      </button>`).join("")}
    </div>
  `,isEsp)}

  <div class="foot">
    <div class="foot-row">
    <div class="lang-pill">
      <button class="lang-btn" data-lang="it" aria-pressed="${S.lang==="it"}" aria-label="Italiano">IT</button>
      <button class="lang-btn" data-lang="en" aria-pressed="${S.lang==="en"}" aria-label="English">EN</button>
    </div>
    <a class="kofi" href="${KOFI}" target="_blank" rel="noopener noreferrer">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path class="kofi-steam" d="M6 3.4c0-.9 1-.9 1-1.8M9 3.4c0-.9 1-.9 1-1.8"
          stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
        <path d="M2.6 6h8.1v4a2.8 2.8 0 0 1-2.8 2.8H5.4A2.8 2.8 0 0 1 2.6 10V6Z"
          stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M10.9 7.2h1.3a1.7 1.7 0 0 1 0 3.4h-1.3"
          stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
      </svg>
      ${esc(t.kofi)}
    </a>
    </div>
    <div class="foot-claim">${esc(t.footClaim)}</div>
    <div class="foot-note">${esc(t.footNote)}</div>
    <div class="foot-copy">© 2026 Istante Labs · ${esc(t.rights)}</div>
  </div>`;

  const root=document.getElementById("root");
  const pills=document.getElementById("pills");
  const keepScroll=pills?pills.scrollLeft:0;
  /* Ricostruire l'albero azzera la posizione: per un istante il documento
     è vuoto e il browser riporta in cima. Va salvata e ripristinata. */
  const keepY=window.scrollY;
  root.innerHTML=html;
  const newPills=document.getElementById("pills");
  if(newPills){ newPills.scrollLeft=keepScroll; checkPillsEnd(); }
  // Qui si è fermi (evento di tocco), quindi ricalcolare è sicuro
  riduzione = null;               // il blocco è cambiato: la vecchia misura non vale più
  aggiornaLimite(); applicaCorsa();
  if(Math.abs(window.scrollY-keepY)>1) window.scrollTo(0,keepY);
}

/* ══ RIDUZIONE PROGRESSIVA DEL BLOCCO IN CIMA ══
   Il numero si rimpicciolisce scorrendo e si assesta come riga compatta.
   Quattro difese, ognuna corrispondente a un difetto realmente osservato:

   1. La corsa è ancorata a RUN, una soglia FISSA in pixel. Se dipendesse
      dallo scorrimento massimo si innescherebbe un ciclo, perché la
      riduzione accorcia la pagina e quindi cambia lo scorrimento massimo.

   2. Il limite tMax impedisce alla riduzione di consumare lo scorrimento
      che la governa: t·RUN deve restare sotto lo scorrimento residuo.

   3. La misura della riduzione muta temporaneamente la pagina, quindi si
      fa UNA VOLTA per larghezza di schermo e ripristina la posizione.
      Farla durante lo scorrimento causava lo sfarfallio.

   4. Il limite può salire sempre, ma scendere solo da fermi in cima: su
      Safari la barra degli indirizzi si ritira scorrendo e cambia
      l'altezza della finestra, e ricalcolare in quel momento farebbe
      ricrescere l'intestazione sotto le dita. */

const RUN = 80;        // px di scorrimento su cui si distribuisce la corsa
const MARGINE = 20;    // scorrimento che deve restare libero a fine corsa
let tMax = 0, tCorrente = -1, rafAttesa = false;
let riduzione = null, larghezzaMisurata = -1;

function misuraRiduzione(){
  const root = document.documentElement;
  if(!document.querySelector(".pinned")) return;
  const y = window.scrollY;
  const salva = root.style.getPropertyValue("--t");
  root.style.setProperty("--t","0"); const esteso  = root.scrollHeight;
  root.style.setProperty("--t","1"); const compatto = root.scrollHeight;
  root.style.setProperty("--t", salva || "0");
  if(window.scrollY !== y) window.scrollTo(0, y);
  riduzione = Math.max(1, esteso - compatto);
  larghezzaMisurata = window.innerWidth;
}

function aggiornaLimite(){
  /* Il contenuto del blocco cambia parecchio fra i suoi stati — prima volta
     con un metodo, posizione nota, motivi presenti o assenti — e con esso
     cambia di quanto si riduce. Misurare una volta sola bastava quando il
     blocco era fisso; ora va rimisurato a ogni ridisegno. Non durante lo
     scorrimento: lì è proprio la misura a causare lo sfarfallio. */
  if(riduzione === null || window.innerWidth !== larghezzaMisurata) misuraRiduzione();
  if(riduzione === null) return;
  const tOra = tCorrente > 0 ? tCorrente : 0;
  const esteso = document.documentElement.scrollHeight + riduzione * tOra;
  const scorrimento = Math.max(0, esteso - window.innerHeight);
  let m = (scorrimento - MARGINE) / (RUN + riduzione);
  m = Math.max(0, Math.min(1, m));
  if(m < 0.12) m = 0;              // corsa impercettibile: meglio ferma
  if(m > tMax || window.scrollY < 4) tMax = m;
  if(tCorrente > tMax) tCorrente = -1;
}

function applicaCorsa(){
  rafAttesa = false;
  const t = Math.max(0, Math.min(tMax, window.scrollY / RUN));
  if(Math.abs(t - tCorrente) < 0.004) return;
  tCorrente = t;
  document.documentElement.style.setProperty("--t", t.toFixed(3));
}

window.addEventListener("scroll", () => {
  if(rafAttesa) return;
  rafAttesa = true;
  requestAnimationFrame(applicaCorsa);
}, {passive:true});

/* I font locali arrivano dopo il primo disegno: misurare prima che siano
   pronti darebbe una riduzione sbagliata, perché cambiano le altezze. */
if(document.fonts && document.fonts.ready){
  document.fonts.ready.then(() => {
    riduzione = null; aggiornaLimite(); applicaCorsa();
  });
}

let attesaRidimensiona = null;
window.addEventListener("resize", () => {
  clearTimeout(attesaRidimensiona);
  attesaRidimensiona = setTimeout(() => { aggiornaLimite(); applicaCorsa(); }, 180);
});

function checkPillsEnd(){
  const el=document.getElementById("pills");
  if(!el) return;
  const atEnd=el.scrollLeft+el.clientWidth>=el.scrollWidth-2;
  el.parentElement.classList.toggle("at-end",atEnd);
}

/* ─────────────── INTERAZIONE ─────────────── */
document.addEventListener("click",e=>{
  const el=e.target.closest("[data-info],[data-lang],[data-mode],[data-method],[data-roast],"+
    "[data-process],[data-water],[data-filter],[data-uniformity],[data-ageknown],"+
    "[data-shotknown],"+
    "[data-fb],[data-fbreset],[data-grp],[data-air],[data-skipnotches],[data-startapp],[data-infoclose],[data-infostop],[data-editpos],[data-editcancel],[data-onbnext],[data-onbback]");
  if(!el) return;
  const d=el.dataset;

  if("info" in d && d.info==="comefunziona" && !S.howSeen){
    /* Il richiamo serve solo finché l'utente non l'ha capito: dopo il primo
       tocco si spegne per sempre, altrimenti da invito diventa fastidio. */
    return set({openInfo:S.openInfo===d.info?null:d.info, howSeen:true});
  }
  if("info" in d)        return set({openInfo:S.openInfo===d.info?null:d.info},{persist:false});
  if("lang" in d)        return set({lang:d.lang});
  if("mode" in d){
    // La calibrazione ha senso solo in Bar: passando a Casa si spegne,
    // non deve restare accesa senza che l'interfaccia la mostri più.
    const patch = {mode:d.mode};
    return set(patch);
  }
  if("method" in d)      return set({method:d.method});
  if("roast" in d)       return set({roast:d.roast});
  if("process" in d)     return set({processing:d.process});
  if("water" in d)       return set({water:d.water});
  if("filter" in d)      return set({filter:d.filter});
  if("uniformity" in d)  return set({uniformity:d.uniformity});
  if("ageknown" in d)    return set({ageKnown:!S.ageKnown});
  if("shotknown" in d)   return set({shotKnown:!S.shotKnown, lastDiag:null});
  if("grp" in d)         return set({groups:{...S.groups,[d.grp]:!(S.groups[d.grp]===true)}});
  if("editpos" in d){
    /* Correzione a mano: serve quando si è girata la manopola senza passare
       dall'app, o quando la posizione ricordata non è più quella vera. */
    const a=anchor(); if(!a) return;
    return set({editing:true, posDraft:String(suggested(currentInternal())).replace(".",",")});
  }
  if("editcancel" in d){ annullando=false; return set({editing:false, posDraft:""}); }
  if("infostop" in d) return;                    // dentro la scheda: non chiude
  if("infoclose" in d) return set({openInfo:null});
  if("onbnext" in d) return set({onbStep:1});   // il valore è già in S.notches
  if("onbback" in d) return set({onbStep:0});
  if("skipnotches" in d) return set({notches:null, onboarded:true});
  if("startapp" in d){
    const el=document.getElementById("notchInput");
    const n=el?parseInt(el.value.replace(/[^0-9]/g,""),10):NaN;
    return set({notches:Number.isFinite(n)?clamp(n,2,300):null, onboarded:true});
  }
  if("air" in d) return set({air:d.air});
  if("fbreset" in d){
    const a={...S.anchors}; delete a[S.method];
    return set({anchors:a, lastDiag:null, posDraft:""});
  }
  if("fb" in d){
    const id=d.fb;
    const t=T[S.lang];
    const a=anchor();
    if(!a) return;                       // senza ancoraggio non c'è nulla da correggere

    const cur=currentInternal();
    const qui=suggested(cur);            // dove l'utente ha appena macinato
    const dir=id==="sour"?-1:id==="bitter"?1:0;
    const ts=timeSignal();

    /* Il tempo non aggiunge una correzione propria: modula quella del gusto.
       Senza tempo inserito il comportamento resta quello semplice. */
    let punti=FB_POINTS, msg=null;
    if(ts!==null && dir!==0){
      if(ts===0)        { punti=0; msg=t.diagGrindOk; }
      else if(ts===dir) { punti=FB_POINTS*2; msg=t.diagAgree; }
      else              { punti=0; msg=t.diagChannel; }
    }

    /* ── L'APPRENDIMENTO ──
       Se la stessa lamentela si ripete, il passo era troppo corto: si
       allarga. Se arriva quella opposta, si era esagerato: si stringe.
       Dopo tre o quattro caffè k descrive il macinino di chi lo usa. */
    let k=kFor();
    if(dir!==0 && a.lastFb){
      if(a.lastFb===id)                       k*=1.5;
      else if(a.lastFb!=="ok" && a.lastFb!==id) k*=0.6;
    }
    k=clamp(k,K_MIN,K_MAX);

    /* Nuova posizione: sempre almeno una tacca, altrimenti il consiglio
       sarebbe "muoviti di zero" e non servirebbe a niente. */
    let nuova=qui;
    if(punti!==0){
      let passo=punti*k;
      const minimo=(S.notches&&S.notches<=30)?0.5:1;
      if(Math.abs(passo)<minimo) passo=minimo;
      nuova=qui+dir*passo;
      nuova=(S.notches&&S.notches<=30)?Math.round(nuova*2)/2:Math.round(nuova);
      if(S.notches) nuova=clamp(nuova,1,S.notches);
    }

    announce(msg || (id==="sour"?t.adjSour:id==="ok"?t.adjOk:t.adjBitter));
    set({anchors:{...S.anchors,[S.method]:{
           pos:nuova, from:qui, internal:cur, k, lastFb:id, cond:snapshot()
         }},
         lastDiag:msg, groups:{...S.groups,feedback:true}});
    const fresh=document.querySelector(`[data-fb="${id}"]`);
    if(fresh){ fresh.classList.add("flash"); setTimeout(()=>fresh.classList.remove("flash"),500); }
    return;
  }
});

document.addEventListener("input",e=>{
  const el=e.target;
  if(el.id==="notchInput"){
    /* Salvato mentre si scrive: senza, tornando alla pagina precedente e
       poi avanti il campo si ricostruisce vuoto e il valore è perso. */
    const g=el.value.replace(/[^0-9]/g,"").slice(0,3);
    if(el.value!==g) el.value=g;
    const n=parseInt(g,10);
    S.notches=Number.isFinite(n)?clamp(n,2,300):null;
    return;
  }
  if(el.id==="posInput"){
    // La bozza resta libera mentre si digita: normalizzata solo all'uscita.
    // Qui NON si chiama render(): ricostruire il campo mentre ci si scrive
    // dentro fa perdere cursore e messa a fuoco. Si aggiorna solo la riga
    // del risultato, l'unica cosa che dipende da questo valore.
    const draft=el.value.replace(/[^0-9.,]/g,"").replace(",",".").slice(0,5);
    S.posDraft=draft;
    if(el.value!==draft) el.value=draft;
    saveSoon();
  }
},true);

/* Confermando il campo "ho usato" nasce l'ancoraggio: da questo momento
   l'app parla nella scala di chi la usa, non più nella propria. */
function commitPos(){
  const n=parseFloat(String(S.posDraft).replace(",","."));
  if(!Number.isFinite(n) || n<=0){ set({posDraft:"", editing:false}); return; }
  const grezzo=S.notches?clamp(n,1,S.notches):clamp(n,1,999);
  /* Mezze tacche solo dove hanno senso: su una scala da cento non esistono,
     e accettarle vorrebbe dire memorizzare un valore diverso da quello mostrato. */
  const fine=(S.notches&&S.notches<=30)||!S.notches;
  const lim=fine?Math.round(grezzo*2)/2:Math.round(grezzo);
  const a=anchor();
  /* Correggendo a mano si riscrive dove sei, ma NON si butta via il passo
     appreso: quello descrive il macinino, non la posizione. */
  set({anchors:{...S.anchors,[S.method]:{
         pos:lim, from:lim, internal:currentInternal(),
         k:a?a.k:kFor(), lastFb:null, cond:snapshot()
       }}, posDraft:"", editing:false});
}
/* Toccando la × il campo perde il fuoco PRIMA che il tocco venga registrato
   come clic: senza questa bandiera il valore verrebbe confermato lo stesso e
   "annulla" non annullerebbe nulla. Si alza al primo evento di puntamento,
   che precede sempre la perdita di fuoco. */
let annullando=false;
document.addEventListener("pointerdown",e=>{
  if(e.target.closest?.("[data-editcancel]")) annullando=true;
},true);
document.addEventListener("blur",e=>{
  if(e.target.id!=="posInput") return;
  if(annullando){ annullando=false; return; }
  commitPos();
},true);
document.addEventListener("keydown",e=>{
  if(e.target.id==="posInput" && e.key==="Enter"){ e.preventDefault(); e.target.blur(); }
  if(e.key==="Escape"){
    if(S.openInfo) return set({openInfo:null});
    if(S.editing){ annullando=true; return set({editing:false, posDraft:""}); }
  }
},true);

document.addEventListener("scroll",e=>{
  if(e.target.id==="pills") checkPillsEnd();
},true);

window.addEventListener("resize",checkPillsEnd);

/* ── PRESSIONE PROLUNGATA ──────────────────────────────────────────
   Un tocco singolo fa un passo. Tenendo premuto, dopo una breve pausa
   parte la ripetizione a cadenza crescente. Si aggiorna solo il
   contatore interessato più il risultato: nessun ridisegno dell'albero,
   altrimenti il pulsante sotto il dito verrebbe distrutto. */
let holdTimer=null, holdCount=0;

function applyNudge(key,dir){
  const r=RANGES[key];
  if(!r) return false;
  const prev=S[key];
  // arrotondamento a un decimale: evita la deriva dei passi da 0,5
  const next=clamp(Math.round((prev+dir*r.step)*10)/10, r.min, r.max);
  if(next===prev) return false;
  S[key]=next;
  paintStepper(key);
  paintResult();
  saveSoon();
  return true;
}

function paintStepper(key){
  if(key==="shotTime"||key==="shotYield"){
    const d=document.querySelector(".shot-diag");
    if(d){
      d.textContent=shotDiagnosis(T[S.lang]);
      d.style.color=shotColor()||"";
    }
    const n=document.querySelector('.stp[data-for="shotTime"] .stp-num');
    if(n) n.style.color=shotColor()||"";
  }
  const box=document.querySelector(`.stp[data-for="${key}"]`);
  if(!box) return;
  const r=RANGES[key], v=S[key], t=T[S.lang];
  const num=box.querySelector(".stp-num");
  if(num) num.textContent=fmt(v);
  const hint=box.querySelector(".stp-hint");
  const h=hintFor(key,v,t);
  if(hint&&h) hint.textContent=h;
  const pct=((v-r.min)/(r.max-r.min))*100;
  const fill=box.querySelector(".stp-fill");
  if(fill) fill.style.width=pct+"%";
  const knob=box.querySelector(".stp-knob");
  if(knob) knob.style.left=pct+"%";
  const menoBtn=box.querySelector('[data-dir="-1"]');
  const piuBtn=box.querySelector('[data-dir="1"]');
  if(menoBtn) menoBtn.disabled = v<=r.min;
  if(piuBtn)  piuBtn.disabled  = v>=r.max;
}

function stopHold(){
  clearTimeout(holdTimer);
  holdTimer=null; holdCount=0;
}

function startHold(key,dir){
  stopHold();
  if(!applyNudge(key,dir)) return;
  holdTimer=setTimeout(function ripeti(){
    if(!applyNudge(key,dir)) return stopHold();
    holdCount++;
    holdTimer=setTimeout(ripeti, holdRate(holdCount));
  }, HOLD_DELAY);
}

/* La riga del feedback è un contenitore, non un <button> — un pulsante non
   può contenerne un altro, e la "i" deve restare accanto all'etichetta come
   in ogni altra sezione. Di conseguenza Invio e Spazio vanno gestiti a mano. */
document.addEventListener("keydown",e=>{
  if(e.key!=="Enter" && e.key!==" ") return;
  const g=e.target.closest?.("[data-grp]");
  if(g){ e.preventDefault(); const id=g.dataset.grp;
         return set({groups:{...S.groups,[id]:!(S.groups[id]===true)}}); }
});

document.addEventListener("pointerdown",e=>{
  const btn=e.target.closest("[data-nudge]");
  if(!btn || btn.disabled) return;
  e.preventDefault();               // niente selezione testo né menu contestuale
  btn.setPointerCapture?.(e.pointerId);
  startHold(btn.dataset.nudge, Number(btn.dataset.dir));
});
["pointerup","pointercancel","pointerleave","blur"].forEach(ev=>
  window.addEventListener(ev, stopHold, true));
document.addEventListener("contextmenu",e=>{
  if(e.target.closest("[data-nudge]")) e.preventDefault();
});

/* Tocco diretto sulla traccia: porta il valore dove hai toccato.
   Si ascolta "click" e non "pointerdown" perché il browser non emette
   click dopo uno scorrimento: la distinzione tocco/scorrimento è già
   risolta da lui. Nessun trascinamento, di proposito. */
document.addEventListener("click",e=>{
  const hit=e.target.closest(".stp-hit");
  if(!hit) return;
  const box=hit.closest(".stp");
  if(!box || box.dataset.off) return;            // contatore spento (data non nota)
  const key=box.dataset.for, r=RANGES[key];
  if(!r) return;
  const rect=hit.querySelector(".stp-track").getBoundingClientRect();
  if(!rect.width) return;
  const ratio=clamp((e.clientX-rect.left)/rect.width,0,1);
  const grezzo=r.min+ratio*(r.max-r.min);
  const val=clamp(Math.round(Math.round(grezzo/r.step)*r.step*10)/10, r.min, r.max);
  if(val===S[key]) return;
  S[key]=val;
  paintStepper(key);
  paintResult();
  saveSoon();
});

function announce(msg){
  const live=document.getElementById("live");
  if(live){ live.textContent=""; setTimeout(()=>{live.textContent=msg;},50); }
}

/* ─────────────── INSTALLAZIONE ─────────────── */
let deferredPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();
  deferredPrompt=e;
  if(!S.installDismissed) showInstallBar();
});
function showInstallBar(){
  const t=T[S.lang];
  if(document.querySelector(".install-bar")) return;
  const bar=document.createElement("div");
  bar.className="install-bar";
  bar.innerHTML=`<span class="install-txt">${esc(t.installTxt)}</span>
    <button class="install-go">${esc(t.installGo)}</button>
    <button class="install-x" aria-label="${esc(t.installNo)}">×</button>`;
  bar.querySelector(".install-go").addEventListener("click",async()=>{
    if(!deferredPrompt) return bar.remove();
    bar.remove();
    deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(()=>{});
    deferredPrompt=null;
  });
  bar.querySelector(".install-x").addEventListener("click",()=>{
    bar.remove(); set({installDismissed:true});
  });
  document.body.appendChild(bar);
}

/* ─────────────── AVVIO ─────────────── */
load();
render();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  });
}
