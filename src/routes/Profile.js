import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import { FBauth } from '../fbase';
import { signOut } from '@firebase/auth';
import DefaultProfile from './DefaultProfile.png';
import styled from 'styled-components';

const Profile = ({ refreshUser, userObj }) => {
  const [fileURL, setFileURL] = useState('');

  return (
    <>
      <Banner>내 프로필 설정하기</Banner>
      <Notion>
        {!userObj.displayName && '프로필 등록 후 채팅을 시작할 수 있어요!'}
      </Notion>
      <UserProfile>
        {fileURL ? (
          <UserImg src={fileURL} alt="미리보기" />
        ) : (
          <UserImg src={userObj.photoURL ? userObj.photoURL : DefaultProfile} />
        )}
      </UserProfile>
      <ProfileForm
        refreshUser={refreshUser}
        userObj={userObj}
        fileURL={fileURL}
        setFileURL={setFileURL}
      />
      {userObj.displayName && (
        <>
          <BannerR>로그아웃</BannerR>
          <CautionLogOut>
            {`로그인 정보는 세션에 저장됩니다!\n로그아웃할 경우 다음 로그인 시\n휴대폰 인증을 다시 요구합니다.`}
          </CautionLogOut>
          <LogOutButtonWrapper>
            <LogOutButton onClick={() => signOut(FBauth)}>
              로그아웃하기
            </LogOutButton>
          </LogOutButtonWrapper>
        </>
      )}
    </>
  );
};

const Banner = styled.div`
  height: 27px;
  background-color: #c5c4c1;
  font-weight: bold;
  padding-left: 3px;
  display: flex;
  border: 0.5px solid black;
`;
const Notion = styled.div`
  padding: 10px;
  text-align: center;
  margin-bottom: -20px;
`;
const UserProfile = styled.div`
  height: 200px;
  padding: 5px;
  margin: 20px 20px 2px 20px;
  border: 1px dashed gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserImg = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
`;

const BannerR = styled.div`
  height: 27px;
  background-color: #6e839f;
  font-weight: bold;
  margin-top: 5px;
  padding-left: 3px;
  border: 0.5px solid black;
`;
const LogOutButtonWrapper = styled.div`
  display: flex;
`;
const CautionLogOut = styled.div`
  color: #1c0c5b;
  font-size: 16px;
  text-align: center;
  white-space: pre-wrap;
  margin: 5px 0 5px 0;
`;
const LogOutButton = styled.button`
  background-color: transparent;
  color: #1c0c5b;
  border: 1px solid #314179;
  width: 100%;
  cursor: pointer;
  font-size: 13px;
  font-weight: 900;
  padding: 6px 12px;
`;

export default Profile;
