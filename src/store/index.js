import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务的列表
    list:[],
    // 文本框的内容
    inputValue:'aaa',
    // 下一个id
    nextId:5,
    viewKey:'all'
  },
  mutations: {
    initList(state,list){
      state.list = list
    },
    // 为store中的inputValue赋值
    setInputValue(state,val){
        state.inputValue = val
    },
    // 添加列表项目
    addItem(state){
      const obj={
        id: state.nextId,
        info: state.inputValue.trim(),
        done:false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应的任务事项
    removeItem(state,id){
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if(i !== -1){
        state.list.splice(i,1)
      }
    },
    // 修改复选框的选中状态
    changStatus(state,param){
      const i = state.list.findIndex(x=>x.id===param.id)
      if(i !== -1){
        state.list[i].done = param.status
      }
    },
    // 清除已完成的任务
    clearDone(state){
      state.list = state.list.filter(x=>x.done === false)
    },
    // 修改视图的关键字
    changeViewKey(state,key){
      // console.log(key)
      state.viewKey = key
    }
  },
  actions: {
    async getList(context){
      const {data} = await axios.get('/list.json')
      console.log(data)
      context.commit('initList',data)
    }
  },
  // 统计未完成的任务
  getters:{
    unDoneLength(state){
      // 统计未完成任务的条数
      return state.list.filter(x=>x.done === false).length
    },
    infoList(state){
      if(state.viewKey === 'all'){
        return state.list
      }
      if(state.viewKey === 'undone'){
        return state.list.filter(x=>!x.done)
      }
      if(state.viewKey === 'done'){
        return state.list.filter(x=>x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
