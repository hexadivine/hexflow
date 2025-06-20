import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import stripAnsi from "strip-ansi";
import { useMindmapContext } from "../../../context/Mindmap";
import { useReactFlow } from "@xyflow/react";

function Terminal({ id, command, selected }) {
    const { updateNodeData } = useReactFlow();

    const [cmd, setCmd] = useState(command || "");
    const [output, setOutput] = useState("");

    const socketRef = useRef(null);
    const terminalRef = useRef(null);
    const focusInputRef = useRef(null);

    const { addNewNode } = useMindmapContext();

    useEffect(() => {
        socketRef.current = new WebSocket("ws://localhost:8080");
        socketRef.current.addEventListener("open", () => {
            console.log("Connected to websocket");
        });
        socketRef.current.addEventListener("message", (event) => {
            console.log("message received");
            const cleanOutput = stripAnsi(event.data);
            setOutput((prev) => prev + cleanOutput);
        });

        return () => {
            socketRef.current.close();
        };
    }, []);

    // addNewNode(id);

    // useEffect(() => {
    //     // const timeout = setInterval(() => {
    //     //     addNewNode(id);
    //     // }, 10000);
    //     // return () => clearInterval(timeout);
    //     // addNewNode(id);
    // }, []);

    function sendCommand() {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(cmd);
            setCmd("");
        } else {
            console.log("Connection is not established successfully");
        }
    }

    useEffect(() => {
        terminalRef.current.scrollTo(0, terminalRef.current.scrollHeight);
        updateNodeData(id, { output });
    }, [output]);

    useEffect(() => {
        if (selected) focusInputRef.current.focus();
    }, [selected]);

    return (
        <div
            className="max-w-full max-h-full overflow-scroll text-white hide-scrollbar "
            ref={terminalRef}
            onWheelCapture={(e) => {
                e.stopPropagation();
            }}
        >
            <pre className="wrap-break-word w-fit">
                {output}
                <input
                    type="text"
                    value={cmd}
                    ref={focusInputRef}
                    className="border-none outline-none w-100"
                    autoFocus="true"
                    onChange={(event) => setCmd(event.target.value)}
                    onKeyDown={(event) => (event.key === "Enter" ? sendCommand() : null)}
                />
            </pre>
        </div>
    );
}

export default Terminal;
