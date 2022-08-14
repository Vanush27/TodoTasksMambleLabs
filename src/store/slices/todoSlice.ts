import uuid from 'react-uuid'

import {createSlice} from '@reduxjs/toolkit'
import {TaskItem} from "../../typing";
import {getLocalStorage, setLocalStorage} from "../../utils";
import {ITEMS_LOCAL_STORAGE} from "../../constants";

/**
 * Todos slice state type
 */
type TodoState = {
    todoList: TaskItem[] | []
    todoListHistory: TaskItem[] | []
    currentId: number | null
    isHideCompletedActive: boolean
    completeTodoID: null | number
}

/**
 * Todos slice initial state
 */
const initialState: TodoState = {
    todoList: [],
    todoListHistory: [],
    currentId: null,
    isHideCompletedActive: false,
    completeTodoID: null
}


export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodoList: (state: any, action) => {
            state.todoList = action.payload
        },
        addTodo: (state: any, action) => {
            const payloadData = {
                isCompleted: false,
                text: action.payload,
                id: uuid()
            }

            if (state.isHideCompletedActive) {
                const getLocalData = getLocalStorage(ITEMS_LOCAL_STORAGE);
                const newData = [...getLocalData, payloadData];

                setLocalStorage(ITEMS_LOCAL_STORAGE, newData);
                state.todoList = newData.filter((item: TaskItem) => !item.isCompleted);

                }
             else {
                state.todoList.unshift(payloadData)
                setLocalStorage(ITEMS_LOCAL_STORAGE, state.todoList);
            }
        },

        deleteTodoItem: (state: any, action) => {
            state.todoList = state.todoList.filter((item: TaskItem) => action.payload !== item.id);
            setLocalStorage(ITEMS_LOCAL_STORAGE, state.todoList);
        },

        currentDeletedId: (state: any, action) => {
            state.currentId = action.payload
        },

        toggleTodoComplete: (state, action) => {


            state.todoList = state.todoList.map((item: TaskItem) => {
                if (item.id === action.payload.id) {
                    return {...item, isCompleted: action.payload.isCompleted}
                }
                return item;
            })
            setLocalStorage(ITEMS_LOCAL_STORAGE, state.todoList);
        },

        hideCompleteTodos: (state, action) => {
            if (action.payload) {
                state.todoList = state.todoList.filter((item: TaskItem) => !item.isCompleted)
                let data = getLocalStorage(ITEMS_LOCAL_STORAGE)
                setLocalStorage(ITEMS_LOCAL_STORAGE, data);
            } else {
                state.todoList = getLocalStorage(ITEMS_LOCAL_STORAGE);
            }
        },

        hideCompletedActive: (state, action) => {
            state.isHideCompletedActive = action.payload
        }
    },
})


export const {addTodoList, addTodo, deleteTodoItem, currentDeletedId, toggleTodoComplete, hideCompleteTodos, hideCompletedActive} = todoSlice.actions

export default todoSlice.reducer
















