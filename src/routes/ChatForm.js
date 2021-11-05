import React, { useState } from 'react';
import { FBrealtime } from '../fbase';
import { ref, set } from '@firebase/database';
import styled from 'styled-components';

const ChatForm = ({ userObj, chatRoomID }) => {
  const [message, setMessage] = useState('');
  const now = new Date();

  const handleSubmitForm = (event) => {
    event.preventDefault();

    //공백 메시지 입력 방지
    if (message === '') {
      alert('보낼 메시지를 입력하세요.');
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

  //카카오톡처럼 엔터 입력 시 Form submit되게 구현, 줄바꿈은 shift + enter
  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmitForm(e);
    }
  };

  return (
    <MessageForm>
      <Form onSubmit={handleSubmitForm}>
        <InputChat
          placeholder="보낼 메시지를 입력하세요."
          value={message}
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            onEnterPress(e);
          }}
        />
        <InputButton type="submit">
          <Send>전송</Send>
        </InputButton>
      </Form>
    </MessageForm>
  );
};

const MessageForm = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #f7f6f2;
  border-top: 1px solid gray;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
`;
const InputChat = styled.textarea`
  width: 75%;
  height: 80%;
  background-color: #f7f6f2;
  font-size: 1rem;
  word-wrap: break-word;
  word-break: break-all;
  padding: 10px;
  border: none;
  resize: none;
  outline: none;
  box-shadow: none;
`;
const InputButton = styled.button`
  position: absolute;
  top: 8px;
  right: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
`;
const Send = styled.div`
  padding: 3px 6px;
  border: 0.5px solid gray;
  border-radius: 10%;
  box-shadow: 0.5px 0.5px 0.5px 0.5px gray;
  background-color: #c8c6c6;
`;

export default ChatForm;
