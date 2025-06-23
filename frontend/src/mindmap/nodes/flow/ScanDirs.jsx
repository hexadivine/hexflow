import React, { useEffect } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";

function ScanDirs({ id, color }) {
    const { target, addNewNode } = useMindmapContext();

    useEffect(() => {
        if (!target) return;
    }, []);

    function newNodeLogic() {
        // addNewNode(id, "serviceNode", { x: 500, y: yPosition }, { port: port[0] });
    }

    return (
        <Template
            task="Directories"
            lineRegEx={/.*\[Status:.*\]/gm}
            wordRegEx={/.*/}
            newNodeLogic={newNodeLogic}
            cmd={`ffuf -u http://${target}/FUZZ -w /usr/share/wordlists/dirb/common.txt`}
            color={color}
        />
    );
}

export default ScanDirs;
