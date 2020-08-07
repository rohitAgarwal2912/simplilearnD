import React, { Component } from 'react';
import './dashboard.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Layout, Menu, Avatar,Row,Col
} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
const { Header, Sider, Content } = Layout;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    componentDidMount(){
        const id = localStorage.getItem('id');
        if(!id){
            this.logout();
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout=()=>{
        this.props.history.push('/')
        localStorage.clear('id');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { name } = this.props.userdetail;
        return (
            <div>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span>Dashboard</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span>nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span>nav 3</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Row>
                                <Col xs={2} sm={2} md={1} lg={1} className="menuiconresponsive">
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                </Col>
                                <Col xs={9} sm={9} md={18} lg={18}><p className="pageheading"></p></Col>
                                <Col xs={13} sm={13} md={5} lg={5}>
                                    <a className="ant-avatar" href="#">
                                        <Avatar shape="square" icon="user" />
                                        {this.state.name}
                                    </a>
                                    <Button className="float-right" type="primary" onClick={this.logout}>logout</Button> 
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            WELCOME TO YOUR DASHBOARD  {name && name.charAt(0).toUpperCase() + name.slice(1)}
                    </Content>
                    </Layout>
                </Layout>
            </div >

        );
    }
}

const mapStateToProps = (state) => {
    return state
}
function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(actioncreators, dispatch)
    })
}
const WrappedDashboard = Form.create()(Dashboard);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedDashboard));