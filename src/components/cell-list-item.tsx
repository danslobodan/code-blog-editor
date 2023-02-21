import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface Props {
    cell: Cell;
}

const CellListItem: React.FC<Props> = ({ cell }) => {
    return <div>{cell.type === "code" ? <CodeCell /> : <TextEditor />}</div>;
};

export default CellListItem;
