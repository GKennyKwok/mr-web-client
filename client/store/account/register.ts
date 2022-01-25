import crypto from "crypto";
import { Store } from 'vuex';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { AxiosResponse } from "axios";
import { HttpVuexModule } from '~/@types/vuex';
import API from '~/utils/pageUrlPath';
import { BaseResult } from '~/@types/data/result';
import { getOnfulfilled, getOnrejected, getCatchOnrejected } from '~/utils/ajaxPromiseUtils';

/**
 * 注册表单数据
 */
export interface RegisterForm {
    username: string | null;
    password: string | null;
    confirmPassword: string | null;
    agreement: boolean;
    _csrf: string | null;
}

export interface RegisterResultData{}

/**
 * 注册返回数据
 */
export interface RegisterResult extends BaseResult<RegisterResultData> { }

@Module({
    name: 'register',
    namespaced: true,
    stateFactory: true,
})
export default class RegisterModule extends VuexModule implements HttpVuexModule {
    public store?: Store<any>;

    @Action
    public async doRegister(actionData: RegisterForm) {
        console.log("account/register/doRegister: %O", actionData);

        let postData:RegisterForm = Object.assign({}, actionData);
        
        // ~ 需要对发送数据密码进行加密处理
        Object.assign(postData, actionData);
        let md5 = crypto.createHash("md5");
        postData.password = md5.update(actionData.password!).digest("hex");
        md5 = crypto.createHash("md5");
        postData.confirmPassword = md5.update(actionData.confirmPassword!).digest("hex");

        let result: RegisterResult | BaseResult<any> | AxiosResponse<string | RegisterResult> | undefined
            = await this.store!.$axios.post<RegisterResult>(API.ACCOUNT.REGISTER, postData)
                .then(
                    getOnfulfilled<RegisterResult>(),
                    getOnrejected<RegisterResult>())
                .catch(
                    getCatchOnrejected<RegisterResult>()
                );

        return result;
    }
}