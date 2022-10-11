// 引入React Router组件：
import React from 'react'
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'

// 引入组件：
import NewsSandBox from "../views/newsSandbox/NewsSandBox";
import Login from "../views/login/Login";

export default function IndexRouter() {
    return (
        <HashRouter>
            {/* Switch 只要匹配第一个成功之后，就不会再继续往下匹配 */}
            <Switch>
                <Route path="/login" component={Login}/>

                {/*<Route path="/" component={NewsSandBox}/>*/}
                {/* 实现路由重定向 */}
                <Route path="/" render={() =>
                    localStorage.getItem("token") ? <NewsSandBox/> : <Redirect to="/login"/>
                }/>
            </Switch>
        </HashRouter>
    )
}