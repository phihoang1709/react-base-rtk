import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { InvalidatesEnum } from "@/constants/invalidates-tags";
import { baseQueryWithReauth } from "@/utils/baseQuery";

const endpoint = 'posts';
const reducerPath = "postsApi";

export interface Post {
    id: string
    title: string,
    description: string,
    author: string
}

export const postsApi = createApi({
    reducerPath,
    baseQuery: baseQueryWithReauth(baseUrl),
    tagTypes: [InvalidatesEnum.POST],
    endpoints: (builder) => ({
        getAllPosts: builder.query<Post[], void>({
            query: () => `${endpoint}`,
            providesTags: (result = []): Array<{ type: InvalidatesEnum.POST, id?: string } | InvalidatesEnum.POST > => {
                return result.length 
                ? [
                    { type: InvalidatesEnum.POST, id: "LIST" },
                    ...result.map(({id}) => ({type: InvalidatesEnum.POST as const, id}))] 

                : [{ type: InvalidatesEnum.POST, id: "LIST" }]
            },  
        }),
        
        getPost: builder.query({
            query: (id: number) => `${endpoint}/${id}`,
            providesTags: (id) => [{ type: InvalidatesEnum.POST, id }]
        }),

        createPost: builder.mutation({
            query : (newPost) => ({
                url: `${endpoint}`,
                method: 'POST',
                body: newPost
            }),
            invalidatesTags: [{ type: InvalidatesEnum.POST, id: "LIST" }]
        }),

        editPost: builder.mutation({
            query: (post) => ({
                url: `${endpoint}/${post.id}`,
                method: `PUT`,
                body: post
            }),
            invalidatesTags: ({id}) => [
                {type: InvalidatesEnum.POST, id},
                { type: InvalidatesEnum.POST, id: "LIST" }
            ],
        }),

        deletePost: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id: string) => ({
              url: `${endpoint}/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: (_success, _error, id) => [
              { type: InvalidatesEnum.POST, id },
              { type: InvalidatesEnum.POST, id: "LIST" },
            ],
        })
    })
});


export const { 
    useGetAllPostsQuery, 
    useGetPostQuery, 
    useCreatePostMutation, 
    useEditPostMutation,
    useDeletePostMutation } = postsApi;


