import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");
    const serviceRef = useRef<any>();
    const iframeRef = useRef<any>();

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

        iframeRef.current.contentWindow.postMessage(
            result.outputFiles[0].text,
            "*"
        );
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

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (event) => {
                        eval(event.data)
                    }, false);
                </script>
            </body>
        </html>    
    `;

    return (
        <div>
            <textarea
                style={{ width: "600px", height: "300px" }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
            <iframe
                ref={iframeRef}
                title="User Code"
                sandbox="allow-scripts"
                srcDoc={html}
            />
        </div>
    );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
