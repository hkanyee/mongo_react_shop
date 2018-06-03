import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Button
} from 'antd';
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const {Header, Content} = Layout;

class Home extends Component {
  constructor() {
    super()
    this.state = {
      data_state: '',
      pick_item: ''
    }
  }

  componentDidMount() {
    fetch('/users').then(res => res.json()).then(
    // console.log(users);
    users => this.setState({data_state: users}));
  }

  handleClick(id, event) {
    var temp = id.toString() + "&";
    var id_str = temp + this.state.pick_item;
    this.setState({pick_item: id_str})
    // console.log(id);
    // console.log(id_str);
  }

  render() {
    //从数据库给主页加载商品
    var items = [];
    var getState = this.state.data_state
    const gridStyle = {
      width: '33%',
      textAlign: 'center',
      backgroundColor: 'white'
    };
    for (var i = 0; i < getState.length; i++) {
      var id = getState[i].id;
      items.push(<Card.Grid style={gridStyle} key={i}>
        <p>{getState[i].name}</p>
        <br/>
        <p>价格：{getState[i].price}</p>
        <br/>
        <Button type="primary" onClick={this.handleClick.bind(this, id)}>加入购物车</Button>
      </Card.Grid>);
    }

    return (<Layout>
      <Header className="header">

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{
            lineHeight: '64px'
          }}>
          <Menu.Item key="1">首页</Menu.Item>
          <Menu.Item key="2">
            <Link to={`/shop_cart/${this.state.pick_item}`}>购物车</Link>
          </Menu.Item>
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
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}>
          <Card >
            {items}
          </Card>
        </Content>
      </Layout>
    </Layout>)
  }
}

export default Home
