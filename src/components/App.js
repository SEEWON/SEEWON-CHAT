import React, { useEffect, useState } from 'react';
import Router from './Router';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
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
  });

  //Storage에서 프로필 사진, 닉네임 목록 불러오기
  let tempImg = [];
  let tempName = [];
  let tempUid = [];
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
    };
    listProfile();
  }, []);

  const refreshUser = () => {
    const userNow = FBauth.currentUser;
    setUserObj({ ...userNow });
    setUserObj(userNow);
  };

  return (
    <RootContainer>
      {init ? (
        <Wrapper>
          <GlobalStyle />
          <Router
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            profileImgList={profileImgList}
            profileNameList={profileNameList}
            uidList={uidList}
          />
        </Wrapper>
      ) : (
        'Initializing...'
      )}
    </RootContainer>
  );
};

const GlobalStyle = createGlobalStyle`
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  overflow: hidden;
  border: 1px solid red;
  justify-content: center;
  align-items: center;
  }
`;

const RootContainer = styled.div`
  width: 360px;
  height: 540px;
  border: 1px solid gray;

  display: flex;
  overflow: scroll;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
`;

export default App;
