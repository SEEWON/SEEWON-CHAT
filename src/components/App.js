import React, { useEffect, useState } from 'react';
import Router from './Router';
import DefaultImg from './DefaultProfile.png';
import { createGlobalStyle } from 'styled-components';
import { FBauth } from '../fbase';
import { updateCurrentUser } from '@firebase/auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

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

  useEffect(() => {
    updateCurrentUser(FBauth);
  });

  return (
    <>
      <GlobalStyle />
      <Router isLoggedIn={isLoggedIn} user={user} friends={friends} />
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