import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import stripAnsi from "strip-ansi";

import { useReactFlow } from "@xyflow/react";
import {
    connectSocket,
    disconnectSocket,
    onSocketMessage,
    sendCommand,
} from "../utils/socketClient";

function Terminal({ id, selected, command, nextNodeLogic }) {
    const { updateNodeData } = useReactFlow();
    const [cmd, setCmd] = useState("");
    const [output, setOutput] = useState("");
    const [fetchingOutput, setFetchingOutput] = useState(false);

    const terminalRef = useRef(null);
    const focusInputRef = useRef(null);

    const socket = useRef(null);

    useEffect(() => {
        socket.current = connectSocket();
        onSocketMessage(socket.current, (resp) => {
            const cleanOutput = stripAnsi(resp);
            // console.log()
            if (cleanOutput.trim() === "||=-EOF-=||") {
                setFetchingOutput(false);
                nextNodeLogic && nextNodeLogic(output, id);
            } else {
                setOutput((prev) => prev + cleanOutput.replace("||=-EOF-=||", ""));
            }
        });

        return () => disconnectSocket(socket.current);
    }, []);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         console.log("running once");
    //         addNewNode(id);
    //     }, 5000);

    //     return () => clearTimeout(timeout);
    // }, []);

    useEffect(() => {
        setCmd(command);
        if (command) {
            console.log(command);
            sendCommand(socket.current, command, () => {
                setFetchingOutput(true);
                setCmd("");
            });
        }
    }, []);

    useEffect(() => {
        terminalRef.current.scrollTo(0, terminalRef.current.scrollHeight);
        updateNodeData(id, { output, fetchingOutput });
    }, [output, fetchingOutput]);

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
                    onKeyDown={(event) =>
                        event.key === "Enter"
                            ? sendCommand(socket.current, cmd, () => {
                                  setFetchingOutput(true);
                                  setCmd("");
                              })
                            : null
                    }
                />
            </pre>
        </div>
    );
}

export default Terminal;
