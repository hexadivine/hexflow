import React, { useEffect, useRef } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";

function ScanSubDomains({ id, color }) {
    const { target, addNewNode } = useMindmapContext();

    useEffect(() => {
        if (!target) return;
    }, []);

    function newNodeLogic() {}

    return (
        <Template
            task="Sub Domain"
            lineRegEx={/.*\[Status:.*\]/gm}
            wordRegEx={/.*/}
            newNodeLogic={"a"}
            cmd={`ffuf -u http://${target}/ -H "Host: FUZZ.${target}" -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt -fc 301,302`}
            color={color}
        />
    );
}

export default ScanSubDomains;
