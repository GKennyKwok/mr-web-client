/**
 * 从浏览器缓存中获取用户数据
 */
export function getUserData() {
    let user = getStorageValueForKey('user');

    if(user){
        user = JSON.parse(user);
    }
    return user;
}

/**
 * 从浏览器缓存中获取 JWT 登录 Token
 */
export function getUserToken() {
    let token = getStorageValueForKey('token');
    return token;
}

/**
 * 从浏览器缓存中获取指定键名的值
 * @param key 保存的键名
 */
export function getStorageValueForKey(key:string) {
    if(typeof window !== "undefined"){
        let value = window.localStorage.getItem(key);
        if(!value){
            value = window.sessionStorage.getItem(key);
        }
        return value;
    }
    return null;
}