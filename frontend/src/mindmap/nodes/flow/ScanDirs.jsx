import React, { useEffect, useRef } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";

function ScanDirs({ id, color }) {
    const { target, addNewNode } = useMindmapContext();
    const yPosition = useRef(-200);

    useEffect(() => {
        if (!target) return;
    }, []);

    function newNodeLogic(data) {
        console.log("hi");
        console.log(data);
        console.log(data.includes(".git"));
        if (data.includes(".git"))
            addNewNode(
                id,
                "terminalNode",
                { x: 700, y: yPosition.current || -200 },
                {
                    command: `python3 /opt/git-dumper/git_dumper.py http://${target} /${target} && cd /${target} && tree`,
                }
            );
        yPosition.current += 300;
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
