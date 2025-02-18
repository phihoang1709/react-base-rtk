import {
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    RootState,
  } from '@reduxjs/toolkit/query/react';
  
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
  
  export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    
    if (result.error?.status === 401) {
      // Try to refresh token
      const refreshResult = await baseQuery(
        '/auth/refresh',
        api,
        extraOptions
      );
      
      if (refreshResult.data) {
        // Retry original request
        result = await baseQuery(args, api, extraOptions);
      }
    }
    
    return result;
  };
  