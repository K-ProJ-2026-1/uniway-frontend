import { ChatMessage, MentorProfile } from "@/types/chat/chatType";
import { LanguageCode } from "@/types/i18n";

const QUICK_CHAT_PROMPT_MAP: Record<LanguageCode, string[]> = {
  ko: [
    "수강신청은 어디서 하나요?",
    "기숙사 입사 문의는 어디로 가면 되나요?",
    "학생식당은 언제 가면 덜 붐비나요?",
    "도서관 처음 이용할 때 팁이 있나요?",
  ],
  en: [
    "Where do I register for classes?",
    "Where can I ask about dormitory move-in?",
    "When is the cafeteria less crowded?",
    "Do you have any tips for first-time library use?",
  ],
  zh: [
    "在哪里进行选课？",
    "关于宿舍入住要去哪里咨询？",
    "学生食堂什么时候人比较少？",
    "第一次去图书馆有什么建议吗？",
  ],
};

const REPLY_KEYWORDS = {
  library: ["도서관", "library", "图书馆", "study"],
  class: ["수강", "강의", "class", "course", "registration", "选课"],
  dormitory: ["기숙사", "샬롬", "dorm", "宿舍"],
  dining: ["식당", "학식", "cafeteria", "meal", "食堂"],
};

export function getMockMentorProfile(language: LanguageCode): MentorProfile {
  const base = {
    id: "mentor-kim-minsu",
    name: language === "zh" ? "金敏秀" : "김민수",
    languages:
      language === "ko"
        ? ["한국어", "English"]
        : language === "en"
          ? ["Korean", "English"]
          : ["韩语", "English"],
    topics:
      language === "ko"
        ? ["수강신청", "도서관", "기숙사", "학생식당"]
        : language === "en"
          ? ["Course registration", "Library", "Dormitory", "Cafeteria"]
          : ["选课", "图书馆", "宿舍", "学生食堂"],
  };

  if (language === "en") {
    return {
      ...base,
      roleLabel: "Mentor Kim Minsu",
      department: "Computer Science, 3rd year",
      statusLabel: "Active",
      intro:
        "Hi, I am Kim Minsu, your mentor for this semester. Feel free to ask about classes, dorm life, or daily campus routines.",
    };
  }

  if (language === "zh") {
    return {
      ...base,
      roleLabel: "导师 金敏秀",
      department: "计算机科学 3年级",
      statusLabel: "상담 가능",
      intro:
        "你好，我是这学期陪伴你的导师金敏秀。选课、宿舍、图书馆和校园生活问题都可以轻松问我。",
    };
  }

  return {
    ...base,
    roleLabel: "김민수 멘토",
    department: "컴퓨터공학과 3학년",
    statusLabel: "상담 가능",
    intro:
      "안녕하세요. 이번 학기 멘토 김민수입니다. 수강신청, 기숙사, 도서관, 학교생활까지 편하게 물어보세요.",
  };
}

export function getMockMatchStatus(language: LanguageCode) {
  return {
    label:
      language === "ko"
        ? "매칭 완료 (진행 중)"
        : language === "en"
          ? "Matched (in progress)"
          : "匹配完成（进行中）",
    durationLabel: "D-82",
  };
}

export function getInitialChatMessages(language: LanguageCode): ChatMessage[] {
  const mentor = getMockMentorProfile(language);

  if (language === "en") {
    return [
      {
        id: "system-1",
        sender: "system",
        senderName: "System",
        text: "Your mentor request was approved. You can now start a 1:1 chat.",
        time: "10:28",
      },
      {
        id: "1",
        sender: "mentor",
        senderName: mentor.roleLabel,
        text: "Hi, I am your mentor Kim Minsu. Feel free to ask me anything you need.",
        time: "10:30",
      },
      {
        id: "2",
        sender: "me",
        senderName: "Me",
        text: "Hi! I want to visit the library for the first time this week.",
        time: "10:32",
      },
      {
        id: "3",
        sender: "mentor",
        senderName: mentor.roleLabel,
        text: "Great. You can enter with your student ID, and some study rooms may need a reservation.",
        time: "10:33",
      },
    ];
  }

  if (language === "zh") {
    return [
      {
        id: "system-1",
        sender: "system",
        senderName: "系统",
        text: "你的导师申请已经通过，现在可以开始 1:1 聊天了。",
        time: "10:28",
      },
      {
        id: "1",
        sender: "mentor",
        senderName: mentor.roleLabel,
        text: "你好，我是你的导师金敏秀。有什么想问的都可以直接告诉我。",
        time: "10:30",
      },
      {
        id: "2",
        sender: "me",
        senderName: "我",
        text: "你好！我这周想第一次去图书馆。",
        time: "10:32",
      },
      {
        id: "3",
        sender: "mentor",
        senderName: mentor.roleLabel,
        text: "很好。你可以用学生证进入，有些自习室可能需要提前预约。",
        time: "10:33",
      },
    ];
  }

  return [
    {
      id: "system-1",
      sender: "system",
      senderName: "시스템",
      text: "멘토 요청이 승인되었어요. 이제 1:1 채팅을 시작할 수 있습니다.",
      time: "10:28",
    },
    {
      id: "1",
      sender: "mentor",
      senderName: mentor.roleLabel,
      text: "안녕하세요. 멘토 김민수입니다. 궁금한 것이 있으면 편하게 물어보세요.",
      time: "10:30",
    },
    {
      id: "2",
      sender: "me",
      senderName: "나",
      text: "안녕하세요. 이번 주에 도서관을 처음 가보려고 해요.",
      time: "10:32",
    },
    {
      id: "3",
      sender: "mentor",
      senderName: mentor.roleLabel,
      text: "좋아요. 학생증으로 출입할 수 있고, 스터디룸은 예약이 필요한 경우도 있어요.",
      time: "10:33",
    },
  ];
}

export function getQuickChatPrompts(language: LanguageCode) {
  return QUICK_CHAT_PROMPT_MAP[language];
}

function includesKeyword(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

export function buildMockMentorReply(
  input: string,
  language: LanguageCode,
) {
  const normalized = input.trim().toLowerCase();

  if (includesKeyword(normalized, REPLY_KEYWORDS.library)) {
    return language === "ko"
      ? "도서관은 학생증이나 모바일 학생증으로 바로 출입할 수 있어요. 처음이면 1층 안내 데스크를 먼저 들러 보세요."
      : language === "en"
        ? "You can enter the library with your student ID or mobile ID. If it is your first visit, start at the first-floor information desk."
        : "图书馆可以直接用学生证或电子学生证进入。如果是第一次去，建议先到一层服务台看看。";
  }

  if (includesKeyword(normalized, REPLY_KEYWORDS.class)) {
    return language === "ko"
      ? "수강신청은 학교 포털에서 진행해요. 원하면 메뉴 경로를 순서대로 같이 정리해 드릴게요."
      : language === "en"
        ? "Course registration is done through the school portal. If you want, I can walk you through the menu path step by step."
        : "选课是在学校门户里进行的。如果你愿意，我可以一步一步告诉你菜单路径。";
  }

  if (includesKeyword(normalized, REPLY_KEYWORDS.dormitory)) {
    return language === "ko"
      ? "기숙사 문의는 샬롬관 1층 안내 데스크가 가장 빨라요. 입사 일정이나 준비 서류도 함께 확인해 보세요."
      : language === "en"
        ? "For dormitory questions, the first-floor help desk in Shalom Hall is usually the fastest option. It also helps to check move-in dates and required documents."
        : "关于宿舍的问题，去沙龙馆一层服务台通常最快。也记得一起确认入住日期和需要的材料。";
  }

  if (includesKeyword(normalized, REPLY_KEYWORDS.dining)) {
    return language === "ko"
      ? "학생식당은 점심 직전이 가장 붐벼요. 11시 조금 넘어서 가면 비교적 여유롭게 이용할 수 있어요."
      : language === "en"
        ? "The cafeteria is busiest right before lunch. Going a little after 11 usually feels more comfortable."
        : "学生食堂在午餐前最拥挤。11点刚过的时候去，通常会轻松一些。";
  }

  return language === "ko"
    ? "좋아요. 그 부분도 제가 아는 범위에서 최대한 쉽게 설명해 드릴게요. 상황을 조금 더 알려 주면 더 정확하게 도와드릴 수 있어요."
    : language === "en"
      ? "Sure. I can explain that simply. If you tell me a little more about your situation, I can guide you more clearly."
      : "可以，我会尽量简单说明。如果你再多告诉我一点具体情况，我可以更准确地帮助你。";
}
