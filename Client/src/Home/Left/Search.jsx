import React from 'react'
import { CiSearch } from 'react-icons/ci'
import getUsers from '../../context/getUsers';
import useConversation from '../../statemanagement/useConversation';

function Search() {
    const [search, setSearch] = React.useState("");
    const [allUsers] = getUsers();
    const { setSelectedConversation } = useConversation();

    const searchUser = () => {
        if (!search) return;

        const conversation = allUsers.find((user) => user.name.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation)
            setSearch("")
        } else {
            console.log("user not found");
        }
    }
    return (
        <div className='flex justify-center p-3 h-[8vh]'>
            <div className='w-[68%]'>
                <label className="input bg-black">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </label>
            </div>
            <div className='w-[23%] content-center'>
                <CiSearch
                    onClick={searchUser}
                    className='text-4xl bg-gray-800 hover:bg-gray-700 rounded mx-2 duration-300' />
            </div>
        </div>
    )
}

export default Search
