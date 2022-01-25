import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators'

import GlobalModule from '~/store/global';
import RegisterModule from './account/register';

let global: GlobalModule, 
    register: RegisterModule;

/**
 * 初始化所有 Store
 * @param store 
 */
function initialiseStores(store: Store<any>): void {
    global = getModule(GlobalModule, store);
    register = getModule(RegisterModule, store);
}

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];
export {
    initialiseStores,
    global,
    register
};

console.log("process: %O",process);
console.log("process.client: %O",process.client);
console.log("process.server: %O",process.server);
console.log("process.static: %O",process.static);
console.log("process.browser: %O",process.browser);