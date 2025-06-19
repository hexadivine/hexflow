import React from "react";
import { useDnD } from "../../context/DnDContext";

import { IoTerminalOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";

export default function Sidebar() {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);

        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className="fixed right-0 bottom-1/2">
            <div className="translate-y-1/2 py-5 rounded-2xl mr-4 p-2 bg-black  border-1 border-white">
                <div
                    className="text-2xl mb-8 bg-black p-2 rounded-2xl"
                    onDragStart={(event) => onDragStart(event, "terminalNode")}
                    draggable
                >
                    <IoTerminalOutline className="text-white" />
                </div>

                <div
                    className="text-2xl mb-8 bg-black p-2 rounded-2xl"
                    onDragStart={(event) => onDragStart(event, "notesNode")}
                    draggable
                >
                    <GrNotes className="text-white" />
                </div>

                <div
                    className="text-2xl  bg-black p-2 rounded-2xl"
                    onDragStart={(event) => onDragStart(event, "aiNode")}
                    draggable
                >
                    <BsRobot className="text-white" />
                </div>
            </div>
        </aside>
    );
}
