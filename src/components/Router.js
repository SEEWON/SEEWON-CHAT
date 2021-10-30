import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Chat from '../routes/Chat';
import Profile from '../routes/Profile';
import LogIn from '../routes/LogIn';
import ChatList from '../routes/ChatList';
import styled from 'styled-components';

const Router = ({
  refreshUser,
  isLoggedIn,
  userObj,
  profileImgList,
  profileNameList,
  uidList,
}) => {
  return (
    <Appwrapper>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            userObj.displayName ? (
              // 처음 로그인하는 사람(displayName===null)은 <Profile />로 이동해 닉네임 설정
              <InteractingSpaceWrapper>
                <Route exact path={`/`}>
                  <Home
                    userObj={userObj}
                    profileImgList={profileImgList}
                    profileNameList={profileNameList}
                  />
                </Route>
                <Route exact path={`/chatlist`}>
                  <ChatList
                    userObj={userObj}
                    profileImgList={profileImgList}
                    profileNameList={profileNameList}
                    uidList={uidList}
                  />
                </Route>
                {uidList.map((friendUid, index) => {
                  //uidList에서 user의 uid가 호출되는 경우를 제외하기 위한 if문
                  if (userObj.uid !== friendUid) {
                    return (
                      <Route
                        exact
                        path={`/chat/${userObj.uid}-${friendUid}`}
                        key={index}
                      >
                        <Chat
                          userObj={userObj}
                          friendUid={friendUid}
                          friendImg={profileImgList[index]}
                          friendName={profileNameList[index]}
                        />
                      </Route>
                    );
                  }
                })}
                <Route exact path={`/profile`}>
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
