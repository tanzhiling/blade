import vBtn from './btn/index.vue';

import vCard from './card/index.vue';
import vException from './exception/index.vue';
import vTable from './table/index.vue';
import vForm from './form/index.vue';
import vIcon from './icon/index.vue';
import vIconSelect from './icon-select/index.vue';

export default {
  async install(Vue) {
    Vue.component('VBtn', vBtn);
    Vue.component('VCard', vCard);
    Vue.component('VException', vException);
    Vue.component('VTable', vTable);
    Vue.component('VForm', vForm);
    Vue.component('VIcon', vIcon);
    Vue.component('VIconSelect', vIconSelect);
  },
};
