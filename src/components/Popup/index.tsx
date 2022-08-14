import React, {FC, useRef} from 'react';

import {useOutsideAlerter} from "../../hooks/useOutsideAlerter";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {deleteTodoItem} from "../../store/slices/todoSlice";
import {visiblePopupToggle} from '../../store/slices/formSlice';

import styles from "./Popup.module.css";

const Popup: FC = () => {
    const dispatch = useAppDispatch();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, dispatch(visiblePopupToggle));

    const currentId = useAppSelector((state) => state.todos.currentId);

    /**
     * This function handle popup confirmation value "yes"
     */
    const handleDeleteYes = () => {
        dispatch(deleteTodoItem(currentId));
        dispatch(visiblePopupToggle(false));
    }

    /**
     * This function handle popup confirmation value "no"
     */
    const handleDeleteNo = () => {
        dispatch(visiblePopupToggle(false));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.popup_wrapper} ref={wrapperRef}>
                <p>Are you sure you want to delete?</p>
                <div className={styles.btn}>
                    <button onClick={handleDeleteYes} className={styles.btn_yes}>Yes</button>
                    <button onClick={handleDeleteNo}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;