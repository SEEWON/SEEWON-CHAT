import { signOut, updateProfile } from '@firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineLogout } from 'react-icons/hi';
import { FBauth } from '../fbase';

const Profile = ({ userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);

  const handleSubmitName = async (event) => {
    event.preventDefault();
    await updateProfile(userObj, { displayName: userName });
  };
  return (
    <div>
      <UserProfile>
        <UserImg src={userObj.photoURL}></UserImg>
        <form onSubmit={handleSubmitName}>
          <input
            type="text"
            value={userObj.displayName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input type="submit" value="이름 수정하기" />
        </form>
      </UserProfile>
      <LogOutButton onClick={() => signOut(FBauth)}>
        <HiOutlineLogout size="30" color="#1C0C5B" />
      </LogOutButton>
      {/* TODO: 로그아웃 주의사항 표시하기 : 
      로그인 정보는 세션에 저장되니 로그아웃 하지 않아도 됨
      재로그인 시 휴대폰 재인증 필요 */}
    </div>
  );
};

const UserProfile = styled.div`
  max-width: 200px;
  /* max-height: 50px; */
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const UserImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const LogOutButton = styled.button`
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

export default Profile;
