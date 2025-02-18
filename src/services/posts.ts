import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";

const endpoint = 'posts';
const reducerPath = "postsApi";
const tagTypes = ['Post'];


export const postsApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes,
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `${endpoint}`
        }),
        getPostByID: builder.query({
            query: (id: number) => `${endpoint}/${id}`
        }),
        createPost: builder.mutation({
            query : (newPost) => ({
                url: `${endpoint}`,
                method: 'POST',
                body: newPost
            }),
            invalidatesTags: ['Post']
        })
    })
});

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = postsApi;