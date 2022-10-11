import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {HomeOutlined, TeamOutlined, CrownOutlined} from '@ant-design/icons';
// 引入自定样式：
import './index.css'

// 引入Axios：
import axios from 'axios'

// 引入 Antd 组件：
import {Layout, Menu} from 'antd';

const {SubMenu} = Menu;
const {Sider} = Layout;


function SideMenu(props) {
    // 预定于数据：
    const [menu, setMenu] = useState([])

    // 通过Axios发送请求拿取侧边栏数据：
    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(r => {
            setMenu(r.data)
        })
    }, [])

    // 图标映射：
    const iconList = {
        "/home": <HomeOutlined/>,
        "/user-manage/list": <TeamOutlined/>,
        "/right-manage/role/list": <CrownOutlined/>,
        "/right-manage/right/list": <CrownOutlined/>
    }

    // 操作权限判断：
    const checkPagePermission = (item) => {
        return item.pagepermisson === 1;
    };

    // 渲染侧边栏列表：
    const renderMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return (
                    <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return checkPagePermission(item) && (
                <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
                    props.history.push(item.key);
                }}> {item.title} </Menu.Item>
            );
        });
    }

    const openKeys = "/" + props.location.pathname.split("/")[1];
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div style={{display: "flex", height: "100%", flexDirection: "column"}}>
                <div className="logo">全球新闻发布管理系统</div>
                <div style={{flex: 1, overflow: "auto"}}>
                    {/* 渲染左侧边栏菜单列表 */}
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[props.location.pathname]}
                        defaultOpenKeys={[openKeys]}
                    >
                        {renderMenu(menu)}
                    </Menu>
                </div>
            </div>
        </Sider>
    )
}

export default withRouter(SideMenu)