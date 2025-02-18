import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface IPostsState{
    posts: Post[]
}

const initialState: IPostsState = {
    posts: []
}

export const namespace = 'posts'


const postsSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        getAllResetPosts: () => {
            return initialState
        },
        getAllPosts: (state: IPostsState) => {
            return state;
        },
        setAllPosts: (state: IPostsState, actions : PayloadAction<IPostsState>) => {
            state.posts = actions.payload.posts
        }
    }
});

export const { getAllResetPosts, getAllPosts, setAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
export type { IPostsState };

