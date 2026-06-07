import { CampusPlace, PlaceFilter } from "@/types/map/placeType";

export const PLACE_FILTERS: PlaceFilter[] = [
  "전체",
  "강의동",
  "도서관",
  "식당",
  "기숙사",
];

export const CAMPUS_PLACES: CampusPlace[] = [
  {
    id: "shalom",
    name: { ko: "샬롬관", en: "Shalom Hall", zh: "沙龙馆" },
    subtitle: {
      ko: "기숙사 행정과 생활 안내를 담당하는 공간",
      en: "Dormitory support and residence guidance",
      zh: "负责宿舍行政与生活指导的空间",
    },
    latitude: 37.274914,
    longitude: 127.130064,
    category: "기숙사",
    location: {
      ko: "샬롬관 1층 안내 데스크",
      en: "Information desk, 1F Shalom Hall",
      zh: "沙龙馆 1层服务台",
    },
    hours: {
      ko: "24시간 운영",
      en: "Open 24 hours",
      zh: "24小时开放",
    },
    description: {
      ko: "입사와 생활 문의를 가장 먼저 도와주는 기숙사 지원 공간입니다.",
      en: "The main dormitory help point for move-in and residence questions.",
      zh: "这里是办理入住和咨询宿舍生活时最先会用到的支持点。",
    },
    tags: {
      ko: ["기숙사", "생활안내"],
      en: ["Dormitory", "Residence help"],
      zh: ["宿舍", "生活帮助"],
    },
    usageMethods: {
      ko: [
        "입사 일정이나 방 배정 문의는 1층 데스크에서 바로 안내받을 수 있습니다.",
        "학생증이나 기숙사 등록 정보를 준비하면 상담이 더 빠르게 진행됩니다.",
      ],
      en: [
        "Ask the first-floor desk about move-in dates or room assignments.",
        "Having your student ID or dormitory registration details ready will speed things up.",
      ],
      zh: [
        "关于入住日期和房间分配的问题，可以直接在一层服务台咨询。",
        "提前准备学生证或宿舍登记信息，会让咨询更顺利。",
      ],
    },
    notices: {
      ko: [
        "방문 가능 시간과 택배 보관 규정을 미리 확인해 주세요.",
        "학기 초 입사 일정은 국제학생지원 공지와 함께 확인하는 것이 좋습니다.",
      ],
      en: [
        "Check visitor hours and parcel rules in advance.",
        "Move-in schedules at the start of the semester are usually posted with international student notices.",
      ],
      zh: [
        "请提前确认访客时间和快递保管规定。",
        "学期初入住安排通常会和国际学生公告一起发布。",
      ],
    },
    relatedGuideTypes: ["DORMITORY", "DOCUMENT"],
  },
  {
    id: "humanities",
    name: { ko: "인문사회관", en: "Humanities Hall", zh: "人文社会馆" },
    subtitle: {
      ko: "인문사회 계열 수업과 학과 사무실이 모여 있는 건물",
      en: "Classrooms and department offices for humanities and social sciences",
      zh: "人文社会类课程与学科办公室所在建筑",
    },
    latitude: 37.275324,
    longitude: 127.13081,
    category: "강의동",
    location: {
      ko: "인문사회관 1층 로비",
      en: "Lobby, 1F Humanities Hall",
      zh: "人文社会馆 1层大厅",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "강의실과 학생 지원 공간이 함께 있어 처음 방문하는 학생도 찾기 쉬운 편입니다.",
      en: "A mix of classrooms and student support spaces, making it easy for first-time visitors to navigate.",
      zh: "这里有教室和学生支持空间，第一次来访的学生也比较容易找到。",
    },
    tags: {
      ko: ["강의동", "학생지원"],
      en: ["Academic", "Student support"],
      zh: ["教学楼", "学生支持"],
    },
    usageMethods: {
      ko: [
        "수업 전 강의실 배정표를 먼저 확인하고 이동하면 헷갈리지 않습니다.",
        "학과 사무실 문의는 평일 낮 시간대에 방문하는 것이 가장 빠릅니다.",
      ],
      en: [
        "Check the classroom assignment board before class to avoid confusion.",
        "Department offices are easiest to visit during weekday office hours.",
      ],
      zh: [
        "上课前先确认教室分配表，会更容易找到正确位置。",
        "如果要咨询学科办公室，工作日白天去最方便。",
      ],
    },
    notices: {
      ko: [
        "시험 기간에는 일부 강의실 사용 일정이 바뀔 수 있습니다.",
        "저녁 시간에는 일부 출입문만 열려 있을 수 있습니다.",
      ],
      en: [
        "Room schedules may change during exam periods.",
        "Only some entrances may remain open in the evening.",
      ],
      zh: [
        "考试期间部分教室安排可能会调整。",
        "晚上可能只开放部分出入口。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "arts",
    name: { ko: "예술관", en: "Arts Hall", zh: "艺术馆" },
    subtitle: {
      ko: "실습실과 작업 공간이 포함된 예술 계열 건물",
      en: "Arts building with studios and practice rooms",
      zh: "包含工作室和练习室的艺术类建筑",
    },
    latitude: 37.276034,
    longitude: 127.130891,
    category: "강의동",
    location: {
      ko: "예술관 1층 출입구",
      en: "Main entrance, 1F Arts Hall",
      zh: "艺术馆 1层入口",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "전공 실습과 프로젝트 작업이 자주 이루어지는 공간입니다.",
      en: "A creative space used for major practice classes and project work.",
      zh: "这里经常用于专业实践课程和项目制作。",
    },
    tags: {
      ko: ["강의동", "실습공간"],
      en: ["Academic", "Studio"],
      zh: ["教学楼", "实践空间"],
    },
    usageMethods: {
      ko: [
        "전공 수업 일정에 맞춰 지정된 실습실과 스튜디오를 이용합니다.",
        "장비 사용 전에는 조교나 교수님의 안내를 먼저 확인해 주세요.",
      ],
      en: [
        "Use the assigned practice room or studio based on your class schedule.",
        "Check instructions from your assistant or professor before using equipment.",
      ],
      zh: [
        "请根据课程安排使用指定的练习室或工作室。",
        "使用设备前，先确认助教或教授的说明。",
      ],
    },
    notices: {
      ko: [
        "실습 장비는 허가 없이 이동하거나 반출할 수 없습니다.",
        "전시 준비 기간에는 일부 동선이 제한될 수 있습니다.",
      ],
      en: [
        "Practice equipment cannot be moved or taken out without permission.",
        "Some paths may be restricted during exhibition setup periods.",
      ],
      zh: [
        "未经许可不能移动或带出练习设备。",
        "展览准备期间，部分动线可能会受限。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "library",
    name: { ko: "후생관", en: "Welfare Hall", zh: "厚生馆" },
    subtitle: {
      ko: "학생 편의시설과 휴게 공간이 함께 있는 건물",
      en: "Building with student amenities and lounge spaces",
      zh: "集学生便利设施与休息空间于一体的建筑",
    },
    latitude: 37.276887,
    longitude: 127.13354,
    category: "식당",
    location: {
      ko: "후생관 1층 안내",
      en: "Information area, 1F Welfare Hall",
      zh: "厚生馆 1层服务区",
    },
    hours: {
      ko: "09:00 - 20:00",
      en: "09:00 - 20:00",
      zh: "09:00 - 20:00",
    },
    description: {
      ko: "후생관은 학생들이 자주 이용하는 편의시설과 휴게 공간이 모여 있어 이동 중 들르기 좋은 건물입니다.",
      en: "Welfare Hall is a convenient stop with student amenities and shared rest areas.",
      zh: "厚生馆汇集了学生常用的便利设施和休息空间，途中经过时也很方便停留。",
    },
    tags: {
      ko: ["식당", "편의시설"],
      en: ["Dining", "Facilities"],
      zh: ["餐饮", "便利设施"],
    },
    usageMethods: {
      ko: [
        "방문 전 이용하려는 시설이나 매장의 운영 시간을 먼저 확인해 주세요.",
        "처음 방문할 때는 1층 안내를 기준으로 이동하면 찾기 수월합니다.",
      ],
      en: [
        "Check the hours of the facility or service you plan to use before visiting.",
        "If this is your first visit, start from the first-floor information area.",
      ],
      zh: [
        "到访前请先确认要使用的设施或服务的开放时间。",
        "如果是第一次来，可以先从一层服务区开始找路。",
      ],
    },
    notices: {
      ko: [
        "일부 시설은 학사 일정이나 행사에 따라 운영 시간이 바뀔 수 있습니다.",
        "혼잡 시간대에는 이용 대기나 좌석 부족이 있을 수 있습니다.",
      ],
      en: [
        "Some services may change hours depending on the academic calendar or events.",
        "Busy periods may involve waiting times or limited seating.",
      ],
      zh: [
        "部分设施会因校历或活动而调整开放时间。",
        "高峰时段可能需要排队或出现座位不足。",
      ],
    },
    relatedGuideTypes: ["CAFETERIA", "DOCUMENT"],
  },
  {
    id: "centralLibrary",
    name: { ko: "중앙도서관", en: "Central Library", zh: "中央图书馆" },
    subtitle: {
      ko: "열람실과 그룹 스터디 공간을 함께 이용할 수 있는 학습 공간",
      en: "Study space with reading rooms and group study areas",
      zh: "可同时使用阅览室和小组学习区的学习空间",
    },
    latitude: 37.276482,
    longitude: 127.132361,
    category: "도서관",
    location: {
      ko: "중앙도서관 1층 안내 데스크",
      en: "Information desk, 1F Central Library",
      zh: "中央图书馆 1层服务台",
    },
    hours: {
      ko: "09:00 - 22:00",
      en: "09:00 - 22:00",
      zh: "09:00 - 22:00",
    },
    description: {
      ko: "조용한 열람실부터 그룹 스터디 공간까지 다양하게 활용할 수 있는 대표 학습 공간입니다.",
      en: "One of the main study spots on campus, from quiet reading rooms to group study zones.",
      zh: "这里是校园代表性的学习空间，从安静阅览室到小组学习区都可以使用。",
    },
    tags: {
      ko: ["도서관", "스터디룸"],
      en: ["Library", "Study room"],
      zh: ["图书馆", "自习室"],
    },
    usageMethods: {
      ko: [
        "학생증이나 모바일 학생증으로 출입할 수 있습니다.",
        "스터디룸은 홈페이지나 현장 예약 시스템을 통해 이용 가능 여부를 확인해 주세요.",
      ],
      en: [
        "You can enter with your student ID or mobile ID.",
        "Check study room availability through the website or local booking system.",
      ],
      zh: [
        "可以使用学生证或电子学生证入馆。",
        "请通过网站或现场预约系统确认自习室是否可用。",
      ],
    },
    notices: {
      ko: [
        "시험 기간에는 운영 시간이 연장될 수 있습니다.",
        "대출 규정은 학적 상태에 따라 달라질 수 있습니다.",
      ],
      en: [
        "Hours may be extended during exam periods.",
        "Borrowing rules can vary depending on student status.",
      ],
      zh: [
        "考试期间开放时间可能会延长。",
        "借阅规定会因学生身份不同而有所差异。",
      ],
    },
    relatedGuideTypes: ["LIBRARY", "DOCUMENT"],
  },
  {
    id: "uwon",
    name: { ko: "우원관", en: "Uwon Hall", zh: "友园馆" },
    subtitle: {
      ko: "학생들이 자주 오가는 캠퍼스 건물",
      en: "Campus building frequently used by students",
      zh: "学生经常往来的校园建筑",
    },
    latitude: 37.275814,
    longitude: 127.131752,
    category: "강의동",
    location: {
      ko: "우원관 1층 로비",
      en: "Lobby, 1F Uwon Hall",
      zh: "友园馆 1层大厅",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "우원관은 수업이나 약속을 위해 학생들이 자주 오가는 건물로, 캠퍼스 이동 동선에서 찾기 쉬운 편입니다.",
      en: "Uwon Hall is easy to spot along a common campus route used for classes and meetings.",
      zh: "友园馆位于学生上课和活动常走的路线上，相对容易找到。",
    },
    tags: {
      ko: ["강의동", "캠퍼스"],
      en: ["Academic", "Campus"],
      zh: ["教学楼", "校园"],
    },
    usageMethods: {
      ko: [
        "방문 전 강의실이나 목적지 위치를 먼저 확인해 주세요.",
        "처음 방문할 때는 1층 로비를 기준으로 이동하면 편리합니다.",
      ],
      en: [
        "Check your classroom or destination before entering the building.",
        "If this is your first visit, use the first-floor lobby as your reference point.",
      ],
      zh: [
        "进入前请先确认教室或目的地位置。",
        "如果是第一次来，可以先以一层大厅为基准找路。",
      ],
    },
    notices: {
      ko: [
        "수업이나 행사 일정에 따라 일부 공간 출입이 제한될 수 있습니다.",
        "건물 이용 시간은 학사 일정에 따라 달라질 수 있습니다.",
      ],
      en: [
        "Access to some areas may be limited depending on classes or events.",
        "Building hours may vary depending on the academic schedule.",
      ],
      zh: [
        "根据课程或活动安排，部分区域可能限制进入。",
        "建筑开放时间可能会随校历调整。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "engineering",
    name: { ko: "이공관", en: "Engineering Hall", zh: "理工馆" },
    subtitle: {
      ko: "공학 계열 수업과 실습이 집중된 건물",
      en: "Engineering classrooms and lab spaces",
      zh: "工程类课程与实验空间集中的建筑",
    },
    latitude: 37.277083,
    longitude: 127.13419,
    category: "강의동",
    location: {
      ko: "이공관 1층 로비",
      en: "Lobby, 1F Engineering Hall",
      zh: "理工馆 1层大厅",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "강의실과 실험실이 함께 있어 전공 수업 이동이 잦은 곳입니다.",
      en: "A busy academic building with both lecture rooms and labs.",
      zh: "这里既有教室也有实验室，是工学课程经常往返的建筑。",
    },
    tags: {
      ko: ["강의동", "실험실"],
      en: ["Academic", "Laboratory"],
      zh: ["教学楼", "实验室"],
    },
    usageMethods: {
      ko: [
        "실험 수업 전에는 준비물과 안전 수칙을 먼저 확인하세요.",
        "층별 강의실 배치가 자주 바뀔 수 있어 수업 공지를 함께 보는 것이 좋습니다.",
      ],
      en: [
        "Review required materials and safety rules before lab classes.",
        "Room assignments may change, so check class notices together.",
      ],
      zh: [
        "实验课前请先确认所需物品和安全规则。",
        "各楼层教室安排可能会变化，最好同时查看课程公告。",
      ],
    },
    notices: {
      ko: [
        "실험실은 허가된 시간에만 이용할 수 있습니다.",
        "보호 장비가 필요한 공간은 조교 안내를 따라 주세요.",
      ],
      en: [
        "Laboratories may only be used during approved hours.",
        "Follow assistant guidance in spaces that require protective gear.",
      ],
      zh: [
        "实验室只能在允许的时间内使用。",
        "需要防护装备的空间请遵循助教指引。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "simjeon",
    name: { ko: "심전관", en: "Simjeon Hall", zh: "心田馆" },
    subtitle: {
      ko: "생활 편의와 학생 활동이 함께 이루어지는 건물",
      en: "Building for student life and shared activities",
      zh: "兼具学生生活与活动功能的建筑",
    },
    latitude: 37.277951,
    longitude: 127.134743,
    category: "강의동",
    location: {
      ko: "심전관 1층 중앙홀",
      en: "Central hall, 1F Simjeon Hall",
      zh: "心田馆 1层中央大厅",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "학생 행사와 안내가 자주 열리는 곳이라 처음 온 학생도 방문 빈도가 높습니다.",
      en: "A frequently used student activity building that many new students visit early on.",
      zh: "学生活动和说明会经常在这里举行，很多新生都会较早来到这里。",
    },
    tags: {
      ko: ["강의동", "학생활동"],
      en: ["Academic", "Student activity"],
      zh: ["教学楼", "学生活动"],
    },
    usageMethods: {
      ko: [
        "행사 안내문이나 게시판을 확인하면 필요한 정보를 빠르게 찾을 수 있습니다.",
        "처음 방문할 때는 로비 안내 배치를 보고 이동하는 것이 편합니다.",
      ],
      en: [
        "Check event boards and posters to find information quickly.",
        "When visiting for the first time, follow the lobby layout signs.",
      ],
      zh: [
        "查看活动公告和布告板，可以更快找到需要的信息。",
        "第一次来时，按照大厅的导览图移动会更方便。",
      ],
    },
    notices: {
      ko: [
        "행사 진행 중에는 일부 공간 출입이 제한될 수 있습니다.",
        "주말 운영 여부는 행사 일정에 따라 달라질 수 있습니다.",
      ],
      en: [
        "Some areas may be restricted during events.",
        "Weekend access can depend on the event schedule.",
      ],
      zh: [
        "活动期间部分空间可能会限制进入。",
        "周末是否开放会根据活动安排而变化。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "main",
    name: { ko: "경천관", en: "Gyeongcheon Hall", zh: "景天馆" },
    subtitle: {
      ko: "강의와 학생 프로그램이 함께 운영되는 건물",
      en: "Building used for classes and student programs",
      zh: "用于课程和学生项目的建筑",
    },
    latitude: 37.276554,
    longitude: 127.134074,
    category: "강의동",
    location: {
      ko: "경천관 1층 로비",
      en: "Lobby, 1F Gyeongcheon Hall",
      zh: "景天馆 1层大厅",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "소규모 프로그램과 모임이 자주 열려 학생 이동이 많은 편입니다.",
      en: "A building often used for small programs, meetings, and regular classes.",
      zh: "这里经常举办小型项目、会议和课程，学生往来较多。",
    },
    tags: {
      ko: ["강의동", "프로그램"],
      en: ["Academic", "Programs"],
      zh: ["教学楼", "项目活动"],
    },
    usageMethods: {
      ko: [
        "프로그램 참여 전에는 시간과 강의실 위치를 다시 한 번 확인해 주세요.",
        "모임 공간은 운영 일정에 따라 임시 변경될 수 있습니다.",
      ],
      en: [
        "Double-check the time and room location before joining a program.",
        "Meeting spaces may change depending on the day’s schedule.",
      ],
      zh: [
        "参加项目活动前，请再次确认时间和教室位置。",
        "会议空间可能会根据当天安排临时调整。",
      ],
    },
    notices: {
      ko: [
        "행사일에는 로비가 혼잡할 수 있습니다.",
        "일부 강의실은 예약 상황에 따라 개방 시간이 달라질 수 있습니다.",
      ],
      en: [
        "The lobby may be crowded on event days.",
        "Some rooms may open at different times depending on reservations.",
      ],
      zh: [
        "有活动的日子大厅可能会比较拥挤。",
        "部分教室的开放时间会根据预约情况变化。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "gyeongcheon",
    name: { ko: "본관", en: "Main Building", zh: "本馆" },
    subtitle: {
      ko: "행정 서비스와 주요 창구가 모여 있는 중심 건물",
      en: "Central administrative building for major services",
      zh: "集中主要行政服务窗口的核心建筑",
    },
    latitude: 37.276039,
    longitude: 127.133279,
    category: "강의동",
    location: {
      ko: "본관 1층 행정 안내",
      en: "Administrative help desk, 1F Main Building",
      zh: "本馆 1层行政服务台",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "학사행정과 각종 증명서, 주요 행정 문의를 연결해 주는 대표 건물입니다.",
      en: "The main place for academic administration, certificates, and common office inquiries.",
      zh: "这里是办理学籍行政、证明文件和常见行政咨询的代表性建筑。",
    },
    tags: {
      ko: ["행정", "증명서"],
      en: ["Administration", "Certificates"],
      zh: ["行政", "证明文件"],
    },
    usageMethods: {
      ko: [
        "행정 창구 방문 전 필요한 서류와 운영 시간을 먼저 확인해 주세요.",
        "처음 발급받는 서류는 제출처와 언어 버전을 함께 확인하면 실수를 줄일 수 있습니다.",
      ],
      en: [
        "Check required documents and office hours before visiting the counter.",
        "For first-time requests, confirm the destination and language version of your document.",
      ],
      zh: [
        "前往行政窗口前，请先确认所需材料和办公时间。",
        "第一次办理文件时，最好确认提交机构和所需语言版本。",
      ],
    },
    notices: {
      ko: [
        "점심시간에는 일부 창구 대기가 길어질 수 있습니다.",
        "증명서 발급 정책은 학기별로 조금씩 달라질 수 있습니다.",
      ],
      en: [
        "Some counters may have longer waits around lunchtime.",
        "Certificate policies can change slightly by semester.",
      ],
      zh: [
        "午餐时间部分窗口可能排队较久。",
        "证明文件政策可能会随学期略有调整。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
  {
    id: "cheoneun",
    name: { ko: "천은관", en: "Cheoneun Hall", zh: "天恩馆" },
    subtitle: {
      ko: "학생들이 자주 이용하는 캠퍼스 건물",
      en: "Campus building frequently used by students",
      zh: "学生经常使用的校园建筑",
    },
    latitude: 37.275716,
    longitude: 127.134236,
    category: "강의동",
    location: {
      ko: "천은관 1층 로비",
      en: "Lobby, 1F Cheoneun Hall",
      zh: "天恩馆 1层大厅",
    },
    hours: {
      ko: "09:00 - 18:00",
      en: "09:00 - 18:00",
      zh: "09:00 - 18:00",
    },
    description: {
      ko: "천은관은 학생들이 자주 지나는 동선에 있어 처음 방문할 때도 비교적 찾기 쉬운 편입니다.",
      en: "Cheoneun Hall is easy to find and sits along one of the main pedestrian routes on campus.",
      zh: "天恩馆位于校园主要步行路线旁，初次来访也比较容易找到。",
    },
    tags: {
      ko: ["강의동", "편의시설"],
      en: ["Academic", "Facilities"],
      zh: ["教学楼", "便利设施"],
    },
    usageMethods: {
      ko: [
        "건물 방문 전 강의실이나 목적지 위치를 먼저 확인해 주세요.",
        "처음 방문할 때는 1층 로비를 기준으로 이동하면 찾기 수월합니다.",
      ],
      en: [
        "Check the floor and room location that matches your destination before entering.",
        "If this is your first visit, use the first-floor lobby as your starting point.",
      ],
      zh: [
        "进入建筑前，请先确认目的地所在楼层和教室位置。",
        "如果是第一次来，可以先从一层大厅开始找路。",
      ],
    },
    notices: {
      ko: [
        "행사나 수업 일정에 따라 일부 공간 출입이 제한될 수 있습니다.",
        "건물 이용 시간은 학사 일정에 따라 달라질 수 있으니 현장 안내를 확인해 주세요.",
      ],
      en: [
        "Access to some areas may be limited depending on classes or events.",
        "Building access hours may vary by academic schedule, so check local notices.",
      ],
      zh: [
        "根据课程或活动安排，部分区域可能会限制进入。",
        "开放时间可能会随校历调整，请确认现场公告。",
      ],
    },
    relatedGuideTypes: ["DOCUMENT"],
  },
];

export function getCampusPlaceById(placeId: string) {
  return CAMPUS_PLACES.find((place) => place.id === placeId);
}
