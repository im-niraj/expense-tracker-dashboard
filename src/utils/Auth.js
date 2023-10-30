export function hasJWT() {
    let flag = false;
    sessionStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
}
