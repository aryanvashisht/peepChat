import axios from 'axios';
import React, { useEffect } from 'react'

function getUsers() {
  const [allUsers, setAllUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/getUsers`, { withCredentials: true });

        setAllUsers(response.data.users);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);
  return [allUsers, loading];
}

export default getUsers
