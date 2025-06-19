import { useReactFlow } from "@xyflow/react";
import { useContext } from "react";
import { useState, createContext } from "react";

export const MindmapContext = createContext();

export const useMindmapContext = () => {
    return useContext(MindmapContext);
};

export const MindmapContextProvider = ({ children }) => {
    const [mindmap, setMindmap] = useState("test");
    const { setEdges, setNodes } = useReactFlow();

    function addNewNode(sourceNodeId) {
        const newNodeId = Date.now();
        const newNode = {
            id: newNodeId,
            position: { x: 250, y: 250 },
            data: { label: `New node ${newNodeId}` },
            type: "terminalNode",
        };

        setNodes((nds) => nds.concat(newNode));

        const newEdge = {
            id: `edge_${sourceNodeId}-${newNodeId}`,
            source: sourceNodeId,
            target: newNodeId,
            // animated: true,
        };

        setEdges((eds) => eds.concat(newEdge));
    }

    return (
        <MindmapContext.Provider value={{ mindmap, setMindmap, addNewNode }}>
            {children}
        </MindmapContext.Provider>
    );
};
