export default function(messagePress = [], action){
    if(action.type == 'readMessage'){
        console.log("REDUX MESSAGE", action.message)
        return ([...messagePress], action.message)
    } else {
        return messagePress;
    }
}