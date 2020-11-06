export default function (messagePress = '', action) {
    console.log("REDUX MESSAGE", messagePress)
    if (action.type == 'addMessage') {
        console.log("REDUX MESSAGE", action.message)
         return action.message
    } else {
        return messagePress;
    }    
}