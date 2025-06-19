import React, { useRef, useCallback } from "react";
import { MindmapContextProvider } from "../context/Mindmap";

import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Sidebar from "./components/Sidebar";
import { DnDProvider, useDnD } from "../context/DnDContext";

import { initialEdges } from "./utils/edges";
import { initialNodes } from "./utils/nodes";
import { nodeTypes } from "./utils/nodeTypes";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
                dragHandle: ".drag-handle__custom",
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.setData("text/plain", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper w-full h-screen" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    fitView
                    style={{ backgroundColor: "#000" }}
                >
                    <Controls position="bottom-left" />
                    <Background />
                </ReactFlow>
            </div>
            <Sidebar />
        </div>
    );
};

export default function Mindmap() {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <MindmapContextProvider>
                    <DnDFlow />
                </MindmapContextProvider>
            </DnDProvider>
        </ReactFlowProvider>
    );
}
