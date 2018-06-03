import React, {Component} from 'react';
import {
  Layout,
  Menu,
  Breadcrumb
} from 'antd';
import {Link} from 'react-router-dom';

const {Header, Content} = Layout;

class EmptyCart extends Component {

  render() {
    return (<Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{
            lineHeight: '64px'
          }}>
          <Menu.Item key="1">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="2">购物车</Menu.Item>
          <Menu.Item key="3">
            <Link to="/user">用户</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout style={{
          padding: '0 24px 24px'
        }}>
        <Breadcrumb style={{
            margin: '16px 0'
          }}>
          <Breadcrumb.Item>购物车</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}>
          <h1>您的购物车是空的</h1>
        </Content>
      </Layout>
    </Layout>)
  }
}
export default EmptyCart
