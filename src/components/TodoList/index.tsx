import React, {FC} from 'react';

import deleteSVG from "../../../src/assets/image/svg/delete.svg";
import DefaultText from "../DefaultText";
import {TaskItem} from "../../typing";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {visiblePopupToggle} from "../../store/slices/formSlice";
import {
    currentDeletedId,
    hideCompletedActive,
    hideCompleteTodos,
    toggleTodoComplete
} from '../../store/slices/todoSlice';

import styles from "./List.module.css";

const TodoList: FC = (): any => {

    const dispatch = useAppDispatch();
    const todoList = useAppSelector((state) => state.todos.todoList);
    const isHideCompletedActive = useAppSelector((state) => state.todos.isHideCompletedActive);

    /**
     * This function handle checkbox change value
     * @param event
     * @param id
     */
    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const isCompleted = event.target.checked
        dispatch(toggleTodoComplete({isCompleted, id}));


        if (isHideCompletedActive) {

            dispatch(hideCompletedActive(true))
            dispatch(hideCompleteTodos(true));
        }
    };

    /**
     * This function handle deleted item id
     * @param id
     */
    const handleDelete = (id: number) => {
        dispatch((visiblePopupToggle(true)));
        dispatch(currentDeletedId(id));
    }

    return (
        todoList?.length ? todoList.map((item: TaskItem) =>
            <div key={item.id}
                 className={`${styles.container_list} ${item.isCompleted ? styles.checked_item : styles.not_checked_item}`}>
                <div className={`${styles.wrapper}`}>
                    <input className={styles.checkbox}
                           type="checkbox"
                           value={item.text}
                           checked={item.isCompleted}
                           onChange={(e) => handleChangeCheckbox(e, item.id)}
                           id={String(item.id)}
                    />
                    <label htmlFor={String(item.id)}> {item.text}</label>
                </div>

                <button onClick={() => handleDelete(item.id)}>
                    <img src={deleteSVG} alt="delete"/>
                </button>
            </div>) : <DefaultText/>
    );
};

export default TodoList;