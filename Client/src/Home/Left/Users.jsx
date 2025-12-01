import React from 'react'
import User from './User'
import getUsers from '../../context/getUsers';

function Users() {
  const [allUsers, loading] = getUsers();
  console.log(allUsers);
  
  return (
    <div style={{ maxHeight: "calc(83vh)" }} className='overflow-y-auto flex-scrollbar'>
      {
        loading
          ? <p>Loading...</p>
          : allUsers?.map(user => (
            <User user={user} key={user._id} />
          ))
      }

    </div>
  )
}

export default Users
