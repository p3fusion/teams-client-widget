import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import './index.less'
import { Avatar, Steps, Space, Typography } from 'antd'
const ClientHomeWidget = ({ client }) => {

    return (
        <section className='ClientHomeWidget'>
            <div className='ClientHomeWidget__header'>
                <div className='card'>
                    <Space>
                        <Avatar size={54} icon={<UserOutlined />} />
                        <Space direction='vertical' size={0}>
                            <Typography.Title level={5} type='secondary'>Hi Welcome</Typography.Title>
                            <Typography.Title level={3}>{client.data.clientInfo.company}</Typography.Title>
                        </Space>
                    </Space>

                </div>
                <div className='info'>
                    <div className='card'>
                        <Steps
                            size='default'
                            direction="vertical"
                            current={1}
                            items={[
                                {
                                    title: 'Validation',
                                    description: 'Your credentials are  validated.',
                                    status: 'finish',
                                },
                                {
                                    title: 'Micorsoft Teams Login',
                                    description: 'You have accquired token to make Microsoft Teams  calls.',
                                    status: client.data.clientConfigurations.loginMS > 0 ? 'finish' : 'error',
                                },
                                {
                                    title: 'Micorsoft Teams Consent',
                                    description: 'You have granted consent to make Microsoft Teams calls.',
                                    status: client.data.clientConfigurations.consentMS > 0 ? 'finish' : 'error',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClientHomeWidget