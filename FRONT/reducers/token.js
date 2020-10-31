export default function(token = '', action){
    if(action.type == 'addToken'){
        console.log("ADD TOKEN REDUCER", action.token)
        return action.token
    } else {
        return token
    }
}