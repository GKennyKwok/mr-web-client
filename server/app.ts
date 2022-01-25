import KOA from "koa";
import Proxy from "koa-proxies";

import {
    KEYS,
    PROXY_OPTION
} from './config';

const app = new KOA();
app.keys = KEYS;

// /api 所有都转发到 java 服务器
app.use(Proxy("/",PROXY_OPTION));

export default app.callback();