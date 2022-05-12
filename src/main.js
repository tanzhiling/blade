import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from '@mall-common/router';
import store from '@mall-common/store';
import components from '@mall-common/components';
import '@mall-common/styles/index.less';
import '@mall-common/assets/fonts/antd.css';

const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(store);
app.use(components);

app.mount('#app');
