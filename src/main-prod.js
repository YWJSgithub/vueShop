import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'

//导入字体库
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'

//安装树表格vue-table-with-tree-grid插件,再导入
import TreeTable from 'vue-table-with-tree-grid'

//安装three.js
// import * as THREE from 'three'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入进度条
import NProgress from 'nprogress'

import axios from 'axios'

//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在request拦截器中,展示进度条NProgress.start()
//配置axios的interceptors属性
axios.interceptors.request.use(config => {    //request：请求的拦截器
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')//服务器通过Authorization 判断是否合法请求
  return config;//必须return config
})

// 在response拦截器中,隐藏进度条
axios.interceptors.response.use(config =>{
  NProgress.done()
  return config
})


//将axios挂在到原型属性的$http，每个vue组件都可以通过this访问到this.$http
Vue.prototype.$http = axios
Vue.config.productionTip = false

//注册全局组件TreeTable
Vue.component('tree-table',TreeTable)

// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 注册全局的过滤器
Vue.filter('dateFomat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth()+1 + '').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')
  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
const scene = new THREE.Scene();
