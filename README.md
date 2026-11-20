# HYOMIN KIM

영상편집자 · 디자이너 김효민 포트폴리오 웹사이트입니다.
빌드 도구 없이 HTML / CSS / JS 만으로 만들어서 GitHub Pages 에 그대로 올릴 수 있습니다.

```
pf_2/
├─ index.html        페이지 본문 (문구 수정은 여기서)
├─ css/style.css     디자인
├─ js/works.js       ← 영상 목록 (유튜브 링크는 여기에)
├─ js/main.js        슬라이드 · 팝업 · 애니메이션
└─ assets/img/       프로필 사진 등 이미지
```

## 1. 영상 추가하기

`js/works.js` 를 열고 `url` 에 유튜브 주소를 붙여 넣으면 됩니다.

```js
{
  title: "브랜드 필름 — OOO",
  category: "Brand Film",
  year: "2026",
  role: "Edit / Design",
  url: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
},
```

- `youtube.com/watch?v=`, `youtu.be/`, `shorts/` 주소를 모두 지원합니다.
- 썸네일은 유튜브에서 자동으로 가져옵니다.
- 순서대로 가로 슬라이드에 표시됩니다. 항목을 복사해 붙이면 늘어나고, 지우면 줄어듭니다.
- 세로 숏폼은 `shorts/` 주소면 자동 인식되고, 아니면 `format: "short"` 를 추가하세요. 숏폼은 가로 영상과 높이를 맞춘 세로 카드(9:16)로 보입니다.

## 2. 프로필 사진

`assets/img/profile.jpg` 이름으로 사진을 넣으면 About 영역에 자동으로 표시됩니다.
세로 4:5 비율을 권장합니다. 사진이 없으면 HM 심볼이 대신 보입니다.

## 3. 바꿔야 할 정보

`index.html` 에서 아래 항목을 찾아 바꿔 주세요.

- `hello@example.com` → 실제 이메일 (두 군데)
- Contact 영역의 YouTube / Instagram 링크 (`href="#"`)
- 운영한 SNS 채널 링크는 Capabilities → SNS Channel 항목에 있습니다

## 4. 내 컴퓨터에서 미리 보기

유튜브 영상 재생은 `index.html` 을 파일로 직접 열면 동작하지 않을 수 있습니다. 로컬 서버로 확인해 주세요.

```powershell
python -m http.server 5500
```

브라우저에서 http://localhost:5500 접속

## 5. GitHub Pages 에 올리기

1. GitHub 계정을 만들고 새 저장소(repository)를 만듭니다. 저장소 이름을 `아이디.github.io` 로 하면 주소가 `https://아이디.github.io` 가 됩니다.
2. 이 폴더의 파일을 모두 업로드합니다. 웹에서 *Add file → Upload files* 로 끌어다 놓아도 됩니다.
3. 저장소의 **Settings → Pages** 에서 Source 를 `Deploy from a branch`, Branch 를 `main` / `(root)` 로 지정하고 저장합니다.
4. 1~2분 뒤 사이트 주소가 표시됩니다.

## 6. Capabilities 펼침 이미지 넣기

`js/capabilities.js` 에서 번호(01~05)별로 이미지 경로를 적으면 됩니다.
이미지는 `assets/img/cap/` 폴더에 넣어 주세요. 비어 있는 칸은 "Coming Soon" 빈 액자로 보입니다.

## 7. 이미지 작업물 추가하기 (Selected Works 의 Image 탭)

`js/works.js` 아래쪽 `window.ART` 목록에 추가합니다.
이미지 파일을 `assets/img/art/` 에 넣고, 제목(title)·이미지 경로(img)·눌렀을 때 갈 주소(url)를 적어 주세요.
