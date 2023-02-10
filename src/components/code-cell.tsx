import { useState } from "react";

import CodeEditor from "./code-editor";
import bundle from "../bundler";
import Preview from "./preview";

import Resisable from "./resizable";

const CodeCell = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <Resisable direction="vertical">
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resisable direction="horizontal">
                    <CodeEditor
                        initialValue="const a = 1"
                        onChange={(value) => setInput(value)}
                    />
                </Resisable>
                <Preview code={code} />
            </div>
        </Resisable>
    );
};

export default CodeCell;
