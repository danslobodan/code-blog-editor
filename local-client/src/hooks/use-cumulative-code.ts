import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const cellIndex = order.indexOf(cellId);
        const orderedCells = order
            .slice(0, cellIndex + 1)
            .filter((cellId) => data[cellId].type === "code")
            .map((cellId) => data[cellId]);

        const realShowFunc = `
                import _React from 'react';
                import _ReactDOM from 'react-dom';

                var show = (value) => {

                    const root = document.querySelector('#root');

                    if (typeof value !== 'object') {
                        root.innerHTML = value;
                        return;
                    }

                    if (value.$$typeof && value.props) {
                        _ReactDOM.render(value, root)
                        return;
                    }

                    root.innerHTML = JSON.stringify(value);
                    return;
                };
            `;
        const emptyShowFunc = `var show = () => {}`;

        const cumulativeCode = [];
        for (let c of orderedCells) {
            const showFunc = c.id === cellId ? realShowFunc : emptyShowFunc;
            cumulativeCode.push(showFunc);
            cumulativeCode.push(c.content);
        }
        return cumulativeCode;
    }).join("\n");
};
