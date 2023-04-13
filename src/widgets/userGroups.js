import React from 'react'
import './userGroups.less'
import { Avatar, Space, Table, Tabs, Typography, Button, Row, Col, Input } from 'antd'
import { UserOutlined, PhoneOutlined, DownloadOutlined, OrderedListOutlined, UserSwitchOutlined } from '@ant-design/icons'
import client from '../store/reducers/client'

const UserGroupsList = ({ client }) => {

  const getTabItems = () => {
    let items = []
    client.data.clientUsers.map((group) => {
      items.push({
        key: group.id,
        label: <Space size={1}><UserSwitchOutlined /> {group.name}</Space>,
        children: <RenderUserGroup key={group.id} group={group} />,
      })
    })
    return items
  }


  return (
    <section className='UserGroupsList'>
      <Tabs
        size='large'
        type="card"
        items={getTabItems()}
      />

    </section>
  )
}

export default UserGroupsList



const RenderUserGroup = ({ group }) => {

  const columns = [{
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
    render: (text, record) => (
      <Space>
        <Avatar size={54} icon={<UserOutlined />} />
        <Typography.Text strong>{text}</Typography.Text>
      </Space>
    ),
  },
  {
    key: 'jobTitle',
    title: 'Job Title',
    dataIndex: 'jobTitle',
  }, {
    key: 'mail',
    title: 'Email',
    dataIndex: 'mail',
  },
  {
    key: 'mobilePhone',
    title: 'Mobile Phone',
    dataIndex: 'mobilePhone',
  }, {
    key: 'officeLocation',
    title: 'Office Location',
    dataIndex: 'officeLocation',
  }, {
    key: 'preferredLanguage',
    title: 'Preferred Language',
    dataIndex: 'preferredLanguage',
  }, {
    key: 'id',
    title: 'Actions',
    dataIndex: 'id',
    render: (text, record) => (
      <Space>
        <Button type='primary' icon={<PhoneOutlined />} onClick={() => { console.log('edit', record) }}>Call</Button>
      </Space>
    )
  }]

  return (
    <div className='UserGroup'>
      <Row align='middle' justify='space-between' gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col flex={1}>
          <Typography.Title level={5} italic type='secondary'>{group.description}</Typography.Title>
        </Col>
        <Col flex={0}>
          <Space size={10}>
            <Input.Search enterButton placeholder='Search' />
            <Button type='default' icon={<DownloadOutlined />} onClick={() => { console.log('edit', record) }}>Download</Button>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={group.users.items}
        size='large'
      />

    </div>
  )
}