import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNodesData, useNodeConnections } from "@xyflow/react";

function AI({ color, selected }) {
    const [aiChat, setAIChat] = useState({});
    const [aiPrompt, setAiPrompt] = useState("");
    // const [aiResponse, setAiResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const aiThinkingRef = useRef(null);
    const focusInputRef = useRef(null);

    const [deepthinkFlag, setDeepthinkFlag] = useState(false);

    useEffect(() => {
        if (selected) focusInputRef.current.focus();
    }, [selected]);

    useEffect(() => {
        if (aiThinkingRef.current)
            aiThinkingRef.current.scrollTo(0, aiThinkingRef.current.scrollHeight + 10000);
    }, [aiChat]);

    async function askAI(prompt, title = "") {
        const placeholderPrompt = title === "" ? prompt : title;
        setAIChat((prev) => ({ ...prev, [placeholderPrompt]: { response: "", thinking: "" } }));
        setIsLoading(true);

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "qwen3:0.6b",
                prompt: `${prompt}. ${deepthinkFlag ? "" : "No thinking."}`,
                message: [
                    {
                        role: "system",
                        content:
                            "You are an professional CTF player and penetration tester that always responds in English, thinks quick and comes to conclusion quickly.",
                    },
                ],
                stream: true,
            }),
        });

        console.log(response);

        setAiPrompt("");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let isThinking = true;
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);

            try {
                const json = JSON.parse(chunk);

                if (json.response === "<think>") {
                    isThinking = true;
                    continue;
                }

                if (json.response === "</think>") {
                    isThinking = false;
                    continue;
                }

                if (isThinking && json.response) {
                    setAIChat((prev) => ({
                        ...prev,
                        [placeholderPrompt]: {
                            ...prev[placeholderPrompt],
                            thinking: prev[placeholderPrompt]["thinking"] + json.response,
                        },
                    }));
                } else if (json.response) {
                    setAIChat((prev) => ({
                        ...prev,
                        [placeholderPrompt]: {
                            ...prev[placeholderPrompt],
                            response: prev[placeholderPrompt]["response"] + json.response,
                        },
                    }));
                }
            } catch (err) {
                console.error("Error parsing stream chunk:", err, line);
            }
        }

        setIsLoading(false);
    }

    const leftNodeConnection = useNodeConnections({
        handleType: "target",
        handleId: "leftTarget",
    });
    const leftNodeData = useNodesData(leftNodeConnection?.[0]?.source || null);

    useEffect(() => {
        console.log(leftNodeData);
        if (leftNodeData && !leftNodeData.data.fetchingOutput) {
            askAI(
                leftNodeData.data.output + "\n What should I do next?",
                "Fetch content from the connected node...#" + (Object.keys(aiChat).length + 1)
            );
        }
    }, [leftNodeData]);

    return (
        <div className="p-4 overflow-auto text-white bg-black AIBox max-w-200 min-w-100 max-h-200 hide-scrollbar">
            <div className="mb-42">
                {Object.keys(aiChat).map((prompt, index) => (
                    <div key={index}>
                        <p className="p-5 border-1 rounded-2xl wrap-break-word">{prompt}</p>
                        <div
                            className="p-3 m-3 prose whitespace-pre-wrap rounded-lg prose-invert"
                            style={{ backgroundColor: color }}
                        >
                            {isLoading && <p className="mb-2 ">Thinking...</p>}
                            {deepthinkFlag && aiChat[prompt].thinking.trim() !== "" ? (
                                <div
                                    className="!text-[14px] h-30 overflow-scroll  p-3  rounded-lg bg-white text-black opacity-40"
                                    ref={aiThinkingRef}
                                >
                                    {aiChat[prompt].thinking}
                                </div>
                            ) : null}
                            <div className="mt-5">
                                <ReactMarkdown>{aiChat[prompt].response}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed pb-5 mt-4 bg-black bottom-1 left-5 right-5">
                <textarea
                    ref={focusInputRef}
                    rows={3}
                    type="text"
                    className="w-full p-2 text-white border-2 border-white"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && aiPrompt.trim() !== "") {
                            askAI(aiPrompt);
                            setAiPrompt("");
                        }
                    }}
                    placeholder="Ask AI something..."
                />
                <div className="flex gap-3 mt-4 cursor-pointer">
                    <button
                        className="px-4 py-1 rounded-2xl "
                        style={{
                            background: deepthinkFlag ? color : "black",
                            border: `1px solid ${color}`,
                        }}
                        onClick={() => {
                            setDeepthinkFlag((prev) => !prev);
                        }}
                    >
                        Deepthink
                    </button>
                    <button
                        className="px-4 py-1 rounded-2xl "
                        style={{ background: "black", border: `1px solid ${color}` }}
                    >
                        More features coming soon
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AI;
