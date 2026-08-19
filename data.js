// 대분류 + 세부 주제 정의.
// 나중에 Supabase로 옮길 때는 이 배열을 categories 테이블 조회 결과로 교체하면 됩니다.
const CATEGORIES = [
  {
    id: "travel",
    name: "여행",
    icon: "✈️",
    topics: ["공항·비행기", "호텔", "식당·카페", "교통", "쇼핑", "관광·길 묻기", "긴급상황"],
  },
  {
    id: "work",
    name: "회사·회의",
    icon: "🏢",
    topics: ["회의 시작", "의견 제시", "동의·반대", "질문하기", "일정 조율", "진행상황", "보고하기", "요청하기"],
  },
  {
    id: "office",
    name: "사무용",
    icon: "💼",
    topics: ["이메일", "전화", "파일 요청", "확인·회신", "일정", "업무지시", "협업", "자료 공유"],
  },
  {
    id: "daily",
    name: "일상",
    icon: "🏠",
    topics: ["인사", "가족", "식사", "취미", "날씨", "쇼핑", "약속", "감정 표현", "자유 대화"],
  },
];

// 문장 데이터.
// 나중에 Supabase로 옮길 때는 이 배열을 sentences 테이블 조회 결과로 교체하면 됩니다.
// 필드: id, category, topic, english, korean, expression, exampleUsage, difficulty
const SENTENCES = [
  // ── 여행 ─────────────────────────────────────────────
  { id: "travel-airport-001", category: "여행", topic: "공항·비행기", english: "Could I get a window seat, please?", korean: "창가 좌석으로 주실 수 있나요?", expression: "window seat", exampleUsage: "체크인 카운터에서 좌석을 요청할 때", difficulty: "beginner" },
  { id: "travel-airport-002", category: "여행", topic: "공항·비행기", english: "Where is the boarding gate for this flight?", korean: "이 비행기 탑승구가 어디인가요?", expression: "boarding gate", exampleUsage: "공항에서 탑승구를 찾을 때", difficulty: "beginner" },
  { id: "travel-airport-003", category: "여행", topic: "공항·비행기", english: "My flight got delayed by two hours.", korean: "제 비행기가 2시간 지연됐어요.", expression: "get delayed", exampleUsage: "항공편 지연 상황을 설명할 때", difficulty: "beginner" },

  { id: "travel-hotel-001", category: "여행", topic: "호텔", english: "Could I check in a little early?", korean: "조금 일찍 체크인할 수 있을까요?", expression: "check in early", exampleUsage: "호텔 프런트에서 조기 체크인을 요청할 때", difficulty: "beginner" },
  { id: "travel-hotel-002", category: "여행", topic: "호텔", english: "Is breakfast included in the room rate?", korean: "조식이 숙박 요금에 포함되어 있나요?", expression: "included in the rate", exampleUsage: "조식 포함 여부를 물을 때", difficulty: "beginner" },
  { id: "travel-hotel-003", category: "여행", topic: "호텔", english: "Could you send someone to fix the AC?", korean: "에어컨을 고쳐줄 사람을 보내주실 수 있나요?", expression: "send someone to fix", exampleUsage: "객실 문제를 요청할 때", difficulty: "beginner" },

  { id: "travel-restaurant-001", category: "여행", topic: "식당·카페", english: "Could we get a table for two?", korean: "두 명 자리 있을까요?", expression: "a table for two", exampleUsage: "식당에서 자리를 요청할 때", difficulty: "beginner" },
  { id: "travel-restaurant-002", category: "여행", topic: "식당·카페", english: "Can I get this to go?", korean: "이거 포장 가능할까요?", expression: "to go", exampleUsage: "테이크아웃을 요청할 때", difficulty: "beginner" },
  { id: "travel-restaurant-003", category: "여행", topic: "식당·카페", english: "Could I have the check, please?", korean: "계산서 주시겠어요?", expression: "the check", exampleUsage: "식사 후 계산을 요청할 때", difficulty: "beginner" },

  { id: "travel-transport-001", category: "여행", topic: "교통", english: "How much is the fare to downtown?", korean: "시내까지 요금이 얼마인가요?", expression: "fare", exampleUsage: "택시나 대중교통 요금을 물을 때", difficulty: "beginner" },
  { id: "travel-transport-002", category: "여행", topic: "교통", english: "Does this bus go to the airport?", korean: "이 버스가 공항으로 가나요?", expression: "does this ~ go to", exampleUsage: "버스 노선을 확인할 때", difficulty: "beginner" },

  { id: "travel-shopping-001", category: "여행", topic: "쇼핑", english: "Do you have this in a different color?", korean: "이거 다른 색상도 있나요?", expression: "in a different color", exampleUsage: "매장에서 다른 색상을 물을 때", difficulty: "beginner" },
  { id: "travel-shopping-002", category: "여행", topic: "쇼핑", english: "Is tax included in the price?", korean: "가격에 세금이 포함되어 있나요?", expression: "tax included", exampleUsage: "여행 중 쇼핑할 때 세금 포함 여부를 확인할 때", difficulty: "beginner" },

  { id: "travel-sightseeing-001", category: "여행", topic: "관광·길 묻기", english: "Excuse me, how do I get to the museum?", korean: "실례합니다, 박물관에 어떻게 가나요?", expression: "how do I get to", exampleUsage: "길을 물을 때", difficulty: "beginner" },
  { id: "travel-sightseeing-002", category: "여행", topic: "관광·길 묻기", english: "Is it within walking distance from here?", korean: "여기서 걸어갈 수 있는 거리인가요?", expression: "walking distance", exampleUsage: "도보 이동 가능 여부를 물을 때", difficulty: "beginner" },

  { id: "travel-emergency-001", category: "여행", topic: "긴급상황", english: "I lost my passport. What should I do?", korean: "여권을 잃어버렸어요. 어떻게 해야 하나요?", expression: "lost my passport", exampleUsage: "여권 분실 시 도움을 요청할 때", difficulty: "beginner" },
  { id: "travel-emergency-002", category: "여행", topic: "긴급상황", english: "Could you call an ambulance, please?", korean: "구급차를 불러주시겠어요?", expression: "call an ambulance", exampleUsage: "응급 상황에서 도움을 요청할 때", difficulty: "beginner" },

  // ── 회사·회의 ─────────────────────────────────────────
  { id: "work-meeting-start-001", category: "회사·회의", topic: "회의 시작", english: "Let's get started, shall we?", korean: "이제 시작할까요?", expression: "let's get started", exampleUsage: "회의를 시작할 때", difficulty: "beginner" },
  { id: "work-meeting-start-002", category: "회사·회의", topic: "회의 시작", english: "Thanks for joining on such short notice.", korean: "급하게 참석해 주셔서 감사합니다.", expression: "on short notice", exampleUsage: "갑작스러운 회의에 참석한 사람에게 감사 인사할 때", difficulty: "intermediate" },

  { id: "work-opinion-001", category: "회사·회의", topic: "의견 제시", english: "I think we should consider other options.", korean: "다른 옵션도 고려해봐야 할 것 같아요.", expression: "I think we should", exampleUsage: "의견을 제시할 때", difficulty: "beginner" },
  { id: "work-opinion-002", category: "회사·회의", topic: "의견 제시", english: "From my perspective, this makes more sense.", korean: "제 입장에서는 이게 더 합리적인 것 같아요.", expression: "from my perspective", exampleUsage: "자신의 관점을 말할 때", difficulty: "intermediate" },

  { id: "work-agree-disagree-001", category: "회사·회의", topic: "동의·반대", english: "I completely agree with that.", korean: "그 의견에 전적으로 동의해요.", expression: "completely agree", exampleUsage: "상대 의견에 동의할 때", difficulty: "beginner" },
  { id: "work-agree-disagree-002", category: "회사·회의", topic: "동의·반대", english: "I see your point, but I have a different view.", korean: "무슨 말씀인지 알겠지만, 저는 생각이 좀 달라요.", expression: "I see your point, but", exampleUsage: "정중하게 반대 의견을 낼 때", difficulty: "intermediate" },

  { id: "work-question-001", category: "회사·회의", topic: "질문하기", english: "Could you clarify what you mean by that?", korean: "그게 무슨 뜻인지 좀 더 설명해 주시겠어요?", expression: "clarify what you mean", exampleUsage: "상대 발언을 명확히 이해하고 싶을 때", difficulty: "intermediate" },

  { id: "work-scheduling-001", category: "회사·회의", topic: "일정 조율", english: "Does Thursday afternoon work for you?", korean: "목요일 오후 괜찮으신가요?", expression: "does ~ work for you", exampleUsage: "회의 일정을 조율할 때", difficulty: "beginner" },
  { id: "work-scheduling-002", category: "회사·회의", topic: "일정 조율", english: "Can we push the meeting back an hour?", korean: "회의를 한 시간 미룰 수 있을까요?", expression: "push back", exampleUsage: "일정을 늦출 때", difficulty: "intermediate" },

  { id: "work-progress-001", category: "회사·회의", topic: "진행상황", english: "We're on track to finish by Friday.", korean: "금요일까지 끝낼 수 있을 것 같아요.", expression: "on track", exampleUsage: "진행 상황이 순조로움을 알릴 때", difficulty: "intermediate" },

  { id: "work-reporting-001", category: "회사·회의", topic: "보고하기", english: "Let me walk you through the results.", korean: "결과를 하나씩 설명해 드릴게요.", expression: "walk you through", exampleUsage: "결과를 보고할 때", difficulty: "intermediate" },

  { id: "work-request-001", category: "회사·회의", topic: "요청하기", english: "Could you take care of this by tomorrow?", korean: "내일까지 이거 처리해주실 수 있나요?", expression: "take care of", exampleUsage: "업무를 요청할 때", difficulty: "beginner" },

  // ── 사무용 ────────────────────────────────────────────
  { id: "office-email-001", category: "사무용", topic: "이메일", english: "I'm writing to follow up on our last conversation.", korean: "지난 대화에 대해 후속 연락드립니다.", expression: "follow up on", exampleUsage: "이메일로 후속 연락할 때", difficulty: "intermediate" },
  { id: "office-email-002", category: "사무용", topic: "이메일", english: "Please find the attached file for your review.", korean: "검토하실 파일을 첨부했습니다.", expression: "please find attached", exampleUsage: "이메일에 파일을 첨부할 때", difficulty: "intermediate" },

  { id: "office-phone-001", category: "사무용", topic: "전화", english: "Could you speak a little louder? The line is bad.", korean: "조금 더 크게 말씀해 주시겠어요? 연결 상태가 안 좋아요.", expression: "the line is bad", exampleUsage: "전화 연결 상태가 안 좋을 때", difficulty: "beginner" },
  { id: "office-phone-002", category: "사무용", topic: "전화", english: "Can I leave a message for him?", korean: "그에게 메시지를 남길 수 있을까요?", expression: "leave a message", exampleUsage: "부재중인 사람에게 메시지를 남길 때", difficulty: "beginner" },

  { id: "office-file-request-001", category: "사무용", topic: "파일 요청", english: "Could you send me the updated file by this afternoon?", korean: "오늘 오후까지 업데이트된 파일을 보내주실 수 있나요?", expression: "by (시간)", exampleUsage: "마감 기한과 함께 파일을 요청할 때", difficulty: "beginner" },
  { id: "office-file-request-002", category: "사무용", topic: "파일 요청", english: "Could you resend that file? I think it didn't attach.", korean: "그 파일 다시 보내주시겠어요? 첨부가 안 된 것 같아요.", expression: "resend", exampleUsage: "첨부 오류로 재전송을 요청할 때", difficulty: "beginner" },

  { id: "office-confirm-reply-001", category: "사무용", topic: "확인·회신", english: "I haven't had a chance to check it yet.", korean: "아직 그것을 확인할 기회가 없었어요.", expression: "haven't had a chance to", exampleUsage: "아직 확인하지 못했음을 부드럽게 전달할 때", difficulty: "beginner" },
  { id: "office-confirm-reply-002", category: "사무용", topic: "확인·회신", english: "I'll get back to you as soon as possible.", korean: "가능한 한 빨리 다시 연락드리겠습니다.", expression: "get back to you", exampleUsage: "나중에 다시 연락하겠다고 할 때", difficulty: "beginner" },

  { id: "office-schedule-001", category: "사무용", topic: "일정", english: "I'm available anytime after 2 PM.", korean: "오후 2시 이후에는 언제든 괜찮아요.", expression: "available anytime after", exampleUsage: "가능한 시간을 알릴 때", difficulty: "beginner" },

  { id: "office-instruction-001", category: "사무용", topic: "업무지시", english: "Please make sure this is done by end of day.", korean: "오늘 안에 반드시 끝내주세요.", expression: "by end of day", exampleUsage: "마감을 강조해서 업무를 지시할 때", difficulty: "intermediate" },

  { id: "office-collaboration-001", category: "사무용", topic: "협업", english: "Let me double-check that for you.", korean: "제가 그것을 다시 한번 확인해 볼게요.", expression: "double-check", exampleUsage: "상대 요청에 재확인하겠다고 할 때", difficulty: "beginner" },

  { id: "office-sharing-001", category: "사무용", topic: "자료 공유", english: "I'll share the link with everyone on the team.", korean: "팀 전체에게 링크를 공유할게요.", expression: "share the link", exampleUsage: "자료를 공유할 때", difficulty: "beginner" },

  // ── 일상 ──────────────────────────────────────────────
  { id: "daily-greeting-001", category: "일상", topic: "인사", english: "Long time no see! How have you been?", korean: "오랜만이에요! 어떻게 지냈어요?", expression: "long time no see", exampleUsage: "오랜만에 만난 사람에게 인사할 때", difficulty: "beginner" },
  { id: "daily-greeting-002", category: "일상", topic: "인사", english: "It's so nice to finally meet you.", korean: "드디어 만나서 정말 반가워요.", expression: "finally meet you", exampleUsage: "처음 실제로 만났을 때 인사할 때", difficulty: "beginner" },

  { id: "daily-family-001", category: "일상", topic: "가족", english: "My sister is visiting us this weekend.", korean: "이번 주말에 여동생이 놀러 와요.", expression: "visiting us", exampleUsage: "가족 방문 계획을 말할 때", difficulty: "beginner" },

  { id: "daily-meal-001", category: "일상", topic: "식사", english: "Let's grab something to eat.", korean: "우리 뭐 좀 먹으러 가자.", expression: "grab something to eat", exampleUsage: "가볍게 식사하러 가자고 할 때", difficulty: "beginner" },
  { id: "daily-meal-002", category: "일상", topic: "식사", english: "I'm starving. Can we eat now?", korean: "나 완전 배고파. 지금 먹어도 돼?", expression: "I'm starving", exampleUsage: "배고픔을 강조해서 말할 때", difficulty: "beginner" },

  { id: "daily-hobby-001", category: "일상", topic: "취미", english: "I've gotten really into hiking lately.", korean: "요즘 등산에 푹 빠졌어요.", expression: "gotten into", exampleUsage: "최근 취미에 빠졌다고 말할 때", difficulty: "intermediate" },

  { id: "daily-weather-001", category: "일상", topic: "날씨", english: "It looks like it's going to rain later.", korean: "나중에 비가 올 것 같아요.", expression: "it looks like", exampleUsage: "날씨를 예상해서 말할 때", difficulty: "beginner" },

  { id: "daily-shopping-001", category: "일상", topic: "쇼핑", english: "I'm just browsing, thanks.", korean: "그냥 구경하는 중이에요, 감사합니다.", expression: "just browsing", exampleUsage: "매장에서 점원 응대를 사양할 때", difficulty: "beginner" },

  { id: "daily-appointment-001", category: "일상", topic: "약속", english: "Are we still on for tonight?", korean: "오늘 저녁 약속 아직 유효한 거지?", expression: "still on for", exampleUsage: "약속이 여전히 유효한지 확인할 때", difficulty: "beginner" },
  { id: "daily-appointment-002", category: "일상", topic: "약속", english: "Sorry, something came up. Can we reschedule?", korean: "미안한데 일이 좀 생겼어. 일정 다시 잡을 수 있을까?", expression: "something came up", exampleUsage: "갑작스러운 사정으로 약속을 미룰 때", difficulty: "intermediate" },

  { id: "daily-emotion-001", category: "일상", topic: "감정 표현", english: "I'm a bit nervous about tomorrow.", korean: "내일이 좀 긴장돼요.", expression: "a bit nervous about", exampleUsage: "긴장되는 감정을 표현할 때", difficulty: "beginner" },

  { id: "daily-freetalk-001", category: "일상", topic: "자유 대화", english: "That sounds good to me.", korean: "저는 좋은 것 같아요.", expression: "sounds good to me", exampleUsage: "제안에 가볍게 동의할 때", difficulty: "beginner" },
];
