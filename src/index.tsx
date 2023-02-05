import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");
    const serviceRef = useRef<any>();

    const onClick = async () => {
        if (!serviceRef.current) return;

        const result = await serviceRef.current.transform(input, {
            loader: "jsx",
            target: "es2015",
        });
        setCode(result.code);
    };

    const startService = async () => {
        serviceRef.current = await esbuild.startService({
            worker: true,
            wasmURL: "/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    return (
        <div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
