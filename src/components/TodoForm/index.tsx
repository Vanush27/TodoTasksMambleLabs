import React, {ChangeEventHandler, FC} from 'react';
import deleteSVG from "../../assets/image/svg/delete.svg";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {clearDeleteButton, inputErrorMessage, disableSubmit, setInputValue} from "../../store/slices/formSlice";
import {addTodo, hideCompletedActive, hideCompleteTodos} from "../../store/slices/todoSlice";

import styles from "./ToDoForm.module.css";

const ToDoForm: FC = () => {

    const dispatch = useAppDispatch();

    const todoList = useAppSelector((state) => state.todos.todoList);
    const isClearDeleteButton = useAppSelector((state) => state.form.isClearDeleteButton);
    const message = useAppSelector((state) => state.form.message);
    const disable = useAppSelector((state) => state.form.disable);
    const inputValue = useAppSelector((state) => state.form.inputValue);


    const handleClickAddList = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue?.length) {
            if (message.length) {
                dispatch(disableSubmit(true));
            } else {
                dispatch(disableSubmit(false));
                dispatch(addTodo(inputValue));
                dispatch(setInputValue(''));
                dispatch(clearDeleteButton(!isClearDeleteButton));
            }
        }

    }


    const handleRemoveInputValue = () => {
        dispatch(setInputValue(''))
        dispatch(clearDeleteButton(!isClearDeleteButton))
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(clearDeleteButton(true));
        if (e.target.value.length > 54) {
            dispatch(inputErrorMessage("Task content can contain max 54 characters"));
        } else {
            dispatch(setInputValue(e.target.value))
            dispatch(inputErrorMessage(''));
        }
    }

    const handleFocusInput = () => {
        dispatch(clearDeleteButton(true));
    }

    /**
     * This function handle hide complete action
     * @param { boolean } checked
     */
    const handleHideComplete = (checked: boolean) => {
        dispatch(hideCompletedActive(checked))
        dispatch(hideCompleteTodos(checked));
    }

    return (
        <>
            { !!todoList?.length  && <div className={styles.wrapper}>
                <input
                    id='hide_completed'
                    className={styles.checkbox}
                    type="checkbox"
                    onChange={(e) => handleHideComplete(e.target.checked)}
                />
                <label htmlFor='hide_completed'>Hide completed</label>
            </div>}
            <p className={styles.p}>Task</p>
            <form onSubmit={handleClickAddList}>
                <div className={styles.input_task_container}>

                    <div className={styles.input_error}>
                      <div className={styles.relative_absolute}>
                          <input
                              onChange={handleChangeInput}
                              onFocus={handleFocusInput}
                              value={inputValue}
                              className={message ? styles.input_task_error : styles.input_task}
                              placeholder="Write here"
                              type="text"/>

                          {isClearDeleteButton &&
                          <button
                              className={styles.remove}
                              onClick={handleRemoveInputValue}>
                              <img src={deleteSVG} alt="delete"/>
                          </button>
                          }
                      </div>

                        {message && <div className={styles.error}>{message}</div>}
                    </div>

                    <button
                        disabled={disable}
                        className={styles.btn}>Add
                    </button>
                </div>


            </form>
        </>

    );
};

export default ToDoForm;