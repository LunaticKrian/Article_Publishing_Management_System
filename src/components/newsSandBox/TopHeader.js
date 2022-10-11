import React, {useState} from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Dropdown, Menu, Avatar} from 'antd';

const {Header} = Layout;

export default function TopHeader() {
    // TODO：需要学习 Hooks 钩子函数
    const [collapsed, setCollapsed] = useState(false);

    // 回调函数，改变 collapsed 值：
    const changeCollapsed = () => {
        setCollapsed(!collapsed);
    }

    // 头像下拉菜单选项：
    const menu = (
        <Menu>
            <Menu.Item
                danger
                key="loginout"
            >
                退出登录
            </Menu.Item>
        </Menu>
    );

    // 头部导航栏：
    return (
        <Header className="site-layout-background" style={{padding: "0 16px"}}>
            {/* 左侧导航栏图标：*/}
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> :
                    <MenuFoldOutlined onClick={changeCollapsed}/>
            }

            {/* 用户头像信息 */}
            <div style={{float: "right"}}>
                <strong>欢迎 Admin 回来：</strong>
                <Dropdown overlay={menu}>
                    <Avatar style={{backgroundColor: '#ffbf00', verticalAlign: 'middle'}} size="large" gap='1'>
                        Krian
                    </Avatar>
                </Dropdown>
            </div>
        </Header>
    )
}