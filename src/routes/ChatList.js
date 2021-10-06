import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ChatList = ({ friends }) => {
  return (
    <div className="friendsList">
      {friends &&
        friends.map((friend) => {
          const { id, name, img } = friend;
          return (
            <Link to={`/chat/${id}`}>
              Home
              <FriendProfile>
                <FriendImg src={img}></FriendImg>
                <FriendName>{name}</FriendName>
              </FriendProfile>
            </Link>
          );
        })}
      ;
    </div>
  );
};

const FriendProfile = styled.div`
  max-width: 200px;
  /* max-height: 50px; */
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const FriendImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const FriendName = styled.div``;

export default ChatList;
