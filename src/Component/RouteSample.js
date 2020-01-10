import React from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../store/user.redux'
function Home(params) {
    return (
        <div>
            <h3>课程列表</h3>
            <ul>
                <li>
                    <Link to="/detail/web">Web架构师</Link>
                </li>
                <li>
                    <Link to="/detail/python">Python架构师</Link>
                </li>
            </ul>
        </div>
    )
}
// 传递进来的路由器对象
function Detail(props) {
    // 1.history：导航指令 forinstance:history.back()
    // 2.match：获取参数信息
    // 3.location：当前url信息
    console.log(props)

    return (
        <div>
            当前课程：{props.match.params.course}
            <button onClick={props.history.goBack}>返回</button>
        </div>
    )
}
// 当前用户信息
function About(params) {
    return (
        <div>
            <h3>个人信息</h3>
            <div>
                <Link to="/about/me">个人信息</Link>
                <Link to="/about/order">订单查询</Link>
            </div>
            <Switch>
                <Route path="/about/me" component={() => <div>Me</div>}></Route>
                <Route
                    path="/about/order"
                    component={() => <div>order</div>}
                ></Route>
                {/* 默认项 */}
                <Redirect to="/about/me"></Redirect>
            </Switch>
        </div>
    )
}
function NoMatch({ location }) {
    return <div>404ERROR,{location.pathname}不存在</div>
}

// 路由守卫
// 希望用法：<PrivateRoute component={} path=''></PrivateRoute>
const PrivateRoute = connect(
    // 映射状态和方法
    (state) => ({
        isLogin: state.user.isLogin,
    })
)(({ component: Comp, isLogin, ...rest }) => {
    // 做认证
    // render:根据条件动态渲染组件

    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin ? (
                    <Comp />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { redirect: props.location.pathname },
                        }}
                    />
                )
            }
        ></Route>
    )
})

// 登录组件
const Login = connect(
    (state) => ({
        isLogin: state.user.isLogin,
        loading: state.user.loading,
    }),
    { login }
)(function Login({ location, isLogin, login, loading }) {
    const redirect = location.state.redirect || '/'
    console.log('重定向', redirect)

    if (isLogin) {
        return <Redirect to={redirect}></Redirect>
    } else {
        console.log('跳转至登录')

        return (
            <div>
                <p>User Login</p>
                <br />
                <button onClick={login} disabled={loading}>
                    {loading ? '登陆中....' : '登录'}
                </button>
            </div>
        )
    }
})

export default function RouteSample() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    {/* 导航链接 */}
                    <ul>
                        <li>
                            <Link to="/">首页</Link>
                        </li>
                        <li>
                            <Link to="/about">关于</Link>
                        </li>
                    </ul>
                    {/* 路由配置 ：路由即组件，包容性匹配*/}
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route
                            exact
                            path="/detail/:course"
                            component={Detail}
                        ></Route>
                        <PrivateRoute path="/about" component={About} />
                        <Route path="/login" component={Login}></Route>

                        {/* 404：没有path，必然匹配 */}
                        <Route component={NoMatch}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}
