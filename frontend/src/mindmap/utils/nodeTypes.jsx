import ServiceNode from "../nodes/flow/ServiceNode";
import { AINode, NmapScanNode, NotesNode, StartingPointNode, TerminalNode } from "../nodes/Node";

export const nodeTypes = {
    terminalNode: TerminalNode,
    aiNode: AINode,
    notesNode: NotesNode,
    startingPoint: StartingPointNode,
    nmapScanNode: NmapScanNode,
    serviceNode: ServiceNode,
    scanDirs: ScanDirs,
    scanSubDomains: ScanSubDomains,
};
