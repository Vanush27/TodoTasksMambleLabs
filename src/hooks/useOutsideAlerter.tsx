import React, {Dispatch, useEffect} from "react";

export const useOutsideAlerter = (ref: any, setPopupMessage: any) => {
    useEffect(() => {

        function handleClickOutside(event: Event) {
            if (ref?.current && !ref?.current.contains(event.target)) {
                setPopupMessage(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}