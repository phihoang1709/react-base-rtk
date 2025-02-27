import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { postsApi } from '@/services/posts';
import { authApi } from '@/services/auth';

import postsReducer, { namespace as postsNamespace } from './posts/postsSlice';
import authReducer ,{ namespace as authNamespace } from './auth/authSlice';
import themeReducer, { namespace as themeNamespace } from './theme/themeSlice';


export const listenerMiddleware = createListenerMiddleware({
  onError: () => console.error('An error listener middleware occurred'),
});


const reducer = {
  [postsNamespace]: postsReducer,
  [authNamespace]: authReducer,
  [themeNamespace]: themeReducer,
  
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
    .prepend(listenerMiddleware.middleware)
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>()

