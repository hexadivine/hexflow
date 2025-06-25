import stripAnsi from "strip-ansi";
export function connectSocket(url = "ws://localhost:8080") {
    const socket = new WebSocket(url);

    socket.addEventListener("open", () => {
        console.log("Websocket: Connection established");
    });

    socket.addEventListener("close", () => {
        console.log("Websocket: Connection closed");
    });

    socket.addEventListener("error", () => {
        console.log("Websocket: An unexpected error occurred ");
    });
    return socket;
}

export function sendCommand(socket, cmd, callback = () => {}, retry = 3) {
    if (retry)
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(cmd);
            callback();
        } else {
            console.log("Websocket: Connection is not established successfully");
            setTimeout(() => sendCommand(socket, cmd, callback, retry - 1), 2000);
        }
}

export function onSocketMessage(socket, callback) {
    if (socket) {
        socket.addEventListener("message", (event) => {
            callback(stripAnsi(event.data));
        });
    }
}

export function disconnectSocket(socket) {
    if (socket) return socket.close();
}
