import screenfull from 'screenfull';
export default {
  namespaced: true,
  state: {
    collapsed: false, // 展开收起
    fullscreen: false, // 是否切换到了全屏
  },
  mutations: {
    updateCollapsed(state, collapsed) {
      state.collapsed = collapsed;
    },
    setFullscreen(state, fullscreen) {
      state.fullscreen = fullscreen;
    },
  },
  actions: {
    /**
     * @description 初始化监听全屏状态
     */
    listenFullscreen({ commit }) {
      return new Promise((resolve) => {
        if (screenfull.enabled) {
          screenfull.on('change', () => {
            if (!screenfull.isFullscreen) {
              commit('setFullscreen', false);
            }
          });
        }
        // end
        resolve();
      });
    },
    /**
     * @description 切换全屏
     */
    toggleFullscreen({ commit }) {
      return new Promise((resolve) => {
        if (screenfull.isFullscreen) {
          screenfull.exit();
          commit('setFullscreen', false);
        } else {
          screenfull.request();
          commit('setFullscreen', true);
        }
        // end
        resolve();
      });
    },
  },
};
