import { useState, useEffect } from "react";
import { useActions } from "../hooks/use-actions";

import CodeEditor from "./code-editor";
import bundle from "../bundler";
import Preview from "./preview";

import Resisable from "./resizable";
import { Cell } from "../state";

interface Props {
    cell: Cell;
}

const CodeCell: React.FC<Props> = ({ cell }) => {
    const [code, setCode] = useState("");
    const [err, setErr] = useState("");

    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);

    return (
        <Resisable direction="vertical">
            <div
                style={{
                    height: "calc(100% - 8px)",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resisable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resisable>
                <Preview code={code} err={err} />
            </div>
        </Resisable>
    );
};

export default CodeCell;
