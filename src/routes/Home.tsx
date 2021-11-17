import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type HomeProps = {
  userObj: any;
  profileList: any[];
};

const Home = ({ userObj, profileList }: HomeProps) => {
  const [searchFriend, setSearchFriend] = useState('');
  const [renderProfileList, setRenderProfileList] =
    useState<any[]>(profileList);

  //비동기적으로 작동하는 setState에서 profileNameList값이 호출된 후 renderNameList, renderImgList state에 정상적으로 값을 넣어주기 위해 spread operator 사용
  useEffect(() => {
    setRenderProfileList([...profileList]);
  }, [profileList]);

  //검색 시 renderProfileList를 수정해 주는 useEffect
  useEffect(() => {
    setRenderProfileList(
      profileList.filter((item) =>
        item.name.toLowerCase().includes(searchFriend.toLowerCase())
      )
    );
  }, [searchFriend]);

  return (
    <>
      <Banner>내 프로필</Banner>
      <ProfileBox>
        <ProfileImg src={userObj.photoURL} />
        <Name>{userObj.displayName}</Name>
      </ProfileBox>
      <Banner>친구 프로필</Banner>
      <SearchWrapper>
        <SearchFriend
          type="text"
          placeholder="친구를 검색해 보세요!"
          onChange={(e) => setSearchFriend(e.target.value)}
        ></SearchFriend>
      </SearchWrapper>
      {renderProfileList.map((friend, index) => {
        // 자신의 프로필을 제외하고 렌더링
        if (userObj.uid !== friend.uid)
          return (
            <ProfileBox key={index}>
              <ProfileImg src={friend.img} />
              <Name>{friend.name}</Name>
            </ProfileBox>
          );
      })}
    </>
  );
};

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
const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;
