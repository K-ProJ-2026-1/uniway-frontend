import { GuideListType } from "@/types/guide/guideType";

export const GUIDE_LIST: GuideListType[] = [
  {
    id: 1,
    type: "CAFETERIA",
    title: {
      ko: "식당 이용 안내",
      en: "Dining Guide",
      zh: "食堂使用指南",
    },
    description: {
      ko: "학생식당 이용 시간과 결제 방법을 확인해 보세요.",
      en: "Check cafeteria hours and payment methods.",
      zh: "查看学生食堂的开放时间和支付方式。",
    },
    sections: [
      {
        id: 1,
        title: {
          ko: "결제 방법",
          en: "Payment methods",
          zh: "支付方式",
        },
        content: {
          ko: "학생증과 모바일 결제가 가능하며, 일부 코너는 카드 결제도 지원합니다.",
          en: "You can pay with your student ID or mobile payment. Some counters also accept cards.",
          zh: "可以使用学生证或手机支付，部分窗口也支持银行卡支付。",
        },
      },
      {
        id: 2,
        title: {
          ko: "이용 팁",
          en: "Tips",
          zh: "使用提示",
        },
        content: {
          ko: "점심시간 직전에는 대기 줄이 길어질 수 있으니 11시대 초반 방문이 가장 여유롭습니다.",
          en: "Lines get longer before lunch. Visiting earlier in the 11 o'clock hour is usually easier.",
          zh: "午餐前排队会变长，11点刚过时通常更轻松。",
        },
      },
    ],
  },
  {
    id: 2,
    type: "LIBRARY",
    title: {
      ko: "도서관 이용 안내",
      en: "Library Guide",
      zh: "图书馆使用指南",
    },
    description: {
      ko: "출입, 열람실, 스터디룸 예약 방법을 정리했어요.",
      en: "Entry, reading rooms, and study room reservations in one place.",
      zh: "整理了入馆、阅览室和自习室预约方式。",
    },
    sections: [
      {
        id: 1,
        title: {
          ko: "출입과 대출",
          en: "Entry and borrowing",
          zh: "入馆与借阅",
        },
        content: {
          ko: "학생증 또는 모바일 학생증으로 출입할 수 있고, 대출 권수는 학적 상태에 따라 달라질 수 있습니다.",
          en: "You can enter with your student ID or mobile ID. Borrowing limits may vary by student status.",
          zh: "可使用学生证或电子学生证入馆，借阅数量会因学籍状态而不同。",
        },
      },
      {
        id: 2,
        title: {
          ko: "스터디룸 예약",
          en: "Study room booking",
          zh: "自习室预约",
        },
        content: {
          ko: "스터디룸은 보통 도서관 홈페이지 또는 현장 키오스크로 예약할 수 있습니다.",
          en: "Study rooms can usually be reserved through the library website or on-site kiosk.",
          zh: "自习室通常可以通过图书馆网站或现场自助机预约。",
        },
      },
    ],
  },
  {
    id: 3,
    type: "DORMITORY",
    title: {
      ko: "기숙사 안내",
      en: "Dormitory Guide",
      zh: "宿舍指南",
    },
    description: {
      ko: "입사 절차와 생활 규정을 확인할 수 있어요.",
      en: "Review move-in steps and residence rules.",
      zh: "可以查看入住流程和生活规定。",
    },
    sections: [
      {
        id: 1,
        title: {
          ko: "입사 절차",
          en: "Move-in process",
          zh: "入住流程",
        },
        content: {
          ko: "학기 시작 전 학교 포털에서 입사 신청을 진행하고, 국제학생지원 공지에서 일정과 준비 서류를 꼭 확인해 주세요.",
          en: "Apply through the school portal before the semester starts and check international student notices for dates and required documents.",
          zh: "请在学期开始前通过学校门户申请入住，并查看国际学生公告中的日期和所需材料。",
        },
      },
      {
        id: 2,
        title: {
          ko: "생활 규정",
          en: "Residence rules",
          zh: "住宿规定",
        },
        content: {
          ko: "방문 가능 시간, 택배 보관 방식, 공용 공간 사용 규칙을 미리 확인하면 생활이 더 편합니다.",
          en: "Check visitor hours, parcel storage, and shared space rules in advance for a smoother stay.",
          zh: "提前确认访客时间、快递保管方式和公共空间规则，会让住宿更顺利。",
        },
      },
    ],
  },
  {
    id: 4,
    type: "HEALTH",
    title: {
      ko: "건강 관리 안내",
      en: "Health Support Guide",
      zh: "健康支持指南",
    },
    description: {
      ko: "병원 방문 전 알아두면 좋은 기본 정보를 모았습니다.",
      en: "Basic information to know before visiting a clinic or hospital.",
      zh: "整理了去诊所或医院前值得了解的基本信息。",
    },
    sections: [
      {
        id: 1,
        title: {
          ko: "진료 전 준비",
          en: "Before your visit",
          zh: "就诊前准备",
        },
        content: {
          ko: "여권, 외국인등록증, 보험 관련 서류를 챙겨 두면 접수 과정이 빠릅니다.",
          en: "Bring your passport, residence card, and insurance documents to speed up registration.",
          zh: "带上护照、外国人登录证和保险材料，可以让挂号更顺利。",
        },
      },
      {
        id: 2,
        title: {
          ko: "도움 요청",
          en: "Asking for help",
          zh: "寻求帮助",
        },
        content: {
          ko: "진료 예약이나 통역이 필요하면 국제학생지원팀이나 멘토에게 먼저 도움을 요청해도 좋습니다.",
          en: "If you need help with appointments or interpretation, ask the international student office or your mentor first.",
          zh: "如果需要预约或翻译帮助，可以先联系国际学生办公室或导师。",
        },
      },
    ],
  },
  {
    id: 5,
    type: "TRANSPORT",
    title: {
      ko: "교통 이용 안내",
      en: "Transportation Guide",
      zh: "交通指南",
    },
    description: {
      ko: "학교 주변 이동과 대중교통 이용 팁을 확인해 보세요.",
      en: "Tips for moving around campus and using public transportation.",
      zh: "查看校园周边移动和公共交通使用技巧。",
    },
    sections: [
      {
        id: 1,
        title: {
          ko: "교내 이동",
          en: "Moving around campus",
          zh: "校内移动",
        },
        content: {
          ko: "수업 사이 이동 시간이 짧을 수 있으니 강의실 위치를 미리 확인하는 것이 좋습니다.",
          en: "Travel time between classes can be tight, so it helps to check classroom locations in advance.",
          zh: "课间移动时间可能比较紧，建议提前确认教室位置。",
        },
      },
      {
        id: 2,
        title: {
          ko: "대중교통 이용",
          en: "Public transit",
          zh: "公共交通",
        },
        content: {
          ko: "버스나 지하철 노선은 지도 앱으로 함께 확인하면 더 정확하고, 늦은 시간 귀가 시 막차 시간을 꼭 확인해 주세요.",
          en: "Use a map app to double-check bus and subway routes, and remember to check the last service time at night.",
          zh: "建议结合地图应用确认公交或地铁线路，晚归时一定要查看末班时间。",
        },
      },
    ],
  },
  {
    id: 6,
    type: "DOCUMENT",
    title: {
      ko: "서류 발급 안내",
      en: "Document Guide",
      zh: "证明文件指南",
    },
    description: {
      ko: "증명서 발급과 행정 창구 이용 흐름을 정리했어요.",
      en: "A quick guide to certificates and administrative offices.",
      zh: "整理了证明文件开具和行政窗口使用流程。",
    },
    sections: [
      {
        id: 1,
        title: {
          ko: "증명서 발급",
          en: "Issuing certificates",
          zh: "开具证明",
        },
        content: {
          ko: "재학증명서, 성적증명서 같은 기본 서류는 포털 또는 무인발급기를 통해 신청할 수 있습니다.",
          en: "Basic documents such as enrollment and transcript certificates can be requested through the portal or self-service kiosk.",
          zh: "在学证明、成绩证明等基础文件可通过门户或自助机申请。",
        },
      },
      {
        id: 2,
        title: {
          ko: "행정 문의",
          en: "Administrative inquiries",
          zh: "行政咨询",
        },
        content: {
          ko: "처음 서류를 준비할 때는 필요한 제출처와 언어, 원본 여부를 함께 확인하는 것이 가장 안전합니다.",
          en: "When preparing documents for the first time, confirm the destination, language, and whether an original copy is required.",
          zh: "第一次准备文件时，最好同时确认提交机构、语言版本以及是否需要原件。",
        },
      },
    ],
  },
];
