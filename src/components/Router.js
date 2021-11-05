import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Chat from '../routes/Chat';
import Profile from '../routes/Profile';
import LogIn from '../routes/LogIn';
import styled from 'styled-components';

const Home = lazy(() => import('../routes/Home'));
const ChatList = lazy(() => import('../routes/ChatList'));

const Router = ({ refreshUser, isLoggedIn, userObj, profileList }) => {
  return (
    <Appwrapper>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            userObj.displayName ? (
              // 처음 로그인하는 사람(displayName===null)은 <Profile />로 이동해 닉네임 설정
              <InteractingSpaceWrapper>
                <Suspense fallback={<div>Loading...</div>}>
                  <Route exact path={`/`}>
                    <Home userObj={userObj} profileList={profileList} />
                  </Route>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <Route path={`/chatlist`}>
                    <ChatList userObj={userObj} profileList={profileList} />
                  </Route>
                </Suspense>
                {profileList.map((profile, index) => {
                  //uidList에서 user의 uid가 호출되는 경우를 제외하기 위한 if문
                  if (userObj.uid !== profile.uid) {
                    return (
                      <Route
                        path={`/chat/${userObj.uid}-${profile.uid}`}
                        key={index}
                      >
                        <Chat userObj={userObj} friend={profileList[index]} />
                      </Route>
                    );
                  }
                })}
                <Route path={`/profile`}>
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                </Route>
                <Redirect from={`*`} to={`/`} />
              </InteractingSpaceWrapper>
            ) : (
              <InteractingSpaceWrapper>
                <Profile refreshUser={refreshUser} userObj={userObj} />
              </InteractingSpaceWrapper>
            )
          ) : (
            <InteractingSpaceWrapper>
              <Route exact path={`/`}>
                <LogIn />
              </Route>
              <Redirect from={`*`} to={`/`} />
            </InteractingSpaceWrapper>
          )}
        </Switch>
      </BrowserRouter>
    </Appwrapper>
  );
};

const Appwrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;
const InteractingSpaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default Router;
