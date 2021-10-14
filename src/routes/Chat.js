import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import MyBubble from './MyBubble.png';
import YourBubble from './YourBubble.png';
import { AiOutlineSend } from 'react-icons/ai';

const Chat = ({ friend, user }) => {
  const [userIsTalking, setUserIsTalking] = useState(true);
  const [inputText, setInputText] = useState('');
  const [chats, setChats] = useState([
    { userChat: false, text: '😀', cnt: 0 },
    { userChat: true, text: 'ㅎㅋㅎ 안녕!', cnt: 1 },
    { userChat: false, text: '흐흐', cnt: 2 },
    { userChat: true, text: '왜웃어', cnt: 3 },
  ]);

  //Scroll Event
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  });

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

      <ChattingScreen ref={scrollRef}>
        {chats.map((chat) => {
          const { userChat, text } = chat;
          return userChat ? (
            <UserChatWrapper>
              <UserBubble src={MyBubble} />
              <UserChat>{text}</UserChat>
            </UserChatWrapper>
          ) : (
            <FriendChatWrapper>
              <FriendProfile>
                <FriendProfileImg src={friend.img} />
                <FriendName>{friend.name}</FriendName>
              </FriendProfile>
              <FriendBubble src={YourBubble} />
              <FriendChat>{text}</FriendChat>
            </FriendChatWrapper>
          );
        })}
      </ChattingScreen>

      <InputTextForm>
        <form onSubmit={handleSubmitChat}>
          <InputChat
            placeholder="보낼 메시지 입력"
            value={inputText}
            type="text"
            maxLength="16"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <InputButton type="submit">
            <AiOutlineSend size="25" color="#1C0C5B" />
          </InputButton>
        </form>
      </InputTextForm>
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div``;

const DefineTalker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #e6e6fa 100%, #d2d2fa 0%);
  opacity: 60%;
  border: 1px solid #1c0c5b;
  height: 10vh;
`;
const TalkerProfile = styled.div`
  display: flex;

  max-width: 200px;

  margin: 5px;
`;
const TalkerImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const TalkerName = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  font-weight: bold;
`;

const ChattingScreen = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const UserChatWrapper = styled.div`
  margin-left: 63vw;
  position: relative;
`;
const UserBubble = styled.img`
  width: 30vw;
  height: 15vh;
  object-fit: fill;
`;
const UserChat = styled.div`
  position: absolute;
  top: 20%;
  left: 5%;
  font-size: 3vh;
`;
const FriendChatWrapper = styled.div`
  padding: 20px;
  display: flex;
  position: relative;
`;
const FriendProfile = styled.div`
  display: flex;
  align-items: center;
  transform: translate(0%, 180%);
`;
const FriendProfileImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const FriendName = styled.div`
  margin: 5px;
  font-weight: bold;
`;
const FriendBubble = styled.img`
  position: absolute;
  width: 30vw;
  height: 15vh;
  object-fit: fill;
`;
const FriendChat = styled.div`
  position: absolute;
  top: 47%;
  left: 4%;
  font-size: 3vh;
`;

const InputTextForm = styled.div`
  border-radius: 1rem;
  height: 7vh;
  width: 94.45vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1c0c5b;
  background-color: #f3f3df;
`;
const InputChat = styled.input`
  width: 30vw;
  text-align: center;
  transform: translate(0%, -25%);
`;
const InputButton = styled.button`
  background: transparent;
  border: none;
  transform: translate(0%, 10%);
  margin: 10px;
`;

export default Chat;
