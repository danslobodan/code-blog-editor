import "./preview.css";
import { useRef, useEffect } from "react";

interface Props {
    code: string;
}

const html = `
    <html>
        <head>
            <style>html { background-color: white; }</style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data)
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                        console.error(err);
                    }
                }, false);
            </script>
        </body>
    </html>    
`;

const Preview: React.FC<Props> = ({ code }) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = html;
        iframeRef.current.contentWindow.postMessage(code, "*");
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframeRef}
                title="User Code"
                sandbox="allow-scripts"
                srcDoc={html}
            />
        </div>
    );
};

export default Preview;
