import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "@xyflow/react";

import { IoColorPaletteOutline } from "react-icons/io5";
import { IoTerminalOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";

import { IoCloseCircle } from "react-icons/io5";

function NodeStructure({ color, setColor, id, children, selected }) {
    const [heading, setHeading] = useState({});
    const { setNodes } = useReactFlow();

    const deleteNode = () => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
    };

    useEffect(() => {
        if (children.type.name === "Terminal") {
            setHeading({
                name: "Terminal",
                icon: <IoTerminalOutline />,
            });
        } else if (children.type.name === "Notes") {
            setHeading({
                name: "Notes",
                icon: <GrNotes />,
            });
        } else if (children.type.name === "AI") {
            setHeading({
                name: "AI",
                icon: <BsRobot />,
            });
        }
    }, [children]);

    return (
        <div
            className="h-full flex flex-col cursor-default bg-black"
            onWheelCapture={(e) => {
                e.stopPropagation();
            }}
        >
            <NodeResizer color={color} isVisible={selected} minWidth={600} minHeight={80} />

            {/* Node Structure */}
            <div
                className="flex cursor-move justify-between p-2 items-center gap-5 drag-handle__custom px-3"
                style={{
                    background: color,
                    color: color === "red" || color === "blue" ? "white" : "black",
                }}
            >
                <div className="flex items-center gap-2  ">
                    <span>{heading.icon}</span>
                    <span>{heading.name} : </span>
                    <input
                        placeholder="Title..."
                        type="text"
                        name=""
                        id=""
                        className="bg-white opacity-50 w-100 rounded-2xl py-1 px-5 text-black"
                    />
                </div>
                <div className="flex gap-2">
                    <label className="cursor-pointer relative">
                        <IoColorPaletteOutline />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute left-0 top-0 opacity-0 w-6 h-6 cursor-pointer"
                        />
                    </label>
                    <IoCloseCircle className="cursor-pointer" onClick={deleteNode} />
                </div>
            </div>
            <div style={{ border: `2px solid ${color}` }} className="flex-grow overflow-auto p-2">
                {children}
            </div>

            {/* Arrow handle */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-10 !w-1 !border-none "
                style={{ backgroundColor: color }}
                id="leftTarget"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="!h-10 !w-1 !border-none"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}

export default NodeStructure;
