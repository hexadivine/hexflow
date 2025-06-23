const WebSocket = require("ws");
const nodePTY = require("node-pty");

const wss = new WebSocket.Server({ port: 8080 });

console.log("Websocket server listening on port 8080...");
wss.on("connection", (ws) => {
    console.log("Socket connection established!");
    const shell = nodePTY.spawn("/bin/bash", [], {
        name: "xterm-color",
        home: process.env.HOME,
        env: process.env,
    });

    ws.on("message", (msg) => {
        const cmd = msg.toString();
        console.log("Received message: " + cmd);
        shell.write(cmd + "; echo '||=-EOF-=||' \n");
    });

    shell.on("data", (data) => {
        const output = data.replace("; echo '||=-EOF-=||' ", "");
        // console.log(data);
        ws.send(output);
    });

    ws.on("error", (_) => {
        console.log("An unexpected error occurred...");
    });
});
