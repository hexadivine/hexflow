import React, { useEffect, useState } from "react";
import Template from "./Template";
import { useMindmapContext } from "../../../context/Mindmap";

function MapIPToHost({ id, color }) {
    const { target, setTarget, addNewNode } = useMindmapContext();
    const [output, setOutput] = useState("");

    const command = `/tools/addHost.sh ${target}`;

    useEffect(() => {
        if (output) {
            console.log("op");
            console.log(output);
            const domainLine = output?.match(/\[\!\].*/gm);
            if (domainLine && domainLine.length > 0) {
                setTarget(domainLine[0].replace("[!] ", "").trim());
            }
        }
    }, [output]);

    return (
        <div className="p-3 rounded-2xl" style={{ background: color }}>
            <Template
                task=""
                lineRegEx={/.*\[Status:.*\]/gm}
                wordRegEx={/.*/}
                cmd={command}
                color={color}
                setOutput={setOutput}
            />
            <pre className="">{output?.match(/\[\+\].*/gm)?.map((line) => line + "\n")}</pre>
        </div>
    );
}

export default MapIPToHost;
