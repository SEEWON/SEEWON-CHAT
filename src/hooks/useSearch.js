import React, { useEffect, useState } from 'react';

const useSearch = (profileList) => {
  const [searchFriend, setSearchFriend] = useState('');
  const [renderProfileList, setRenderProfileList] = useState(profileList);

  //비동기적으로 작동하는 setState에서 profileNameList값이 호출된 후 renderNameList, renderImgList state에 정상적으로 값을 넣어주기 위해 spread operator 사용
  useEffect(() => {
    setRenderProfileList([...profileList]);
  }, [profileList]);

  //검색 시 renderProfileList를 수정해 주는 useEffect
  useEffect(() => {
    setRenderProfileList(
      profileList.filter((item) =>
        item.name.toLowerCase().includes(searchFriend.toLowerCase())
      )
    );
  }, [searchFriend]);

  const onSearchChange = (event) => {
    setSearchFriend(event.currentTarget.value);
  };

  return [onSearchChange, renderProfileList];
};

export default useSearch;
