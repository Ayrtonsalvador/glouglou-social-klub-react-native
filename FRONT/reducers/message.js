export default function(message = '', action){
    if(action.type == 'addMessage'){
        console.log("ADD MESSAGE", action.message)
        return action.message
    } else {
        return message
    }
}