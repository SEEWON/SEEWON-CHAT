import { getDownloadURL, listAll, ref } from '@firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FBstorage } from '../fbase';
import EachProfile from './EachProfile';

const Home = ({ userObj }) => {
  let tempImg = new Array();
  let tempName = new Array();
  const [profileImgList, setProfileImgList] = useState([]);
  const [profileNameList, setProfileNameList] = useState([]);

  //Storage에서 프로필 사진 목록 불러오기

  useEffect(() => {
    const listProfile = async () => {
      const profileRef = ref(FBstorage);
      const listResult = await listAll(profileRef);
      for (let imageRef of listResult.items) {
        const url = await getDownloadURL(imageRef);
        tempName.push(imageRef._location.path_.split('$')[0]);
        tempImg.push(url);
      }
      setProfileImgList(tempImg);
      setProfileNameList(tempName);
    };
    listProfile();
  }, []);

  return (
    <div className="profileList">
      <MyProfile>
        <div>MyProfile</div>
        <MyImg src={userObj.photoURL} />
        <div>{userObj.displayName}</div>
      </MyProfile>
      <FriendsProfile>
        <div>FriendsProfile</div>
        {profileImgList.map((profileURL, index) => {
          // 자신의 프로필을 제외하고 렌더링
          if (userObj.photoURL !== profileURL)
            return (
              <EachProfile
                profileURL={profileURL}
                profileName={profileNameList[index]}
                key={index}
              />
            );
        })}
        {console.log(userObj)}
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

export default Home;
