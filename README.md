# 3주차 미션: React-Messenger💌

## 서론
Firebase와 React를 함께 사용해 **전화번호 인증을 통해 로그인**하고, 이용자 간 **실시간 채팅**이 가능한 프로젝트를 만들었습니다. <br>
Firebase의 여러 요소 중 실시간 채팅을 위해 RealTime DB를 이용했고, 인증을 위해서 Authentication, 그리고 사용자 정보 등록을 위해 Storage를 사용했습니다. <br>
<br>
과제를 할 수 있는 기간이 길어 완성도 있는 결과물을 만들어 보려고 노력했어요! <br>
방구석에서 혼자 크고 작은 오류들과 싸우면서 아주 열불을 냈는데, 값진 시간을 보낸 것 같아서 뿌듯합니다 ^__^ <br>
**결과물 링크는 <a href="https://react-messenger-14th-eight.vercel.app/"> 여기</a>에서 확인할 수 있어요😀**<br>

과제를 하며 배운 것들과, 신경 쓴 부분
1. 자바스크립트의 동기, 비동기(.then에서 발전한 async-await.. promise) 처리에 대한 이해
2. File객체와 Date객체, HTTP Data URL포맷(데이터 인코딩)
3. try catch문을 활용한 에러 핸들링
4. 배포 시 환경 변수를 이용한 민감 정보 암호화
5. 지난 과제에서 받았던 리뷰들을 반영한, 깨끗한 코드를 위한 컴포넌트의 분리
6. 완성도 있는 결과물을 향한 CSS에 대한 고민
7. 리액트에 대한 이해도 쪼금 더..

등등 사소한 것들부터 중요한 것들까지 정말 많이 배웠어요! <br>
제 기본기가 부족하다는 사실 또한 깨달아 반성하는 계기도 되었습니다.<br>


## 제 과제의 동작에 대해 간단히 설명해 드릴게요!
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140474275-bae2ff49-2bff-46e0-b5a5-e9d7a389ac43.png" width="200" /></p>
처음 접속 시 전화번호 인증을 통해 로그인할 수 있습니다. <br>
입력 후 버튼을 누르면 휴대폰 번호로 인증번호가 발송되고, 이를 입력하면 프로필을 결정하는 창으로 넘어갑니다. <br>
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140474312-40250ae5-2566-46ca-bc41-9e36e1448980.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140475484-df88c4b9-b8e0-4e0e-a7d4-6145a3b8ef00.png" width="200" /></p>
이 창에서 사용할 닉네임과 프로필 사진을 올릴 수 있습니다. <br>
추후에 프로필 사진은 변경 가능하지만, 닉네임은 처음 닉네임을 변경할 수 없습니다. (충돌 때문에ㅜㅜ 막아뒀습니다) <br>
프로필을 결정하고 나면, 오른쪽 사진과 같이 변경됩니다! 이제 로그아웃도 할 수 있어요. <br>
하지만 로그아웃을 따로 하지 않아도 로그인 정보가 자동으로 세션에 저장되기 때문에, 추천하지 않습니다.<br>
그래서 로그아웃 버튼을 내비게이션에 두지 않고 설정 창에 숨겨 뒀어요!
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140475787-5900fabe-49a2-4bf9-b02b-b10b21d5a17f.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140475919-d34d8179-1687-42e3-9466-deb74114ba94.png" width="200" /></p>
홈 화면에 가 보면, 가입한 친구 목록을 볼 수 있어요. 검색도 잘 이루어집니다 :)
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140476540-6a5e1a20-60f1-4c88-bc72-bab85df74837.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140476555-64d5098e-15a3-4af4-a278-c6700e94e435.png" width="200" /></p> 
대화 목록 창에서 채팅할 친구를 고를 수 있습니다. 여기서도 홈 화면과 동일하게 검색 기능을 구현했고, 프로필 사진 옆의 버튼을 누르면 채팅이 시작됩니다.<br>
대화 목록 창에는 내 프로필이 표시되지 않습니다. (사진을...빠뜨렸네요ㅜ)
<p align="center"><img src="https://user-images.githubusercontent.com/50395394/140477001-7d91a378-ca0f-47db-98cd-c0ec8df5b572.png" width="200" />
<img src="https://user-images.githubusercontent.com/50395394/140477036-31bf2497-b00f-4b49-8a73-35bfa0385f0f.png" width="200" /><img src="https://user-images.githubusercontent.com/50395394/140477349-7c775f64-9db1-4cd9-9ee4-7036ef0a2291.png" width="200" /><img src="https://user-images.githubusercontent.com/50395394/140477875-279f5802-8554-4934-bc53-672a61fe1888.png" width="200" /></p> 
 
채팅 화면입니다! 상대방 채팅이 연속으로 오면 프로필은 한 번만 표시되도록 한 것과, 프로필과 채팅의 배치는 카카오톡의 UI를 따라했어요! <br>
가장 오른쪽 사진과 같이 채팅이 길어지면 자동으로 줄이 바뀌도록 했고, 입력 내용이 길어질 경우에도 마지막 사진과 같이 스크롤이 등장합니다. <br>
<input> 대신 <textarea>를 사용했고, 카카오톡처럼 엔터 입력 시 바로 전송됩니다. 줄바꿈을 하려면 shift+enter을 누르면 되도록 만들었어요! <br>
**실제로 실시간 채팅이 가능합니다. 새로고침 없이 보낸 채팅과, 받은 채팅이 화면에 렌더링됩니다**
  
  ## 과제를 하며 고군분투한 기록의 일부를 공유합니다,,

  + 다른 사용자 정보 가져오기 <br>
  Firebase 공식 문서에서 auth.listUsers() API를 사용하면 된다고 해서 Firebase Admin SDK를 설치하고, Node.js 코드를 처음으로 공부해서 짜 봤는데 알고 보니 Admin SDK는 Clinet-side environments에서 사용할 수 없다고 해서.. 하루종일 삽질했습니다 ㅜㅜ <br>
  => 프로필 등록할 때 저장된 사진의 파일명에 닉네임을 함께 저장해서, storage에서 불러오는 방식으로 대체했습니다. 그래서 닉네임 변경을 못해요..ㅋㅋㅋㅋ
  
  + 렌더링이 안됨 <br>
  저는 return문 안에서 forEach문을 사용하면 안되는줄 몰랐습니다.. 참고 링크입니다.
  https://richwind.co.kr/89
  + 동기와 비동기 <br>
  Firebase 함수들 중에 Promise를 반환하는 함수들이 상당히 많아서, 비동기 처리에 대한 공부를 좀 하고 나서야 제대로 쓸 수가 있었어요. <br>
  큰 도움이 된 글 첨부합니다. https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
  + forEach()문과 for()문은 다른 거였습니다.. <br>
  C 베이스 언어에 너무 익숙해져 있어 forEach문도 당연히 index별로 순서대로 돌 줄 알았는데, 그게 아니더군요ㅜㅜ <br>
  for of 문을 써서 해결했습니다. 참고 링크입니다.
  https://velog.io/@hanameee/%EB%B0%B0%EC%97%B4%EC%97%90-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9E%91%EC%97%85%EC%9D%84-%EC%8B%A4%EC%8B%9C%ED%95%A0-%EB%95%8C-%EC%95%8C%EC%95%84%EB%91%90%EB%A9%B4-%EC%A2%8B%EC%9D%84%EB%B2%95%ED%95%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0%EB%93%A4#for-%EB%AC%B8%EC%9C%BC%EB%A1%9C-%EB%B3%80%EA%B2%BD%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
  + setState()가 비동기로 작동한다는 점, 알고 계셨나요? <br>
  그래서 state안에 제대로 값이 들어가기 전에 다른 로직을 수행하려다 보니, 오류가 발생해서 화가 난 나머지 state를 쓰지 않고 let 변수로 배열을 사용해서 문제를 해결하려 들었는데, 안되더군요. 분명 console.log()찍으면 값은 잘 들어가 있는데...왜 렌더링이 안될까.. 프짱님께서 주신 해답입니다. <br>
  ![image](https://user-images.githubusercontent.com/50395394/140479797-8cf4e4db-7785-4f99-a08b-cb66b5291f10.png)
  분명 기본적인 것 같은데...왜 저는 몰랐을까요....ㅎ<br>
  하루 죙일 앉아서 왜 안되냐고!를 외치며 머리를 쥐어뜯은 제가 약간 한심해진 대목이었습니다 ^__^ <br>
  => state에 값이 제대로 들어가지 않는 경우, 임시변수를 선언해 값을 담은 후에 다시 setState()를 하니 해결되었습니다. <br>

 ## 마무리
  여러모로 배운 것도, 느낀 것도 많은 과제였습니다. <br>
  더 완성도 있게 하고 싶었는데, 성에 차지 않는 부분도 있지만 최선이었기에 후회는 없습니다!<br>
  다들 과제 고생하셨습니다😉
  
