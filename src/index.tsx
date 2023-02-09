import "bulmaswatch/superhero/bulmaswatch.min.css";

import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

import Preview from "./components/preview";

const App = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const serviceRef = useRef<any>();

    const onClick = async () => {
        if (!serviceRef.current) return;

        const result = await serviceRef.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                "process.env.NODE_ENV": "'production'",
                global: "window",
            },
        });

        setCode(result.outputFiles[0].text);
    };

    const startService = async () => {
        serviceRef.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    return (
        <div>
            <CodeEditor
                initialValue="const a = 1"
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
