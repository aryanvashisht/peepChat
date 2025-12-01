import React from 'react'
import Search from './Search'
import Users from './Users'

function Left() {
  return (
    <div className='w-[30%] border border-gray-800 bg-stone-950'>
      <h1 className='font-bold text-6xl pl-6 pb-2 pt-[3px] bg-black'>Chats</h1>
      <Search />
      {/* <div className='bg-gray-700 text-xl h-[0.1px]' ></div> */}
      <Users />
    </div>
  )
}

export default Left
