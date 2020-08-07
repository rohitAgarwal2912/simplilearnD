// Imports
const API_URL = 'http://localhost:5000/'

// SHOW TOAST NOTIFICATIONS
function toast(type, message) {
    switch (type) {
        case "success":
            return { type: "TOAST", toastype: type, message };
            break;
        case "info":
            return { type: "TOAST", toastype: type, message };
            break;
        case "warning":
            return { type: "TOAST", toastype: type, message };
            break;
        case "error":
            return { type: "TOAST", toastype: type, message };
            break;
        default: {
        }
    }
}

export function callToast(data) {
    return dispatch => {
        dispatch(toast(data.type, data.message));
    };
}

//Dispatch user list to reducers
function errorMessage(data) {
    return {
        type: "ERROR",
        data
    };
}

// Function to call registration api
export function register(data, location) {
    return (dispatch) => {
        fetch(API_URL + 'user/create',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)

            })
            .then((response) =>
                response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Registered Successfully!'));
                    dispatch(userdetail(responseJSON.result));
                    location.push('/');
                }
                else {
                    dispatch(toast('error', responseJSON.message));
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Some error occured !'));
            });
    }
}

// Function to call login
export function login(logindata, location) {
    return (dispatch) => {
        fetch(API_URL + 'user/login',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(logindata)
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Login Successfully!'));
                    localStorage.setItem('id', responseJSON.result._id );
                    dispatch(userdetail(responseJSON.result));
                    location.push('/dashboard');
                }
                else {
                    dispatch(toast('error', responseJSON.message));
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Password is Incorrect !'));
            });
    }

}

// Function to call verifyOtp
export function verifyOtp(logindata, location) {
    return (dispatch) => {
        fetch(API_URL + 'user/verifyotp',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(logindata)
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Otp verified Successfully!'));
                    location.push('/resetpass');
                }
                else {
                    dispatch(toast('error', responseJSON.message));
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Otp is Incorrect !'));
            });
    }

}

// Function to call forgotpassword
export function forgotpassword(data, location) {
    return (dispatch) => {
        fetch(API_URL + 'user/forgotPassword',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    localStorage.setItem('email', data.email );
                    dispatch(toast('success', 'Request send to your mail Successfully!'));
                    location.push('/verifyotp');
                }
                else {
                    dispatch(toast('error', responseJSON.message));
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Invalid Email  !'));
            });
    }
}

// Function to call resetpassword
export function resetpassword(logindata, location) {
    return (dispatch) => {
        fetch(API_URL + 'user/resetpassword',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(logindata)
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Password  Reset Successfully!'));
                    location.push('/');
                }
                else {
                    dispatch(toast('error', responseJSON.message));
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' !'));
            });
    }

}

//function for loggedin username 
function userdetail(detail) {
    return {
        type: "LOGGED_USER_DETAILS",
        detail,
    }
}







































