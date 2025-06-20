import { useNodes, useReactFlow } from "@xyflow/react";
import { useContext, useEffect } from "react";
import { useState, createContext } from "react";

export const MindmapContext = createContext();

export const useMindmapContext = () => {
    return useContext(MindmapContext);
};

export const MindmapContextProvider = ({ children }) => {
    const [mindmap, setMindmap] = useState("test");
    const { setEdges, setNodes } = useReactFlow();
    const nodes = useNodes();

    function addNewNode(sourceNodeId) {
        if (nodes.length === 0) return;

        const oldNode = nodes.find((node) => node.id === sourceNodeId);
        const position = { x: oldNode.position.x + 650, y: oldNode.position.y - 100 };

        const newNodeId = Date.now().toString();
        const newNode = {
            id: newNodeId,
            position,
            data: { label: `New node ${newNodeId}` },
            type: "notesNode",
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
        <MindmapContext.Provider value={{ mindmap, setMindmap, addNewNode }}>
            {children}
        </MindmapContext.Provider>
    );
};
