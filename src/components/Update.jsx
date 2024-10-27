import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUsers } from '../redux/UserReducer';

const Update = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [updatedData, setUpdatedData] = useState();

  const {users} = useSelector((state)=> state.users);
  console.log(users)
  useEffect(()=>{
    console.log(id)
    console.log(users)
    if(id){
      const singleData = users.find((user)=> user.id === Number(id));
      console.log(singleData)
      setUpdatedData({...singleData});
    }
  }, [id, users]);

  const newData = (e)=> {
    setUpdatedData({...updatedData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(updatedData)
    if(id){
      dispatch(updateUsers({id:updatedData.id, data: updatedData}));
    }
    
    setUpdatedData();
    navigate("/");
  }

  return (
    <div className='w-10/12 py-8 box-border border mx-auto rounded border-gray-300 shadow mt-10 mb-10'>
      <div className='w-[90%] mx-auto '>
        <h2 className='text-2xl font-bold text-center pb-7'>User Management CRUD App</h2>
        <div className='w-[50%] mx-auto'>
          <h3 className='text-center font-bold text-xl mb-10'>Update User</h3>
          
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
            <div className='mb-5'>
              <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="name">Name:</label>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" name='name' placeholder='Enter name'  value={updatedData && updatedData.name} onChange={newData}/>
            </div>
            <div className='mb-5'>
              <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="email">Email</label>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" name='email' placeholder='Enter email'  value={updatedData && updatedData.email} onChange={newData}/>
            </div>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
