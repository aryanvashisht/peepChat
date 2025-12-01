import React, { useContext } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { AuthContext } from '../../context/authcontext';
import axios from 'axios';

export default function Logout() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {}, { withCredentials: true });
      console.log("User Logged out successfully ::", response.data);
      logout();
    } catch (error) {
      console.log("Error while registering user ::", error?.response?.data?.message || "Internal error");
      console.log(error);
    }
  }
  return (
    <div
      onClick={handleLogout}
      className='w-[6%] border border-gray-800 bg-stone-950 flex flex-col py-9 px-10 justify-end'>
        <AiOutlineLogout className='text-2xl hover:bg-gray-700 rounded-lg duration-300' />
        <label className='text-sm'>Logout</label>
    </div>
  )
}
