import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// console.log(process.NODE_ENV)
axios.defaults.baseURL = '/flag/';
axios.defaults.headers.common['Authorization'] = 123;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if(response.data.status.code == 200){
    return response.data;
  } else {
    return Promise.reject(response.data)
  }
}, function (error) {
  return Promise.reject(error);
});

Vue.use(VueAxios, axios)