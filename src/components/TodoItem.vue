<template>
  <li class="todo-list__item"
      :class="{  'todo-list__item--done': done }">
    <div class="left">
      <input v-model="checked"
             class="checkbox"
             type="checkbox">

      <span v-if="!editing"
            class="title"
            @click="handleTitleClick">{{ title }}</span>
      <input v-else
             ref="titleInput"
             class="title-input"
             v-model="inputText"
             type="text"
             @keydown.enter="handleEnter">
    </div>

    <div class="right">
      <span class="delete-button"
            @click="handleDeleteButtonClick">-</span>

    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },

    done: {
      type: Boolean,
      required: false
    },

    title: {
      type: [String, Number],
      required: false,
      default: ''
    }
  },

  data() {
    return {
      checked: this.done,
      // // 双向绑定的值是data？从外部组件流进来的data？
      inputText: this.title,
      editing: false
    };
  },

  watch: {
    done(val) {
      this.checked = val;
    },

    checked() {
      // ------------也不懂
      this.$emit('status-change', this.id);
    }
  },

  methods: {
    handleTitleClick() {
      this.editing = true;
      // -----------不懂
      this.$nextTick(() => {
        let { titleInput } = this.$refs;
        titleInput.focus();
      });
    },

    handleEnter() {
      this.editing = false;
      // ------------不懂
      this.$emit('title-change', { id: this.id, title: this.inputText });
    },

    handleDeleteButtonClick() {
      // ------------也不懂
      this.$emit('remove', this.id);
    }
  },

  mounted() {}
};
</script>

<style lang='scss' scoped>
.todo-list__item {
  height: 32px;
  margin-top: 20px;
  padding: 0 12px;
  border-radius: 3px;
  border-left: 5px solid #629a9c;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;

  &--done {
    filter: grayscale(100%);
  }

  .left {
    .title-input {
      margin-left: 12px;

      width: 420px;
    }

    .title {
      margin-left: 12px;
    }
  }
}
</style>