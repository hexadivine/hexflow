import { IoTerminalOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import { FaSuperpowers } from "react-icons/fa";

export const getHeadingMetadata = (name) => {
    switch (name) {
        case "Terminal":
            return {
                name: "Terminal",
                icon: <IoTerminalOutline />,
            };
        case "Notes":
            return {
                name: "Notes",
                icon: <GrNotes />,
            };
        case "AI":
            return {
                name: "AI",
                icon: <BsRobot />,
            };
        case "StartingPoint":
            return {
                name: "Starting Point",
                icon: <FaSuperpowers />,
                title: "Initial scan",
            };
        case "NmapScan":
            return {
                name: "Nmap Scan",
                icon: <FaSuperpowers />,
                title: "Find open ports",
            };
        case "ScanDirs":
            return {
                name: "Scan Directories",
                icon: <FaSuperpowers />,
                title: "Use FFUF tool to scan dirs",
            };
        case "ScanSubDomains":
            return {
                name: "Scan Sub Domains",
                icon: <FaSuperpowers />,
                title: "Use FFUF tool to scan subdomains",
            };
        case "ServiceNode":
            return {
                name: "Find Hostname",
                icon: <FaSuperpowers />,
                title: "",
            };
        default:
            return {
                name: "Update Name",
                icon: <FaSuperpowers />,
                title: "",
            };
    }
};
