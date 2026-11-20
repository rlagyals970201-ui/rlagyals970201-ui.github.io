/* =====================================================
   영상 작업물 목록
   - url 에 유튜브 주소를 그대로 붙여 넣으면 됩니다.
     (youtube.com/watch?v=..., youtu.be/..., shorts/... 모두 가능)
   - 순서대로 가로 슬라이드에 표시됩니다. 항목은 몇 개든 추가·삭제 가능.
   - 세로 숏폼(9:16)은 shorts 주소를 쓰면 자동 인식되고,
     일반 주소라면 format: "short" 를 추가하면 됩니다.
   - url 이 비어 있으면 번호만 있는 빈 칸으로 보입니다.
   ===================================================== */

window.WORKS = [
  {
    title: "박영목 연세더바로병원 대표원장 인터뷰",
    category: "Interview",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=9udzdGiaSx8"
  },
  {
    title: "대한무에타이협회 이우찬 부회장 단독 인터뷰",
    category: "Interview",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=bomG4oWX7Jg"
  },
  {
    title: "호텔 더 디자이너스 리즈 강남 프리미어 김대유 총지배인 인터뷰",
    category: "Interview",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=u_TtfMgkE1A"
  },
  {
    title: "인도네시아 K-POP 인플루언서 다니엘 헤르만시야 단독 인터뷰",
    category: "Interview",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=ebfg6C140b4"
  },
  {
    title: "변호사가 보는 노키즈존, 과연 어디까지 차별일까?",
    category: "YouTube Content",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=OajTZtMID2w"
  },
  {
    title: "빙빙이와 효밍이의 히로시마 3박4일 여행",
    category: "Vlog",
    year: "2026",
    role: "Edit / Design",
    url: "https://youtu.be/z6cYzkY08_4"
  },
  {
    title: "관리비 냈으면 화재보험 안 들어도 될까? 전세 세입자가 빚더미에 앉는 이유",
    category: "YouTube Content",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=nYRkpohFRlQ"
  },
  {
    title: "길 가다 넘어졌다면? 지자체에서 병원비 받는 법 — 영조물 배상책임",
    category: "YouTube Content",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=7cjupAlOkIg"
  },
  {
    title: "대한무에타이협회장 최광진 단독 인터뷰",
    category: "Interview",
    year: "2026",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=dMkGr2oI5hc"
  },
  {
    title: "미대편입창조 패션디자인반 수강생 인터뷰",
    category: "Interview",
    year: "2023",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=aCSKPu8hw0k"
  },
  {
    title: "미대편입 4개월 만에 3관왕! 수원대·남서울대·협성대",
    category: "YouTube Content",
    year: "2023",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=OMr3xs2qI40"
  },
  {
    title: "공포게임 마니아들의 REPO 합방",
    category: "Gaming",
    year: "2025",
    role: "Edit / Design",
    url: "https://www.youtube.com/watch?v=KcAXEx-FrZY"
  },
  {
    title: "울트라나노 스포츠크림 남성 버전 — AI 광고 영상",
    category: "AI Ad",
    year: "2026",
    role: "AI Video / Edit",
    url: "https://youtube.com/shorts/2X6qhedsVSE"
  },
  {
    title: "울트라나노 스포츠크림 여성 버전 — AI 광고 영상",
    category: "AI Ad",
    year: "2026",
    role: "AI Video / Edit",
    url: "https://youtube.com/shorts/4kOdeg5ZmXQ"
  },
  {
    title: "명지대학교 웹앱 사이트 홍보 영상",
    category: "Promotion",
    year: "2026",
    role: "Edit / Design",
    url: "https://youtu.be/5GQLxSA_zxo"
  },
  {
    title: "결혼식 식전 영상",
    category: "Wedding Film",
    year: "2026",
    role: "Edit / Design",
    url: "https://youtu.be/DH6sgGhdlwo"
  }
];


/* =====================================================
   이미지 작업물 (Selected Works 의 Image 탭)
   - 이미지 파일은 assets/img/art/ 에 넣고 img 에 경로를 적어 주세요.
   - url 은 눌렀을 때 이동할 주소입니다(아트스테이션 등).
   - category 를 적으면 카드에 분류가 표시됩니다(기본: Illustration).
   - url 을 비워 두면 누를 때 이미지를 크게 보여 줍니다.
   - frame: "wide" 는 가로형(명함·배너·썸네일), "tall" 은 세로 배너, 비우면 정사각입니다.
   ===================================================== */

window.ART = [
  /* 디자인 작업물: url 이 없으면 누를 때 크게 보기로 열립니다.
     frame: "wide"(16:9) / "tall"(세로 배너) / "square"(정사각, 기본) */
  { title: "애모모 유튜브 썸네일", category: "Thumbnail", img: "assets/img/design/amomo-thumbnail-1.jpg", frame: "wide" },
  { title: "애모모 썸네일 — 첫 시참비 10만원", category: "Thumbnail", img: "assets/img/design/amomo-thumbnail-2.jpg", frame: "wide" },
  { title: "미디어데일리 메인 배너", category: "Web Banner", img: "assets/img/design/mediadaily-main-banner.jpg", frame: "wide" },
  { title: "미디어데일리 × GBW 업무협약식 배너", category: "Event Banner", img: "assets/img/design/mediadaily-gbw-banner.jpg", frame: "wide" },
  { title: "법률사무소 다연 보험전문센터 배너", category: "Web Banner", img: "assets/img/design/dayeon-insurance-banner.jpg", frame: "wide" },
  { title: "보험톡톡 X배너 — 유리 파손 보상", category: "Standing Banner", img: "assets/img/design/standing-banner-1.jpg", frame: "tall" },
  { title: "보험톡톡 X배너 — 손해사정사 소개", category: "Standing Banner", img: "assets/img/design/standing-banner-2.jpg", frame: "tall" },
  { title: "애모모 유튜브 채널 배너", category: "Channel Art", img: "assets/img/design/amomo-channel-banner.jpg", frame: "wide" },
  { title: "애매모모 채널 배너", category: "Channel Art", img: "assets/img/design/aemaemomo-banner.jpg", frame: "wide" },
  { title: "CL SKIN LAB 명함 — 앞면", category: "Business Card", img: "assets/img/design/clskinlab-card-front.jpg", frame: "wide" },
  { title: "CL SKIN LAB 명함 — 뒷면", category: "Business Card", img: "assets/img/design/clskinlab-card-back.jpg", frame: "wide" },
  { title: "PAYPASS 명함", category: "Business Card", img: "assets/img/design/paypass-card.jpg", frame: "wide" },
  { title: "법률사무소 다연 명함", category: "Business Card", img: "assets/img/design/dayeon-card.jpg", frame: "wide" },
  { title: "가족 단체티 캐릭터 디자인", category: "Merch Design", img: "assets/img/design/family-tshirt.jpg", frame: "square" },
  { title: "꽃나이 협동조합 탑차 랩핑 디자인", category: "Vehicle Design", img: "assets/img/design/kkotnai-truck-wrap.jpg", frame: "wide" },

  /* 아트스테이션 일러스트 */
    { title: "Year of the Blue Dragon", img: "assets/img/art/blue-dragon.jpg", url: "https://www.artstation.com/artwork/RywNOO" },
    { title: "Saintess", img: "assets/img/art/saintess.jpg", url: "https://www.artstation.com/artwork/OGDwOb" },
    { title: "Illustration — Phone Wallpaper", img: "assets/img/art/phone-wallpaper-illustration.jpg", url: "https://www.artstation.com/artwork/5vvrnJ" },
    { title: "Unknown Chinese Lady", img: "assets/img/art/unknown-chinese-lady.jpg", url: "https://www.artstation.com/artwork/5vv3Lw" },
    { title: "Blue Moon Mafia — Group Photo", img: "assets/img/art/blue-moon-mafia.jpg", url: "https://www.artstation.com/artwork/m88Qke" },
    { title: "RED SUN — Fighting Dog", img: "assets/img/art/red-sun-fighting-dog.jpg", url: "https://www.artstation.com/artwork/Zev2KN" },
    { title: "RED SUN — Assassin", img: "assets/img/art/red-sun-assassin.jpg", url: "https://www.artstation.com/artwork/X1QEm3" },
    { title: "Successful Fan", img: "assets/img/art/successful-fan.jpg", url: "https://www.artstation.com/artwork/r9GELJ" },
    { title: "Arcane Motive", img: "assets/img/art/arcane-motive.jpg", url: "https://www.artstation.com/artwork/Pe6NE1" },
    { title: "Gold Eagle Knight", img: "assets/img/art/gold-eagle-knight.jpg", url: "https://www.artstation.com/artwork/Kr0Vd4" },
    { title: "Concept Design", img: "assets/img/art/concept-design.jpg", url: "https://www.artstation.com/artwork/ea10dX" },
    { title: "Men", img: "assets/img/art/men.jpg", url: "https://www.artstation.com/artwork/R3lq9W" },
    { title: "Chess — Pawn", img: "assets/img/art/chess-pawn.jpg", url: "https://www.artstation.com/artwork/5XQRzg" }
];
