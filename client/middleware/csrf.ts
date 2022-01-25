import { Middleware } from "@nuxt/types";
import { CSRFInstance } from "~/@types/data/csrf";

class CSRF implements CSRFInstance {
    token?: string = undefined;
    header?: string = undefined;
}

const csrf: Middleware = (context) => {
    console.log("csrfMiddleware");
    if (process.browser) {
        console.log("csrfMiddleware on browser");
        let csrf = new CSRF();
        let csrfMeta = document.getElementById("_csrf") as HTMLMetaElement;
        let csrfHeaderMeta = document.getElementById("_csrf_header") as HTMLMetaElement;

        console.log("csrfMeta: %O", csrfMeta);
        
        if (csrfMeta && csrfMeta.content) {
            if (csrfMeta.content.trim().length > 0) {
                csrf.token = csrfMeta.content;
            }
        }

        if (csrfHeaderMeta && csrfHeaderMeta.content) {
            if (csrfHeaderMeta.content.trim().length > 0) {
                csrf.header = csrfHeaderMeta.content;
            }
        }

        context.$csrf = csrf;
    }
}

export default csrf;