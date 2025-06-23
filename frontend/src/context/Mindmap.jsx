import { useNodes, useReactFlow } from "@xyflow/react";
import { useContext, useEffect } from "react";
import { useState, createContext } from "react";

export const MindmapContext = createContext();

export const useMindmapContext = () => {
    return useContext(MindmapContext);
};

export const MindmapContextProvider = ({ children }) => {
    const [target, setTarget] = useState("");

    const { setEdges, setNodes } = useReactFlow();
    const nodes = useNodes();

    function addNewNode(sourceNodeId, type, position, data = { label: "custom node" }) {
        if (nodes.length === 0) return;

        const oldNode = nodes.find((node) => node.id === sourceNodeId);
        position = { x: oldNode.position.x + position.x, y: oldNode.position.y + position.y };
        console.log("data");
        console.log(data);
        const newNodeId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const newNode = {
            id: newNodeId,
            position,
            data,
            type,
        };

        setNodes((nds) => {
            return nds.concat(newNode);
        });

        const newEdge = {
            id: `edge_${sourceNodeId}-${newNodeId}`,
            source: sourceNodeId,
            target: newNodeId,
            // animated: true,
        };

        // setEdges((eds) => eds.concat(newEdge));
        // console.log("edge");
        setEdges((nds) => {
            // console.log(nds);
            return nds.concat(newEdge);
        });
    }

    return (
        <MindmapContext.Provider value={{ target, setTarget, addNewNode }}>
            {children}
        </MindmapContext.Provider>
    );
};
