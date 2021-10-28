import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';

const Chat = ({ userObj, friendUid, friendImg, friendName }) => {
  const [userIsTalking, setUserIsTalking] = useState(true);
  const [inputText, setInputText] = useState('');

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
  };

  return (
    <ChatWrapper>
      {/* Define Who is going to talk */}
      {console.log(userObj)}
      {console.log(friendUid)}
      {console.log(friendImg)}
      {console.log(friendName)}

      <ChattingScreen ref={scrollRef}></ChattingScreen>

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

const ChattingScreen = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
