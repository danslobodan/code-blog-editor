import "bulmaswatch/superhero/bulmaswatch.min.css";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
