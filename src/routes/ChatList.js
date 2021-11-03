import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ChatList = ({ userObj, profileImgList, profileNameList, uidList }) => {
  return (
    <FriendsProfile>
      <Banner>대화 목록</Banner>
      {profileImgList.map((profileURL, index) => {
        // 자신의 프로필을 제외하고 렌더링
        if (userObj.photoURL !== profileURL)
          return (
            <ProfileBox key={index}>
              <ProfileImg src={profileURL} />
              <LinkContainer>
                {/* 링크는 user의 uid - 상대방의 uid로 구성 */}
                <Link to={`/chat/${userObj.uid}-${uidList[index]}`}>
                  <Button>{profileNameList[index]}님과 채팅 시작!</Button>
                </Link>
              </LinkContainer>
            </ProfileBox>
          );
      })}
    </FriendsProfile>
  );
};

const FriendsProfile = styled.div``;
const Banner = styled.div`
  height: 27px;
  background-color: #c5c4c1;
  font-weight: bolder;
  padding-left: 3px;
  display: flex;
  align-items: center;
`;
const ProfileBox = styled.div`
  height: 100px;
  display: flex;
  border: 1px dashed gray;
  margin: 10px;
`;
const ProfileImg = styled.img`
  width: 100px;
  height: auto;
  object-fit: contain;
  border-right: 1px dashed gray;
`;
const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  border: 1px solid gray;
  box-shadow: 1px 1px gray;
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  word-break: keep-all;
`;

export default ChatList;
