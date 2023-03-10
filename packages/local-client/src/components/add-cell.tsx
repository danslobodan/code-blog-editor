import "./add-cell.css";
import { useActions } from "../hooks/use-actions";

interface Props {
    previousCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<Props> = ({
    previousCellId: nextCellId,
    forceVisible,
}) => {
    const { insertCellAfterAction } = useActions();

    return (
        <div className={`add-cell ${forceVisible && "force-visible"}`}>
            <div className="add-buttons">
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => insertCellAfterAction(nextCellId, "code")}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus" />
                    </span>
                    <span>Code</span>
                </button>
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => insertCellAfterAction(nextCellId, "text")}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus" />
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
