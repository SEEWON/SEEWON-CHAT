import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';
import { FBrealtime } from '../fbase';
import { ref, set } from '@firebase/database';

const Chat = ({ userObj, friendUid, friendImg, friendName }) => {
  const [message, setMessage] = useState('');
  const chatRoomID = [userObj.uid, friendUid].sort();
  const now = new Date();

  //Scroll Event
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  });

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    //공백 메시지 입력 방지
    if (message === '') {
      alert('보낼 메시지를 입력하세요');
      return false;
    }

    const writeMsgOnDB = async () => {
      await set(ref(FBrealtime, `${chatRoomID}/${now.getTime()}`), {
        talker: userObj.uid,
        msg: message,
        sendAt: `${
          now.getMonth() + 1
        }-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`,
      }).catch((error) =>
        alert(
          `${error.message}
          에러가 발생했습니다. 새로고침 후 다시 시도해 주세요`
        )
      );
    };
    writeMsgOnDB();

    setMessage('');
  };

  return (
    <ChatWrapper>
      <ChattingScreen ref={scrollRef}></ChattingScreen>

      <MessageForm>
        <form onSubmit={handleSubmitMessage}>
          <InputChat
            placeholder="보낼 메시지 입력"
            value={message}
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <InputButton type="submit">
            <AiOutlineSend size="25" color="#1C0C5B" />
          </InputButton>
        </form>
      </MessageForm>
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

const MessageForm = styled.div`
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
