import MapIPToHost from "../nodes/flow/MapIPToHost";
import ServiceNode from "../nodes/flow/ServiceNode";
import {
    AINode,
    NmapScanNode,
    NotesNode,
    StartingPointNode,
    TerminalNode,
    ScanDirsNode,
    ScanSubDomainsNode,
    MapIPToHostNode,
} from "../nodes/Node";

export const nodeTypes = {
    terminalNode: TerminalNode,
    aiNode: AINode,
    notesNode: NotesNode,
    startingPointNode: StartingPointNode,
    mapIPToHostNode: MapIPToHostNode,
    nmapScanNode: NmapScanNode,
    serviceNode: ServiceNode,
    scanDirsNode: ScanDirsNode,
    scanSubDomainsNode: ScanSubDomainsNode,
};
