import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import { AxiosError, AxiosResponse } from 'axios';
import { getUserToken } from '~/utils/storageUtils';

export default function (context: Context, inject: Inject) {
    // 存在 Token 需要在 header 中添加 Token 数据
    let token: string | null = getUserToken();
    if (token) {
        context.$axios.setToken(token, "Bearer");
    }

    context.$axios.onRequest(config => {
        console.log('axios onRequest config: %O', config);
    });
    context.$axios.onResponse((response: AxiosResponse) => {
        console.log('axios onResponse: %O', response);
    });
    context.$axios.onRequestError((error: AxiosError) => {
        console.log('axios onRequestError: %O', error);
    });
    context.$axios.onResponseError((error: AxiosError) => {
        console.log('axios onResponseError: %O', error);
    });
    context.$axios.onError((error: AxiosError) => {
        console.log('axios onError: %O', error);
        //error.message === "Network Error"
        const code = error.response && error.response.status;
        console.log("code: %O", code);
        switch (code) {
            case 400: // Bad Request	客户端请求的语法错误，服务器无法理解
                handler_400(error, context);
                break;
            case 401: // Unauthorized	请求要求用户的身份认证
                handler_401(error, context);
                break;
            case 402: // Payment Required	保留，将来使用
                handler_402(error, context);
                break;
            case 403: // Forbidden	服务器理解请求客户端的请求，但是拒绝执行此请求
                handler_403(error, context);
                break;
            case 404: // Not Found	服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面
                handler_404(error, context);
                break;
            case 405: // Method Not Allowed	客户端请求中的方法被禁止
                handler_405(error, context);
                break;
            case 406: // Not Acceptable	服务器无法根据客户端请求的内容特性完成请求
                handler_406(error, context);
                break;
            case 407: // Proxy Authentication Required	请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权
                handler_407(error, context);
                break;
            case 408: // Request Time-out	服务器等待客户端发送的请求时间过长，超时
                handler_408(error, context);
                break;
            case 409: // Conflict	服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突
                handler_409(error, context);
                break;
            case 410: // Gone	客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置
                handler_410(error, context);
                break;
            case 411: // Length Required	服务器无法处理客户端发送的不带Content-Length的请求信息
                handler_411(error, context);
                break;
            case 412: // Precondition Failed	客户端请求信息的先决条件错误
                handler_412(error, context);
                break;
            case 413: // Request Entity Too Large	由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息
                handler_413(error, context);
                break;
            case 414: // Request-URI Too Large	请求的URI过长（URI通常为网址），服务器无法处理
                handler_414(error, context);
                break;
            case 415: // Unsupported Media Type	服务器无法处理请求附带的媒体格式
                handler_415(error, context);
                break;
            case 416: // Requested range not satisfiable	客户端请求的范围无效
                handler_416(error, context);
                break;
            case 417: // Expectation Failed	服务器无法满足Expect的请求头信息
                handler_417(error, context);
                break;

            case 500: // Internal Server Error	服务器内部错误，无法完成请求
                handler_500(error, context);
                break;
            case 501: // Not Implemented	服务器不支持请求的功能，无法完成请求
                handler_501(error, context);
                break;
            case 502: // Bad Gateway	作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
                handler_502(error, context);
                break;
            case 503: // Service Unavailable	由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中
                handler_503(error, context);
                break;
            case 504: // Gateway Time-out	充当网关或代理的服务器，未及时从远端服务器获取请求
                handler_504(error, context);
                break;
            case 505: // HTTP Version not supported	服务器不支持请求的HTTP协议的版本，无法完成处理
                handler_505(error, context);
                break;
            default:
                handler_error(error, context);
                break;
        }
    });
}
/**
 * 未知错误
 * @param {AxiosError} error 
 */
function handler_error(error: AxiosError, context: Context) {
    console.log("Not status error: %O", error);
}
/** 
 * 400	Bad Request	
 * 客户端请求的语法错误，服务器无法理解
 * @param {AxiosError} error 
 */
function handler_400(error: AxiosError, context: Context) {
    console.log("400 error: %O", error);
}
/** 
 * 401	Unauthorized	
 * 请求要求用户的身份认证
 * @param {AxiosError} error 
 */
function handler_401(error: AxiosError, context: Context) {
    console.log("401 error: %O", error);

    let errorData = error.response?.data;
    if (typeof errorData !== "string") {
        if (errorData.code === "100401") {
            // 需要清除 Token 数据
            context.store.$axios.setToken(false);

            // 删除所有登录相关数据
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");

            context.store.commit("user/clearUser", undefined, { root: true });

            let path = context.route.path;
            let redirectURL = "/login"
            if (path) {
                redirectURL = redirectURL + '?ref=' + encodeURIComponent(path);
            }
            context.app.router?.push(redirectURL);
        }
    }
}

/** 
 * 402	Payment Required	
 * 保留，将来使用
 * @param {AxiosError} error 
 */
function handler_402(error: AxiosError, context: Context) {
    console.log("402 error: %O", error);
}
/** 
 * 403	Forbidden	
 * 服务器理解请求客户端的请求，但是拒绝执行此请求
 * @param {AxiosError} error 
 */
function handler_403(error: AxiosError, context: Context) {
    console.log("403 error: %O", error);
}
/** 
 * 404	Not Found	
 * 服务器无法根据客户端的请求找到资源（网页）。
 * 通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面
 * @param {AxiosError} error 
 */
function handler_404(error: AxiosError, context: Context) {
    console.log("404 error: %O", error);
}
/** 
 * 405	Method Not Allowed	
 * 客户端请求中的方法被禁止
 * @param {AxiosError} error 
 */
function handler_405(error: AxiosError, context: Context) {
    console.log("405 error: %O", error);
}
/** 
 * 406	Not Acceptable	
 * 服务器无法根据客户端请求的内容特性完成请求
 * @param {AxiosError} error 
 */
function handler_406(error: AxiosError, context: Context) {
    console.log("406 error: %O", error);
}
/** 
 * 407	Proxy Authentication Required	
 * 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权
 * @param {AxiosError} error 
 */
function handler_407(error: AxiosError, context: Context) {
    console.log("407 error: %O", error);

    let errorData = error.response?.data;
    if (typeof errorData !== "string") {
        if (errorData.code === "100401") {
            // 需要清除 Token 数据
            context.store.$axios.setToken(false);

            // 删除所有登录相关数据
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");

            context.store.commit("user/clearUser", undefined, { root: true });

            let path = context.route.path;
            let redirectURL = "/login"
            if (path) {
                redirectURL = redirectURL + '?ref=' + encodeURIComponent(path);
            }
            context.app.router?.push(redirectURL);
        }
    }
}
/** 
 * 408	Request Time-out	
 * 服务器等待客户端发送的请求时间过长，超时
 * @param {AxiosError} error 
 */
function handler_408(error: AxiosError, context: Context) {
    console.log("408 error: %O", error);
}
/** 
 * 409	Conflict	
 * 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突
 * @param {AxiosError} error 
 */
function handler_409(error: AxiosError, context: Context) {
    console.log("409 error: %O", error);
}
/** 
 * 410	Gone	
 * 客户端请求的资源已经不存在。
 * 410不同于404，如果资源以前有现在被永久删除了可使用410代码，
 * 网站设计人员可通过301代码指定资源的新位置
 * @param {AxiosError} error 
 */
function handler_410(error: AxiosError, context: Context) {
    console.log("410 error: %O", error);
}
/** 
 * 411	Length Required	
 * 服务器无法处理客户端发送的不带Content-Length的请求信息
 * @param {AxiosError} error 
 */
function handler_411(error: AxiosError, context: Context) {
    console.log("411 error: %O", error);
}
/** 
 * 412	Precondition Failed	
 * 客户端请求信息的先决条件错误
 * @param {AxiosError} error 
 */
function handler_412(error: AxiosError, context: Context) {
    console.log("412 error: %O", error);
}
/** 
 * 413	Request Entity Too Large	
 * 由于请求的实体过大，服务器无法处理，因此拒绝请求。
 * 为防止客户端的连续请求，服务器可能会关闭连接。
 * 如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息
 * @param {AxiosError} error 
 */
function handler_413(error: AxiosError, context: Context) {
    console.log("413 error: %O", error);
}
/** 
 * 414	Request-URI Too Large	
 * 请求的URI过长（URI通常为网址），服务器无法处理
 * @param {AxiosError} error 
 */
function handler_414(error: AxiosError, context: Context) {
    console.log("414 error: %O", error);
}
/** 
 * 415	Unsupported Media Type	
 * 服务器无法处理请求附带的媒体格式
 * @param {AxiosError} error 
 */
function handler_415(error: AxiosError, context: Context) {
    console.log("415 error: %O", error);
}
/** 
 * 416	Requested range not satisfiable	
 * 客户端请求的范围无效
 * @param {AxiosError} error 
 */
function handler_416(error: AxiosError, context: Context) {
    console.log("416 error: %O", error);
}
/** 
 * 417	Expectation Failed	
 * 服务器无法满足Expect的请求头信息
 * @param {AxiosError} error 
 */
function handler_417(error: AxiosError, context: Context) {
    console.log("417 error: %O", error);
}


/** 
 * 500	Internal Server Error	
 * 服务器内部错误，无法完成请求
 * @param {AxiosError} error 
 */
function handler_500(error: AxiosError, context: Context) {
    console.log("500 error: %O", error);
}
/** 
 * 501	Not Implemented	
 * 服务器不支持请求的功能，无法完成请求
 * @param {AxiosError} error 
 */
function handler_501(error: AxiosError, context: Context) {
    console.log("501 error: %O", error);
}
/** 
 * 502	Bad Gateway	
 * 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
 * @param {AxiosError} error 
 */
function handler_502(error: AxiosError, context: Context) {
    console.log("502 error: %O", error);
}
/** 
 * 503	Service Unavailable	
 * 由于超载或系统维护，服务器暂时的无法处理客户端的请求。
 * 延时的长度可包含在服务器的Retry-After头信息中
 * @param {AxiosError} error 
 */
function handler_503(error: AxiosError, context: Context) {
    console.log("503 error: %O", error);
}
/** 
 * 504	Gateway Time-out	
 * 充当网关或代理的服务器，未及时从远端服务器获取请求
 * @param {AxiosError} error 
 */
function handler_504(error: AxiosError, context: Context) {
    console.log("504 error: %O", error);
}
/** 
 * 505	HTTP Version not supported	
 * 服务器不支持请求的HTTP协议的版本，无法完成处理
 * @param {AxiosError} error 
 */
function handler_505(error: AxiosError, context: Context) {
    console.log("505 error: %O", error);
}