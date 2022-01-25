import { mixins } from "vue-class-component";
import { Component, Mixins, Vue } from "vue-property-decorator";
import { CSRFInstance } from "~/@types/data/csrf";

class CSRF implements CSRFInstance {
    token?: string = undefined;
    header?: string = undefined;
}

@Component
class CSRFMixin extends Vue {
    created() {
        console.log("this is mixins created");
        if (process.client) {
            let csrf = new CSRF();
            let csrfMeta = document.getElementById("_csrf") as HTMLMetaElement;
            let csrfHeaderMeta = document.getElementById("_csrf_header") as HTMLMetaElement;

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

            this.$nuxt.$csrf = csrf;
        }
        // console.log("CSRF Mixins this: %O", this);
    }
}

export default CSRFMixin;