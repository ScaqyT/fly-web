import router from '../router'
import {getRequest} from './api'



export const initMenu = (router,store) => {
    let adminId = '';

    getRequest('/admin/info').then(data=>{
        if(data){
            adminId = data.id;
        }
    })


    if(store.state.routes.length > 0){
        return;
    }

    getRequest('/system/config/menu').then(data=>{
        if(data){
            //格式化router
            let fmtRoutes = formatRoutes(data);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.commit('initRoutes',fmtRoutes);
            store.commit('initAdmin',adminId);
        }
    })
}

export const formatRoutes = (routes) =>{
    let fmtRoutes = [];
    routes.forEach(router => {
        let{
            path,
            component,
            name,
            iconCls,
            children
        } = router;
        if(children && children instanceof Array){
            children = formatRoutes(children);
        }
        let fmRoutes = {
            path:path,
            name:name,
            iconCls:iconCls,
            children:children,
            component(resolve){
                if(component.startsWith('Home')){
                    require(['../views/'+component+'.vue'],resolve);
                }else if(component.startsWith('Admin')){
                    require(['../views/admin/'+component+'.vue'],resolve);
                }else if(component.startsWith('Car')){
                    require(['../views/car/'+component+'.vue'],resolve);
                }else if(component.startsWith('Cus')){
                    require(['../views/cus/'+component+'.vue'],resolve);
                }else if(component.startsWith('Sup')){
                    require(['../views/sup/'+component+'.vue'],resolve);
                }else if(component.startsWith('Wh')){
                    require(['../views/wh/'+component+'.vue'],resolve);
                }else if(component.startsWith('Order')){
                    require(['../views/order/'+component+'.vue'],resolve);
                }else if(component.startsWith('Sys')){
                    require(['../views/sys/'+component+'.vue'],resolve);
                }
            }
        }
        fmtRoutes.push(fmRoutes);
    });
    return fmtRoutes;
}