export function getCookie(key) {
    const reg = new RegExp(key + '=([^;]*)');
    const result = reg.exec(document.cookie);
    return result?result[1]:"";
}
export function setCookie(key, value, expires=null){
    document.cookie=`${key}=${value}; path=/; ${expires?`expires=${expires}`:``}`;
}
