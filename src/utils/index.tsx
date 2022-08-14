import {TaskItem} from "../typing";

/**
 * This function get in localStorage data by name
 * @param name
 * @return TaskItem[]
 */
export const getLocalStorage = (name: string): TaskItem[] => {
    const data = localStorage.getItem(name);
    return JSON.parse(data as string);
}

/**
 * This function set in localStorage data by name
 * @param name
 * @param data
 * @return void
 */
export const setLocalStorage = (name: string, data: TaskItem[]): void => {
    localStorage.setItem(name, JSON.stringify(data));
}