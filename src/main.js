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
    Tooltip,
    Notification,
    Message,
    Menu,
    Submenu,
    MenuItem,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Transfer,
    Dialog,
    Tabs,
    TabPane,
    DatePicker,
    CheckboxButton,
    TimeSelect,
    TimePicker
} from 'element-ui';
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

import axios from 'axios';
import VueAxios from 'vue-axios';
import '../public/style/public.css';
import './../public/style/base.css';
import './../public/style/theme/index.css';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(DatePicker);
Vue.use(CheckboxButton);
Vue.use(TableColumn);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Transfer);
Vue.use(Dialog);
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');