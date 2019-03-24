<template>
  <div class="todo-group">
    <div class="todo-group__header">
      <h1 class="title">{{ title }}</h1>

      <div class="count">{{ count }}</div>
    </div>
    <div class="todo-group__body">
      <ul class="todo-list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoGroup',

  props: {
    // 组标题
    title: {
      type: String,
      required: true
    },
    // 组内的 item 数
    count: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.todo-group {
  padding-top: 20px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      margin: 0;

      font-size: 24px;
      font-weight: 700;
    }
  }

  &__body {
    .todo-list {
      padding: 0;
      list-style: none;
    }
  }
}
</style>