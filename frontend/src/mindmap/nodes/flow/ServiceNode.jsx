import React from "react";
import { Handle, Position } from "@xyflow/react";
import { portToService } from "../utils/portToService";

function ServiceNode({ data }) {
    return (
        <>
            <div
                className="p-5 text-black rounded-2xl"
                style={{ background: portToService(data.port).color }}
            >
                Enumerate {portToService(data.port).name} - Port {data.port}
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
}

export default ServiceNode;
