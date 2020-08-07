//LOGIN REDUCER FOR LOADER
export function error(state = false, action) {
    switch (action.type) {
     case 'ERROR':
       return action.data   //hide loader
       break;
     default:
       return state
   }
 }