import React from 'react';
import styles from "./DefaultText.module.css";

const DefaultText = () => {
    return (
        <div className={styles.text_container}>
            <h3>your life is a blank page. You write on it</h3>
            <h2>So start by adding your tasks here</h2>
        </div>
    );
};

export default DefaultText;