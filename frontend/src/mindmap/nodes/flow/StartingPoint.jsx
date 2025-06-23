import React, { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import {
    connectSocket,
    disconnectSocket,
    onSocketMessage,
    sendCommand,
} from "../utils/socketClient";
import { useMindmapContext } from "../../../context/Mindmap";

function StartingPoint({ id, color }) {
    const [targetIPHost, setTargetIPHost] = useState("");
    const [status, setStatus] = useState({ msg: "", error: "" });
    const [output, setOutput] = useState("");
    const { addNewNode, setTarget } = useMindmapContext();

    const socket = useRef(null);

    useEffect(() => {
        socket.current = connectSocket();
        onSocketMessage(socket.current, (data) => {
            setOutput((prev) => prev + data);
        });
        return () => disconnectSocket(socket.current);
    }, []);

    function isValidIP(ip) {
        const ipRegExp =
            /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
        return ipRegExp.test(ip);
    }

    function isValidHost(host) {
        if (host.split(".").length === 4 && !isValidIP(host)) {
            return false;
        }

        const hostRegExp = /^([a-z0-9-]+\.)+[a-z0-9-]+$/i;
        return hostRegExp.test(host);
    }

    function validTarget() {
        setStatus({ msg: "[!] Checking target...", error: false });
        if (!isValidIP(targetIPHost) && !isValidHost(targetIPHost)) {
            setStatus((prev) => ({
                msg: prev.msg + "\n[-] Invalid target provided!",
                error: true,
            }));
            return false;
        }

        setStatus((prev) => ({
            msg: prev.msg + "\n[+] Valid target provided!\n[!] Checking if the target is up...\n\n",
            error: false,
        }));
        return true;
    }

    function initScanning() {
        // cleanup
        setStatus({});
        setOutput("");

        // host pattern checking
        if (!validTarget()) return false;
        setTarget(targetIPHost);

        // check if host is up
        sendCommand(socket.current, `ping -c 1 ${targetIPHost} | grep from `);
    }

    useEffect(() => {
        if (!output) return;
        if (status.msg.includes("Target is")) return;

        if (output.includes("64 bytes from")) {
            setStatus((prev) => ({
                msg: prev.msg + "[+] Target is up and running" + "\n",
                error: false,
            }));
            addNewNode(id, "nmapScanNode", { x: 600, y: 150 });
        } else if (output.includes("||=-EOF-=||")) {
            setStatus((prev) => ({
                msg: prev.msg + "[-] Target is unreachable" + "\n",
                error: true,
            }));
        }
    }, [output]);

    return (
        <div style={{ background: color }} className="p-5 rounded-2xl">
            <p className="mb-2">Provide IP/host address...</p>
            <div className="flex items-center w-full gap-5">
                <input
                    type="text"
                    className="w-full px-3 py-2 bg-white rounded-2xl opacity-65"
                    value={targetIPHost}
                    onChange={(event) => setTargetIPHost(event.target.value)}
                    onKeyDown={(event) => (event.key === "Enter" ? initScanning() : null)}
                />
                <BiSend
                    className="w-10 h-8 p-1 bg-black fill-white rounded-2xl"
                    onClick={(event) => initScanning()}
                />
            </div>
            <small className="text-white opacity-50 ">eg. 192.168.0.1 or example.com</small>
            {status.msg ? (
                <pre
                    className={`mt-5 p-3 bg-black rounded-2xl max-w-150 max-h-50  overflow-scroll ${
                        status.error ? "text-red-500 font-bold" : "text-white"
                    }`}
                >
                    {status.msg}
                </pre>
            ) : null}
        </div>
    );
}

export default StartingPoint;
