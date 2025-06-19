import React from "react";
import NodeStructure from "./components/NodeStructure";

import Terminal from "./components/Terminal";
import Notes from "./components/Notes";
import AI from "./components/AI";

import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

export function TerminalNode({ id, selected, cmd }) {
    const [color, setColor] = useState("green");

    return (
        <NodeStructure id={id} selected={selected} color={color} setColor={setColor}>
            <Terminal id={id} command={cmd} selected={selected} />
        </NodeStructure>
    );
}

export function NotesNode({ id, selected }) {
    const [color, setColor] = useState("orange");

    return (
        <NodeStructure id={id} selected={selected} color={color} setColor={setColor}>
            <Notes id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}

export function AINode({ id, selected }) {
    const [color, setColor] = useState("blue");

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <AI id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}
