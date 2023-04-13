import React, { useEffect, useState } from 'react';
import { HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Modal, Drawer, notification, Space, Tabs, Spin } from 'antd';
import MicrosoftLogin from "react-microsoft-login";
import Axios from 'axios';
import { initiateAppRequest } from './api';
import teamsIcons from './assets/images/teams-button.png';
import { updateClient } from './store/reducers/client';
import { useDispatch, useSelector } from 'react-redux';
import { authCallbackMSLogin } from './api/microsoft';
import UserGroupsList from './widgets/userGroups';
import ClientHomeWidget from './widgets';

const teamsIcon = 'https://localhost:3000/images/teams-button.png'

const CreateEmbedWidget = ({ config }) => {
    const dispatch = useDispatch()
    const client = useSelector(state => state.client)
    const { clientID } = config;

    const [state, setState] = useState({
        clientID: clientID,
        initiated: false,
        validated: false,
        showModal: false,
    })

    useEffect(() => initiateApp(), [])
    const initiateApp = () => {
        setState({ ...state, initiated: true })
        initiateAppRequest(state.clientID).then((response) => {
            setState({
                ...state,
                initiated: true,
                validated: true,
            })
            notification.success({
                message: 'Success',
                description: 'App initiated successfully'
            })
            dispatch(updateClient(response.data.result))
        }).catch((err) => {
            notification.error({
                message: 'Error',
                description: 'App initiation failed \r\n' + err.message
            })
        })
    }

    const makeCall = () => {
        Axios.get('https://dbzegnu5lj.execute-api.us-east-1.amazonaws.com/develop/teams/users?tenantId=69ecaa9a-f38c-4f7b-9b2f-1108dfe74b8f&displayName=joh', {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            setUser(response.data && response.data.success && response.data.users.users.value[0])
            console.log(response)
        }).catch((err) => {
            console.error(err)
        })
    }

    const callRequest = () => {
        Axios.create({

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            data: {
                "body": JSON.stringify({
                    from: 'connect1',
                    to: {
                        tenantId: "69ecaa9a-f38c-4f7b-9b2f-1108dfe74b8f",
                        id: user.id,
                        displayname: user.displayName
                    }
                }),
            }



        }).post('https://dbzegnu5lj.execute-api.us-east-1.amazonaws.com/develop/teams/Call?tenantId=69ecaa9a-f38c-4f7b-9b2f-1108dfe74b8f&displayName=joh').then((response) => {
            console.log(response)
        }).catch((err) => {
            console.error(err)
            notification.error({
                message: 'Error',
                description: 'Something went wrong while making the call.',
            });
        })
        /*  Axios.post('https://dbzegnu5lj.execute-api.us-east-1.amazonaws.com/develop/teams/Call?tenantId=69ecaa9a-f38c-4f7b-9b2f-1108dfe74b8f&displayName=joh', {
                 "body": JSON.stringify({
                     from: 'connect1',
                     to: {
                         tenantId: "69ecaa9a-f38c-4f7b-9b2f-1108dfe74b8f",
                         id: user.id,
                         displayname: user.displayName
                     }
                 }),
                 
                 "headers": {
                     "Content-Type": "application/json",
                     "Authorization": "Bearer " + token
                 },
 
             }).then((response) => {
                 console.log(response)
             }).catch((err) => {
                 console.error(err)
                 notification.error({
                     message: 'Error',
                     description: 'Something went wrong while making the call.',
                 });
             }) */
    }

    return (
        <div>
            {             
                state.validated &&
                    <div> 
                        <Button shape='square' type='default' size='large' style={{ height: 45, backgroundColor: '#dedede', boxShadow: '0 0 3px 0px #5455b1' }} icon={<img src={teamsIcon} height={35} />}
                            onClick={() => setState({ ...state, showModal: !state.showModal })}
                            tooltip={<div>Click to load more info</div>}
                        >&nbsp;</Button>
                    </div>                 
                    
            }
            {!state.initiated && !state.validated && <Spin />}
                    
           {/*  {state.initiated && !state.validated && <img src='https://pbs.twimg.com/media/Fbz9qKdaAAEY2Ax?format=jpg&name=medium' height={480} /> 
            } */}
            <Drawer
                mask={false}
                width={"100%"}
                title="Presolved Connect"
                closable 
                open={state.showModal}
                onClose={() => setState({ ...state, showModal: !state.showModal })}
                bodyStyle={{ padding: '0 10px' }}
            >
                <div>
                    <div style={{ padding: 10, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px', minHeight: 50, marginBottom: 10 }}>

                    </div>
                    <Tabs defaultActiveKey="home"
                        tabPosition='left'
                        centered
                        items={[
                            {
                                key: 'home',
                                label: <Space size={1}><HomeOutlined /> Home</Space>,
                                children: <ClientHomeWidget client={client} />
                            },
                            {
                                key: 'Call',
                                label: <Space size={1}><PhoneOutlined /> Teams Call</Space>,
                                children: <UserGroupsList client={client} />
                            }
                        ]}
                    />

                </div>
            </Drawer>
        </div>
    )
}





export default CreateEmbedWidget



/* 
<Space direction='vertical'>
                                    <MicrosoftLogin clientId="35a2ff7a-28a5-466d-9f84-1cefbe80c187" authCallback={authCallbackMSLogin} redirectUri="https://localhost:3000" />
                                    <Button size='large' block type='primary' icon={<QuestionCircleOutlined />} onClick={() => makeCall()} >Get User</Button>
                                    <Button size='large' block type='primary' icon={<PhoneOutlined />} onClick={() => callRequest()} >Make  Call</Button>
                                </Space>


*/
