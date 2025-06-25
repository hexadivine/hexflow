import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "@xyflow/react";

import { IoColorPaletteOutline } from "react-icons/io5";

import { IoCloseCircle } from "react-icons/io5";
import { getHeadingMetadata } from "../../utils/nodeStructureHeadingMetadata";

function NodeStructure({ color, setColor, id, children, selected }) {
    const [heading, setHeading] = useState({});
    const { setNodes } = useReactFlow();
    // const [title, setTitle] = useState('');

    const deleteNode = () => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
    };

    useEffect(() => {
        setHeading(getHeadingMetadata(children.type.name));
    }, [children]);

    return (
        <div
            className="flex flex-col h-full bg-black cursor-default max-h-200 max-w-200"
            onWheelCapture={(e) => {
                e.stopPropagation();
            }}
        >
            <NodeResizer
                color={color}
                isVisible={selected}
                minWidth={500}
                minHeight={80}
                maxHeight={700}
                maxWidth={600}
            />

            {/* Node Structure */}
            <div
                className="flex items-center justify-between gap-5 p-2 px-3 cursor-move drag-handle__custom"
                style={{
                    background: color,
                    color: color === "red" || color === "blue" ? "white" : "black",
                }}
            >
                <div className="flex items-center gap-2 ">
                    <span>{heading.icon}</span>
                    <span>{heading.name} : </span>
                    <input
                        placeholder="Title..."
                        type="text"
                        name=""
                        id=""
                        className="px-5 py-2 text-sm text-black bg-white opacity-60 w-50 rounded-2xl"
                        value={heading.title || ""}
                        onChange={(event) =>
                            setHeading((prev) => ({ ...prev, title: event.target.value }))
                        }
                    />
                </div>
                <div className="flex gap-2">
                    <label className="relative cursor-pointer">
                        <IoColorPaletteOutline />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute top-0 left-0 w-6 h-6 opacity-0 cursor-pointer"
                        />
                    </label>
                    <IoCloseCircle className="cursor-pointer" onClick={deleteNode} />
                </div>
            </div>
            <div style={{ border: `2px solid ${color}` }} className="flex-grow p-2 overflow-auto">
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
