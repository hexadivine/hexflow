import React, { useEffect } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";

function ScanDirs({ color }) {
    const { target, addNewNode } = useMindmapContext();

    useEffect(() => {
        if (!target) return;
    }, []);

    function newNodeLogic() {
        // addNewNode(id, "serviceNode", { x: 500, y: yPosition }, { port: port[0] });
    }

    return (
        <Template
            task="Open Ports"
            lineRegEx={/Discovered open port (\d+)/gm}
            wordRegEx={/\d+/}
            newNodeLogic={newNodeLogic}
            cmd={`nmap -p- -v -r -T5 ${target}`}
            color={color}
        />
    );
}

export default ScanDirs;
