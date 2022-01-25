import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);
if (process.env.NODE_ENV !== 'development') {
    Vue.config.productionTip = false;
}