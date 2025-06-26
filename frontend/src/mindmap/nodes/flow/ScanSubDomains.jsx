import React, { useEffect, useRef } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";
import { isValidIP } from "../utils/validateTarget";

function ScanSubDomains({ id, color }) {
    const { target, addNewNode } = useMindmapContext();

    function newNodeLogic() {}

    if (!target) return;
    if (isValidIP(target))
        return (
            <p style={{ background: color }} className="p-2 rounded-2xl">
                IP cannot be enumerated for Subdomains
            </p>
        );

    return (
        <Template
            task="Sub Domain"
            lineRegEx={/.*\[Status:.*\]/gm}
            wordRegEx={/.*/}
            newNodeLogic={newNodeLogic}
            cmd={`ffuf -u http://${target}/ -H "Host: FUZZ.${target}" -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt -fc 301,200`}
            color={color}
        />
    );
}

export default ScanSubDomains;
