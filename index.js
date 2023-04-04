import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from 'antd'
import App from "./src/app";
import AwsExports from "./src/aws-exports";
import {Amplify} from "aws-amplify";
//const root = document.getElementById("root");
//ReactDOM.render(<App />,root);

Amplify.configure(AwsExports);

window.MyWidget = function (idElement, config) {
    const defaultDoms = document.getElementById(idElement) || document.getElementById("presolved-connect-widget") ||  document.getElementById("root")
    const root = ReactDOM.createRoot(defaultDoms);
    root.render(
        <ConfigProvider prefixCls="PCW">
            <App config={config} />
        </ConfigProvider>
    );
    return this;
}