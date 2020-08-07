import React, { Component } from 'react';
import './resetPassword.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Checkbox, Tooltip
} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
class Resetpassword extends Component {

    handleCancel = (e) => {
        if (typeof this.props.handleCancel === 'function') {
            this.props.handleCancel();
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            email:''
        }
    }

    // Receiveing props 
    componentDidMount() {
        this.setState({email:localStorage.getItem('email')})
    }

    // Function for submitting the data
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                e.preventDefault();
                console.log(this.props.actions)
                let data = {
                    email: this.state.email,
                    password: values.password
                }
                this.props.actions.resetpassword(data, this.props.history)  //CREATE NEW PROJECT
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="login-div">
                <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                        label="New Password"
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
                    <FormItem>
                       
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                         </Button>
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
const WrappedResetpassword = Form.create()(Resetpassword);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedResetpassword));