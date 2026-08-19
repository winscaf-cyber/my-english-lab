// data.js에 정의된 CATEGORIES, SENTENCES를 사용합니다.

const STORAGE_KEY = "myEnglishLabProgressV1";
const DAILY_REVIEW_COUNT = 2;
const DAILY_TOTAL = 5;

const PRIORITY_BY_STATUS = { unknown: 2, medium: 1, easy: 0 };

const statusText = {
  unknown: "상태: 모르겠음으로 표시했어요.",
  medium: "상태: 조금 어려움으로 표시했어요.",
  easy: "상태: 알고 있음으로 표시했어요.",
};

// ---------------------------------------------------------------
// 상태(state)
// ---------------------------------------------------------------
let progressData = loadProgress();
let currentCategory = null;
let currentTopic = null;
let currentSession = [];
let currentIndex = 0;
let sessionStatus = [];
let sessionResultCounts = { unknown: 0, medium: 0, easy: 0 };

// ---------------------------------------------------------------
// DOM 참조
// ---------------------------------------------------------------
const screenHome = document.getElementById("screenHome");
const screenTopics = document.getElementById("screenTopics");
const screenStudy = document.getElementById("screenStudy");
const screenSummary = document.getElementById("screenSummary");

const categoryGrid = document.getElementById("categoryGrid");
const backToHomeBtn = document.getElementById("backToHomeBtn");
const topicsHeading = document.getElementById("topicsHeading");
const topicList = document.getElementById("topicList");

const studyPath = document.getElementById("studyPath");
const reselectTopicBtn = document.getElementById("reselectTopicBtn");
const progressLabel = document.getElementById("progressLabel");
const todayCountEl = document.getElementById("todayCount");
const sentenceEn = document.getElementById("sentenceEn");
const meaningBox = document.getElementById("meaningBox");
const sentenceKr = document.getElementById("sentenceKr");
const sentenceTip = document.getElementById("sentenceTip");
const revealBtn = document.getElementById("revealBtn");
const statusLine = document.getElementById("statusLine");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const listenBtn = document.getElementById("listenBtn");
const listenMessage = document.getElementById("listenMessage");
const evalUnknown = document.getElementById("evalUnknown");
const evalMedium = document.getElementById("evalMedium");
const evalEasy = document.getElementById("evalEasy");

const summaryPath = document.getElementById("summaryPath");
const summaryTotal = document.getElementById("summaryTotal");
const summaryUnknown = document.getElementById("summaryUnknown");
const summaryMedium = document.getElementById("summaryMedium");
const summaryEasy = document.getElementById("summaryEasy");
const summaryTopicBtn = document.getElementById("summaryTopicBtn");
const summaryHomeBtn = document.getElementById("summaryHomeBtn");

// ---------------------------------------------------------------
// localStorage 저장/불러오기
// ---------------------------------------------------------------
function getTodayDateString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function createEmptyProgress() {
  return {
    sentenceProgress: {},
    studiedToday: { date: getTodayDateString(), ids: [] },
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyProgress();

    const parsed = JSON.parse(raw);
    if (!parsed.sentenceProgress) parsed.sentenceProgress = {};
    if (!parsed.studiedToday || parsed.studiedToday.date !== getTodayDateString()) {
      parsed.studiedToday = { date: getTodayDateString(), ids: [] };
    }
    return parsed;
  } catch (e) {
    return createEmptyProgress();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
}

function updateSentenceProgress(sentenceId, status) {
  const prevEntry = progressData.sentenceProgress[sentenceId];
  progressData.sentenceProgress[sentenceId] = {
    priority: PRIORITY_BY_STATUS[status],
    lastResult: status,
    lastStudiedAt: new Date().toISOString(),
    timesStudied: (prevEntry?.timesStudied || 0) + 1,
  };
  saveProgress();
}

function markStudiedToday(sentenceId) {
  if (!progressData.studiedToday.ids.includes(sentenceId)) {
    progressData.studiedToday.ids.push(sentenceId);
    saveProgress();
  }
  updateTodayCount();
}

function updateTodayCount() {
  todayCountEl.textContent = `오늘 완료: ${progressData.studiedToday.ids.length}개`;
}

// ---------------------------------------------------------------
// 오늘의 학습 세션 구성 (새 문장 3 + 복습 문장 2)
// ---------------------------------------------------------------
function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildTodaySession(category, topic) {
  const topicSentences = SENTENCES.filter(
    (s) => s.category === category.name && s.topic === topic
  );

  const studiedTodayIds = new Set(progressData.studiedToday.ids);
  let pool = topicSentences.filter((s) => !studiedTodayIds.has(s.id));
  // 오늘 학습 안 한 문장이 부족하면(주제 문장 수가 적은 경우) 재사용을 허용
  if (pool.length < Math.min(DAILY_TOTAL, topicSentences.length)) {
    pool = topicSentences.slice();
  }

  const reviewPool = pool
    .filter((s) => progressData.sentenceProgress[s.id])
    .sort((a, b) => {
      const pa = progressData.sentenceProgress[a.id];
      const pb = progressData.sentenceProgress[b.id];
      if (pb.priority !== pa.priority) return pb.priority - pa.priority;
      return new Date(pa.lastStudiedAt) - new Date(pb.lastStudiedAt);
    });

  const newPool = shuffleArray(pool.filter((s) => !progressData.sentenceProgress[s.id]));

  let chosenReview = reviewPool.slice(0, Math.min(DAILY_REVIEW_COUNT, reviewPool.length));
  const chosenNew = newPool.slice(0, Math.min(DAILY_TOTAL - chosenReview.length, newPool.length));

  const shortBy = DAILY_TOTAL - chosenReview.length - chosenNew.length;
  if (shortBy > 0 && reviewPool.length > chosenReview.length) {
    chosenReview = chosenReview.concat(
      reviewPool.slice(chosenReview.length, chosenReview.length + shortBy)
    );
  }

  return shuffleArray([...chosenNew, ...chosenReview]);
}

// ---------------------------------------------------------------
// 화면 전환
// ---------------------------------------------------------------
function showScreen(name) {
  screenHome.hidden = name !== "home";
  screenTopics.hidden = name !== "topics";
  screenStudy.hidden = name !== "study";
  screenSummary.hidden = name !== "summary";
}

function renderCategoryGrid() {
  categoryGrid.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "category-card";
    btn.innerHTML = `<span class="category-icon">${cat.icon}</span><span class="category-name">${cat.name}</span>`;
    btn.addEventListener("click", () => openCategory(cat));
    categoryGrid.appendChild(btn);
  });
}

function openCategory(category) {
  currentCategory = category;
  renderTopicList(category);
  showScreen("topics");
}

function renderTopicList(category) {
  topicsHeading.textContent = `${category.icon} ${category.name} — 세부 주제를 선택하세요`;
  topicList.innerHTML = "";

  category.topics.forEach((topic) => {
    const count = SENTENCES.filter(
      (s) => s.category === category.name && s.topic === topic
    ).length;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "topic-item";

    if (count === 0) {
      btn.classList.add("topic-item-disabled");
      btn.disabled = true;
      btn.innerHTML = `<span>${topic}</span><span class="topic-status">준비 중</span>`;
    } else {
      btn.innerHTML = `<span>${topic}</span><span class="topic-status">${count}문장</span>`;
      btn.addEventListener("click", () => startTopic(category, topic));
    }

    topicList.appendChild(btn);
  });
}

function startTopic(category, topic) {
  currentCategory = category;
  currentTopic = topic;
  currentSession = buildTodaySession(category, topic);
  currentIndex = 0;
  sessionStatus = new Array(currentSession.length).fill(null);
  sessionResultCounts = { unknown: 0, medium: 0, easy: 0 };

  renderStudySentence();
  showScreen("study");
}

function finishSession() {
  stopSpeaking();
  summaryPath.textContent = `${currentCategory.icon} ${currentCategory.name} > ${currentTopic}`;
  summaryTotal.textContent = String(currentSession.length);
  summaryUnknown.textContent = String(sessionResultCounts.unknown);
  summaryMedium.textContent = String(sessionResultCounts.medium);
  summaryEasy.textContent = String(sessionResultCounts.easy);
  showScreen("summary");
}

backToHomeBtn.addEventListener("click", () => showScreen("home"));

reselectTopicBtn.addEventListener("click", () => {
  stopSpeaking();
  renderTopicList(currentCategory);
  showScreen("topics");
});

summaryTopicBtn.addEventListener("click", () => {
  renderTopicList(currentCategory);
  showScreen("topics");
});

summaryHomeBtn.addEventListener("click", () => showScreen("home"));

// ---------------------------------------------------------------
// 음성 재생 (Web Speech API)
// ---------------------------------------------------------------
const speechSupported =
  "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

let englishVoices = [];

function loadEnglishVoices() {
  englishVoices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en"));
}

function pickBestEnglishVoice() {
  if (!englishVoices.length) return null;

  const usVoices = englishVoices.filter((voice) => voice.lang.toLowerCase() === "en-us");
  const pool = usVoices.length ? usVoices : englishVoices;

  const naturalKeywords = ["Google US English", "Natural", "Neural", "Premium", "Enhanced"];
  for (const keyword of naturalKeywords) {
    const match = pool.find((voice) => voice.name.includes(keyword));
    if (match) return match;
  }

  return pool[0];
}

function setListenButtonSpeaking(isSpeaking) {
  listenBtn.textContent = isSpeaking ? "🔊 재생 중..." : "🔊 듣기";
}

function showListenMessage(text) {
  listenMessage.textContent = text;
  listenMessage.hidden = false;
}

function stopSpeaking() {
  if (speechSupported && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  setListenButtonSpeaking(false);
}

function speakCurrentSentence() {
  if (!speechSupported) {
    showListenMessage("이 브라우저는 음성 재생을 지원하지 않아요.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(currentSession[currentIndex].english);
  utterance.lang = "en-US";

  const voice = pickBestEnglishVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  utterance.onstart = () => setListenButtonSpeaking(true);
  utterance.onend = () => setListenButtonSpeaking(false);
  utterance.onerror = () => setListenButtonSpeaking(false);

  window.speechSynthesis.speak(utterance);
}

if (speechSupported) {
  loadEnglishVoices();
  window.speechSynthesis.onvoiceschanged = loadEnglishVoices;
} else {
  listenBtn.disabled = true;
  showListenMessage("이 브라우저는 음성 재생을 지원하지 않아요.");
}

// ---------------------------------------------------------------
// 학습 화면 렌더링 / 이동
// ---------------------------------------------------------------
function renderStudySentence() {
  const item = currentSession[currentIndex];

  studyPath.textContent = `${currentCategory.icon} ${currentCategory.name} > ${currentTopic}`;
  progressLabel.textContent = `${currentIndex + 1} / ${currentSession.length}`;

  sentenceEn.textContent = item.english;
  sentenceKr.textContent = item.korean;
  sentenceTip.textContent = `핵심 표현: ${item.expression} — ${item.exampleUsage}`;

  meaningBox.hidden = true;
  revealBtn.textContent = "뜻 보기";

  const savedStatus = sessionStatus[currentIndex];
  if (savedStatus) {
    statusLine.textContent = statusText[savedStatus];
    statusLine.hidden = false;
  } else {
    statusLine.hidden = true;
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === currentSession.length - 1 ? "결과 보기 →" : "다음 →";
}

revealBtn.addEventListener("click", () => {
  const isHidden = meaningBox.hidden;
  meaningBox.hidden = !isHidden;
  revealBtn.textContent = isHidden ? "뜻 숨기기" : "뜻 보기";
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    stopSpeaking();
    currentIndex -= 1;
    renderStudySentence();
  }
});

nextBtn.addEventListener("click", () => {
  stopSpeaking();
  if (currentIndex < currentSession.length - 1) {
    currentIndex += 1;
    renderStudySentence();
  } else {
    finishSession();
  }
});

listenBtn.addEventListener("click", () => {
  speakCurrentSentence();
});

function setEvaluation(status) {
  const item = currentSession[currentIndex];
  const prevStatus = sessionStatus[currentIndex];

  sessionStatus[currentIndex] = status;
  statusLine.textContent = statusText[status];
  statusLine.hidden = false;

  if (prevStatus) {
    sessionResultCounts[prevStatus] -= 1;
  } else {
    markStudiedToday(item.id);
  }
  sessionResultCounts[status] += 1;

  updateSentenceProgress(item.id, status);
}

evalUnknown.addEventListener("click", () => setEvaluation("unknown"));
evalMedium.addEventListener("click", () => setEvaluation("medium"));
evalEasy.addEventListener("click", () => setEvaluation("easy"));

// ---------------------------------------------------------------
// 초기화
// ---------------------------------------------------------------
renderCategoryGrid();
updateTodayCount();
showScreen("home");
