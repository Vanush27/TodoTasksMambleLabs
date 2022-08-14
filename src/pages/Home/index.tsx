import React, {useEffect} from 'react';

import Popup from "../../components/Popup";
import TodoList from "../../components/TodoList";
import ToDoForm from "../../components/TodoForm";
import {ITEMS_LOCAL_STORAGE} from "../../constants";
import {getLocalStorage} from "../../utils";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addTodoList} from "../../store/slices/todoSlice";

import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useAppDispatch();
    const visiblePopup = useAppSelector((state) => state.form.visiblePopup);

    useEffect(() => {
        const todoList = getLocalStorage(ITEMS_LOCAL_STORAGE);
        if (todoList?.length) {
            dispatch(addTodoList(todoList));
        }
    }, []);

    return (
        <div className={styles.container}>
            <ToDoForm/>
            <TodoList />
            {visiblePopup && <Popup/>}
        </div>
    );
};

export default Home;