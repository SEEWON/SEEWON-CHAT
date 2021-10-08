import React, { useState } from 'react';
import styled from 'styled-components';

const Chat = ({ friend, user }) => {
  const [userIsTalking, setUserIsTalking] = useState(true);
  const [inputText, setInputText] = useState('');
  const [chats, setChats] = useState([
    { userChat: false, text: 'ㅋㅋㅋ', cnt: 0 },
    { userChat: true, text: '웅?', cnt: 1 },
    { userChat: false, text: 'ㅎㅎㅎ', cnt: 2 },
    { userChat: true, text: '왜웃어', cnt: 3 },
  ]);

  const handleSubmitChat = (event) => {
    event.preventDefault();
    if (inputText === '') {
      alert('보낼 메시지를 입력하세요');
      return false;
    }
    userIsTalking
      ? setChats([
          ...chats,
          { userChat: true, text: inputText, cnt: chats.length },
        ])
      : setChats([
          ...chats,
          { userChat: false, text: inputText, cnt: chats.length },
        ]);
    setInputText('');
    console.log(chats);
  };

  return (
    <ChatWrapper>
      {/* Define Who is going to talk */}
      <DefineTalker
        friend={friend}
        user={user}
        onClick={() => {
          setUserIsTalking(!userIsTalking);
        }}
      >
        {userIsTalking ? (
          <TalkerProfile>
            <TalkerImg src={user.img}></TalkerImg>
            <TalkerName>{user.name}</TalkerName>
          </TalkerProfile>
        ) : (
          <TalkerProfile>
            <TalkerImg src={friend.img}></TalkerImg>
            <TalkerName>{friend.name}</TalkerName>
          </TalkerProfile>
        )}
      </DefineTalker>

      <ChattingScreen>
        {chats.map((chat) => {
          const { userChat, text } = chat;
          return userChat ? (
            <UserChat>{text}</UserChat>
          ) : (
            <FriendChat>{text}</FriendChat>
          );
        })}
      </ChattingScreen>

      <InputTextForm>
        <form onSubmit={handleSubmitChat}>
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
      </InputTextForm>
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div``;

const DefineTalker = styled.div``;
const TalkerProfile = styled.div`
  max-width: 200px;
  /* max-height: 50px; */
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const TalkerImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const TalkerName = styled.div``;

const ChattingScreen = styled.div``;
const UserChat = styled.div``;
const FriendChat = styled.div``;

const InputTextForm = styled.div``;

export default Chat;
