import "bulmaswatch/superhero/bulmaswatch.min.css";

import { createRoot } from "react-dom/client";
import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <TextEditor />
            </div>
        </Provider>
    );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
