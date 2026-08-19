const sentences = [
  {
    en: "I haven't had a chance to check it yet.",
    kr: "아직 그것을 확인할 기회가 없었어요.",
    tip: "핵심 표현: haven't had a chance to ~ (아직 ~할 기회가 없었다) — 바빠서 아직 못 했다는 뉘앙스를 부드럽게 전달할 때 씁니다.",
  },
  {
    en: "Could you send me the updated file by this afternoon?",
    kr: "오늘 오후까지 업데이트된 파일을 보내주실 수 있나요?",
    tip: "핵심 표현: Could you ~ by (시간)? (~까지 해주실 수 있나요?) — 정중하게 마감 기한을 요청할 때 씁니다.",
  },
  {
    en: "I'll get back to you as soon as possible.",
    kr: "가능한 한 빨리 다시 연락드리겠습니다.",
    tip: "핵심 표현: get back to you (다시 연락하다), as soon as possible (가능한 한 빨리) — 업무 이메일/채팅에서 자주 쓰는 표현입니다.",
  },
  {
    en: "Let me double-check that for you.",
    kr: "제가 그것을 다시 한번 확인해 볼게요.",
    tip: "핵심 표현: double-check (다시 확인하다) — 상대의 요청에 신중하게 재확인하겠다는 의사를 표현합니다.",
  },
  {
    en: "That sounds good to me.",
    kr: "저는 좋은 것 같아요.",
    tip: "핵심 표현: sound good to me (내 생각엔 괜찮다) — 제안에 동의할 때 가볍게 쓰는 표현입니다.",
  },
];

const statusText = {
  unknown: "상태: 모르겠음으로 표시했어요.",
  medium: "상태: 조금 어려움으로 표시했어요.",
  easy: "상태: 알고 있음으로 표시했어요.",
};

let currentIndex = 0;
let todayCompleted = 0;
const sentenceStatus = new Array(sentences.length).fill(null);

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
const evalUnknown = document.getElementById("evalUnknown");
const evalMedium = document.getElementById("evalMedium");
const evalEasy = document.getElementById("evalEasy");

function renderSentence() {
  const item = sentences[currentIndex];

  progressLabel.textContent = `${currentIndex + 1} / ${sentences.length}`;
  sentenceEn.textContent = item.en;
  sentenceKr.textContent = item.kr;
  sentenceTip.textContent = item.tip;

  meaningBox.hidden = true;
  revealBtn.textContent = "뜻 보기";

  const status = sentenceStatus[currentIndex];
  if (status) {
    statusLine.textContent = statusText[status];
    statusLine.hidden = false;
  } else {
    statusLine.hidden = true;
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === sentences.length - 1;
}

function updateTodayCount() {
  todayCountEl.textContent = `오늘 완료: ${todayCompleted}개`;
}

revealBtn.addEventListener("click", () => {
  const isHidden = meaningBox.hidden;
  meaningBox.hidden = !isHidden;
  revealBtn.textContent = isHidden ? "뜻 숨기기" : "뜻 보기";
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderSentence();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < sentences.length - 1) {
    currentIndex += 1;
    renderSentence();
  }
});

listenBtn.addEventListener("click", () => {
  listenBtn.textContent = "🔊 (음성 연결 예정)";
  setTimeout(() => {
    listenBtn.textContent = "🔊 듣기";
  }, 1200);
});

function setEvaluation(status) {
  if (!sentenceStatus[currentIndex]) {
    todayCompleted += 1;
    updateTodayCount();
  }
  sentenceStatus[currentIndex] = status;
  statusLine.textContent = statusText[status];
  statusLine.hidden = false;
}

evalUnknown.addEventListener("click", () => setEvaluation("unknown"));
evalMedium.addEventListener("click", () => setEvaluation("medium"));
evalEasy.addEventListener("click", () => setEvaluation("easy"));

renderSentence();
updateTodayCount();
