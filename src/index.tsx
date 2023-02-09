import "bulmaswatch/superhero/bulmaswatch.min.css";

import { useState } from "react";
import { createRoot } from "react-dom/client";
import CodeEditor from "./components/code-editor";
import bundle from "./bundler";

import Preview from "./components/preview";

const App = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

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
