<template>
  <div ref="container" class="v-editor" :style="{ height: height + 'px' }" />
</template>
<script lang="jsx">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import * as monaco from 'monaco-editor';
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker();
    }
    return new EditorWorker();
  },
};
export default {
  props: {
    value: String,
    language: String,
    height: Number,
  },
  setup(props) {
    const options = {
      theme: 'vs-dark',
      foldingStrategy: 'indentation', // 代码可分小段折叠
      automaticLayout: true, // 自适应布局
      overviewRulerBorder: false, // 不要滚动条的边框
      autoClosingBrackets: true,
      tabSize: 2, // tab 缩进长度
      minimap: {
        enabled: false, // 不要小地图
      },
    };
    const text = ref();
    const container = ref();

    let editor;

    const editorInit = () => {
      if (!editor) {
        editor = monaco.editor.create(container.value, {
          value: text.value,
          language: props.language,
          ...options,
        });
        editor.languageConfigurationService.onDidChange((val) => {
          editor.getAction('editor.action.formatDocument').run();
        });
        // 监听值的变化
        editor.onDidChangeModelContent((val) => {
          text.value = editor.getValue();
        });
      }
    };

    watch(
      () => props.value,
      (val) => {
        console.log('val', val);
        text.value = val;
        // if (editor) editor.setModel(monaco.editor.createModel(val, props.language));
      },
      { immediate: true },
    );

    onMounted(() => {
      editorInit();
    });

    onBeforeUnmount(() => {
      editor.dispose(); // 销毁实例
    });

    return {
      container,
      text,
    };
  },
};
</script>
<style lang="less">
.v-editor {
  height: 100%;
}
</style>
