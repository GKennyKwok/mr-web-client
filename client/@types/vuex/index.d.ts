import { Store } from 'vuex';
import '@nuxtjs/axios';
import '@nuxtjs/dayjs';
import dayjs from 'dayjs';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';

// config & dayjs
declare module 'vuex' {
    interface Store<S> {
        $dayjs: typeof dayjs;
        $config: NuxtRuntimeConfig;
    }
}

export interface HttpVuexModule {
    store?: Store<any>;
}