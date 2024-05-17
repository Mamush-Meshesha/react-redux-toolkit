const API = "https://jsonplaceholder.typicode.com/posts";

const {createAsyncThunk, createSlice, configureStore} =require("@reduxjs/toolkit");
const axios= require("axios");
//initial state
const initialState = {
    posts: [],
    loading: false,
    error: null
}
//create async thunk
const fetchPosts =  createAsyncThunk("posts/fetchPosts", async () => {
    const res = await axios.get(API)
    return res.data
})
//slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
     extraReducers: (builder) => {
        //handle lifecycle - pending-success-rejected

        //pending
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true
        })

        //fulfiled
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload,
                state.loading = false
        })
        // rejected
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

//generate reducer
const postsReducer = postsSlice.reducer

//store
const store = configureStore({
    reducer: postsReducer
})

//dispatches

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchPosts())