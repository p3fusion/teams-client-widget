import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from 'antd'
import { Provider } from "react-redux";
import { store } from "./src/store";
import 'antd/dist/reset.css';
import App from "./src/app";
//import AwsExports from "./src/aws-exports";
//import {Amplify} from "aws-amplify";
//const root = document.getElementById("root");
//ReactDOM.render(<App />,root);
//Amplify.configure(AwsExports);
window.MyWidget = function (idElement, config) {
    const defaultDoms = document.getElementById(idElement) || document.getElementById("presolved-connect-widget") || document.getElementById("root")
    //const defaultDoms = document.getElementById("root") 
    const root = ReactDOM.createRoot(defaultDoms);
    //const config={clientID:"d0aa9be0-44ba-411b-8712-1ddc33f5c00e"}
    root.render(
        <Provider store={store}>
            <ConfigProvider prefixCls="PCW" >
                <App config={config} />
            </ConfigProvider>
        </Provider>
    );
    return this;
}