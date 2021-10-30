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
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(#c8c6c6 50%, #f7f6f2 50%);
  }
`;

const RootContainer = styled.div`
  width: 360px;
  height: 600px;
  border-radius: 1rem;
  border: 1.5px solid gray;
  background-image: linear-gradient(#f7f6f2 50%, #c8c6c6 50%);
  background-color: #f0e5cf;
  display: flex;
  overflow: auto;
  @font-face {
    font-family: 'GowunDodum-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'GowunDodum-Regular';
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
