import { getDownloadURL, listAll, ref } from '@firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FBstorage } from '../fbase';
import EachProfile from './EachProfile';

const Home = ({ userObj }) => {
  let temp = new Array();
  const [profileList, setProfileList] = useState([]);
  //Storage에서 프로필 사진 목록 불러오기

  useEffect(() => {
    const listProfile = async () => {
      const profileRef = ref(FBstorage);
      const listResult = await listAll(profileRef);
      for (let imageRef of listResult.items) {
        const url = await getDownloadURL(imageRef);
        temp.push(url);
      }
      setProfileList(temp);
    };
    listProfile();
  }, []);

  return (
    <div className="profileList">
      <MyProfile>
        <div>MyProfile</div>
        <MyImg src={userObj.photoURL} />
      </MyProfile>
      <FriendsProfile>
        <div>FriendsProfile</div>
        {profileList.map((profileURL) => {
          if (userObj.photoURL !== profileURL)
            return <EachProfile profileURL={profileURL} />;
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
