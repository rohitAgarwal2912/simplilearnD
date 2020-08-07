import React, { Component } from 'react';
import './verifyotp.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
    Form, Icon, Input, Button
} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;


class Verifyotp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email:""
        }
    }

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
                    otp: values.otp
                }
            this.props.actions.verifyOtp(data, this.props.history)  // Login user
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="login-div">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label="Valid Otp">
                        {getFieldDecorator('otp', {
                            rules: [{ required: true, message: 'Please input your Otp!' }],
                        })(
                            <Input  type="number" placeholder="otp" />
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
const Wrappedverifyotp = Form.create()(Verifyotp);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrappedverifyotp));