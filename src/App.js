// 在根组件中引入全局路由组件：
import IndexRouter from "./router/indexRouter";
// 在根组件中引入全局样式：
import "./App.css"

function App(){
    return (
        <IndexRouter/>
    )
}

// 导出App组件：
export default App
