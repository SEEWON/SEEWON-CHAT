import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';
import { FBrealtime } from '../fbase';
import { onValue, ref, set } from '@firebase/database';

const Chat = ({ userObj, friendUid, friend }) => {
  const [message, setMessage] = useState('');
  const [chatObjData, setChatObjData] = useState();
  const [chatArrayData, setChatArrayData] = useState([]);
  const chatRoomID = [userObj.uid, friendUid].sort();
  const now = new Date();

  //Scroll Event
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  });

  //DB에서 Chat data를 받아 chatObjData에 저장
  const chatRoomRef = ref(FBrealtime, `${chatRoomID}/`);
  useEffect(() => {
    onValue(chatRoomRef, (snapshot) => {
      setChatObjData(snapshot.val());
    });
  }, []);

  //객체 형태로 chatObjData에 저장된 데이터를 배열로 바꿔주기 위한 useEffect
  useEffect(() => {
    const temp = [];
    const pushChatsInArray = () => {
      for (const key in chatObjData) {
        temp.push(chatObjData[key]);
      }
      setChatArrayData(temp);
    };
    pushChatsInArray();
  }, [chatObjData]);

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
    <ChatWrapper>
      <ChattingScreen ref={scrollRef}>
        <>
          <FriendProfile>
            <FriendImg src={friend.img} />
            <FriendName>{friend.name}</FriendName>
          </FriendProfile>
        </>
        {chatArrayData.map((eachMsg, index) => {
          return (
            <>
              {
                /*연속해서 채팅 올 경우 친구 프로필 한번만 표시*/
                chatArrayData[index - 1] &&
                  chatArrayData[index - 1].talker !== eachMsg.talker &&
                  eachMsg.talker !== userObj.uid && (
                    <FriendProfile>
                      <FriendImg src={friend.img} />
                      <FriendName>{friend.name}</FriendName>
                    </FriendProfile>
                  )
              }
              <EachMsgContainer
                key={index}
                userTalking={eachMsg.talker === userObj.uid ? true : false}
              >
                <EachMsg>{eachMsg.msg}</EachMsg>
              </EachMsgContainer>
            </>
          );
        })}
      </ChattingScreen>
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
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ChattingScreen = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const EachMsgContainer = styled.div`
  width: ${(props) => (props.userTalking ? '99%' : '80%')};
  display: flex;
  justify-content: ${(props) =>
    props.userTalking ? 'flex-end' : 'flex-start'};
  margin-left: ${(props) => !props.userTalking && '50px'};
  position: relative;
  bottom: 27px;
`;
const FriendProfile = styled.div`
  display: flex;
`;
const FriendImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;
const FriendName = styled.div`
  width: 50%;
`;
const EachMsg = styled.div`
  max-width: 80%;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 7px;
  margin: 3px;
`;

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

export default Chat;
