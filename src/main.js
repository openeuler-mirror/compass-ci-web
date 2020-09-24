/**
 * @file main.js 配置
 * */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {
    Table,
    TableColumn,
    Pagination,
    Form,
    FormItem,
    Select,
    Option,
    Input,
    Cascader,
    Button,
    Tooltip
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '../public/style/public.css';
import './../public/style/base.css';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Button);
Vue.use(Tooltip);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');