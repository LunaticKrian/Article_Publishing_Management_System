import React, {useEffect, useState} from "react";
import {Table, Tag, Button, Modal, Popover, Switch} from 'antd';
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal;
export default function RightList() {
    // 定义初始值：
    const [dataSource, setDataSource] = useState([])

    // 通过Axios获取数据：
    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(r => {
            const list = r.data
            list.forEach(item => {
                if (item.children.length === 0) {
                    item.children = ""
                }
            })
            setDataSource(r.data)
        })
    }, [])

    // 权限开关按钮处理函数：
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        // 更新状态：
        setDataSource([...dataSource])
        // 调用后台服务，关闭权限：
        if (item.grade === 1){
            axios.patch(`http://localhost:5000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:5000/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',  // dataIndex 列表渲染字段
            render: (id) => { // 样式渲染
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="orange">{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button type="danger" shape="circle" icon={<DeleteOutlined/>} style={{margin: '0 8px'}}
                                onClick={() => confirmMethod(item)}/>
                        <Popover content={
                            <div style={{textAlign: 'center'}}>
                                <Switch checked={item.pagepermisson} onClick={() => switchMethod(item)}/>
                            </div>
                        } title="权限修改配置项" trigger={item.pagepermisson === undefined ? "" : 'click'}>
                            <Button type="primary" shape="circle" icon={<EditOutlined/>}
                                    disabled={item.pagepermisson === undefined}/>
                        </Popover>
                    </div>
                )
            }
        },
    ];

    // 点击删除回调函数，是否确认删除：
    const confirmMethod = (item) => {
        confirm({
            title: "是否继续执行删除操作？",
            icon: <ExclamationCircleOutlined/>,
            content: <span>如果继续执行删除，您将失去该权限！</span>,
            onOk() {
                deleteMethod(item);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 删除权限：
    const deleteMethod = (item) => {
        console.log(item)
        // 判断权限级别，如果是一级直接删除：
        if (item.grade === 1) {
            // 删除时注意：当前页面同步状态（刷新页面），后端同步删除
            // 前端页面删除：
            setDataSource(dataSource.filter(data => {
                return data.id !== item.id
            }))
            // 调用接口删除权限信息：
            axios.delete(`http://localhost:5000/rights/${item.id}`)
        } else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].chilren = list[0].chilren.filter(data => data.id !== item.id)
            // 重新设置dataSource：
            setDataSource([...dataSource])
            // 调用接口删除权限信息：
            axios.delete(`http://localhost:5000/children/${item.id}`)
        }
    }

    return (
        <Table dataSource={dataSource} columns={columns} pagination={{
            pageSize: 10
        }}/>
    )
}