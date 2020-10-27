export default function(userstatus = "", action) {
    if(action.type == 'saveUserstatus') {
        return  userstatus = action.status

    } else {

        return userstatus;
    }
}
