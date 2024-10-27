import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, fetchUsers } from '../redux/UserReducer'

const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUsers());
    }, [])
    const userData = useSelector((state) => state.users.users);
    
    console.log(userData);
    return (
        <div className='w-10/12 py-8 box-border border mx-auto rounded border-gray-300 shadow mt-10 mb-10'>
            <div className='w-[90%] mx-auto '>
                <h2 className='text-2xl font-bold text-center pb-7'>User Management CRUD App</h2>
                <Link to={"./create"} className='px-6 py-3 rounded-md bg-blue-700 text-white text-lg font-semibold hover:bg-blue-800 transition duration-300'>Create New</Link>
                <div className='relative mt-7 border overflow-x-auto sm:rounded-lg'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                        <thead className='text-md text-gray-900 uppercase bg-gray-100'>
                            <tr>
                                <th className='px-6 py-3'>ID</th>
                                <th className='px-6 py-3'>Name</th>
                                <th className='px-6 py-3'>Email</th>
                                <th className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-gray-900 text-md font-medium'>
                            {userData.map((user, i) => (
                                <tr key={i} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='px-6 py-4'>{user.id}</td>
                                    <td className='px-6 py-4'>{user.name}</td>
                                    <td className='px-6 py-4'>{user.email}</td>
                                    <td className='px-6 py-4 flex'>
                                        <Link to={`/edit/${user.id}`} className='px-4 py-2 mr-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300'>Edit</Link>
                                        <button onClick={() => dispatch(deleteUser(user.id))} className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
