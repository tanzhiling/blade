import vBtn from './btn/index.vue';
import vIcon from './icon/index.vue';
import vCard from './card/index.vue';
import vTable from './table/index.vue';
import vForm from './form/index.vue';
import vQuery from './query/index.vue';
import vQueryItem from './query/item.vue';

export default {
  async install(Vue) {
    Vue.component('VBtn', vBtn);
    Vue.component('VIcon', vIcon);
    Vue.component('VCard', vCard);
    Vue.component('VTable', vTable);
    Vue.component('VForm', vForm);
    Vue.component('VQuery', vQuery);
    Vue.component('VQueryItem', vQueryItem);
  },
};
