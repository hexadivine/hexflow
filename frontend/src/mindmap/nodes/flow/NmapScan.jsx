import React, { useEffect } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";
import { useRef } from "react";

function NmapScan({ id, color }) {
    const { target, addNewNode } = useMindmapContext();

    const yOffset = useRef(-100);
    function newNodeLogic(data) {
        addNewNode(id, "serviceNode", { x: 600, y: yOffset.current }, { port: data });
        yOffset.current += 200;
    }

    return (
        <Template
            task="Open Ports"
            lineRegEx={/Discovered open port (\d+)/gm}
            wordRegEx={/\d+/}
            newNodeLogic={newNodeLogic}
            cmd={`nmap -p- -v -r -T4 ${target}`}
            color={color}
        />
    );
}

export default NmapScan;
