import "./code-cell.css";
import { useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

import CodeEditor from "./code-editor";
import Preview from "./preview";

import Resisable from "./resizable";
import { Cell } from "../state";

interface Props {
    cell: Cell;
}

const CodeCell: React.FC<Props> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cell.content);
            return;
        }

        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cell.content, createBundle]);

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
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-small is-primary"
                                max="100"
                            >
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview code={bundle.code} err={bundle.err} />
                    )}
                </div>
            </div>
        </Resisable>
    );
};

export default CodeCell;
