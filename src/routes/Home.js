import React from 'react';

const Home = ({ friends }) => {
  return (
    <div className="friendsList">
      {friends.map((friend) => {
        <div></div>;
      })}
      ;
    </div>
  );
};

export default Home;
