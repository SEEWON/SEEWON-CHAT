import React, { useState } from 'react';
import { FBauth, FBstorage } from '../fbase';
import { signOut, updateProfile } from '@firebase/auth';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { HiOutlineLogout } from 'react-icons/hi';
import DefaultProfile from './DefaultProfile.png';
import styled from 'styled-components';
import { DataURL } from './DataURL';

const Profile = ({ refreshUser, userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [fileURL, setFileURL] = useState('');

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    let FBprofileImgURL = '';
    //첨부파일이 있을 경우 Firebase Storage에 파일 등록, URL 받아오기
    if (fileURL !== '') {
      const profileImgRef = ref(FBstorage, `${userName}$${userObj.uid}`);
      const response = await uploadString(profileImgRef, fileURL, 'data_url');
      FBprofileImgURL = await getDownloadURL(response.ref);
    }
    //프로필사진을 등록하지 않았을 경우 기본 프로필사진 등록
    else {
      const profileImgRef = ref(FBstorage, `${userName}$${userObj.uid}`);
      const response = await uploadString(profileImgRef, DataURL, 'data_url');
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
  const disabled = () => {
    if (userObj.displayName) return true;
    else return false;
  };

  return (
    <div>
      <UserProfile>
        {!userObj.displayName && '프로필 등록 후 채팅을 시작할 수 있어요!'}
        {fileURL ? (
          <img src={fileURL} alt="미리보기" />
        ) : (
          <UserImg src={userObj.photoURL ? userObj.photoURL : DefaultProfile} />
        )}
        <form onSubmit={handleSubmitProfile}>
          <input
            type="text"
            required
            value={userName}
            disabled={disabled()}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
          <div>주의: 처음 등록한 닉네임은 변경할 수 없습니다!</div>
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
      <div>
        {userObj.displayName &&
          `주의: 로그인 정보는 세션에 저장되니 로그아웃 하지 않아도 됩니다!
      로그아웃 후 다시 로그인 시 휴대폰 인증을 다시 요구합니다`}
      </div>
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
