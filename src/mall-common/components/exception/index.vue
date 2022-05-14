<template>
  <div class="v-exception">
    <div class="image">
      <img v-if="type === '404'" src="@mall-common/assets/images/icon-404.svg" />
      <img v-else-if="type === '403'" src="@mall-common/assets/images/icon-403.svg" />
    </div>
    <div class="content">
      <h1>{{ type }}</h1>
      <div v-if="type === '404'" class="desc">抱歉，你访问的页面不存在</div>
      <div v-else-if="type === '403'" class="desc">抱歉，你无权访问该页面</div>
      <div class="actions">
        <a-button size="large" type="primary" href="/home">返回首页</a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
  },
};
</script>
<style lang="less">
.v-exception {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;
  .image {
    flex: 1.5;
    img {
      width: 60%;
      margin: auto;
      display: block;
    }
  }
  .content {
    flex: 1;
    h1 {
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
