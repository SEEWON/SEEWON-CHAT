import React, { useState } from 'react';
import { FBstorage } from '../fbase';
import { updateProfile } from '@firebase/auth';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { DataURL } from './DataURL';
import styled from 'styled-components';

type ProfileFormProps = {
  refreshUser: () => void;
  userObj: any;
  fileURL: string;
  setFileURL: React.Dispatch<any>;
};

const ProfileForm = ({
  refreshUser,
  userObj,
  fileURL,
  setFileURL,
}: ProfileFormProps) => {
  const [userName, setUserName] = useState(userObj.displayName);

  const handleSubmitProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
    //프로필 이미지 변경 시 리렌더링을 위해 <App /> 에서부터 refreshUser() prop 전달
    refreshUser();
    setFileURL('');
  };

  //type이 React.ChangeEventHandler<HTMLInputElement>인데, event.target.files[0]가 null일 경우 타입 에러 발생
  const handleFileChange = (event: any) => {
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
  );
};

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

export default ProfileForm;
