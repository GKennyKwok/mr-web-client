import path from "path";
import dotenv from 'dotenv';
import { IKoaProxiesOptions } from "koa-proxies";

dotenv.config({ path: path.join(path.resolve("./"), '.env') });

/**
 * Session Key
 */
export const KEYS = [process.env.KOA_KEY!];

export const PROXY_OPTION:IKoaProxiesOptions = {
    target: process.env.PROXY_URL!,
    changeOrigin: true,
    rewrite: path => {
        // 需要补 /api 到转发路径中
        let newPath = path.replace(/^\//, '/api/');
        console.log("newPath: %s", newPath);
        
        return newPath;
    },
    logs: true
}