import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import SideMenu from "../../components/newsSandBox/SideMenu";
import TopHeader from "../../components/newsSandBox/TopHeader";
import Home from "../newsSandbox/home/Home"
import UserList from "./user-manage/UserList"
import RoleList from "./right-manage/RoleList"
import RightList from "./right-manage/RightList"
import NoPermission from "./notPermission/NoPermission"

// 引入组件CSS样式：
import "./NewSandBox.css"

// 引入 Antd 组件：
import {Layout} from 'antd';

const {Content} = Layout;

export default function NewsSandBox() {
    return (
        <Layout>
            {/* 侧边栏导航组件 */}
            <SideMenu/>

            <Layout className="site-layout">
                {/* 头部导航栏组件 */}
                <TopHeader/>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto"
                    }}
                >
                    {/* 二级路由 */}
                    <Switch className="site-layout">
                        {/* 首页组件路由 */}
                        <Route path="/home" component={Home}/>
                        {/* 用户管理组件路由 */}
                        <Route path="/user-manage/list" component={UserList}/>
                        {/* 角色管理路由 */}
                        <Route path="/right-manage/role/list" component={RoleList}/>
                        {/* 权限管理路由 */}
                        <Route path="/right-manage/right/list" component={RightList}/>

                        {/* 路由重定向（默认模糊匹配），exact 精确匹配 */}
                        <Redirect from="/" to="/home" exact/>

                        {/* 最终无权限访问路由 */}
                        <Route path="*" component={NoPermission}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}