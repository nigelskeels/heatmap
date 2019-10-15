export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.msgNextAuthToken) {
        return { 'Authorization': 'biz_token ' + user.msgNextAuthToken };
    } else {
        return {};
    }
}