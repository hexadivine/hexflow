import React, { useEffect, useRef, useState } from "react";

import {
    connectSocket,
    disconnectSocket,
    onSocketMessage,
    sendCommand,
} from "../utils/socketClient";
import { useMindmapContext } from "../../../context/Mindmap";

function NmapScan({ color }) {
    const socket = useRef();
    const [output, setOutput] = useState("");
    const { target } = useMindmapContext();

    useEffect(() => {
        socket.current = connectSocket();
        onSocketMessage(socket.current, (data) => {
            setOutput((prev) => prev + data);
            console.log(data);
        });
        return () => disconnectSocket(socket.current);
    }, []);

    useEffect(() => {
        // console.log(targetHost);
        if (!target) return;
        console.log(socket.current);

        const timeout = setTimeout(() => {
            console.log("hi");
            sendCommand(socket.current, "nmap -p- -v -r -T5  " + target);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [socket, target]);

    useEffect(() => {
        console.log(output);
    }, [output]);

    return (
        <div className="p-5 rounded-2xl" style={{ background: color }}>
            NmapScan
        </div>
    );
}

export default NmapScan;
