// import firebase from "firebase";
import React, { Component } from 'react';
import './forgotPassword.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import Loading from 'react-loading-bar';
// import { NavLink, withRouter } from 'react-router-dom';
// import 'react-loading-bar/dist/index.css';
import { withRouter, NavLink, Link } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Checkbox, Tooltip
} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;


class ForgotPassword extends Component {
    // Function for submitting the data
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                e.preventDefault();
                console.log(this.props.actions)
                let data = {
                    email: values.email,
                }
                this.props.actions.forgotpassword(data, this.props.history)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="login-div">
                {/* <p style={{ textalign: 'center' }}>Lost password</p> */}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    Enter the email address you usually sign in with below in order retrieve your password.
                    <FormItem label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your Email!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" autoComplete="off" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                         </Button>
                        {/* go back to login page */}
                        <NavLink to="/">Go Back</NavLink>
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
const WrappedForgotPassword = Form.create()(ForgotPassword);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedForgotPassword));