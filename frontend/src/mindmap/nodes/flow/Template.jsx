import React, { useEffect, useRef, useState } from "react";

import {
    connectSocket,
    disconnectSocket,
    onSocketMessage,
    sendCommand,
} from "../utils/socketClient";
import { useMindmapContext } from "../../../context/Mindmap";

function Template({ id, color, lineRegEx, wordRegEx, newNodeLogic, cmd, task, setOutput }) {
    const socket = useRef();
    const [filteredResults, setFilteredResults] = useState([]);
    const [status, setStatus] = useState("");
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        let yPosition = -200;

        socket.current = connectSocket();
        onSocketMessage(socket.current, (data) => {
            // save output
            setOutput && setOutput((prev) => prev + data);

            // get ports
            const filteredResult = data.match(lineRegEx)?.map((line) => line.match(wordRegEx)[0]);

            if (filteredResult) {
                setFilteredResults((prev) => prev.concat(filteredResult));
                console.log("---filteredResult---");
                console.log(filteredResult[0]);
                newNodeLogic && newNodeLogic();
                yPosition += 300;
            }

            // if ends
            if (data.trim().includes("||=-EOF-=||")) {
                setIsFetching(false);
            }
        });
        return () => disconnectSocket(socket.current);
    }, []);

    useEffect(() => {
        // if (!target) return;

        const timeout = setTimeout(() => {
            setStatus(`[!] Finding ${task}`);
            sendCommand(socket.current, cmd);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [socket]);

    useEffect(() => {
        if (isFetching === false) {
            setStatus((prev) => prev + "\n[+] Command execution completed!");
        }
    }, [isFetching]);

    useEffect(() => {
        console.log(filteredResults);
        if (filteredResults) {
            setStatus(`[!] Finding ${task}\n[+] Found ${task} - ${filteredResults.length}`);
        }
    }, [filteredResults]);

    if (task === "") return null;

    return (
        <div className="w-full h-full p-5 rounded-2xl" style={{ background: color }}>
            <div className="flex flex-wrap gap-2 mb-3 ">
                {filteredResults.map((port, index) => (
                    <p key={index} className="px-4 py-2 text-white bg-black rounded-2xl">
                        {port}
                    </p>
                ))}
            </div>
            <pre className="p-3 mt-auto text-white bg-black rounded-2xl">{status}</pre>
        </div>
    );
}

export default Template;
