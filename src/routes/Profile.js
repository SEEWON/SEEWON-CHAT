import React, { useState } from 'react';
import { FBauth, FBstorage } from '../fbase';
import { signOut, updateProfile } from '@firebase/auth';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
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

      <Form onSubmit={handleSubmitProfile}>
        <NickNameInput
          type="text"
          required
          value={userName}
          disabled={disabled()}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
        프로필 사진 업로드
        <FileInput
          id="file "
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <CautionProfile>{`<주의>\n 닉네임 설정 후 변경이 불가합니다.`}</CautionProfile>
        <SubmitProfile
          type="submit"
          value={userObj.displayName ? '프로필 변경!' : '프로필 결정!'}
        />
      </Form>

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const NickNameInput = styled.input`
  width: 100%;
  text-align: center;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin-top: 8px;
  outline: none;
  padding: 8px;
  background-color: white;
  box-sizing: border-box;
  transition: 0.3s;
`;
const CautionProfile = styled.div`
  color: brown;
  font-size: 16px;
  text-align: center;
  white-space: pre-wrap;
`;
const FileInput = styled.input`
  border: 2px solid #aaa;
  border-radius: 4px;
  background-color: white;
  padding: 6px;
  outline: none;
`;

const SubmitProfile = styled.input`
  background-color: transparent;
  color: green;
  border: 1px solid green;
  width: 100%;
  cursor: pointer;
  font-size: 13px;
  font-weight: 900;
  padding: 6px 12px;
  margin-top: 5px;
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
