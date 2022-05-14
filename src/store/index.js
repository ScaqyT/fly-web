import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        routes: [],
        adminId: '',
    },

    mutations: {
        initRoutes(state,data){
            state.routes = data;
        },
        initAdmin(state,data){
            state.adminId = data;
        }

    }
})
