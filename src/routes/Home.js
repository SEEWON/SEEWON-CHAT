import React from 'react';
import styled from 'styled-components';

const Home = ({ userObj, profileImgList, profileNameList }) => {
  return (
    <div className="profileList">
      <MyProfile>
        <div>MyProfile</div>
        <MyImg src={userObj.photoURL} />
        <div>{userObj.displayName}</div>
        {console.log(userObj)}
      </MyProfile>
      <FriendsProfile>
        <div>FriendsProfile</div>
        {profileImgList.map((profileURL, index) => {
          // 자신의 프로필을 제외하고 렌더링
          if (userObj.photoURL !== profileURL)
            return (
              <div key={index}>
                <FriendImg src={profileURL} />
                <div>{profileNameList[index]}</div>
              </div>
            );
        })}
      </FriendsProfile>
    </div>
  );
};

const MyProfile = styled.div``;
const MyImg = styled.img`
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
`;
const FriendsProfile = styled.div``;
const FriendImg = styled.img`
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
`;

export default Home;
