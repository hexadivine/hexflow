import React, { useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { portToService } from "../utils/portToService";
import { useMindmapContext } from "../../../context/Mindmap";

function ServiceNode({ id, data }) {
    const { addNewNode } = useMindmapContext();

    useEffect(() => {
        if (data && data.port) {
            const { nextNodeTypes } = portToService(data.port);
            nextNodeTypes.forEach((nextNodeType, index) =>
                addNewNode(id, nextNodeType, { x: 500, y: 400 * index })
            );
        }
    }, [data]);
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
