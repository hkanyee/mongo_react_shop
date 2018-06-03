import { Layout, Menu, Breadcrumb,Card,Button,InputNumber} from 'antd';
import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const { Header, Content} = Layout;

class Shopcart extends Component{

  constructor(){
    super()
    this.state={
      data_state:'',
      all_price:0,
      username:''
    }
  }

  componentDidMount() {
        fetch('/users')
          .then(res => res.json())
          .then(
            // console.log(users);
            users => this.setState({ data_state:users }));
  }

  handleChange(e,price) {
    // console.log(e);
    // console.log(price);
    this.setState({
      all_price:((price-1)*e)
    })
  }
  handleSubmit(){
    axios({
          method: 'post',
          url: '/user_list/items',
          data: {
            items: this.props.match.params.key
            }
          });
  }


  render(){
    let items = [];
    let i=0;
    var shuzu=new Array();
    let getState=this.state.data_state;
    // console.log(getState);
    var count_price=0;
    const gridStyle = {
      width: '33%',
      textAlign: 'center',
      backgroundColor:'white'
    };
    let id=this.props.match.params.key;
    let id_array=id.split("&");
    id_array=new Set(id_array);
    // console.log(id_array);
    for (var x of id_array) { // 遍历Set
      // console.log(x);
      shuzu[i]=x;
      i++;
    }
    // console.log(shuzu);
    for (let i = 0; i < getState.length; i++) {
        for(let j=0;j < shuzu.length; j++)
        {
          if(shuzu[j]==(parseInt(getState[i].id))){
            // console.log(i);
            // console.log(getState[i].price);
            count_price+=parseInt(getState[i].price);
            items.push(
              <Card.Grid style={gridStyle} key={i}>
                <p>{getState[i].name}</p>
                <br/>
                <p>价格：{getState[i].price}</p>
                <InputNumber min={1} max={10} defaultValue={1} onChange={this.handleChange.bind(this,getState[i].price)} />
              </Card.Grid>
            );
          }
        }
    }

    return(
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="2">购物车</Menu.Item>
            <Menu.Item key="3"><Link to="/user">用户</Link></Menu.Item>

          </Menu>
        </Header>

        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {items}
              <br/>

            </Content>
            <h1>总价：{count_price+this.state.all_price}</h1>
            <Button onClick={this.handleSubmit.bind(this)}>提交</Button>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Shopcart
