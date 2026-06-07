import { LanguageCode, LocalizedText, LocalizedTextList } from "@/types/i18n";

export const APP_TRANSLATIONS = {
  "tab.home": { ko: "지도", en: "Map", zh: "地图" },
  "tab.guide": { ko: "가이드", en: "Guide", zh: "指南" },
  "tab.chat": { ko: "채팅", en: "Chat", zh: "聊天" },
  "tab.my": { ko: "마이", en: "My", zh: "我的" },
  "main.searchPlaceholder": {
    ko: "시설 검색",
    en: "Search places",
    zh: "搜索设施",
  },
  "main.noResults": {
    ko: "검색 결과가 없습니다.",
    en: "No search results found.",
    zh: "没有搜索结果。",
  },
  "main.location": { ko: "위치", en: "Location", zh: "位置" },
  "main.hours": { ko: "운영시간", en: "Hours", zh: "开放时间" },
  "main.viewDetails": {
    ko: "상세 정보 보기",
    en: "View details",
    zh: "查看详情",
  },
  "detail.title": {
    ko: "시설 상세 정보",
    en: "Place details",
    zh: "设施详情",
  },
  "detail.usage": {
    ko: "이용 방법",
    en: "How to use",
    zh: "使用方法",
  },
  "detail.notice": {
    ko: "유의사항",
    en: "Things to note",
    zh: "注意事项",
  },
  "detail.relatedGuide": {
    ko: "관련 생활 가이드",
    en: "Related guides",
    zh: "相关生活指南",
  },
  "detail.allGuides": { ko: "전체 보기", en: "See all", zh: "查看全部" },
  "detail.demoPoints": {
    ko: "시연 포인트",
    en: "Demo points",
    zh: "演示重点",
  },
  "detail.openGuide": {
    ko: "가이드 보기",
    en: "Open guide",
    zh: "查看指南",
  },
  "detail.askMentor": {
    ko: "멘토에게 질문하기",
    en: "Ask your mentor",
    zh: "向导师提问",
  },
  "guide.title": {
    ko: "생활 가이드",
    en: "Campus Life Guide",
    zh: "校园生活指南",
  },
  "guide.subtitle": {
    ko: "유학생이 자주 찾는 생활 정보를 한곳에 모았어요.",
    en: "Key campus life information for international students in one place.",
    zh: "把留学生常用的校园生活信息整理在一起。",
  },
  "my.settings": { ko: "설정", en: "Settings", zh: "设置" },
  "my.login": { ko: "로그인", en: "Sign in", zh: "登录" },
  "my.language": { ko: "언어 설정", en: "Language", zh: "语言设置" },
  "my.appInfo": { ko: "앱 정보", en: "App info", zh: "应用信息" },
  "my.version": { ko: "버전", en: "Version", zh: "版本" },
  "my.updatedAt": {
    ko: "최종 업데이트",
    en: "Last update",
    zh: "最后更新",
  },
  "my.logout": { ko: "로그아웃", en: "Log out", zh: "退出登录" },
  "my.mentoring": { ko: "멘토링", en: "Mentoring", zh: "导师交流" },
  "my.bookmark": { ko: "북마크", en: "Bookmarks", zh: "收藏" },
  "my.activeDays": { ko: "활동일", en: "Active days", zh: "活跃天数" },
  "language.title": { ko: "언어 선택", en: "Choose language", zh: "选择语言" },
  "language.search": { ko: "언어 검색", en: "Search language", zh: "搜索语言" },
  "language.empty": {
    ko: "검색 결과가 없습니다.",
    en: "No language found.",
    zh: "没有找到语言。",
  },
  "language.confirm": { ko: "적용하기", en: "Apply", zh: "应用" },
  "chat.verifyTitle": {
    ko: "학교 계정 인증",
    en: "Verify school account",
    zh: "验证学校账号",
  },
  "chat.verifyDescription": {
    ko: "멘토 프로그램은 재학생만 이용할 수 있어요. 학교 포털 ID로 본인 인증을 진행해 주세요.",
    en: "The mentor program is for enrolled students only. Please verify with your school portal ID.",
    zh: "导师项目仅限在校生使用。请用学校门户账号完成认证。",
  },
  "chat.verifyButton": {
    ko: "인증하고 멘토 확인하기",
    en: "Verify and view mentor",
    zh: "认证并查看导师",
  },
  "chat.goToMentor": {
    ko: "멘토 채팅 보러가기",
    en: "Open mentor chat",
    zh: "进入导师聊天",
  },
  "chat.matchTitle": {
    ko: "유학생 버디 프로그램",
    en: "International Buddy Program",
    zh: "留学生伙伴计划",
  },
  "chat.matchSubtitle": {
    ko: "멘토가 매칭되었어요. 먼저 인사를 건네 보세요.",
    en: "Your mentor has been matched. Start with a quick hello.",
    zh: "已经为你匹配导师了，先打个招呼吧。",
  },
  "chat.matchStatus": {
    ko: "매칭 완료 (진행 중)",
    en: "Matched (in progress)",
    zh: "匹配完成（进行中）",
  },
  "chat.enterRoom": {
    ko: "채팅방 입장하기",
    en: "Enter chat room",
    zh: "进入聊天房间",
  },
  "chat.mentorTopics": {
    ko: "멘토가 도와줄 수 있는 분야",
    en: "Topics your mentor can help with",
    zh: "导师可以帮助的主题",
  },
  "chat.quickAsk": {
    ko: "빠르게 물어보기",
    en: "Quick questions",
    zh: "快速提问",
  },
  "chat.placeholder": {
    ko: "메시지 보내기...",
    en: "Send a message...",
    zh: "发送消息...",
  },
} as const;

export type TranslationKey = keyof typeof APP_TRANSLATIONS;

export function localizeText(
  value: LocalizedText,
  language: LanguageCode,
): string {
  return value[language];
}

export function localizeTextList(
  value: LocalizedTextList,
  language: LanguageCode,
): string[] {
  return value[language];
}

const FILTER_LABELS: Record<string, LocalizedText> = {
  전체: { ko: "전체", en: "All", zh: "全部" },
  강의동: { ko: "강의동", en: "Academic", zh: "教学楼" },
  도서관: { ko: "도서관", en: "Library", zh: "图书馆" },
  식당: { ko: "식당", en: "Dining", zh: "食堂" },
  기숙사: { ko: "기숙사", en: "Dormitory", zh: "宿舍" },
};

export function getFilterLabel(filter: string, language: LanguageCode) {
  return FILTER_LABELS[filter]?.[language] ?? filter;
}

export function getLanguageDisplayName(language: LanguageCode) {
  const labels: Record<LanguageCode, string> = {
    ko: "한국어",
    en: "English",
    zh: "中文",
  };

  return labels[language];
}
