import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { postsApi } from '@/services/posts';
import { authApi } from '@/services/auth';

import postsReducer, { namespace as postNamespace } from './posts/postsSlice';

const reducer = {
  [postNamespace]: postsReducer,
  
  [postsApi.reducerPath]: postsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(
      postsApi.middleware,
      authApi.middleware,
    )
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()