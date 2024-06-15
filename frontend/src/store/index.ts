import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;
