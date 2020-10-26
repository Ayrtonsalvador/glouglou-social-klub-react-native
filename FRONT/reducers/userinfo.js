export default function(userinfo = [], action) {
    if(action.type == 'saveUserInfo') {
        return [...userinfo, action.username, action.status];
    } else {
        return userinfo;
    }
}