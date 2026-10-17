// LazyQ — translations.
// Add a language: copy the "en" block, translate the values, add it to LANGS.
// In HTML: <h1 data-i18n="hero_title"></h1>. In JS: t("key", { n: 3 }).

window.LANGS = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "tr", name: "Türkçe" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية", rtl: true },
];

window.STRINGS = {
  en: {
    nav_demo: "Try the demo",
    hero_title: "Queue without the queue.",
    hero_sub: "Scan once at the door, then wander. Your phone shows your place live and tells you when to come back. No app, no sign-up.",
    cta_primary: "See it working", cta_secondary: "For venues",
    how_title: "How it works",
    s1_t: "Scan the code", s1_d: "The code on the counter screen changes every 30 seconds, so only people who are actually here can join.",
    s2_t: "Go somewhere warm", s2_d: "Grab a coffee or browse nearby. Your place updates live on your phone.",
    s3_t: "Come back on time", s3_d: "We'll tell you when to head back, and again when it's your turn.",
    venues_title: "For venues",
    v1_t: "One press per customer", v1_d: "A physical button on the counter calls the next person. No typing, no logins in a rush.",
    v2_t: "No crowd at the door", v2_d: "The line moves off the pavement and into nearby cafés and shops.",
    v3_t: "Wait times that learn", v3_d: "Estimates come from how fast your counter really moves.",
    footer: "LazyQ prototype · Wise convenience challenge",
    venue_scan: "Scan to join the queue", venue_now: "Now serving", venue_idle: "Not started",
    venue_waiting: "{n} waiting · about {m} wait", venue_empty: "No queue — scan to join",
    join_joining: "Joining the queue…", join_expired: "That code has expired",
    join_expired_sub: "Codes change every few seconds so only people here can join. Scan the screen at the counter again.",
    join_error: "Couldn't reach the queue. Check your connection and scan again.",
    t_not_in: "You're not in a queue", t_not_in_sub: "Scan the QR code on the screen at the counter to join.",
    t_your_number: "Your number", t_ahead: "Ahead of you", t_turn_in: "Your turn in", t_now: "Now",
    t_roam: "Free to roam", t_roam_text: "You can be up to {m} walk away.",
    t_use_loc: "Use my location", t_finding: "Finding you…",
    t_distance: "You're about {m} walk away ({d} m).", t_loc_blocked: "Location blocked — we'll alert you based on time only.",
    t_alerts_btn: "Turn on sound alerts", t_alerts_on: "Sound alerts on ✓",
    t_leave: "Leave queue", t_leave_confirm: "Leave the queue? You'll lose your place.",
    t_footer: "Now serving {n} · keep this page open",
    st_waiting: "Waiting", st_headback: "Head back now", st_next: "You're next", st_called: "Your turn",
    h_waiting: "Relax — we'll tell you when to come back.", h_headback: "Start heading back to the venue.",
    h_next: "Make your way to the counter.", h_called: "Go to the counter now.",
    st_served: "Served", st_noshow: "Missed", st_left: "Left queue",
    h_served: "Thanks for queueing with us!", h_noshow: "You missed your turn. Scan the counter screen to rejoin.",
    min_lt1: "under a minute", min_1: "1 min", min_n: "{n} min",
    offline: "Reconnecting…",
    nav_ticket: "My ticket", t_example: "Example", t_sample: "This is what your ticket will look like. Scan the QR code at the counter to get your own.", t_discover: "Discover LazyQ",
    tr_joined: "You joined the queue", tr_ahead: "{n} ahead of you", tr_headback: "Head back to the venue",
    tr_next: "You're next", tr_turn: "Your turn at the counter", t_around: "Your turn around {time}",
    live_title: "Live at {venue}", live_serving: "Now serving", live_waiting: "Waiting", live_wait: "Wait",
  },

  es: {
    nav_demo: "Prueba la demo",
    hero_title: "Haz cola sin hacer cola.",
    hero_sub: "Escanea una vez en la puerta y date una vuelta. Tu móvil muestra tu turno en directo y te avisa cuándo volver. Sin app, sin registro.",
    cta_primary: "Míralo en acción", cta_secondary: "Para locales",
    how_title: "Cómo funciona",
    s1_t: "Escanea el código", s1_d: "El código de la pantalla cambia cada 30 segundos, así que solo puede unirse quien está aquí.",
    s2_t: "Ve a un sitio calentito", s2_d: "Tómate un café o mira tiendas cerca. Tu turno se actualiza en directo en tu móvil.",
    s3_t: "Vuelve a tiempo", s3_d: "Te avisamos cuándo volver, y otra vez cuando sea tu turno.",
    venues_title: "Para locales",
    v1_t: "Un botón por cliente", v1_d: "Un botón físico en el mostrador llama al siguiente. Sin escribir ni iniciar sesión en plena hora punta.",
    v2_t: "Sin aglomeraciones en la puerta", v2_d: "La cola sale de la acera y se reparte por cafés y tiendas cercanas.",
    v3_t: "Esperas que aprenden", v3_d: "Las estimaciones salen de la velocidad real de tu mostrador.",
    footer: "Prototipo de LazyQ · reto de conveniencia de Wise",
    venue_scan: "Escanea para unirte a la cola", venue_now: "Atendiendo al", venue_idle: "Sin empezar",
    venue_waiting: "{n} esperando · unos {m} de espera", venue_empty: "Sin cola: escanea para unirte",
    join_joining: "Uniéndote a la cola…", join_expired: "Ese código ha caducado",
    join_expired_sub: "Los códigos cambian cada pocos segundos para que solo pueda unirse quien está aquí. Vuelve a escanear la pantalla del mostrador.",
    join_error: "No se pudo conectar con la cola. Revisa tu conexión y vuelve a escanear.",
    t_not_in: "No estás en ninguna cola", t_not_in_sub: "Escanea el código QR de la pantalla del mostrador para unirte.",
    t_your_number: "Tu número", t_ahead: "Delante de ti", t_turn_in: "Tu turno en", t_now: "Ahora",
    t_roam: "Libre para pasear", t_roam_text: "Puedes alejarte hasta {m} a pie.",
    t_use_loc: "Usar mi ubicación", t_finding: "Buscándote…",
    t_distance: "Estás a unos {m} a pie ({d} m).", t_loc_blocked: "Ubicación bloqueada: te avisaremos solo según el tiempo.",
    t_alerts_btn: "Activar avisos con sonido", t_alerts_on: "Avisos con sonido activados ✓",
    t_leave: "Salir de la cola", t_leave_confirm: "¿Salir de la cola? Perderás tu sitio.",
    t_footer: "Atendiendo al {n} · mantén esta página abierta",
    st_waiting: "Esperando", st_headback: "Vuelve ya", st_next: "Eres el siguiente", st_called: "Es tu turno",
    h_waiting: "Tranquilo: te avisaremos cuándo volver.", h_headback: "Empieza a volver al local.",
    h_next: "Acércate al mostrador.", h_called: "Ve al mostrador ahora.",
    st_served: "Atendido", st_noshow: "Turno perdido", st_left: "Has salido",
    h_served: "¡Gracias por hacer cola con nosotros!", h_noshow: "Te perdiste tu turno. Escanea la pantalla del mostrador para volver a unirte.",
    min_lt1: "menos de un minuto", min_1: "1 min", min_n: "{n} min",
    offline: "Reconectando…",
    nav_ticket: "Mi ticket", t_example: "Ejemplo", t_sample: "Así se verá tu ticket. Escanea el código QR del mostrador para conseguir el tuyo.", t_discover: "Descubre LazyQ",
    tr_joined: "Te uniste a la cola", tr_ahead: "{n} delante de ti", tr_headback: "Vuelve al local",
    tr_next: "Eres el siguiente", tr_turn: "Tu turno en el mostrador", t_around: "Tu turno hacia las {time}",
    live_title: "En directo en {venue}", live_serving: "Atendiendo al", live_waiting: "Esperando", live_wait: "Espera",
  },

  fr: {
    nav_demo: "Essayer la démo",
    hero_title: "Faites la queue sans faire la queue.",
    hero_sub: "Scannez une fois à l'entrée, puis allez flâner. Votre téléphone affiche votre place en direct et vous dit quand revenir. Sans appli, sans inscription.",
    cta_primary: "Voir en action", cta_secondary: "Pour les établissements",
    how_title: "Comment ça marche",
    s1_t: "Scannez le code", s1_d: "Le code à l'écran change toutes les 30 secondes : seules les personnes sur place peuvent rejoindre la file.",
    s2_t: "Allez au chaud", s2_d: "Prenez un café ou flânez à proximité. Votre place se met à jour en direct sur votre téléphone.",
    s3_t: "Revenez à temps", s3_d: "On vous prévient quand revenir, puis quand c'est votre tour.",
    venues_title: "Pour les établissements",
    v1_t: "Un appui par client", v1_d: "Un bouton physique au comptoir appelle la personne suivante. Pas de saisie ni de connexion pendant le rush.",
    v2_t: "Plus de foule devant la porte", v2_d: "La file quitte le trottoir pour les cafés et boutiques voisins.",
    v3_t: "Des temps d'attente qui apprennent", v3_d: "Les estimations reflètent la vitesse réelle de votre comptoir.",
    footer: "Prototype LazyQ · défi « convenience » de Wise",
    venue_scan: "Scannez pour rejoindre la file", venue_now: "Numéro servi", venue_idle: "Pas encore commencé",
    venue_waiting: "{n} en attente · environ {m} d'attente", venue_empty: "Pas de file : scannez pour rejoindre",
    join_joining: "Vous rejoignez la file…", join_expired: "Ce code a expiré",
    join_expired_sub: "Les codes changent toutes les quelques secondes pour que seules les personnes sur place puissent rejoindre. Scannez à nouveau l'écran du comptoir.",
    join_error: "Impossible de joindre la file. Vérifiez votre connexion et scannez à nouveau.",
    t_not_in: "Vous n'êtes dans aucune file", t_not_in_sub: "Scannez le QR code affiché au comptoir pour rejoindre la file.",
    t_your_number: "Votre numéro", t_ahead: "Devant vous", t_turn_in: "Votre tour dans", t_now: "Maintenant",
    t_roam: "Libre de vous balader", t_roam_text: "Vous pouvez vous éloigner jusqu'à {m} à pied.",
    t_use_loc: "Utiliser ma position", t_finding: "Localisation…",
    t_distance: "Vous êtes à environ {m} à pied ({d} m).", t_loc_blocked: "Position bloquée : nous vous préviendrons uniquement selon le temps.",
    t_alerts_btn: "Activer les alertes sonores", t_alerts_on: "Alertes sonores activées ✓",
    t_leave: "Quitter la file", t_leave_confirm: "Quitter la file ? Vous perdrez votre place.",
    t_footer: "Numéro servi : {n} · gardez cette page ouverte",
    st_waiting: "En attente", st_headback: "Revenez maintenant", st_next: "Vous êtes le prochain", st_called: "C'est votre tour",
    h_waiting: "Détendez-vous : on vous dira quand revenir.", h_headback: "Commencez à revenir vers l'établissement.",
    h_next: "Dirigez-vous vers le comptoir.", h_called: "Allez au comptoir maintenant.",
    st_served: "Servi", st_noshow: "Tour manqué", st_left: "File quittée",
    h_served: "Merci d'avoir fait la queue avec nous !", h_noshow: "Vous avez manqué votre tour. Scannez l'écran du comptoir pour rejoindre à nouveau.",
    min_lt1: "moins d'une minute", min_1: "1 min", min_n: "{n} min",
    offline: "Reconnexion…",
    nav_ticket: "Mon ticket", t_example: "Exemple", t_sample: "Voici à quoi ressemblera votre ticket. Scannez le QR code au comptoir pour obtenir le vôtre.", t_discover: "Découvrir LazyQ",
    tr_joined: "Vous avez rejoint la file", tr_ahead: "{n} devant vous", tr_headback: "Revenez vers l'établissement",
    tr_next: "Vous êtes le prochain", tr_turn: "Votre tour au comptoir", t_around: "Votre tour vers {time}",
    live_title: "En direct à {venue}", live_serving: "Numéro servi", live_waiting: "En attente", live_wait: "Attente",
  },

  tr: {
    nav_demo: "Demoyu dene",
    hero_title: "Sırada bekle, ama sırada durma.",
    hero_sub: "Kapıda bir kez tara, sonra dilediğin yere git. Telefonun sıradaki yerini canlı gösterir ve ne zaman döneceğini söyler. Uygulama yok, üyelik yok.",
    cta_primary: "Nasıl çalıştığını gör", cta_secondary: "İşletmeler için",
    how_title: "Nasıl çalışır?",
    s1_t: "Kodu tara", s1_d: "Ekrandaki kod her 30 saniyede bir değişir; böylece yalnızca orada olanlar sıraya girebilir.",
    s2_t: "Sıcak bir yere geç", s2_d: "Bir kahve al ya da yakındaki dükkânları gez. Sıran telefonunda canlı güncellenir.",
    s3_t: "Zamanında dön", s3_d: "Dönme zamanı geldiğinde ve sıran geldiğinde sana haber veririz.",
    venues_title: "İşletmeler için",
    v1_t: "Her müşteri için tek basış", v1_d: "Tezgâhtaki fiziksel bir düğme sıradaki kişiyi çağırır. Yoğunlukta yazmak ya da giriş yapmak yok.",
    v2_t: "Kapıda kalabalık yok", v2_d: "Sıra kaldırımdan çıkıp yakındaki kafelere ve dükkânlara dağılır.",
    v3_t: "Öğrenen bekleme süreleri", v3_d: "Tahminler tezgâhının gerçek hızına göre hesaplanır.",
    footer: "LazyQ prototipi · Wise kolaylık yarışması",
    venue_scan: "Sıraya girmek için tara", venue_now: "Şu an sırada", venue_idle: "Henüz başlamadı",
    venue_waiting: "{n} kişi bekliyor · yaklaşık {m} bekleme", venue_empty: "Sıra yok — katılmak için tara",
    join_joining: "Sıraya giriliyor…", join_expired: "Bu kodun süresi doldu",
    join_expired_sub: "Kodlar birkaç saniyede bir değişir; böylece yalnızca burada olanlar katılabilir. Tezgâhtaki ekranı tekrar tara.",
    join_error: "Sıraya bağlanılamadı. Bağlantını kontrol edip tekrar tara.",
    t_not_in: "Herhangi bir sırada değilsin", t_not_in_sub: "Katılmak için tezgâhtaki ekrandaki QR kodu tara.",
    t_your_number: "Numaran", t_ahead: "Önündeki kişi", t_turn_in: "Sıranın gelmesine", t_now: "Şimdi",
    t_roam: "Gezmekte özgürsün", t_roam_text: "En fazla {m} yürüme mesafesine gidebilirsin.",
    t_use_loc: "Konumumu kullan", t_finding: "Konumun bulunuyor…",
    t_distance: "Yaklaşık {m} yürüme mesafesindesin ({d} m).", t_loc_blocked: "Konum engellendi — yalnızca süreye göre uyaracağız.",
    t_alerts_btn: "Sesli uyarıları aç", t_alerts_on: "Sesli uyarılar açık ✓",
    t_leave: "Sıradan çık", t_leave_confirm: "Sıradan çıkılsın mı? Yerini kaybedeceksin.",
    t_footer: "Şu an sırada: {n} · bu sayfayı açık tut",
    st_waiting: "Bekliyor", st_headback: "Şimdi dön", st_next: "Sıradaki sensin", st_called: "Sıra sende",
    h_waiting: "Rahatla — dönme zamanı gelince haber vereceğiz.", h_headback: "Mekâna doğru yola çık.",
    h_next: "Tezgâha doğru gel.", h_called: "Hemen tezgâha gel.",
    st_served: "Hizmet verildi", st_noshow: "Sıra kaçırıldı", st_left: "Sıradan çıkıldı",
    h_served: "Bizimle sıra beklediğin için teşekkürler!", h_noshow: "Sıranı kaçırdın. Tekrar katılmak için tezgâhtaki ekranı tara.",
    min_lt1: "bir dakikadan az", min_1: "1 dk", min_n: "{n} dk",
    offline: "Yeniden bağlanılıyor…",
    nav_ticket: "Biletim", t_example: "Örnek", t_sample: "Biletin böyle görünecek. Kendi biletini almak için tezgâhtaki QR kodu tara.", t_discover: "LazyQ'yu keşfet",
    tr_joined: "Sıraya girdin", tr_ahead: "Önünde {n} kişi var", tr_headback: "Mekâna geri dön",
    tr_next: "Sıradaki sensin", tr_turn: "Tezgâhta sıra sende", t_around: "Sıran yaklaşık {time} civarında",
    live_title: "{venue} şu an", live_serving: "Şu an sırada", live_waiting: "Bekleyen", live_wait: "Bekleme",
  },

  zh: {
    nav_demo: "试用演示",
    hero_title: "排队，不必站着排。",
    hero_sub: "在门口扫一次码，然后随意走走。手机实时显示你的排队位置，并提醒你何时回来。无需下载应用，无需注册。",
    cta_primary: "查看演示", cta_secondary: "商家合作",
    how_title: "使用方法",
    s1_t: "扫码", s1_d: "柜台屏幕上的二维码每 30 秒更新一次，只有在现场的人才能加入。",
    s2_t: "去暖和的地方等", s2_d: "喝杯咖啡或逛逛附近的小店，你的排队位置会在手机上实时更新。",
    s3_t: "准时回来", s3_d: "该回来时我们会提醒你，轮到你时会再提醒一次。",
    venues_title: "商家合作",
    v1_t: "每位顾客只需按一下", v1_d: "柜台上的实体按钮即可叫下一位。高峰时无需打字或登录。",
    v2_t: "门口不再拥挤", v2_d: "队伍离开人行道，分散到附近的咖啡馆和商店。",
    v3_t: "会学习的等候时间", v3_d: "预估时间根据柜台的实际服务速度计算。",
    footer: "LazyQ 原型 · Wise 便利挑战赛作品",
    venue_scan: "扫码加入排队", venue_now: "正在服务", venue_idle: "尚未开始",
    venue_waiting: "{n} 人等候 · 约需 {m}", venue_empty: "暂无排队 — 扫码加入",
    join_joining: "正在加入排队…", join_expired: "该二维码已过期",
    join_expired_sub: "二维码每隔几秒就会更新，确保只有在现场的人才能加入。请重新扫描柜台屏幕。",
    join_error: "无法连接排队系统。请检查网络后重新扫码。",
    t_not_in: "你目前不在任何队列中", t_not_in_sub: "扫描柜台屏幕上的二维码即可加入。",
    t_your_number: "你的号码", t_ahead: "前面还有", t_turn_in: "预计轮到你", t_now: "现在",
    t_roam: "可以自由走动", t_roam_text: "你最远可以走到步行 {m} 的地方。",
    t_use_loc: "使用我的位置", t_finding: "正在定位…",
    t_distance: "你距离这里约步行 {m}（{d} 米）。", t_loc_blocked: "无法获取位置 — 我们将仅根据时间提醒你。",
    t_alerts_btn: "开启声音提醒", t_alerts_on: "声音提醒已开启 ✓",
    t_leave: "离开队列", t_leave_confirm: "确定离开队列吗？你将失去当前位置。",
    t_footer: "正在服务 {n} 号 · 请保持此页面打开",
    st_waiting: "等候中", st_headback: "请开始返回", st_next: "下一位就是你", st_called: "轮到你了",
    h_waiting: "放松一下，该回来时我们会通知你。", h_headback: "请开始返回店铺。",
    h_next: "请前往柜台。", h_called: "请立即前往柜台。",
    st_served: "已服务", st_noshow: "已过号", st_left: "已离开",
    h_served: "感谢你耐心排队！", h_noshow: "你已过号。请扫描柜台屏幕重新加入。",
    min_lt1: "不到 1 分钟", min_1: "1 分钟", min_n: "{n} 分钟",
    offline: "正在重新连接…",
    nav_ticket: "我的号码票", t_example: "示例", t_sample: "这是你的号码票的样子。扫描柜台上的二维码即可获取你自己的号码票。", t_discover: "了解 LazyQ",
    tr_joined: "你已加入排队", tr_ahead: "前面还有 {n} 人", tr_headback: "返回店铺",
    tr_next: "下一位就是你", tr_turn: "轮到你去柜台", t_around: "预计 {time} 左右轮到你",
    live_title: "{venue} 实时情况", live_serving: "正在服务", live_waiting: "等候人数", live_wait: "等待时间",
  },

  ar: {
    nav_demo: "جرّب العرض",
    hero_title: "انتظر دورك دون الوقوف في الطابور.",
    hero_sub: "امسح الرمز مرة واحدة عند الباب ثم تجوّل بحرية. يعرض هاتفك مكانك في الطابور مباشرةً ويخبرك متى تعود. بلا تطبيق وبلا تسجيل.",
    cta_primary: "شاهده أثناء العمل", cta_secondary: "للمنشآت",
    how_title: "كيف يعمل",
    s1_t: "امسح الرمز", s1_d: "يتغيّر الرمز على شاشة الكاونتر كل 30 ثانية، لذا لا يمكن الانضمام إلا لمن هو موجود في المكان.",
    s2_t: "انتظر في مكان دافئ", s2_d: "تناول قهوة أو تجوّل في المتاجر القريبة. يتحدّث مكانك مباشرةً على هاتفك.",
    s3_t: "عُد في الوقت المناسب", s3_d: "سننبّهك عندما يحين وقت العودة، ومرة أخرى عندما يحين دورك.",
    venues_title: "للمنشآت",
    v1_t: "ضغطة واحدة لكل عميل", v1_d: "زر فعلي على الكاونتر يستدعي الشخص التالي. لا كتابة ولا تسجيل دخول وقت الزحام.",
    v2_t: "لا ازدحام عند الباب", v2_d: "ينتقل الطابور من الرصيف إلى المقاهي والمتاجر القريبة.",
    v3_t: "أوقات انتظار تتعلّم", v3_d: "تعتمد التقديرات على السرعة الفعلية للخدمة عند الكاونتر.",
    footer: "نموذج أولي لـ LazyQ · تحدي الراحة من Wise",
    venue_scan: "امسح الرمز للانضمام إلى الطابور", venue_now: "الرقم الحالي", venue_idle: "لم يبدأ بعد",
    venue_waiting: "{n} في الانتظار · حوالي {m} انتظار", venue_empty: "لا يوجد طابور — امسح الرمز للانضمام",
    join_joining: "جارٍ الانضمام إلى الطابور…", join_expired: "انتهت صلاحية هذا الرمز",
    join_expired_sub: "تتغيّر الرموز كل بضع ثوانٍ حتى لا ينضم إلا الموجودون هنا. امسح شاشة الكاونتر مرة أخرى.",
    join_error: "تعذّر الاتصال بالطابور. تحقّق من اتصالك وامسح الرمز مرة أخرى.",
    t_not_in: "أنت لست في أي طابور", t_not_in_sub: "امسح رمز QR الظاهر على شاشة الكاونتر للانضمام.",
    t_your_number: "رقمك", t_ahead: "أمامك", t_turn_in: "يحين دورك خلال", t_now: "الآن",
    t_roam: "حرّ في التجوّل", t_roam_text: "يمكنك الابتعاد حتى مسافة {m} سيرًا على الأقدام.",
    t_use_loc: "استخدم موقعي", t_finding: "جارٍ تحديد موقعك…",
    t_distance: "أنت على بُعد حوالي {m} سيرًا ({d} م).", t_loc_blocked: "الموقع محظور — سننبّهك بناءً على الوقت فقط.",
    t_alerts_btn: "تفعيل التنبيهات الصوتية", t_alerts_on: "التنبيهات الصوتية مفعّلة ✓",
    t_leave: "مغادرة الطابور", t_leave_confirm: "هل تريد مغادرة الطابور؟ ستفقد مكانك.",
    t_footer: "الرقم الحالي {n} · أبقِ هذه الصفحة مفتوحة",
    st_waiting: "في الانتظار", st_headback: "عُد الآن", st_next: "أنت التالي", st_called: "حان دورك",
    h_waiting: "استرخِ — سنخبرك متى تعود.", h_headback: "ابدأ بالعودة إلى المكان.",
    h_next: "توجّه إلى الكاونتر.", h_called: "توجّه إلى الكاونتر الآن.",
    st_served: "تمت الخدمة", st_noshow: "فاتك دورك", st_left: "غادرت الطابور",
    h_served: "شكرًا لانتظارك معنا!", h_noshow: "فاتك دورك. امسح شاشة الكاونتر للانضمام مجددًا.",
    min_lt1: "أقل من دقيقة", min_1: "دقيقة واحدة", min_n: "{n} دقيقة",
    offline: "جارٍ إعادة الاتصال…",
    nav_ticket: "تذكرتي", t_example: "مثال", t_sample: "هكذا ستبدو تذكرتك. امسح رمز QR عند الكاونتر للحصول على تذكرتك.", t_discover: "اكتشف LazyQ",
    tr_joined: "انضممت إلى الطابور", tr_ahead: "أمامك {n}", tr_headback: "عُد إلى المكان",
    tr_next: "أنت التالي", tr_turn: "حان دورك عند الكاونتر", t_around: "يحين دورك حوالي {time}",
    live_title: "مباشر في {venue}", live_serving: "الرقم الحالي", live_waiting: "في الانتظار", live_wait: "الانتظار",
  },
};

// ------------------------------------------------------------------ runtime
window.I18N = (() => {
  const KEY = "sq_lang";
  const supported = LANGS.map(l => l.code);
  const listeners = new Set();

  function detect() {
    try { const saved = localStorage.getItem(KEY); if (supported.includes(saved)) return saved; } catch {}
    for (const l of navigator.languages || [navigator.language || "en"]) {
      const c = (l || "").slice(0, 2).toLowerCase();
      if (supported.includes(c)) return c;
    }
    return "en";
  }

  let lang = detect();

  function t(key, vars = {}, l = lang) {
    const s = (STRINGS[l] && STRINGS[l][key]) || STRINGS.en[key] || key;
    return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
  }

  function apply(root = document) {
    const meta = LANGS.find(l => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = meta && meta.rtl ? "rtl" : "ltr";
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  }

  function set(l) {
    if (!supported.includes(l)) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch {}
    apply();
    listeners.forEach(fn => fn(l));
  }

  // Turn any <select> into the language picker
  function mount(select) {
    select.innerHTML = LANGS.map(l => `<option value="${l.code}">${l.name}</option>`).join("");
    select.value = lang;
    select.onchange = () => set(select.value);
  }

  function mins(sec, l = lang) {
    const m = Math.max(0, Math.round(sec / 60));
    return m < 1 ? t("min_lt1", {}, l) : m === 1 ? t("min_1", {}, l) : t("min_n", { n: m }, l);
  }

  document.addEventListener("DOMContentLoaded", () => apply());
  return { t, set, mount, mins, apply, onChange: fn => listeners.add(fn), get lang() { return lang; } };
})();

window.t = (k, v) => I18N.t(k, v);
