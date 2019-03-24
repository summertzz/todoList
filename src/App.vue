 <template>
  <div id="app">
    <header class="header">
      <div class="header__content container">
        <div class="logo">
          TodoList
        </div>

        <input v-model="inputText"
               type="text"
               class="input"
               placeholder="添加 todo"
               @keydown.enter="handleTitleInput">
      </div>
    </header>

    <main class="main">
      <div class="container">
        <todo-group title="正在进行"
                    :count=" doingList.length">
          <todo-item v-for="item in doingList"
                     :key="item.id"
                     :id="item.id"
                     :title="item.title"
                     :done="item.done"></todo-item>
        </todo-group>

        <todo-group title="已完成"
                    :count="doneList.length">
          <todo-item v-for="item in doneList"
                     :key="item.id"
                     :id="item.id"
                     :title="item.title"
                     :done="item.done"></todo-item>
        </todo-group>

      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import TodoItem from '@/components/TodoItem';
import TodoGroup from '@/components/TodoGroup';

export default {
  components: {
    TodoItem,
    TodoGroup
  },

  data() {
    return {
      // 待添加事项的 title
      // --------------和内层组件的inputText啥关系
      inputText: ''
    };
  },
  computed: {
    ...mapState(['dataList']),

    doneList() {
      return this.dataList.filter(item => item.done);
    },

    doingList() {
      return this.dataList.filter(item => !item.done);
    }
  },
  methods: {
    ...mapMutations(['initialDataList', 'addItem']),
    // -------------啥意思
    handleTitleInput() {
      this.addItem(this.inputText);
      this.inputText = '';
    }
  },

  created() {
    this.initialDataList();
  }
};
</script>
 
<style lang='scss' scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 620px;
}

#app {
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  .header {
    display: flex;
    justify-content: center;

    height: 50px;

    background-color: rgba(47, 47, 47, 0.98);

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      height: 100%;

      .logo {
        font-size: 24px;

        color: #ddd;
      }

      .input {
        width: 360px;
        height: 24px;
        padding: 0 12px;
        outline: 0;
        border: 0;
        border-radius: 5px;

        font-size: 12px;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24),
          0 1px 6px rgba(0, 0, 0, 0.45) inset;
      }
    }
  }

  .main {
    flex-grow: 1;
    background-color: #cdcdcd;

    .container {
      margin: 0 auto;
    }
  }
}
</style>