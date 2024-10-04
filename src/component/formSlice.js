import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// const initialState = {
//   title: '',
//   body: '',
//   status:'initial',
//   error:null,
// }

export const formDataSlice = createSlice({
  name: 'form',
  initialState: {
    userData: {
      title: '',
      body: '',
      status: '',
      error: null,
    },
    getUserData: {
      data:[],
      load:false

    },
    deteteData:{
      load:false
    },
    fetchUser:{
      load:'idel',
      data:[]
    }
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setBody: (state, action) => {
      state.body = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(submitForm.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(submitForm.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // state.userData.title = '';  // Clear the form after submission
      // state.userData.body = '';
    })
    .addCase(submitForm.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
      .addCase(fetchData.pending,(state, action)=>{
        state.getUserData.load=true
      })
      .addCase(fetchData.fulfilled,(state, action)=>{
        state.getUserData.load=false
        state.getUserData.data=action.payload
      })
      .addCase(fetchData.rejected,(state, action)=>{
        state.getUserData.load=false
      })
      .addCase(fetchUserData.pending,(state, action)=>{
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled,(state, action)=>{
        state.status = 'Succeed';
        state.title=action.payload.title
        state.body=action.payload.body
      })
      .addCase(fetchUserData.rejected,(state, action)=>{
        state.status = 'failed';
      })
  }
})

export const submitForm = createAsyncThunk(
  'form/submitform',
  async ({title,body}) => {
    try {
      const response = await axios.post('http://localhost:3001/form',{title,body})
      return response.data
    }
    catch (error) {
    
    }
  }

)
export const fetchData = createAsyncThunk(
  'form/fetchData',
  async () => {
    try {
      const {data} = await axios.get('http://localhost:3001/form')
      return data
    } catch (error) {
      // alert('error')
      console.log(error)
    }

  }
)

export const deleteData=createAsyncThunk(
  'form/deleteData',
  async (userId) => {
    try {
    await axios.delete('http://localhost:3001/form/'+userId)
      return userId
      
    } catch (error) {
      console.log(error)
    }
    
  }
)
export const fetchUserData=createAsyncThunk(
  'form/fetchUserData',
  async (userId) => {
    try {
      const response=await axios.get('http://localhost:3001/form/'+userId)
      console.log('response',response)
      return response.data
    
      
    } catch (error) {
      console.log(error)
      throw error;
    }
    
  }
)
 
export const submitUserData=createAsyncThunk(
  'form/submitEditUserData',
  async ({userId,updatedData}) => {
    try {
     const response= axios.put(`http://localhost:3001/form/${userId}`,updatedData)
     return response.data
    } catch (error) {
      console.log(error)
    }
    
  }
)

export const { setTitle, setBody } = formDataSlice.actions
export default formDataSlice.reducer