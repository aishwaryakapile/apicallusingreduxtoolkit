import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteData, fetchData, fetchUserData, submitUserData } from './formSlice';
import { setTitle, setBody, submitForm } from './formSlice';

const Form = () => {
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  const [userData, setUserData] = useState([])
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form)
  console.log('form', form?.getUserData?.data)
  const { title, body, error, status } = useSelector((state) => state.form)
  const [editData, setEditDta] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  useEffect(() => {
    dispatch(fetchData());

  }, [dispatch])

  useEffect(() => {
    if (form?.getUserData?.data) {
      setUserData(form?.getUserData?.data)
      // console.log('userData', userData)
    }
  }, [form?.getUserData?.data])



  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:3001/form', { title, body })
    //   .then(res => {
    //     alert('Form submitted successfully')
    //     setTitle('')
    //     setBody('')
    //   })
    //   .catch(error => {
    //     console.log('errror', error);

    //   })
    let data = {
      body,
      title,

    }
    console.log('data', data)
    if (data) {

      dispatch(submitForm(data))
      alert('data submitted')
    }
    dispatch(setTitle(''))
    dispatch(setBody(''))
    dispatch(fetchData());
    console.log('submit', data)
  }

  const deleteUserData = (userId) => {
    dispatch(deleteData(userId))
    // axios.delete('http://localhost:3001/form/'+userId)
    // .then(res=>{
    //   alert('Data deleted successfully')
    // }
    // )
    // .catch(err=>{
    //   console.log(err)
    // }
    // )
    dispatch(fetchData());

  }

  // edit function starts here
  //   const editUser = (userid) => {
  //     axios.get('http://localhost:3001/form/' + userid)
  //       .then(res => {
  //         dispatch(setTitle(res.data.title))
  //         dispatch(setBody(res.data.body))
  //         setEditDta(true)
  //         setCurrentId(userid);
  //         document.getElementById('note').innerHTML = '';
  //         console.log('edit', res.data)

  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }

  //   const submitEditUserData = (e) => {
  //     e.preventDefault();
  //     axios.put('http://localhost:3001/form/' + currentId, { title, body })
  //       .then(res=>{
  //         document.getElementById('note').innerHTML = 'User updated successfully';
  //         dispatch(setTitle(''))
  //         dispatch(setBody(''))
  //         setEditDta(false)
  //         dispatch(fetchData());
  //       }

  //       ) 
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // edit function ends here


  // edit fruntion using redux
  const editUser = (userId) => {
    dispatch(fetchUserData(userId))
    setEditDta(true)
    setCurrentId(userId);
  }

  
  const submitEditUserData = (e) => {
    e.preventDefault();
    let updatedData = { title, body }
    console.log('updatedData',updatedData)
    if(updatedData){
      dispatch(submitUserData({ userId: currentId, updatedData }))
 
      document.getElementById('note').innerHTML = 'User updated successfully';
      dispatch(setTitle(''))
      dispatch(setBody(''))
      setEditDta(false)
      dispatch(fetchData());
    }
  
  }

  return (
    <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full mt-4">
      <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full flex justify-center">
        <form action="" className="w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full flex justify-center">
          <div className="w-[48%] ">
            {/* <label htmlFor="" className='text-red-700'>First Name</label> */}
            <input type="text" name="title" id="" value={title} className='border w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full px-2' placeholder='First Name' onChange={(e) => dispatch(setTitle(e.target.value))} />
          </div>
          <div className="w-[48%] ml-2">
            {/* <label htmlFor="">Last Name</label> */}
            <input type="text" name="body" id="" value={body} className='border w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full px-2' placeholder='Last Name' onChange={(e) => dispatch(setBody(e.target.value))} />
          </div>
        </form>
      </div>
      <div id="note"></div>
      <button className='bg-amber-700 px-2 py-[6px]  rounded-md mt-3' onClick={
        editData === true ? submitEditUserData : handleSubmit}>
        {
          editData === true ? 'Edit' : 'Submit'
        }
      </button>
      {/* {status === 'loading' && <p>Submitting...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <p>Form submitted successfully!</p>} */}

      <div className='w-full text-black flex flex-wrap'>
        {
          userData?.map((data) => (
            <>
              <div className='text-start p-4 w-1/4' key={data.id}>
                <h4>{data?.id}</h4>
                <p>{data?.body}</p>
                <p>{data?.title}</p>
                <button className='px-2 py-[6px]  bg-red-700 rounded-md text-white'
                  onClick={() => deleteUserData(data.id)}>
                  Delete</button>
                <button className='ml-2 px-2 py-[6px]  bg-red-700 rounded-md text-white'
                  onClick={() => editUser(data.id)}>Edit</button>
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Form