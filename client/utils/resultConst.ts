import { BaseResult } from "~/@types/data/result";

export const Result_404:BaseResult<undefined> = {
    result: false,
    code: '404',
    message: '无法访问指定的API，请稍后再试。',
};

export const Result_500:BaseResult<undefined> = {
    result: false,
    code: '500',
    message: '未知服务器错误，请稍后再试。',
};