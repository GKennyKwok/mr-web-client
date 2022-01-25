import { AxiosResponse, AxiosError } from "axios";
import { BaseResult } from "~/@types/data/result";
import { Result_500, Result_404 } from "./resultConst";

/**
 * Axios then onfulfilled
 * @returns 
 */
export function getOnfulfilled<R>() {
    return (response: AxiosResponse<R>) => {
        return response.data;
    };
}

/**
 * Axios then onrejected
 * @param result_500 
 * @param result_404 
 * @returns 
 */
export function getOnrejected<R>(result_500: BaseResult<any> = Result_500, 
                                 result_404: BaseResult<any> = Result_404) 
{
    return (error: AxiosError<R | string>) => {
        console.log("this is axios Promise then Onrejected");
        if (error.response?.data) {
            if (error.response?.data === "Internal Server Error") {
                return Object.assign({}, result_500);
            } else if (error.response?.data === "Not Found") {
                return Object.assign({}, result_404);
            } else {
                return error.response?.data as R;
            }
        } else {
            return Object.assign({}, result_404);
        }
    }
}

/**
 * Axios catch onrejected
 * @returns 
 */
export function getCatchOnrejected<R>() {
    return (error: AxiosError<R | string>) => {
        console.log("this is axios Promise catch Onrejected");
        if (error.response?.data) {
            return error.response?.data as R;
        } else {
            return error.response;
        }
    }
}