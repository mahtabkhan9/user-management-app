import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// create operation
export const createUsers = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
    })
    try{
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
})


// read operation
export const fetchUsers = createAsyncThunk("fetchUsers", async (_,{ rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    try {
        const users = await response.json();
        return users;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})


// update operation
export const updateUsers = createAsyncThunk("updateUsers", async ({id, data}, {rejectWithValue}) => {
    console.log(id);
    console.log(data)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
    })
    try{
        const updatedResult = await response.json();
        return updatedResult;
    }
    catch(error){
        return rejectWithValue(error);
    }
})


// delete operation
export const deleteUser = createAsyncThunk("deleteUser", async(id, {rejectWithValue}) => {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method : "DELETE"
        })
        return id;
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})


const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((ele) => (
                    ele.id === action.payload.id ? action.payload : ele
                ))
            })
            .addCase(updateUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                if(id){
                    state.users = state.users.filter((post) => post.id !== id);
                }
                console.log(state.users)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export default userSlice.reducer