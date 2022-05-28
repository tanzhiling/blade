import vBtn from './Btn/index.vue';
import vCard from './Card/index.vue';
import vEditor from './Editor/index.vue';
import vException from './Exception/index.vue';
import vIcon from './Icon/index.vue';
import vIconSelect from './IconSelect/index.vue';

import BasicTable from './Table/index.vue';
import BasicForm from './Form/index.vue';

export default {
  async install(Vue) {
    Vue.component('VBtn', vBtn);
    Vue.component('VCard', vCard);
    Vue.component('VEditor', vEditor);
    Vue.component('VException', vException);
    Vue.component('VIcon', vIcon);
    Vue.component('VIconSelect', vIconSelect);

    Vue.component('BasicForm', BasicForm);
    Vue.component('BasicTable', BasicTable);
  },
};
