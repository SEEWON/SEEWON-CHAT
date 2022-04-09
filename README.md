# SEEWON CHAT💌

## 서론
Firebase와 React를 함께 사용해 **전화번호 인증을 통해 로그인**하고, 이용자 간 **실시간 채팅**이 가능하도록 구현한 사이드 프로젝트입니다. <br>
Firebase의 여러 요소 중 실시간 채팅을 위해 RealTime DB를 이용했고, 인증을 위해서 Authentication, 그리고 사용자 정보 등록을 위해 Storage를 사용했습니다. <br>

프로젝트 기간 : 2021.10.05 ~ 2021.11.05 한 달 간 <br>
프로젝트 규모 : 개인 프로젝트 <br>
Stacks : React.js w/ Typescript, Firebase

## 배포 링크
**결과물은 <a href="https://react-messenger-14th-eight.vercel.app/"> 여기</a>에서 확인할 수 있어요😀**<br>

## 배운 것, 신경 쓴 부분
1. 자바스크립트의 동기, 비동기(.then에서 발전한 async-await.. promise) 처리에 대한 이해
2. File객체와 Date객체, HTTP Data URL포맷(데이터 인코딩)
3. try catch문을 활용한 에러 핸들링
4. 배포 시 환경 변수를 이용한 민감 정보 암호화
5. 지난 과제에서 받았던 리뷰들을 반영한, 깨끗한 코드를 위한 컴포넌트의 분리
6. 완성도 있는 결과물을 향한 CSS에 대한 고민
7. 리액트에 대한 이해 한 스푼 더

## Demos/프로젝트 동작
### 초기 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140474275-bae2ff49-2bff-46e0-b5a5-e9d7a389ac43.png" width="200" /></p>
처음 접속 시 전화번호 인증을 통해 로그인할 수 있습니다. <br>
입력 후 버튼을 누르면 휴대폰 번호로 인증번호가 발송되고, 이를 입력하면 프로필을 결정하는 창으로 넘어갑니다. <br><br>

### 내 프로필 설정하기 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140474312-40250ae5-2566-46ca-bc41-9e36e1448980.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140475484-df88c4b9-b8e0-4e0e-a7d4-6145a3b8ef00.png" width="200" /></p>
사용할 닉네임과 프로필 사진을 정할 수 있습니다. 프로필 사진은 추후에 변경 가능합니다. <br>
프로필을 결정하고 나면, <내 프로필 설정하기> 창은 오른쪽과 같이 변경됩니다. 로그아웃 기능이 추가됩니다.<br>
로그인 정보가 세션에 저장되는 것이 default이기 때문에, 로그아웃은 필수 기능이 아닙니다.<br>
따라서 로그아웃 버튼은 내비게이션에 두지 않고, 설정 창에 배치했습니다. <br><br>

### 메인 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140475787-5900fabe-49a2-4bf9-b02b-b10b21d5a17f.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140475919-d34d8179-1687-42e3-9466-deb74114ba94.png" width="200" /></p>
메인 페이지에서 가입한 친구 목록을 볼 수 있고, 검색을 통해 친구를 찾을 수 있습니다.

### 대화 목록 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140476540-6a5e1a20-60f1-4c88-bc72-bab85df74837.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140476555-64d5098e-15a3-4af4-a278-c6700e94e435.png" width="200" /></p> 
대화 목록 페이지에서 채팅할 친구를 고를 수 있습니다. 프로필 사진 옆의 버튼을 누르면 채팅이 시작됩니다.<br>
메인 페이지에서와 동일하게 검색할 수 있고, 이 창에는 내 프로필이 표시되지 않습니다. 

### 채팅 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140477001-7d91a378-ca0f-47db-98cd-c0ec8df5b572.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140477036-31bf2497-b00f-4b49-8a73-35bfa0385f0f.png" width="200" /><img src="https://user-images.githubusercontent.com/50395394/140477349-7c775f64-9db1-4cd9-9ee4-7036ef0a2291.png" width="200" /><img src="https://user-images.githubusercontent.com/50395394/140477875-279f5802-8554-4934-bc53-672a61fe1888.png" width="200" /></p> 
 
상대방의 채팅이 연속으로 오면 프로필은 한 번만 표시되도록 한 것과, 프로필과 채팅의 배치는 카카오톡의 UI를 참고했습니다. 채팅이 길어지면 자동으로 줄이 바뀌도록 했고, 입력 내용이 길어질 경우에도 스크롤이 등장합니다. <br>
input 대신 textarea를 사용했고, 카카오톡처럼 엔터 입력 시 바로 전송됩니다. 줄바꿈을 하려면 shift+enter을 누르면 되도록 구현했습니다. <br>
**실제로 실시간 채팅이 가능합니다. 새로고침 없이 보낸 채팅과, 받은 채팅이 화면에 렌더링됩니다**!
  
  ## 프로젝트를 하며 고군분투한 기록의 일부

  + 다른 사용자 정보 가져오기 <br>
  Firebase 공식 문서에서 auth.listUsers() API를 사용하면 된다고 해서 Firebase Admin SDK를 설치하고, Node.js 코드를 처음으로 공부해서 짜 봤는데 알고 보니 Admin SDK는 Clinet-side environments에서 사용할 수 없다고 합니다.😥<br>
  -> 프로필을 등록할 때 저장된 사진의 파일명에 닉네임을 함께 저장해서, storage에서 불러오는 방식으로 대체했습니다.
  
  + 렌더링 이슈 <br>
forEach문은 기능을 실행하되 결과값을 리턴하지 않기 때문에, return문 내부에서 사용했을 때 렌더링되지 않는 이슈가 발생했습니다. map을 이용해 코드를 수정했습니다. [참고 링크](https://richwind.co.kr/89)

  + 동기와 비동기 <br>
  Firebase 함수들 중에 Promise를 반환하는 함수들이 상당히 많아서, 비동기 처리에 대한 공부를 좀 하고 나서야 제대로 쓸 수 있었습니다. [이해에 도움이 된 글](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

  + forEach()문과 for()문은 달랐다.. <br>
  C 베이스 언어에 너무 익숙해져 있어 forEach문도 당연히 index별로 순서대로 돌 줄 알았는데, 그렇지 않았습니다.  for of 문을 써서 해결했습니다. [참고 링크](  https://velog.io/@hanameee/%EB%B0%B0%EC%97%B4%EC%97%90-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9E%91%EC%97%85%EC%9D%84-%EC%8B%A4%EC%8B%9C%ED%95%A0-%EB%95%8C-%EC%95%8C%EC%95%84%EB%91%90%EB%A9%B4-%EC%A2%8B%EC%9D%84%EB%B2%95%ED%95%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0%EB%93%A4#for-%EB%AC%B8%EC%9C%BC%EB%A1%9C-%EB%B3%80%EA%B2%BD%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)

  + setState()는 비동기로 작동하는 함수였다..<br>
 state에 제대로 값이 들어가기 전에 다른 로직을 수행하려다 보니, 의도대로 동작하지 않았습니다. <br>
  -> 임시변수를 선언해 값을 담은 후에 다시 setState()를 수행해 해결했습니다. useEffect()를 사용한 해결방법도 있을 것 같습니다.<br>

## 타입스크립트 사용 후기
너무나도 자유로운 js문법을 사용하다 자꾸 에러가 나서 숨이 막혔습니다.
알고리즘 문제풀이를 파이썬으로 하다가 C++도 아니고 C언어로 풀게 된 기분이었습니다.
그만큼 제가 자유로운 문법 속에서 위험하게 변수 처리, 상태관리를 하고 있다는 것을 알게 되었습니다.
string이나 number처럼 간단한 type 말고도, React.FormEvent<HTMLFormElement>와 같이 이벤트가 발생할 때 적용할 수 있는 type도 정해져 있다는 사실도 알게 되었습니다.

다만 아쉬운 점은 제 프로젝트의 구조가 Firebase와 온라인으로 통신하여 인터넷 상에서 사용자, 채팅과 관련된 data를 받아오는 구조이다 보니,
local에서 작업할 때 자료형을 string[]과 같은 타입으로 명시를 하거나, uid같은 객체 내부 속성을 불러오려고 시도하는 경우 할당될 수 없는 type이라는 오류가 자주 발생합니다.
그래서 any타입으로 type을 명시해놓은 부분이 있습니다. type을 제대로 적용할 수 있도록 더 공부해야겠습니다.

Basic한 수준에서 타입스크립트를 써 보았는데, 현재 수많은 기업들이 쓰고 있다는 점은
큰 프로젝트에서 실제로 얼마나 이 기술이 필요한지를 나타내는 증거라는 생각이 들었습니다.
당장의 사이드 프로젝트에서는 이 정적 타이핑 방식이 답답하게 느껴지지만,
제대로 공부해야 할 필요성을 깨달았습니다.
아래 이미지는 [인스타툰 데브경수 작가님](https://www.instagram.com/waterglasstoon/)의 만화 중 한 컷인데, 이번 프로젝트를 통해 공감할 수 있게 되었습니다 :)
  <p align="center"><img src="https://user-images.githubusercontent.com/50395394/142468836-533022ab-8d39-4d58-a434-55c4f5532768.png" width="600"/></p>
  
 ## 마무리
배운 것도, 느낀 점도 많은 프로젝트였습니다. <br>
서버 개발 역량을 키워 혼자서도 온전한 서비스를 구현해낼 수 있는 개발자가 되고 싶습니다.

  
