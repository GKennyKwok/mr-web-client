export interface BaseResult<T>{
    result: boolean;
    code: string;
    data?: T;
    message: string;
}