import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import login from './component/login/login';
import Registration from './component/register/registration';
import Forgotpassword from './component/forgotPassword/forgotPassword';
import Resetpassword from './component/resetPassword/resetPassword';
import Verifyotp from './component/verifyotp/verifyotp';
import Dashboard from './component/dashboard/dashboard';
import rootReducer from "../src/redux/rootReducer";

let store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
    <BrowserRouter >
        <Switch>
            <Route exact path='/' component={login} />
            <Route  path='/registration' component={Registration} />
            <Route  path='/forgotpass' component={Forgotpassword} />
            <Route  path='/resetpass' component={Resetpassword} />
            <Route  path='/verifyotp' component={Verifyotp} />
            <Route  path='/dashboard' component={Dashboard} />
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('root'));

