export function portToService(port) {
    switch (port) {
        case "80":
            return {
                name: "Web Server",
                color: "#008CBB",
                nextFlow: ["scanDirsNode", "scanSubDomainsNode"],
            };
        case "22":
            return { name: "SSH Server", color: "#C6BD13" };
        default:
            return { name: "", color: "white" };
    }
}
