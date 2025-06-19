import React from "react";
import { useRef, useEffect } from "react";

function Notes({ selected }) {
    const focusInputRef = useRef(null);

    useEffect(() => {
        if (selected) focusInputRef.current.focus();
    }, [selected]);
    return (
        <textarea
            ref={focusInputRef}
            name=""
            id=""
            className="text-white border-none outline-none w-full p-4 bg-black h-full"
        />
    );
}

export default Notes;
