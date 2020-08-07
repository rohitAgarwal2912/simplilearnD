import { notification } from "antd";

// REDUCER FOR SHOWING TOAST
export function toasts(state ={}, action) {
    switch (action.type) {
        case 'TOAST':
        notification[action.toastype]({
            message: action.message,
            duration: 2.5,
            cssClass: 'normalToast',
          });
          return state
          break;
        default:
            return state
    }
}
 