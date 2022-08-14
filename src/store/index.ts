import {configureStore} from '@reduxjs/toolkit'
import todoReducer from "./slices/todoSlice";
import formReducer from "./slices/formSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        form : formReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch