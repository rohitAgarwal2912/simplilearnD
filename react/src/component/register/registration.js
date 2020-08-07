import React, { Component } from 'react';
import './registration.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter,NavLink } from 'react-router-dom';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        }
    }

    handleCancel = (e) => {
        if (typeof this.props.handleCancel === 'function') {
            this.props.handleCancel();
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    // Function for submitting the data
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                e.preventDefault();
                console.log(this.props.actions)
                let data = {
                    name: values.name,
                    address: values.address,
                    email: values.email,
                    phoneNumber: values.phone,
                    password: values.password
                }
                this.props.actions.register(data, this.props.history)  //CREATE NEW USER
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem className="login-tag"><strong>Registration</strong></FormItem>
                    <FormItem
                        label="Name"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input your Name!',
                            }],
                        })(
                            <Input autoComplete="Off" />
                        )}
                    </FormItem>
                    <FormItem
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input autoComplete="Off" />
                        )}
                    </FormItem>

                    <FormItem
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" autoComplete="Off" />
                        )}
                    </FormItem>
                    <FormItem
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        label="Address"
                    >
                        {getFieldDecorator('address', {
                            rules: [{
                                message: 'The input is not valid address!',
                            }, {
                                required: true, message: 'Please input your address!',
                            }],
                        })(
                            <Input autoComplete="Off" />
                        )}
                    </FormItem>
                    <Form.Item>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I accept the Buildr <NavLink href="">Data Policy</NavLink></Checkbox>
                        )}
                    </Form.Item>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Register</Button>
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
const WrappedRegistration = Form.create()(Registration);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegistration));