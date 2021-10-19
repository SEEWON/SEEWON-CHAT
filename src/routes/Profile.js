import React, { useState } from 'react';
import { FBauth, FBstorage } from '../fbase';
import { signOut, updateProfile } from '@firebase/auth';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { HiOutlineLogout } from 'react-icons/hi';
import DefaultProfile from '../components/DefaultProfile.png';
import styled from 'styled-components';

const Profile = ({ refreshUser, userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [fileURL, setFileURL] = useState('');

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    let FBprofileImgURL = '';
    if (fileURL !== '') {
      const profileImgRef = ref(FBstorage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(profileImgRef, fileURL, 'data_url');
      FBprofileImgURL = await getDownloadURL(response.ref);
    }
    await updateProfile(userObj, {
      displayName: userName,
      photoURL: FBprofileImgURL,
    });
    //프로필 이미지 변경 시 리렌더링을 위해 <App /> 에서부터 refreshUser props 전달
    refreshUser();
    setFileURL('');
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <UserProfile>
        {fileURL ? (
          <img src={fileURL} />
        ) : (
          <UserImg src={userObj.photoURL ? userObj.photoURL : DefaultProfile} />
        )}
        <form onSubmit={handleSubmitProfile}>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <input
            type="submit"
            value={userObj.displayName ? '프로필 변경!' : '프로필 결정!'}
          />
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
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const UserImg = styled.img`
  max-width: 200px;
  max-height: 200px;
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
