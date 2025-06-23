import React, { useEffect, useRef, useState } from "react";

import {
    connectSocket,
    disconnectSocket,
    onSocketMessage,
    sendCommand,
} from "../utils/socketClient";
import { useMindmapContext } from "../../../context/Mindmap";

function NmapScan({ id, color }) {
    const socket = useRef();
    const [ports, setPorts] = useState([]);
    const [status, setStatus] = useState("");
    const [isFetching, setIsFetching] = useState(true);

    const { target, addNewNode } = useMindmapContext();

    useEffect(() => {
        let yPosition = -100;

        socket.current = connectSocket();
        onSocketMessage(socket.current, (data) => {
            // get ports
            const port = data
                .match(/Discovered open port (\d+)/gm)
                ?.map((line) => line.match(/\d+/)[0]);

            if (port) {
                setPorts((prev) => prev.concat(port));
                console.log("---port---");
                console.log(port[0]);
                addNewNode(id, "serviceNode", { x: 600, y: yPosition }, { port: port[0] });
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
        if (!target) return;

        const timeout = setTimeout(() => {
            setStatus("[!] Finding open ports");
            sendCommand(socket.current, "nmap -p- -v -r -T5  " + target);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [socket, target]);

    useEffect(() => {
        if (isFetching === false) {
            setStatus((prev) => prev + "\n[+] Command execution completed!");
        }
    }, [isFetching]);

    useEffect(() => {
        console.log(ports);
    }, [ports]);

    return (
        <div className="w-full h-full p-5 rounded-2xl" style={{ background: color }}>
            <div className="flex flex-wrap gap-2 mb-3 ">
                {ports.map((port, index) => (
                    <p key={index} className="px-4 py-2 text-white bg-black rounded-2xl">
                        {port}
                    </p>
                ))}
            </div>
            <pre className="p-3 mt-auto text-white bg-black rounded-2xl">{status}</pre>
        </div>
    );
}

export default NmapScan;
