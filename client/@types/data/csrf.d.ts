import Vue from 'vue';

interface CSRFInstance {
    token?: string;
    header?: string;
}

declare module '@nuxt/vue-app' {
    interface Context {
        $csrf: CSRFInstance
    }
    interface NuxtAppOptions {
        $csrf: CSRFInstance
    }
}

declare module '@nuxt/types' {
    interface Context {
        $csrf: CSRFInstance
    }

    interface NuxtAppOptions {
        $csrf: CSRFInstance
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $csrf: CSRFInstance
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $csrf: CSRFInstance,
    }
}