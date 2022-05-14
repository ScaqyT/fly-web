// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'font-awesome/css/font-awesome.min.css'

import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {deleteRequest} from './utils/api'

import {initMenu} from './utils/menu';
import Router from 'vue-router'

Vue.use(Router);

Vue.config.productionTip = false
Vue.use(ElementUI)
/* 插件形式处理请求 */
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;



router.beforeEach((to,from,next) => {
  if(window.sessionStorage.getItem('tokenStr')){
    initMenu(router,store);
    //判断是否存在用户信息
    if(!window.sessionStorage.getItem('user')){
      return getRequest('/admin/info').then(resp=>{
        if(resp){
          //将用户信息存入sessionStorage
          window.sessionStorage.setItem('user',JSON.stringify(resp));
          next();
        }
      })
    }
    next();
  }else{
    if(from.path=='/' && to.path!='/'){
      Message.error({message:'未登录，请先登录！'});
    }
    if(to.path=='/'){
      next();
    }else{
      next('/?redirect='+to.path);
    }
  }
})





/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
