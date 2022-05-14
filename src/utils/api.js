import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

//请求拦截器
axios.interceptors.request.use(config=>{
    if(window.sessionStorage.getItem('tokenStr')){
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
},error=>{
    console.log(error);
})

//响应拦截器
axios.interceptors.response.use(success=>{
    //业务逻辑错误
    if(success.status&&success.status==200){
        if(success.data.code==500||success.data.code==401||success.data.code==403){
            Message.error({message:success.data.msg});
            return;
        }
        if(success.data.msg){
            Message.success({message:success.data.msg});
        }
    }
    return success.data;
},error=> {
    console.log(error.response)
    if(error.response.data.code==504 || error.response.data.code==404){
        Message.error({message:'服务器被吃了( ╯□╰ )'});
    }else if(error.response.data.code==403){
        Message.error({message:'权限不足!'});
    }else if(error.response.data.code==401){
        Message.error({message:'未登录,请登录!'});
        router.replace('/');
    }else{
        if(error.response.data.msg){
            Message.error({message:error.response.data.msg});
        }else{
            Message.error({message:'未知错误!'});
        }
    }
    return;
})

let base = '';


//传送json的post请求
export const postRequest = (url,params) =>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

//传送json的get请求
export const getRequest = (url,params) =>{
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}

//传送json的put请求
export const putRequest = (url,params) =>{
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

//传送json的delete请求
export const deleteRequest = (url,params) =>{
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}