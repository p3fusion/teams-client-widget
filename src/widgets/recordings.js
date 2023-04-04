import React, { useEffect, useState } from 'react'
import { Auth, Storage } from 'aws-amplify';
import { ReloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Modal, Row, Space, Spin, Typography } from 'antd';
import videoPlaceholder from '../assets/images/videoPlaceholder.jpg'
import './recordings.less'
import moment from 'moment-timezone';

const S3RecordingsList = () => {
    useEffect(() => getAllfilesFromS3(), [])
    const clientID = window.clientID || "guests" 
    const [files, setFiles] = useState([])
    const [state, setState] = useState({
        filesLoaded: false,
        selected: null,
        preview:false,
        previewUrl:null
    })

    const getAllfilesFromS3 = () => {
        setState({ filesLoaded: false,selected: null})
        Storage.list(`${clientID}`, { level: 'public' }).then((result) => {
            setFiles(result)
            setState({ ...state, filesLoaded: true })
        })
    }

    const preview=(selected)=>{
        Storage.get(selected).then((result) => {
            setState({
                ...state,
                selected,
                preview:true,
                previewUrl:result
            })
        })
    }


    return (
        <section className='s3-recordings-list'>
            <div className='breadcrumb-container'>
                <Breadcrumb >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item >Recordings</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='recordings-list-container'>
                <Row>
                    <Col span={24}>
                        <Card title="Recordings" extra={[
                            <Button onClick={() => getAllfilesFromS3()} type="default" icon={<ReloadOutlined />}>Refresh</Button>
                        ]}>
                            {state.filesLoaded ?
                                <div className='recordings-list'>                                   
                                    {files.map((file, index) =>
                                        <div className='recording-item' key={index}>
                                            <a onClick={()=>preview(file.key)}>
                                                <Space direction='vertical' size={5}>
                                                    <img src={videoPlaceholder} height={100} />
                                                    <Typography.Text ellipsis={{
                                                        tooltip: file.key,
                                                        suffix: '...',
                                                        rows: 1
                                                    }}>
                                                        {file.key}
                                                    </Typography.Text>
                                                    <Typography.Text ellipsis={{
                                                        tooltip: file.key,
                                                        suffix: '...',
                                                        rows: 1
                                                    }}>
                                                        {moment(file.lastModified).format('LLL')}
                                                    </Typography.Text>
                                                </Space>
                                            </a>
                                        </div>
                                    )}
                                </div>
                                :
                                <Space size={10}>                                    
                                    <Typography.Title  style={{ margin: 0 }}  level={3}><Spin  /> Loading...</Typography.Title>
                                </Space>
                            }
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal title="Preview" open={state.preview} onCancel={()=>setState({...state,preview:false,selected:null,previewUrl:null})} footer={null} width={640}>
                <video width="100%" height="100%" controls>
                    <source src={state.previewUrl} type="video/webm" />
                </video>
                </Modal>
        </section>
    )
}

export default S3RecordingsList