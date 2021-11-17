import React, { useEffect, useState, useRef } from 'react';
import ChatForm from './ChatForm';
import { FBrealtime } from '../fbase';
import { onValue, ref } from '@firebase/database';
import styled from 'styled-components';

type ChatProps = {
  userObj: any;
  friend: any;
};

const Chat = ({ userObj, friend }: ChatProps) => {
  const [chatObjData, setChatObjData] = useState<any>();
  const [chatArrayData, setChatArrayData] = useState<any>([]);
  const chatRoomID = [userObj.uid, friend.uid].sort();

  //Scroll Event
  const scrollRef: any = useRef<HTMLDivElement>();
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
    const temp: object[] = [];
    const pushChatsInArray = () => {
      for (const key in chatObjData) {
        temp.push(chatObjData[key]);
      }
      setChatArrayData(temp);
    };
    pushChatsInArray();
  }, [chatObjData]);

  return (
    <ChatWrapper>
      <ChattingScreen ref={scrollRef}>
        <>
          <FriendProfile>
            <FriendImg src={friend.img} />
            <FriendName>{friend.name}</FriendName>
          </FriendProfile>
        </>
        {chatArrayData.map((eachMsg: any, index: number) => {
          return (
            <div key={index}>
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
            </div>
          );
        })}
      </ChattingScreen>
      <ChatForm userObj={userObj} chatRoomID={chatRoomID} />
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
const EachMsgContainer = styled.div<{ userTalking: boolean }>`
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

export default Chat;
