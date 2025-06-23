import React from "react";
import { useState } from "react";
import { Handle, Position } from "@xyflow/react";

import NodeStructure from "./components/NodeStructure";

import Terminal from "./components/Terminal";
import Notes from "./components/Notes";
import AI from "./components/AI";
import StartingPoint from "./flow/StartingPoint";
import NmapScan from "./flow/NmapScan";
import ScanDirs from "./flow/ScanDirs";
import ScanSubDomains from "./flow/ScanSubDomains";
import { portToService } from "./utils/portToService";
import MapIPToHost from "./flow/MapIPToHost";

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
    const [color, setColor] = useState("teal");

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <AI id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}

export function StartingPointNode({ id, selected }) {
    const [color, setColor] = useState("#00a100");

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <StartingPoint id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}

export function NmapScanNode({ id, selected }) {
    const [color, setColor] = useState("#00a100");

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <NmapScan id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}

export function ScanDirsNode({ id, selected }) {
    const [color, setColor] = useState(portToService(80).color);

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <ScanDirs id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}

export function ScanSubDomainsNode({ id, selected }) {
    const [color, setColor] = useState(portToService(80).color);

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <ScanSubDomains id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}

export function MapIPToHostNode({ id, selected }) {
    const [color, setColor] = useState("yellow");

    return (
        <NodeStructure color={color} setColor={setColor} id={id} selected={selected}>
            <MapIPToHost id={id} color={color} selected={selected} />
        </NodeStructure>
    );
}
