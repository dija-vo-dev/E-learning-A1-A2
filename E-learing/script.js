/* ============ LingoLeap — script.js ============ */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

  /* ---------------- DATA ---------------- */
  const DECKS = {
    A1: [
      { id: "greetings", title: "Greetings", emoji: "👋", cards: [
        { w: "hello", e: "👋", d: "a word you say when you meet someone", x: "Hello! How are you?" },
        { w: "goodbye", e: "🙋", d: "a word you say when you leave", x: "Goodbye! See you tomorrow." },
        { w: "please", e: "🙏", d: "a polite word when you ask for something", x: "Can I have some water, please?" },
        { w: "thank you", e: "💐", d: "what you say when someone helps you", x: "Thank you for your help!" },
        { w: "sorry", e: "😔", d: "what you say when you make a mistake", x: "Sorry, I am late." },
        { w: "good morning", e: "🌅", d: "what you say in the morning", x: "Good morning, class!" }
      ]},
      { id: "family", title: "Family", emoji: "👨‍👩‍👧", cards: [
        { w: "mother", e: "👩", d: "the woman who is your parent", x: "My mother is a nurse." },
        { w: "father", e: "👨", d: "the man who is your parent", x: "My father works in a bank." },
        { w: "sister", e: "👧", d: "a girl with the same parents as you", x: "I have one little sister." },
        { w: "brother", e: "👦", d: "a boy with the same parents as you", x: "My brother is ten years old." },
        { w: "grandmother", e: "👵", d: "the mother of your mother or father", x: "My grandmother makes great cakes." },
        { w: "grandfather", e: "👴", d: "the father of your mother or father", x: "My grandfather tells funny stories." }
      ]},
      { id: "food", title: "Food & Drink", emoji: "🍎", cards: [
        { w: "apple", e: "🍎", d: "a round fruit, red or green", x: "I eat an apple every day." },
        { w: "bread", e: "🍞", d: "a food made from flour, baked in an oven", x: "We buy fresh bread in the morning." },
        { w: "water", e: "💧", d: "the clear liquid that you drink", x: "Can I have a glass of water, please?" },
        { w: "milk", e: "🥛", d: "the white drink that comes from cows", x: "She drinks milk with her tea." },
        { w: "egg", e: "🥚", d: "a small round food from a chicken", x: "I have an egg for breakfast." },
        { w: "cheese", e: "🧀", d: "a yellow or white food made from milk", x: "Pizza has a lot of cheese." }
      ]},
      { id: "colors", title: "Colours", emoji: "🎨", cards: [
        { w: "red", e: "🔴", d: "the colour of fire and strawberries", x: "Her bike is red." },
        { w: "blue", e: "🔵", d: "the colour of the sky", x: "He wears a blue shirt." },
        { w: "green", e: "🟢", d: "the colour of grass", x: "The garden is green in spring." },
        { w: "yellow", e: "🟡", d: "the colour of the sun", x: "Bananas are yellow." },
        { w: "black", e: "⚫", d: "the darkest colour, like the night", x: "The cat is black." },
        { w: "white", e: "⚪", d: "the colour of snow and milk", x: "The walls are white." }
      ]},
      { id: "verbs", title: "Everyday Verbs", emoji: "🏃", cards: [
        { w: "eat", e: "🍽️", d: "to put food in your mouth", x: "We eat dinner at seven." },
        { w: "drink", e: "🥤", d: "to take water into your mouth", x: "I drink tea in the morning." },
        { w: "sleep", e: "😴", d: "to rest with your eyes closed", x: "The baby sleeps a lot." },
        { w: "walk", e: "🚶", d: "to move on your feet, not fast", x: "They walk to school together." },
        { w: "read", e: "📖", d: "to look at words and understand them", x: "She reads a book every week." },
        { w: "play", e: "⚽", d: "to have fun with games or sports", x: "The children play in the park." }
      ]},
      { id: "numbers", title: "Numbers", emoji: "🔢", cards: [
        { w: "one", e: "1️⃣", d: "the number 1", x: "I have one sister." },
        { w: "two", e: "2️⃣", d: "the number 2", x: "There are two chairs." },
        { w: "three", e: "3️⃣", d: "the number 3", x: "He eats three apples." },
        { w: "five", e: "5️⃣", d: "the number 5", x: "The lesson is five minutes long." },
        { w: "ten", e: "🔟", d: "the number 10", x: "She counts to ten." },
        { w: "first", e: "🥇", d: "number one in a line or race", x: "She is first in the race." }
      ]}
    ],
    A2: [
      { id: "weather", title: "Weather", emoji: "🌦️", cards: [
        { w: "sunny", e: "☀️", d: "with a lot of sun", x: "It is sunny at the beach." },
        { w: "rainy", e: "🌧️", d: "with a lot of rain", x: "Take an umbrella, it is rainy today." },
        { w: "cloudy", e: "☁️", d: "with a lot of clouds", x: "It is cloudy this morning." },
        { w: "windy", e: "🌬️", d: "with a lot of wind", x: "It is too windy for a picnic." },
        { w: "snowy", e: "❄️", d: "with a lot of snow", x: "The mountains are snowy in winter." },
        { w: "stormy", e: "⛈️", d: "with a storm, thunder and rain", x: "The sea is dangerous when it is stormy." }
      ]},
      { id: "travel", title: "Travel", emoji: "🧳", cards: [
        { w: "airport", e: "✈️", d: "the place where planes take off", x: "We arrive at the airport at noon." },
        { w: "ticket", e: "🎫", d: "the paper you need to travel", x: "I bought a train ticket online." },
        { w: "passport", e: "🛂", d: "the small book you need to visit other countries", x: "Don't forget your passport!" },
        { w: "luggage", e: "🧳", d: "the bags you take on a trip", x: "My luggage is very heavy." },
        { w: "hotel", e: "🏨", d: "a place where you pay to sleep when travelling", x: "The hotel is near the beach." },
        { w: "map", e: "🗺️", d: "a picture that shows you places and roads", x: "Look at the map — where are we?" }
      ]},
      { id: "feelings", title: "Feelings", emoji: "😊", cards: [
        { w: "happy", e: "😄", d: "feeling good, with a smile", x: "I am happy to see you!" },
        { w: "tired", e: "🥱", d: "wanting to sleep", x: "She is tired after work." },
        { w: "hungry", e: "😋", d: "wanting to eat", x: "I'm hungry — let's have lunch!" },
        { w: "excited", e: "🤩", d: "very happy about something coming", x: "The kids are excited about the trip." },
        { w: "worried", e: "😟", d: "thinking about problems, not relaxed", x: "He is worried about the test." },
        { w: "proud", e: "😌", d: "happy about something you did well", x: "Her parents are proud of her." }
      ]},
      { id: "jobs", title: "Jobs", emoji: "🧑‍🏫", cards: [
        { w: "teacher", e: "🧑‍🏫", d: "a person who helps people learn", x: "Our teacher is very funny." },
        { w: "doctor", e: "🩺", d: "a person who helps sick people", x: "You should see a doctor." },
        { w: "nurse", e: "💉", d: "a person who cares for patients", x: "The nurse is very kind." },
        { w: "driver", e: "🚌", d: "a person who drives a car or bus", x: "The bus driver knows every street." },
        { w: "cook", e: "🧑‍🍳", d: "a person who prepares food", x: "My uncle is a cook in a big hotel." },
        { w: "police officer", e: "👮", d: "a person who keeps people safe", x: "Ask the police officer for help." }
      ]},
      { id: "house", title: "In the House", emoji: "🏡", cards: [
        { w: "kitchen", e: "🍳", d: "the room where you cook food", x: "Dinner is ready in the kitchen!" },
        { w: "bedroom", e: "🛏️", d: "the room where you sleep", x: "My bedroom is small but cosy." },
        { w: "bathroom", e: "🛁", d: "the room with a shower or bath", x: "The bathroom is upstairs." },
        { w: "garden", e: "🌷", d: "the green place next to a house", x: "We grow tomatoes in the garden." },
        { w: "window", e: "🪟", d: "the glass in a wall to look outside", x: "Open the window, please." },
        { w: "door", e: "🚪", d: "the thing you open to go into a room", x: "Knock on the door first." }
      ]}
    ]
  };

  const GRAMMAR = {
    A1: [
      { title: 'The verb "to be"', emoji: "🧩",
        points: ["I → am", "you / we / they → are", "he / she / it → is"],
        examples: ["I am a student.", "You are my friend.", "She is at home."],
        tip: "Short forms: I'm, you're, he's, it's, we're, they're." },
      { title: "Articles: a and an", emoji: "🍎",
        points: ["a + consonant sound → a cat, a book", "an + vowel sound → an apple, an egg", "Use 'the' when both people know the thing"],
        examples: ["I have a dog.", "She eats an orange.", "Close the door, please."],
        tip: "Listen to the sound, not the letter: an hour — a university." },
      { title: "Plurals", emoji: "🐈",
        points: ["Most nouns: + s → cats, books", "Nouns in -s, -sh, -ch, -x: + es → buses, boxes", "Irregular: child → children, man → men"],
        examples: ["There are three cats here.", "Two buses stop here."],
        tip: "Some words never change: one fish, two fish." },
      { title: "Present simple", emoji: "⏰",
        points: ["he / she / it → verb + s", "Negative: don't / doesn't + verb", "Questions: Do ...? / Does ...?"],
        examples: ["He plays tennis on Sundays.", "I don't like coffee.", "Does she live here?"],
        tip: "Time words: every day, usually, always, sometimes." },
      { title: "Can and can't", emoji: "💪",
        points: ["can = it is possible for you", "No 's' for he / she / it", "Negative: can't"],
        examples: ["I can swim very well.", "She can't drive yet.", "Can you help me?"] }
    ],
    A2: [
      { title: "Past simple", emoji: "⏪",
        points: ["Regular verbs: + ed → played, watched", "Irregular: go → went, see → saw, eat → ate", "Negative: didn't + verb"],
        examples: ["We watched a film yesterday.", "I didn't go to the party."],
        tip: "Time words: yesterday, last week, two days ago." },
      { title: "Comparatives", emoji: "⚖️",
        points: ["Short adjectives: + er → taller, faster", "Long adjectives: more + adjective", "Irregular: good → better, bad → worse"],
        examples: ["Tom is taller than his dad.", "This book is more interesting than the film."],
        tip: "Don't forget 'than' after a comparative." },
      { title: "Going to (future)", emoji: "🗓️",
        points: ["am / is / are + going to + verb", "Use it for plans"],
        examples: ["I'm going to study tonight.", "They are going to travel in July."] },
      { title: "Some and any", emoji: "🥛",
        points: ["some → positive sentences", "any → negatives and questions"],
        examples: ["There are some eggs in the fridge.", "There isn't any milk.", "Do you have any brothers or sisters?"] },
      { title: "Present perfect", emoji: "🧭",
        points: ["have / has + past participle", "Use it for life experiences", "ever / never / just / already"],
        examples: ["I have visited London twice.", "She has never eaten sushi.", "We have just arrived."],
        tip: "'I have been to Rome' (experience) vs 'I went in 2020' (finished time)." }
    ]
  };

  const QUIZ = {
    A1: [
      { q: "___ name is Anna.", opts: ["My", "I", "Me", "Mine"], a: 0 },
      { q: "She ___ a teacher.", opts: ["am", "is", "are", "be"], a: 1 },
      { q: "I have ___ apple.", opts: ["a", "an", "two", "any"], a: 1 },
      { q: 'What is the plural of "child"?', opts: ["childs", "childes", "children", "childrens"], a: 2 },
      { q: "They ___ from Spain.", opts: ["is", "am", "are", "be"], a: 2 },
      { q: "He ___ football every day.", opts: ["play", "plays", "playing", "played"], a: 1 },
      { q: "I can ___ English.", opts: ["speaks", "speaking", "speak", "spoke"], a: 2 },
      { q: "We ___ got a big house.", opts: ["has", "have", "are", "is"], a: 1 },
      { q: "___ you like coffee?", opts: ["Do", "Does", "Are", "Is"], a: 0 },
      { q: "Today is Monday. Tomorrow is ___.", opts: ["Sunday", "Tuesday", "Friday", "Yesterday"], a: 1 },
      { q: 'The opposite of "big" is ___.', opts: ["tall", "small", "long", "hot"], a: 1 },
      { q: "There ___ two cats in the garden.", opts: ["is", "are", "am", "be"], a: 1 }
    ],
    A2: [
      { q: "Yesterday I ___ to the cinema.", opts: ["go", "goes", "went", "gone"], a: 2 },
      { q: "This film is ___ than the book.", opts: ["interesting", "more interesting", "most interesting", "interestinger"], a: 1 },
      { q: "There isn't ___ milk in the fridge.", opts: ["some", "any", "a", "many"], a: 1 },
      { q: "We are going ___ visit our grandma.", opts: ["for", "to", "at", "in"], a: 1 },
      { q: "She has lived here ___ 2019.", opts: ["for", "since", "from", "at"], a: 1 },
      { q: "I have never ___ sushi.", opts: ["eat", "ate", "eats", "eaten"], a: 3 },
      { q: "You ___ smoke in a hospital. It is not allowed.", opts: ["must", "mustn't", "can", "should"], a: 1 },
      { q: 'The comparative of "good" is ___.', opts: ["gooder", "best", "better", "more good"], a: 2 },
      { q: "While I ___ TV, the phone rang.", opts: ["watch", "watched", "was watching", "am watching"], a: 2 },
      { q: "If it rains tomorrow, we ___ at home.", opts: ["stay", "stayed", "will stay", "staying"], a: 2 },
      { q: "He drives ___ than his brother.", opts: ["careful", "more carefully", "most carefully", "carefully"], a: 1 },
      { q: "I'm really looking forward ___ the holidays.", opts: ["at", "for", "to", "on"], a: 2 }
    ]
  };

  const BADGES = [
    { xp: 50, icon: "🥉", name: "First Steps" },
    { xp: 150, icon: "🥈", name: "Word Hunter" },
    { xp: 300, icon: "🥇", name: "Grammar Star" },
    { xp: 600, icon: "🏆", name: "English Hero" }
  ];
  const PRAISE = ["Nice one! 🎉", "Great job! ⭐", "Perfect! ✅", "You got it! 💪", "Brilliant! 🌟"];

  /* ---------------- STATE ---------------- */
  let level = localStorage.getItem("ll-level") || "A1";
  let xp = parseInt(localStorage.getItem("ll-xp") || "0", 10);
  let streak = 0;
  let currentTab = "words";
  let modalOpen = false;
  let wotdCard = null;
  const quiz = { list: [], i: 0, score: 0, answered: false, done: false };
  const scr = { word: "", def: "", emoji: "", letters: [], used: [], solved: false };
  const lis = { card: null, mode: "word", solved: false };
  const study = { deck: null, i: 0 };

  const levelDecks = () => DECKS[level];
  const allCards = () => levelDecks().flatMap((d) => d.cards);

  /* ---------------- SPEECH ---------------- */
  function speak(text, rate = 1) {
    if (!("speechSynthesis" in window)) { showToast("Sorry, no audio in this browser", "bad"); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    const v = speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith("en"));
    if (v) u.voice = v;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".spk[data-say]");
    if (b) { e.stopPropagation(); speak(b.dataset.say, parseFloat(b.dataset.rate || 1)); }
  });

  /* ---------------- TOAST & CONFETTI ---------------- */
  let toastTimer;
  function showToast(msg, type = "") {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast show " + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }
  function confettiBurst() {
    const c = $("#confetti");
    const colors = ["#ffc63f", "#ff6b4a", "#149a5f", "#4d96ff", "#f652a0"];
    for (let i = 0; i < 90; i++) {
      const el = document.createElement("i");
      el.className = "cf";
      el.style.left = Math.random() * 100 + "vw";
      el.style.background = pick(colors);
      el.style.animationDuration = 2.2 + Math.random() * 1.8 + "s";
      el.style.animationDelay = Math.random() * 0.5 + "s";
      c.appendChild(el);
    }
    setTimeout(() => { c.innerHTML = ""; }, 4600);
  }

  /* ---------------- XP / BADGES / STREAK ---------------- */
  function addXP(n) {
    const prev = xp;
    xp += n;
    localStorage.setItem("ll-xp", xp);
    renderXP();
    const pill = $("#xpPill");
    pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump");
    BADGES.forEach((b) => { if (prev < b.xp && xp >= b.xp) showToast(`Badge unlocked: ${b.icon} ${b.name}!`, "good"); });
  }
  function renderXP() {
    $("#xpVal").textContent = xp;
    const next = BADGES.find((b) => xp < b.xp);
    let pct = 100, txt = "All badges! 🏆";
    if (next) {
      const prevXp = BADGES.filter((b) => b.xp <= xp).reduce((m, b) => b.xp, 0);
      pct = Math.min(100, Math.round(((xp - prevXp) / (next.xp - prevXp)) * 100));
      txt = `${xp} / ${next.xp} XP → ${next.icon}`;
    }
    $("#goalFill").style.width = pct + "%";
    $("#xpFill").style.width = pct + "%";
    $("#goalTxt").textContent = txt;
    $("#badges").innerHTML = BADGES.map((b) =>
      `<span class="badge ${xp >= b.xp ? "" : "locked"}" title="${b.name} — ${b.xp} XP">${b.icon}</span>`).join("");
  }
  function updateStreakUI() {
    $("#streakVal").textContent = streak;
    $("#scrStreak").textContent = "🔥 " + streak;
    $("#lisStreak").textContent = "🔥 " + streak;
  }

  /* ---------------- TABS ---------------- */
  document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
  function showTab(name) {
    currentTab = name;
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("show", p.id === "panel-" + name));
  }

  /* ---------------- WORD OF THE DAY ---------------- */
  function newWotd(random = false) {
    const cards = allCards();
    if (!random) {
      const day = Math.floor(Date.now() / 86400000);
      wotdCard = cards[day % cards.length];
    } else {
      let c; do { c = pick(cards); } while (cards.length > 1 && c === wotdCard);
      wotdCard = c;
    }
    $("#wotd").classList.remove("flipped");
    $("#wotdEmoji").textContent = wotdCard.e;
    $("#wotdWord").textContent = wotdCard.w;
    $("#wotdDef").textContent = wotdCard.d;
    $("#wotdEx").textContent = "“" + wotdCard.x + "”";
    $("#wotdSpeak").dataset.say = `${wotdCard.w}. ${wotdCard.x}`;
  }
  const flipWotd = () => $("#wotd").classList.toggle("flipped");
  $("#wotd").addEventListener("click", flipWotd);
  $("#wotd").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipWotd(); } });
  $("#wotdShuffle").addEventListener("click", () => newWotd(true));

  /* ---------------- DECKS & STUDY MODAL ---------------- */
  function renderDecks() {
    $("#deckGrid").innerHTML = levelDecks().map((d, i) => `
      <article class="deck-card" style="animation-delay:${i * 0.06}s">
        <span class="chip-lvl">${level}</span>
        <span class="deck-emoji">${d.emoji}</span>
        <h3>${d.title}</h3>
        <span class="deck-count">${d.cards.length} words</span>
        <button class="btn btn-accent" data-deck="${d.id}" type="button">Study →</button>
      </article>`).join("");
  }
  $("#deckGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-deck]");
    if (b) openStudy(b.dataset.deck);
  });
  function openStudy(id) {
    study.deck = levelDecks().find((d) => d.id === id);
    study.i = 0;
    modalOpen = true;
    $("#studyModal").classList.add("open");
    $("#studyModal").setAttribute("aria-hidden", "false");
    updateStudy();
  }
  function closeStudy() {
    modalOpen = false;
    $("#studyModal").classList.remove("open");
    $("#studyModal").setAttribute("aria-hidden", "true");
  }
  function updateStudy() {
    $("#studyFlip").classList.remove("flipped");
    const c = study.deck.cards[study.i];
    $("#studyCount").textContent = `${study.i + 1} / ${study.deck.cards.length}`;
    $("#studyEmoji").textContent = c.e;
    $("#studyWord").textContent = c.w;
    $("#studyDef").textContent = c.d;
    $("#studyEx").textContent = "“" + c.x + "”";
    $("#studySpeak").dataset.say = `${c.w}. ${c.x}`;
  }
  $("#studyClose").addEventListener("click", closeStudy);
  $("#studyModal").addEventListener("click", (e) => { if (e.target === $("#studyModal")) closeStudy(); });
  $("#studyFlip").addEventListener("click", () => $("#studyFlip").classList.toggle("flipped"));
  $("#studyFlipBtn").addEventListener("click", () => $("#studyFlip").classList.toggle("flipped"));
  $("#studyNext").addEventListener("click", () => { study.i = (study.i + 1) % study.deck.cards.length; updateStudy(); });
  $("#studyPrev").addEventListener("click", () => { study.i = (study.i - 1 + study.deck.cards.length) % study.deck.cards.length; updateStudy(); });

  /* ---------------- GRAMMAR ---------------- */
  function renderGrammar() {
    $("#grammarGrid").innerHTML = GRAMMAR[level].map((g, i) => `
      <article class="grammar-card" style="animation-delay:${i * 0.06}s">
        <header class="g-head"><span class="g-emoji">${g.emoji}</span><h3>${g.title}</h3></header>
        <ul class="g-points">${g.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        <div class="g-ex">${g.examples.map((x) =>
          `<p class="ex-row"><button class="spk mini" data-say="${x}" type="button" aria-label="Listen">🔊</button><span>${x}</span></p>`).join("")}
        </div>
        ${g.tip ? `<p class="g-tip">💡 ${g.tip}</p>` : ""}
      </article>`).join("");
  }

  /* ---------------- QUIZ ---------------- */
  function quizReset() {
    quiz.list = shuffle(QUIZ[level]);
    quiz.i = 0; quiz.score = 0; quiz.answered = false; quiz.done = false;
    renderQuiz();
  }
  function renderQuiz() {
    const box = $("#quizCard");
    if (quiz.done) {
      const pct = quiz.score / quiz.list.length;
      let emoji, title, msg;
      if (pct >= 0.9)      { emoji = "🏆"; title = "Amazing!";  msg = "You are a superstar — keep it up!"; }
      else if (pct >= 0.7) { emoji = "🎉"; title = "Great job!"; msg = "You passed! Try the other level too."; }
      else if (pct >= 0.5) { emoji = "💪"; title = "Good try!";  msg = "Review the grammar cards and try again."; }
      else                 { emoji = "📚"; title = "Keep going!"; msg = "Study the word decks and come back stronger."; }
      box.innerHTML = `
        <div class="q-result">
          <div class="q-result-emoji">${emoji}</div>
          <h3>${title}</h3>
          <p>You scored <b>${quiz.score} / ${quiz.list.length}</b> · +${quiz.score * 10} XP</p>
          <p class="q-msg">${msg}</p>
          <button class="btn btn-accent" id="qRestart" type="button">Try again 🔁</button>
        </div>`;
      if (pct >= 0.7) confettiBurst();
      return;
    }
    const q = quiz.list[quiz.i];
    box.innerHTML = `
      <div class="q-top">
        <span class="chip">Question ${quiz.i + 1} / ${quiz.list.length}</span>
        <div class="q-bar"><i style="width:${(quiz.i / quiz.list.length) * 100}%"></i></div>
      </div>
      <p class="q-text">${q.q}</p>
      <div class="q-opts">${q.opts.map((o, i) => `<button class="opt" data-i="${i}" type="button">${o}</button>`).join("")}</div>
      <div class="q-foot">
        <span class="q-msg" id="qMsg"></span>
        <button class="btn btn-accent" id="qNext" type="button" hidden>${quiz.i === quiz.list.length - 1 ? "See results 🏁" : "Next →"}</button>
      </div>`;
  }
  function answerQuiz(idx) {
    if (quiz.answered || quiz.done) return;
    quiz.answered = true;
    const q = quiz.list[quiz.i];
    const opts = [...document.querySelectorAll("#quizCard .opt")];
    opts.forEach((o) => (o.disabled = true));
    const msg = $("#qMsg");
    if (idx === q.a) {
      opts[idx].classList.add("correct");
      quiz.score++; streak++; addXP(10);
      msg.textContent = pick(PRAISE);
      msg.style.color = "var(--good)";
    } else {
      opts[idx].classList.add("wrong");
      opts[q.a].classList.add("correct");
      streak = 0;
      msg.innerHTML = `Correct answer: <b>${q.opts[q.a]}</b>`;
      msg.style.color = "var(--bad)";
    }
    updateStreakUI();
    $("#qNext").hidden = false;
  }
  function nextQuiz() {
    quiz.answered = false;
    quiz.i++;
    if (quiz.i >= quiz.list.length) quiz.done = true;
    renderQuiz();
  }
  $("#quizCard").addEventListener("click", (e) => {
    const opt = e.target.closest(".opt");
    if (opt) return answerQuiz(+opt.dataset.i);
    if (e.target.closest("#qNext")) return nextQuiz();
    if (e.target.closest("#qRestart")) return quizReset();
  });

  /* ---------------- SCRAMBLE ---------------- */
  function newScramble() {
    const pool = allCards().filter((c) => !c.w.includes(" ") && c.w.length >= 3 && c.w.length <= 10);
    const c = pick(pool);
    let letters = c.w.split("");
    for (let t = 0; t < 12 && letters.join("") === c.w; t++) letters = shuffle(letters);
    Object.assign(scr, { word: c.w, def: c.d, emoji: c.e, letters, used: [], solved: false });
    $("#scrEmoji").textContent = scr.emoji;
    $("#scrDef").textContent = scr.def;
    $("#scrMsg").innerHTML = "&nbsp;";
    renderScramble();
  }
  function renderScramble() {
    $("#scrTiles").innerHTML = scr.letters.map((ch, i) =>
      `<button class="tile ${scr.used.includes(i) ? "used" : ""}" data-i="${i}" type="button">${ch}</button>`).join("");
    $("#scrSlots").innerHTML = scr.word.split("").map((_, k) => {
      const idx = scr.used[k];
      return `<div class="slot">${idx !== undefined ? scr.letters[idx] : ""}</div>`;
    }).join("");
  }
  $("#scrTiles").addEventListener("click", (e) => {
    const t = e.target.closest(".tile");
    if (t && !scr.solved && !t.classList.contains("used")) { scr.used.push(+t.dataset.i); renderScramble(); }
  });
  function placeLetter(ch) {
    if (scr.solved) return;
    const i = scr.letters.findIndex((l, idx) => l === ch && !scr.used.includes(idx));
    if (i === -1) return;
    scr.used.push(i);
    renderScramble();
  }
  function popLetter() {
    if (scr.solved || !scr.used.length) return;
    scr.used.pop();
    renderScramble();
  }
  function checkScramble() {
    if (scr.solved) return;
    const guess = scr.used.map((i) => scr.letters[i]).join("");
    const msg = $("#scrMsg");
    if (guess === scr.word) {
      scr.solved = true;
      addXP(10); streak++; updateStreakUI();
      msg.textContent = "Correct! 🎉 +10 XP";
      msg.style.color = "var(--good)";
      document.querySelectorAll("#scrSlots .slot").forEach((s) => s.classList.add("win"));
      speak(scr.word);
      setTimeout(newScramble, 1500);
    } else {
      streak = 0; updateStreakUI();
      msg.textContent = guess.length < scr.word.length ? "Fill all the letters first 🙂" : "Try again! 💪";
      msg.style.color = "var(--bad)";
      const row = $("#scrSlots");
      row.classList.remove("err"); void row.offsetWidth; row.classList.add("err");
    }
  }
  $("#scrCheck").addEventListener("click", checkScramble);
  $("#scrHear").addEventListener("click", () => speak(scr.word));
  $("#scrSkip").addEventListener("click", newScramble);
  $("#scrHint").addEventListener("click", () => {
    if (scr.solved) return;
    placeLetter(scr.word[scr.used.length]);
  });
  document.addEventListener("keydown", (e) => {
    if (currentTab !== "scramble" || modalOpen) return;
    if (e.key === "Backspace") { e.preventDefault(); popLetter(); }
    else if (e.key === "Enter") checkScramble();
    else if (/^[a-z]$/i.test(e.key)) placeLetter(e.key.toLowerCase());
  });

  /* ---------------- LISTENING ---------------- */
  const norm = (s) => s.toLowerCase().replace(/[.,!?'’-]/g, "").replace(/\s+/g, " ").trim();
  const lisTarget = () => (lis.mode === "word" ? lis.card.w : lis.card.x);
  function newListen() {
    lis.card = pick(allCards());
    lis.solved = false;
    $("#lisInput").value = "";
    $("#lisMsg").innerHTML = "&nbsp;";
    $("#lisReveal").hidden = true;
  }
  $("#lisPlay").addEventListener("click", () => speak(lisTarget(), 1));
  $("#lisSlow").addEventListener("click", () => speak(lisTarget(), 0.55));
  function checkListen() {
    if (lis.solved) return;
    const msg = $("#lisMsg");
    if (norm($("#lisInput").value) === norm(lisTarget())) {
      lis.solved = true;
      addXP(10); streak++; updateStreakUI();
      msg.textContent = "🎉 Correct! " + lisTarget();
      msg.style.color = "var(--good)";
      setTimeout(newListen, 1800);
    } else {
      msg.textContent = "Not quite — listen again! 🐢";
      msg.style.color = "var(--bad)";
      $("#lisReveal").hidden = false;
    }
  }
  $("#lisCheck").addEventListener("click", checkListen);
  $("#lisInput").addEventListener("keydown", (e) => { if (e.key === "Enter") checkListen(); });
  $("#lisReveal").addEventListener("click", () => {
    if (lis.solved) return;
    lis.solved = true; streak = 0; updateStreakUI();
    const msg = $("#lisMsg");
    msg.textContent = "The answer was: " + lisTarget();
    msg.style.color = "var(--accent-deep)";
    speak(lisTarget(), 0.9);
    setTimeout(newListen, 2200);
  });
  $("#lisSkip").addEventListener("click", () => { streak = 0; updateStreakUI(); newListen(); });
  document.querySelectorAll(".mode").forEach((b) => b.addEventListener("click", () => {
    lis.mode = b.dataset.mode;
    document.querySelectorAll(".mode").forEach((m) => m.classList.toggle("active", m === b));
    $("#lisInput").placeholder = lis.mode === "word" ? "Type the word here…" : "Type the full sentence here…";
    newListen();
  }));

  /* ---------------- LEVEL SWITCH & INIT ---------------- */
  document.querySelectorAll(".lvl").forEach((b) => b.addEventListener("click", () => setLevel(b.dataset.level)));
  function setLevel(l) {
    level = l;
    localStorage.setItem("ll-level", l);
    document.body.dataset.level = l;
    document.querySelectorAll(".lvl").forEach((b) => b.classList.toggle("active", b.dataset.level === l));
    $("#levelKicker").textContent = l === "A1" ? "A1 · Beginner" : "A2 · Elementary";
    renderDecks();
    renderGrammar();
    quizReset();
    newScramble();
    newListen();
    newWotd(false);
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalOpen) closeStudy(); });

  renderXP();
  updateStreakUI();
  setLevel(level);
  showTab("words");
})();