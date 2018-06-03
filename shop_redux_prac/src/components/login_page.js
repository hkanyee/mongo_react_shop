import React, {Component} from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Button
} from 'antd';
import {Link} from 'react-router-dom'
import '../App.css';
import axios from 'axios';

const {Header, Content} = Layout;

class Login extends Component {
  constructor() {
    super()
    this.state = {
      data_state: 1,
      all_data_state: '',
      itemss: ''
    }
  }

  componentDidMount() {
    fetch('/users').then(res => res.json()).then(
    // console.log(users);
    users => this.setState({all_data_state: users}));
    //获取所有的商品
    axios.get('/user_list/cookie').then((response) => {
      // console.log(response.data.username);
      const data = response.data.username;
      this.setState({data_state: data})
      // console.log(this.state.data_state);
    }).catch((e) => {
      console.log(e.message)
    });
    // console.log(this.state.data_state);
  }

  handleClick() {
    axios({
      method: 'post',
      url: '/user_list/get_items',
      data: {
        name: this.state.data_state
      }
    }).then((response) => {
      // console.log(response.data[0].items);
      this.setState({itemss: response.data[0].items})
      // console.log(this.state.itemss);
    }).catch((e) => {
      console.log(e.message)
    });
  }

  handleLogout() {
    // console.log("okkkk");
    axios({method: 'post', url: '/user_list/logout'});

  }

  render() {
    var formStyle = {
      display: 'block'
    }
    var infoStyle = {
      display: 'none'
    }

    if (this.state.data_state != 1 && this.state.data_state != '' && this.state.data_state != undefined) {
      formStyle.display = 'none';
      infoStyle.display = 'block';
    }
    let items = [];
    let i = 0;
    var shuzu = new Array();
    let getState = this.state.all_data_state;
    const gridStyle = {
      width: '33%',
      textAlign: 'center',
      backgroundColor: 'white'
    };
    let id_array = this.state.itemss.split("&");
    id_array = new Set(id_array);
    // console.log(id_array);
    for (var x of id_array) { // 遍历Set
      // console.log(x);
      shuzu[i] = x;
      i++;
    }
    // console.log(shuzu);
    for (let i = 0; i < getState.length; i++) {
      for (let j = 0; j < shuzu.length; j++) {
        if (shuzu[j] == (parseInt(getState[i].id))) {
          items.push(<Card.Grid style={gridStyle} key={i}>
            <p>{getState[i].name}</p>
            <br/>
            <p>价格：{getState[i].price}</p>

          </Card.Grid>);
        }
      }
    }

    return (<Layout>
      <Header className="header">
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']} style={{
            lineHeight: '64px'
          }}>
          <Menu.Item key="1">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/shop_cart">购物车</Link>
          </Menu.Item>
          <Menu.Item key="3">用户</Menu.Item>

        </Menu>
      </Header>
      <Layout style={{
          padding: '0 24px 24px'
        }}>
        <Breadcrumb style={{
            margin: '16px 0'
          }}>
          <Breadcrumb.Item>用户页面</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}>
          <form action="/user_list/login" method="post" style={formStyle}>
            <span>账号:</span><input type="text" name="username" className="input" required="required"/><br/><br/>
            <span>密码:</span><input type="password" name="password" className="input" required="required"/><br/><br/>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </form>
          <div style={infoStyle}>
            <h1>欢迎{this.state.data_state}</h1>
            <Button onClick={this.handleClick.bind(this)}>展示</Button>
            <Button onClick={this.handleLogout.bind(this)}>退出登录,请刷新</Button>
          </div>
          {items}
        </Content>
      </Layout>
    </Layout>)
  }
}
export default Login
