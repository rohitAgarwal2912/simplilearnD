import React, { Component } from 'react';
import './login.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Checkbox, Tooltip
} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
class Login extends Component {
    // Function for submitting the data
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                e.preventDefault();
                console.log(this.props.actions)
                let data = {
                    email: values.email,
                    password: values.password
                }
                this.props.actions.login(data, this.props.history)  // Login user
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="login-div">
                <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
                <FormItem>
            <p className="login-tag"><strong>Login</strong></p>

                </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                         </Button>
                         <p className="login-form-forgot"> 
                         <NavLink  to="/registration">Sign Up</NavLink> | <NavLink  to="/forgotpass">Forgot password ?</NavLink>
                         </p>
                    </FormItem>
                </Form>
            </div>
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
const WrappedLogin = Form.create()(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLogin));