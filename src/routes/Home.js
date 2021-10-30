import React from 'react';
import styled from 'styled-components';

const Home = ({ userObj, profileImgList, profileNameList }) => {
  return (
    <HomeWrapper>
      <Banner>내 프로필</Banner>
      <ProfileBox>
        <ProfileImg src={userObj.photoURL} />
        <Name>{userObj.displayName}</Name>
      </ProfileBox>
      <Banner>친구 프로필</Banner>
      <FriendsProfileList>
        {profileImgList.map((profileURL, index) => {
          // 자신의 프로필을 제외하고 렌더링
          if (userObj.photoURL !== profileURL)
            return (
              <ProfileBox key={index}>
                <ProfileImg src={profileURL} />
                <Name>{profileNameList[index]}</Name>
              </ProfileBox>
            );
        })}
      </FriendsProfileList>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
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
  max-width: 100px;
  max-height: 100px;
  width: auto;
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
const FriendsProfileList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Home;
