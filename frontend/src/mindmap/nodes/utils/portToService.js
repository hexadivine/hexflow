export function portToService(port) {
    const portNum = parseInt(port);
    switch (portNum) {
        case 80:
            return {
                name: "Web Server",
                color: "#008CBB",
                nextNodeTypes: ["scanSubDomainsNode", "scanDirsNode"],
            };
        case 22:
            return { name: "SSH Server", color: "#C6BD13", nextNodeTypes: [] };
        default:
            return { name: "", color: "white", nextNodeTypes: [] };
    }
}
