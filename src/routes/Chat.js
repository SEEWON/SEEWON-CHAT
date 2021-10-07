import React, { useState } from 'react';
import styled from 'styled-components';

const Chat = ({ friend, user }) => {
  const [userIsTalking, setUserIsTalking] = useState(true);
  const [inputText, setInputText] = useState('');
  const [chatCnt, setChatCnt] = useState(5);
  const [friendChat, setFriendChat] = useState([
    { text: 'ㅋㅋㅋ', cnt: 1 },
    { text: 'ㅎㅎㅎ', cnt: 3 },
  ]);
  const [userChat, setUserChat] = useState([
    { text: '웅?', cnt: 2 },
    { text: '왜웃어', cnt: 4 },
  ]);

  const onSubmit = (event) => {
    event.preventDefault();
    userIsTalking
      ? setUserChat(...userChat, { text: inputText, cnt: chatCnt })
      : setFriendChat(...friendChat, { text: inputText, cnt: chatCnt });
    setChatCnt(chatCnt + 1);
    setInputText('');
  };

  return (
    <div className="chatScreen">
      <WhoIsTalking
        friend={friend}
        user={user}
        onClick={() => {
          setUserIsTalking(!userIsTalking);
        }}
      >
        {userIsTalking ? (
          <TalkingProfile>
            <TalkingImg src={user.img}></TalkingImg>
            <TalkingName>{user.name}</TalkingName>
          </TalkingProfile>
        ) : (
          <TalkingProfile>
            <TalkingImg src={friend.img}></TalkingImg>
            <TalkingName>{friend.name}</TalkingName>
          </TalkingProfile>
        )}
      </WhoIsTalking>
      <form onSubmit={onSubmit}>
        <input
          placeholder="보낼 메시지 입력"
          value={inputText}
          type="text"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <input type="submit" value="보내기" />
      </form>
    </div>
  );
};

const WhoIsTalking = styled.div``;

const TalkingProfile = styled.div`
  max-width: 200px;
  /* max-height: 50px; */
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const TalkingImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const TalkingName = styled.div``;

export default Chat;
