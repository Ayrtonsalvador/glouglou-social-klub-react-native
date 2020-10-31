export default function(selectedImg = 'null', action){
    if(action.type == 'addImg'){
        return action.selectedImg
    } else {
        return selectedImg
    }
}