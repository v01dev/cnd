/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({


    mutations: {
        logIn (isLoggedIn) {
            state.isLoggedIn = true
        },
        logOut (isLoggedIn) {
            state.isLoggedIn = false
        },
    }
})

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
    strict: process.env.NODE_ENV !== 'production'
})
