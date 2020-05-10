import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { BuildOutlined, HomeOutlined } from '@ant-design/icons'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import './styles.css'
import '../../globals/styles.css'
import IPDisect from '../ip-disect/IPDisect'
import Homepage from '../homepage/homepage'

const { Sider, Content } = Layout

function App() {

    let history = useHistory()
    let location = useLocation()

    const [collapsed, setCollapsed] = useState(false)

    const navigate = to => {
        history.push(to)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}
                   style={{
                       overflow: 'auto',
                       height: '100vh',
                       position: 'fixed',
                       left: 0
                   }}>
                <div className="logo"/>
                <Menu defaultSelectedKeys={[location.pathname]} defaultOpenKeys={['sub1']}
                      mode="inline" theme="dark">
                    <Menu.Item key="/" icon={<HomeOutlined/>}
                               onClick={() => navigate('/')}>
                        Inicio
                    </Menu.Item>
                    <Menu.Item key="/ipdisect" icon={<BuildOutlined/>}
                               onClick={() => navigate('/ipdisect')}>
                        IP Básico
                    </Menu.Item>
                    {/*<Menu.Item key="3" icon={<ContainerOutlined/>}>
                        Option 3
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined/>} title="Navigation One">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined/>} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>*/}
                </Menu>
            </Sider>
            <Layout style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }} className="transition">
                <Content>
                    <Switch>
                        <Route exact path="/">
                            <Homepage/>
                        </Route>
                        <Route exact path="/ipdisect">
                            <IPDisect/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
