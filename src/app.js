import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';
import AuthFailurePopUp from './widgets/authFailure';
import ConnectWatcher from './widgets/connect';
import ManualRecording from './widgets/manualRecording';


const CreateEmbedWidget = ({ config }) => {
    let { clientID, clientSecret } = config
    const [startApp, setStartApp] = useState(false)
    const [auth, setAuth] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [display, setDisplay] = useState({
        authenticated: false,
        appStarted: false,
        CCPInitiated: false,
        IsRecording: false,
    })

    useEffect(() => {
        if(config.clientID == undefined || config.clientSecret == undefined ){
            Modal.error({
                title: 'No Config Provided',
                content: <AuthFailurePopUp />,
            })
        }
        if (clientID == 'f3452adfc5' && clientSecret == '#122$a12302054*(sdfas)asd') {
            setStartApp(true)
            setDisplay({
                ...display,
                authenticated: true,
                appStarted: true,
            })
            window.clientID = clientID
        } else {
            setAuth(false)
            setStartApp(false)
            setDisplay({
                ...display,
                authenticated: false,
                appStarted: false,
            })
            Modal.error({
                title: 'Inavlid Client ID or Client Secret',
                content: <AuthFailurePopUp />,
            })
        }
    }, [])

    return (
        <div>
            {startApp && auth &&
                <div>
                    <FloatButton type='primary' icon={<QuestionCircleOutlined />}
                        onClick={() => setShowModal(!showModal)}
                        tooltip={<div>Click to load more info</div>}
                    />
                    <ConnectWatcher setDisplay={setDisplay} display={display} />
                </div>
            }
            <Modal centered width={640} title="Presolved Connect" closable open={showModal} onCancel={() => setShowModal(!showModal)} >
                <div style={{ margin: '30px 0' }}>
                    <ManualRecording setDisplay={setDisplay} display={display} />
                </div>
            </Modal>
        </div>
    )
}





export default CreateEmbedWidget




