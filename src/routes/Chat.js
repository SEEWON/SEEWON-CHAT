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
      <ChattingScreen ref={scrollRef}>
        {chatArrayData.map((eachMsg, index) => {
          return (
            <EachMsgContainer
              key={index}
              userTalking={eachMsg.talker === userObj.uid ? true : false}
            >
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
              <EachMsg>{eachMsg.msg}</EachMsg>
            </EachMsgContainer>
          );
        })}
      </ChattingScreen>
      <MessageForm>
        <Form onSubmit={handleSubmitForm}>
          <InputChat
            placeholder="보낼 메시지를 입력하세요"
            value={message}
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          {/* <InputButton type="submit">
            <AiOutlineSend size="15" color="#1C0C5B" />
          </InputButton> */}
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
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const EachMsgContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.userTalking ? 'flex-end' : 'flex-start'};
`;
const FriendProfile = styled.div`
  display: flex;
  border: 1px solid green;
`;
const FriendImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;
const FriendName = styled.div``;
const EachMsg = styled.div``;

const MessageForm = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
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
  width: 93%;
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
  background: transparent;
  border: none;
  margin: 10px;
`;

export default Chat;
