import {createSlice} from "@reduxjs/toolkit";

/**
 * Form slice state type
 */
type FormState = {
    isClearDeleteButton: boolean,
    message: string
    disable: boolean,
    visiblePopup: boolean,
    inputValue: string
}

/**
 * Form slice initial state
 */
const initialState: FormState = {
    isClearDeleteButton: false,
    message: '',
    disable: false,
    visiblePopup: false,
    inputValue: ''
}

export const formSlice = createSlice({
        name: 'form',
        initialState,
        reducers: {
            clearDeleteButton: (state, action) => {
                state.isClearDeleteButton = action.payload;
            },

            inputErrorMessage: (state, action) => {
                state.message = action.payload;
            },

            disableSubmit: (state, action) => {
                state.disable = action.payload;
            },

            visiblePopupToggle: (state, action) => {
                state.visiblePopup = action.payload;
            },

            setInputValue: (state, action) => {
                state.inputValue = action.payload;
            },
        }
    }
)


export const {clearDeleteButton, inputErrorMessage, disableSubmit, visiblePopupToggle, setInputValue} = formSlice.actions

export default formSlice.reducer
