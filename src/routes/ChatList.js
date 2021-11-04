import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ChatList = ({ userObj, profileList, uidList }) => {
  const [searchFriend, setSearchFriend] = useState('');
  const [renderProfileList, setRenderProfileList] = useState([]);

  useEffect(() => {
    setRenderProfileList([...profileList]);
  }, [profileList]);
  useEffect(() => {
    setRenderProfileList(
      profileList.filter((item) =>
        item.name.toLowerCase().includes(searchFriend.toLowerCase())
      )
    );
  }, [searchFriend]);

  return (
    <FriendsProfile>
      <Banner>대화 목록</Banner>
      <SearchWrapper>
        <SearchFriend
          type="text"
          placeholder="채팅 상대를 검색해 보세요!"
          onChange={(e) => setSearchFriend(e.target.value)}
        ></SearchFriend>
      </SearchWrapper>
      {renderProfileList.map((friend, index) => {
        // 자신의 프로필을 제외하고 렌더링
        if (userObj.photoURL !== friend.img)
          return (
            <ProfileBox key={index}>
              <ProfileImg src={friend.img} />
              <LinkContainer>
                {/* 링크는 user의 uid - 상대방의 uid로 구성 */}
                <Link to={`/chat/${userObj.uid}-${uidList[index]}`}>
                  <Button>{friend.name}님과 채팅 시작!</Button>
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
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const SearchFriend = styled.input`
  width: 90%;
  padding: 5px;
  margin: 5px 1px -3px 1px;
  text-align: center;
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
