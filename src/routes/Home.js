import { getDownloadURL, listAll, ref } from '@firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FBstorage } from '../fbase';
import EachProfile from './EachProfile';

const Home = () => {
  let temp = new Array();
  const [profileList, setProfileList] = useState([]);
  //Storage에서 프로필 사진 목록 불러오기

  useEffect(() => {
    const listProfile = async () => {
      const profileRef = ref(FBstorage);
      const listResult = await listAll(profileRef);
      for (let imageRef of listResult.items) {
        const url = await getDownloadURL(imageRef);
        temp.push(url);
      }
      setProfileList(temp);
    };
    listProfile();
  }, []);

  return (
    <div className="profileList">
      {profileList.map((profileURL) => {
        return <EachProfile profileURL={profileURL} />;
      })}
    </div>
  );
};

export default Home;
