import React, { useEffect, useState } from 'react';
import Router from './Router';
import { FBauth, FBstorage } from '../fbase';
import { onAuthStateChanged } from '@firebase/auth';
import { getDownloadURL, listAll, ref } from '@firebase/storage';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});

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

  //Firebase Storage에서 프로필 사진, 닉네임 목록 불러오기
  let tempImg: string[] = [];
  let tempName: string[] = [];
  let tempUid: string[] = [];
  let tempProfile: object[] = [];
  const [profileList, setProfileList] = useState<object[]>([]);

  useEffect(() => {
    const listProfile = async () => {
      const profileRef = ref(FBstorage);
      const listResult: any = await listAll(profileRef);
      for (let imageRef of listResult.items) {
        const url: string = await getDownloadURL(imageRef);
        tempName.push(imageRef._location.path_.split('$')[0]);
        tempUid.push(imageRef._location.path_.split('$')[1]);
        tempImg.push(url);
      }
      tempName.forEach((eachName, index) => {
        tempProfile.push({
          name: eachName,
          img: tempImg[index],
          uid: tempUid[index],
        });
      });
      setProfileList(tempProfile);
    };
    listProfile();
  }, []);

  const refreshUser = () => {
    const userNow = FBauth.currentUser;
    setUserObj({ ...userNow });
  };

  return (
    <>
      {init ? (
        <RootContainer>
          <GlobalStyle />
          <Router
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            profileList={profileList}
          />
        </RootContainer>
      ) : (
        'Initializing...'
      )}
    </>
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

export default App;
