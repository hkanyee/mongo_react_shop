import React, {Component} from 'react';
import Home from './home';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Card,
  Button
} from 'antd';
const {Header, Content, Footer, Sider} = Layout;

class Header_part extends Component {
  render() {
    return (<div className="App">

      <Layout>
        <Header className="header">
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{
              lineHeight: '64px'
            }}>
            <Menu.Item key="1">
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/shop_cart">购物车</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/user">用户</Link>
            </Menu.Item>

          </Menu>
        </Header>
      </Layout>
    </div>)

  }
}
export default Header_part
