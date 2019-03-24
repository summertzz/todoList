import Vue from 'vue'
import Vuex from 'vuex'
import shortid from 'shortid';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: []
  },
  mutations: {
    // 初始化 dataList
    initialDataList(state) {
      // 获取 localstorage 里面的 datalist
      let storageData = JSON.parse(window.localStorage.getItem('dataList'));

      if (storageData === null) {
        return window.localStorage.setItem('dataList', JSON.stringify([]));
      }

      state.dataList = storageData;
    },
    // 添加代办项
    addItem({
      dataList
    }, title) {
      dataList.push({
        id: shortid.generate(),
        title: title,
        done: false
      });

      window.localStorage.setItem('dataList', JSON.stringify(dataList));
    },
    // 删除代办项
    deleteItem({
      dataList
    }, id) {
      let index = dataList.findIndex(item => item.id === id);

      if (index === -1) {
        throw new Error({
          message: '找不到待删除的代办项'
        });
      }
      dataList.splice(index, 1);

      window.localStorage.setItem('dataList', JSON.stringify(dataList));
    },
    // 切换状态
    toggleItem({
      dataList
    }, id) {
      let index = dataList.findIndex(item => item.id === id);

      if (index === -1) {
        throw new Error({
          message: '找不到要请求的待办事项'
        });
      }

      let target = dataList[index];

      target.done = !target.done;

      window.localStorage.setItem('dataList', JSON.stringify(dataList));
    },
    // 编辑代办项
    setItemTitle({
      dataList
    }, {
      id,
      title
    }) {
      let index = dataList.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error({
          message: '找不到要处理的代办项'
        });
      }
      let target = dataList[index];
      target.title = title;

      window.localStorage.setItem('dataList', JSON.stringify(dataList));
    }
  },
  actions: {

  }
})