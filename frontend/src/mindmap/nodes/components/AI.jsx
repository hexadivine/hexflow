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

    useEffect(() => {
        if (selected) focusInputRef.current.focus();
    }, [selected]);

    useEffect(() => {
        if (aiThinkingRef.current)
            aiThinkingRef.current.scrollTo(0, aiThinkingRef.current.scrollHeight + 10000);
    }, [aiChat]);

    async function askAI(prompt) {
        setAIChat((prev) => ({ ...prev, [prompt]: { response: "", thinking: "" } }));
        setIsLoading(true);

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek-r1",
                prompt: `${prompt}`,
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
                        [prompt]: {
                            ...prev[prompt],
                            thinking: prev[prompt]["thinking"] + json.response,
                        },
                    }));
                } else if (json.response) {
                    setAIChat((prev) => ({
                        ...prev,
                        [prompt]: {
                            ...prev[prompt],
                            response: prev[prompt]["response"] + json.response,
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
        if (leftNodeData) {
            setAiPrompt("Fetching data from last node");
            askAI(leftNodeData.data.output + "\n What should I do next?");
        }
    }, [leftNodeData]);

    return (
        <div className="bg-black text-white p-4 max-h-100 overflow-auto max-w-200 hide-scrollbar">
            <div className="mb-15">
                {Object.keys(aiChat).map((prompt, index) => (
                    <div key={index}>
                        <p className="border-1 rounded-2xl p-5">{prompt}</p>
                        <div
                            className="whitespace-pre-wrap prose prose-invert m-3 p-3 rounded-lg"
                            style={{ backgroundColor: color }}
                        >
                            {isLoading && <p className=" mb-2">Thinking...</p>}
                            <div
                                className="!text-[14px] h-30 overflow-scroll  p-3  rounded-lg bg-white text-black opacity-40"
                                ref={aiThinkingRef}
                            >
                                {aiChat[prompt].thinking}
                            </div>
                            <div className="mt-5">
                                <ReactMarkdown>{aiChat[prompt].response}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 fixed bottom-1 pb-5 left-5 right-5 bg-black">
                <textarea
                    ref={focusInputRef}
                    rows={1}
                    type="text"
                    className="p-2 w-full text-white border-2 border-white"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") askAI(aiPrompt);
                    }}
                    placeholder="Ask AI something..."
                />
            </div>
        </div>
    );
}

export default AI;
