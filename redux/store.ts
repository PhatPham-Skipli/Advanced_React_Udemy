import { postApi } from '@/services/postApi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import commentReducer from './slices/commentSlice';

const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  comment: commentReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postApi.middleware),
    preloadedState,
  });

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;

