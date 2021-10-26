import React, { useEffect, useState } from 'react';
import Router from './Router';
import DefaultImg from './DefaultProfile.png';
import { createGlobalStyle } from 'styled-components';
import { FBauth, FBstorage } from '../fbase';
import { onAuthStateChanged } from '@firebase/auth';
import { getDownloadURL, listAll, ref } from '@firebase/storage';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    console.log(userObj);
  });

  //Storage에서 프로필 사진, 닉네임 목록 불러오기
  let tempImg = new Array();
  let tempName = new Array();
  let tempUid = new Array();
  const [profileImgList, setProfileImgList] = useState([]);
  const [profileNameList, setProfileNameList] = useState([]);
  const [uidList, setUidList] = useState([]);

  useEffect(() => {
    const listProfile = async () => {
      const profileRef = ref(FBstorage);
      const listResult = await listAll(profileRef);
      for (let imageRef of listResult.items) {
        const url = await getDownloadURL(imageRef);
        tempName.push(imageRef._location.path_.split('$')[0]);
        tempUid.push(imageRef._location.path_.split('$')[1]);
        tempImg.push(url);
      }
      setProfileImgList(tempImg);
      setUidList(tempUid);
      setProfileNameList(tempName);
      console.log(uidList);
    };
    listProfile();
  }, []);

  const refreshUser = () => {
    const userNow = FBauth.currentUser;
    setUserObj({ ...userNow });
    setUserObj(userNow);
  };

  const [user, setUser] = useState({
    id: 723,
    name: '유쿨',
    img: DefaultImg,
    status: '작은 차이가 명품을 만든다',
  }); //이건 나중에 없앨거야

  const [friends, setFriends] = useState([
    { id: 1, name: '시원', img: DefaultImg, status: '열심히 살자' },
    { id: 2, name: '칭구', img: DefaultImg, status: '히히' },
    { id: 3, name: '친구1', img: DefaultImg, status: '친구1 상메' },
    { id: 4, name: '친구2', img: DefaultImg, status: '친구2 상메' },
    { id: 5, name: '친구3', img: DefaultImg, status: '친구3 상메' },
  ]);

  return (
    <>
      {init ? (
        <>
          <GlobalStyle />
          <Router
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            user={user}
            friends={friends}
            profileImgList={profileImgList}
            profileNameList={profileNameList}
            uidList={uidList}
          />
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
};

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  display: flex;
  overflow: hidden;
  }
`;

export default App;
